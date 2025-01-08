from datetime import datetime, timedelta
from flask import Flask, render_template, send_from_directory, jsonify
import pytz
import os
import logging

# 配置日志
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# 创建Flask应用
app = Flask(__name__)

# 设置时区
BEIJING_TZ = pytz.timezone('Asia/Shanghai')

# 重要日期 - 使用datetime.combine确保时间是当天的0点
START_DATE = datetime.combine(
    datetime(2009, 12, 10).date(),
    datetime.min.time(),
    tzinfo=BEIJING_TZ
)

ANNIVERSARY_DATE = datetime.combine(
    datetime(2025, 1, 8).date(),
    datetime.min.time(),
    tzinfo=BEIJING_TZ
)

def get_beijing_time():
    """获取北京时间"""
    return datetime.now(BEIJING_TZ)

def calculate_days(start_date, end_date):
    """计算两个日期之间的天数，只考虑日期部分"""
    # 转换为日期对象，忽略时间部分
    start = start_date.date()
    end = end_date.date()
    return (end - start).days

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
def index():
    try:
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
    except Exception as e:
        logger.error(f'渲染主页时发生错误: {str(e)}')
        return str(e), 500

@app.route('/static/<path:filename>')
def serve_static(filename):
    """提供静态文件服务"""
    return send_from_directory('static', filename)

@app.route('/api/time')
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

if __name__ == '__main__':
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument('--port', type=int, default=4000)
    args = parser.parse_args()
    
    # 确保static文件夹存在
    if not os.path.exists('static'):
        os.makedirs('static')
        logger.info('创建static文件夹')
    
    logger.info(f'启动服务器 - 静态文件目录: static')
    app.run(debug=True, port=args.port)
