from flask import Flask, render_template, send_from_directory
from datetime import datetime
import pytz
import os

app = Flask(__name__, 
            static_folder='static',
            static_url_path='/static',
            template_folder='templates')

# 北京时区
BEIJING_TZ = pytz.timezone('Asia/Shanghai')

# 设置恋爱纪念日（北京时间）
LOVE_START_DATE = datetime(2009, 12, 10, tzinfo=BEIJING_TZ)

def get_beijing_time():
    """获取北京时间"""
    return datetime.now(BEIJING_TZ)

def is_anniversary_date(current_date):
    """检查是否是15周年纪念日（基于北京时间）"""
    anniversary = datetime(2024, 12, 10, tzinfo=BEIJING_TZ)
    return current_date.date() == anniversary.date()

@app.route('/')
def index():
    try:
        # 获取当前北京时间
        current_date = get_beijing_time()
        
        # 如果是15周年纪念日，使用固定日期
        if is_anniversary_date(current_date):
            display_date = datetime(2024, 12, 10, tzinfo=BEIJING_TZ)
        else:
            display_date = current_date
        
        # 计算天数（使用日期部分进行计算）
        days = (display_date.date() - LOVE_START_DATE.date()).days
        
        # 格式化日期显示
        start_date_str = LOVE_START_DATE.strftime("%Y年%m月%d日")
        today_date_str = display_date.strftime("%Y年%m月%d日")
        
        return render_template('index.html', 
                            days=days,
                            start_date=start_date_str,
                            today_date=today_date_str)
                            
    except Exception as e:
        app.logger.error(f"Error in index route: {str(e)}")
        return str(e), 500

@app.route('/static/<path:filename>')
def serve_static(filename):
    return send_from_directory(app.static_folder, filename)

if __name__ == '__main__':
    app.run(debug=True, port=os.getenv('PORT', 5000))
