from datetime import datetime, timedelta
from flask import Flask, render_template, jsonify, request
from functools import wraps
import pytz
import os
import logging
from cachelib import SimpleCache

# 配置日志
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# 创建Flask应用
app = Flask(__name__, 
           static_folder='static',
           static_url_path='/static',
           template_folder='templates')

# 创建缓存对象
cache = SimpleCache()
CACHE_TIMEOUT = 60  # 缓存60秒

# 设置时区
BEIJING_TZ = pytz.timezone('Asia/Shanghai')

# 重要日期 - 使用datetime.combine确保时间是当天的0点
START_DATE = datetime.combine(
    datetime(2009, 12, 10).date(),
    datetime.min.time(),
    tzinfo=BEIJING_TZ
)

ANNIVERSARY_DATE = datetime.combine(
    datetime(2025, 12, 10).date(),
    datetime.min.time(),
    tzinfo=BEIJING_TZ
)

# 错误处理装饰器
def handle_errors(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        try:
            return f(*args, **kwargs)
        except Exception as e:
            logger.error(f'Error in {f.__name__}: {str(e)}')
            return jsonify({
                'error': str(e),
                'status': 'error'
            }), 500
    return decorated_function

# 缓存装饰器
def cached(timeout=CACHE_TIMEOUT):
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            cache_key = f.__name__ + str(args) + str(kwargs)
            rv = cache.get(cache_key)
            if rv is not None:
                return rv
            rv = f(*args, **kwargs)
            cache.set(cache_key, rv, timeout=timeout)
            return rv
        return decorated_function
    return decorator

def get_beijing_time():
    """获取北京时间"""
    return datetime.now(BEIJING_TZ)

@cached(timeout=1)  # 缓存1秒
def calculate_days(start_date, end_date):
    """计算两个日期之间的天数，考虑时区"""
    # 确保两个日期都有时区信息
    if start_date.tzinfo is None:
        start_date = BEIJING_TZ.localize(start_date)
    if end_date.tzinfo is None:
        end_date = BEIJING_TZ.localize(end_date)
        
    # 转换为北京时间
    start_date = start_date.astimezone(BEIJING_TZ)
    end_date = end_date.astimezone(BEIJING_TZ)
    
    # 只考虑日期部分进行计算
    start = start_date.replace(hour=0, minute=0, second=0, microsecond=0)
    end = end_date.replace(hour=0, minute=0, second=0, microsecond=0)
    
    return (end - start).days

@cached(timeout=1)  # 缓存1秒
def calculate_time_parts(from_date, to_date):
    """计算两个时间之间的天、时、分、秒"""
    diff = to_date - from_date
    
    # 计算总秒数
    total_seconds = int(diff.total_seconds())
    
    # 计算天数（向下取整）
    days = total_seconds // (24 * 3600)
    
    # 计算剩余的小时、分钟和秒
    remaining = total_seconds % (24 * 3600)
    hours = remaining // 3600
    remaining = remaining % 3600
    minutes = remaining // 60
    seconds = remaining % 60
    
    return {
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    }

def is_anniversary_date(current_date):
    """检查是否是16周年纪念日（基于北京时间）"""
    return (current_date.date() == ANNIVERSARY_DATE.date())

@app.route('/')
@handle_errors
def index():
    """主页路由"""
    current_date = get_beijing_time()
    logger.info(f'访问主页 - 当前北京时间: {current_date}')
    
    # 计算在一起的天数（只考虑日期部分）
    days_together = calculate_days(START_DATE, current_date)
    logger.info(f'在一起的天数: {days_together}')
    
    # 计算到16周年的具体时间
    time_to_anniversary = calculate_time_parts(current_date, ANNIVERSARY_DATE)
    logger.info(f'距离16周年还有: {time_to_anniversary}')
    
    # 检查是否是纪念日
    is_anniversary = is_anniversary_date(current_date)
    logger.info(f'是否是纪念日: {is_anniversary}')
    
    return render_template('index.html',
                         days_together=days_together,
                         time_to_anniversary=time_to_anniversary,
                         is_anniversary=is_anniversary)

@app.route('/api/time')
@handle_errors
@cached(timeout=1)
def get_time():
    """获取当前时间信息的API"""
    current_date = get_beijing_time()
    days_together = calculate_days(START_DATE, current_date)
    time_to_anniversary = calculate_time_parts(current_date, ANNIVERSARY_DATE)
    
    return jsonify({
        'current_date': current_date.isoformat(),
        'days_together': days_together,
        'time_to_anniversary': time_to_anniversary,
        'is_anniversary': is_anniversary_date(current_date)
    })

# 错误处理
@app.errorhandler(404)
def not_found_error(error):
    return jsonify({'error': 'Not found', 'status': 'error'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error', 'status': 'error'}), 500

if __name__ == '__main__':
    # 确保static文件夹存在
    if not os.path.exists('static'):
        os.makedirs('static')
    
    # 启动服务器
    logger.info('启动服务器 - 端口: 5001')
    app.run(debug=True, port=5001)
