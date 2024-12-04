from flask import Flask, render_template, send_from_directory
from datetime import datetime, date
import os
import pytz

app = Flask(__name__, 
            static_folder='static',
            static_url_path='/static')

# 设置恋爱纪念日
LOVE_START_DATE = datetime(2009, 12, 10, tzinfo=pytz.timezone('Asia/Shanghai'))

def is_anniversary_date(current_date):
    """检查是否是15周年纪念日"""
    anniversary = datetime(2024, 12, 10, tzinfo=pytz.timezone('Asia/Shanghai'))
    return current_date.date() == anniversary.date()

@app.route('/')
def index():
    try:
        # 使用北京时间
        tz = pytz.timezone('Asia/Shanghai')
        start_date = LOVE_START_DATE
        current_date = datetime.now(tz)
        
        # 如果是15周年纪念日，使用固定日期
        if is_anniversary_date(current_date):
            display_date = datetime(2024, 12, 10, tzinfo=tz)
        else:
            display_date = current_date
        
        # 计算天数
        days = (display_date.date() - start_date.date()).days
        
        # 格式化日期显示
        start_date_str = start_date.strftime("%Y年%m月%d日")
        today_date_str = display_date.strftime("%Y年%m月%d日")
        
        return render_template('index.html', 
                            days=days,
                            start_date=start_date_str,
                            today_date=today_date_str)
    except Exception as e:
        app.logger.error(f"Error in index route: {str(e)}")
        return render_template('index.html', error=str(e))

@app.route('/static/<path:path>')
def serve_static(path):
    return send_from_directory('static', path)

if __name__ == '__main__':
    # Get port from environment variable or default to 5001
    port = int(os.environ.get('PORT', 5001))
    # Only use debug mode locally
    debug = os.environ.get('VERCEL_ENV') != 'production'
    app.run(host='0.0.0.0', port=port, debug=debug)
