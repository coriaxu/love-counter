// 设置时区为北京时间
const timezone = 'Asia/Shanghai';

// 重要日期
const startDate = new Date('2009-12-10T00:00:00');
const anniversaryDate = new Date('2024-12-10T00:00:00');

// 格式化数字，保证两位数显示
function padNumber(num) {
    return num.toString().padStart(2, '0');
}

// 计算相差的天数
function calculateDays(date1, date2) {
    const oneDay = 24 * 60 * 60 * 1000; // 毫秒/天
    const diffTime = Math.abs(date2 - date1);
    return Math.floor(diffTime / oneDay);
}

// 更新当前日期显示
function updateCurrentDate() {
    const now = new Date();
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: timezone
    };
    const dateStr = now.toLocaleDateString('zh-CN', options);
    document.getElementById('current-date').textContent = dateStr;
}

// 更新在一起的天数
function updateDaysTogether() {
    const now = new Date();
    const days = calculateDays(startDate, now);
    document.querySelector('.days').textContent = days;
}

// 更新倒计时
function updateCountdown() {
    const now = new Date();
    const diff = anniversaryDate - now;

    if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = padNumber(days);
        document.getElementById('hours').textContent = padNumber(hours);
        document.getElementById('minutes').textContent = padNumber(minutes);
        document.getElementById('seconds').textContent = padNumber(seconds);
    } else {
        // 如果已经到达纪念日
        document.querySelector('.countdown-title').textContent = '今天是我们的15周年纪念日！';
        document.querySelector('.countdown-timer').style.display = 'none';
    }
}

// 雪花效果
document.addEventListener('DOMContentLoaded', () => {
    const snowToggle = document.querySelector('.snow-toggle button');
    const snowflakes = document.querySelector('.snowflakes');
    let isSnowActive = false;

    if (!snowToggle || !snowflakes) {
        console.error('雪花按钮或雪花容器未找到:', {
            snowToggle: !!snowToggle,
            snowflakes: !!snowflakes
        });
        return;
    }

    console.log('雪花组件初始化成功');

    // 初始化雪花状态
    snowflakes.style.display = 'none';
    
    snowToggle.addEventListener('click', (event) => {
        console.log('雪花按钮被点击');
        isSnowActive = !isSnowActive;
        console.log('雪花状态:', isSnowActive);
        snowToggle.classList.toggle('active');
        snowflakes.style.display = isSnowActive ? 'block' : 'none';
        event.stopPropagation(); // 防止事件冒泡
    });
});

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    try {
        // 初始更新
        updateCurrentDate();
        updateDaysTogether();
        updateCountdown();

        // 设置定时更新
        setInterval(updateCurrentDate, 60000); // 每分钟更新当前日期
        setInterval(updateDaysTogether, 60000); // 每分钟更新在一起的天数
        setInterval(updateCountdown, 1000); // 每秒更新倒计时
    } catch (error) {
        console.error('初始化失败:', error);
    }

    // 检查是否是纪念日模式
    const body = document.body;
    const isAnniversary = body.classList.contains('anniversary-mode');
    if (isAnniversary) {
        // 延迟2秒让倒计时慢慢淡出
        setTimeout(() => {
            const countdownTitle = document.querySelector('.countdown-title');
            const countdownTimer = document.querySelector('.countdown-timer');
            countdownTimer.style.transition = 'opacity 2s ease';
            countdownTimer.style.opacity = '0';
            
            // 2秒后替换为祝福语
            setTimeout(() => {
                countdownTitle.textContent = '十五年风雨同舟，未来继续相守';
                countdownTimer.style.display = 'none';
            }, 2000);
        }, 1000);
    }
});
