from flask import Flask, render_template
from datetime import datetime
from dateutil import parser
import os

app = Flask(__name__)

# 设置恋爱纪念日
LOVE_START_DATE = parser.parse("2009-12-10")

@app.route('/')
def index():
    try:
        # 计算恋爱天数
        today = datetime.now()
        days_together = (today - LOVE_START_DATE).days
        
        # 格式化日期
        start_date_str = LOVE_START_DATE.strftime("%Y年%m月%d日")
        today_str = today.strftime("%Y年%m月%d日")
        
        return render_template('index.html', 
                            days=days_together,
                            start_date=start_date_str,
                            today_date=today_str)
    except Exception as e:
        app.logger.error(f"Error in index route: {str(e)}")
        return render_template('index.html', error=str(e))

if __name__ == '__main__':
    # Get port from environment variable or default to 5001
    port = int(os.environ.get('PORT', 5001))
    # Only use debug mode locally
    debug = os.environ.get('VERCEL_ENV') != 'production'
    app.run(host='0.0.0.0', port=port, debug=debug)
