// 倒计时目标时间
const targetDate = new Date('2025-12-10T00:00:00+08:00');

// 格式化数字，保证两位数显示
function padNumber(num) {
    return num.toString().padStart(2, '0');
}

// 更新倒计时
function updateCountdown() {
    const now = new Date();
    const timeLeft = targetDate - now;
    
    if (timeLeft <= 0) {
        document.querySelector('.countdown-title').textContent = '今天是我们的16周年纪念日！';
        document.querySelector('.countdown-timer').style.display = 'none';
        return;
    }
    
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    
    document.getElementById('days').textContent = padNumber(days);
    document.getElementById('hours').textContent = padNumber(hours);
    document.getElementById('minutes').textContent = padNumber(minutes);
    document.getElementById('seconds').textContent = padNumber(seconds);
}

// 更新当前日期显示
function updateCurrentDate() {
    const now = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const dateStr = now.toLocaleDateString('zh-CN', options);
    document.getElementById('current-date').textContent = dateStr;
}

// 雪花效果
document.addEventListener('DOMContentLoaded', () => {
    const snowToggle = document.querySelector('.snow-toggle button');
    const snowflakes = document.querySelector('.snowflakes');
    let isSnowActive = false;

    if (!snowToggle || !snowflakes) {
        console.error('雪花按钮或雪花容器未找到');
        return;
    }

    snowflakes.style.display = 'none';
    
    snowToggle.addEventListener('click', (event) => {
        isSnowActive = !isSnowActive;
        snowToggle.classList.toggle('active');
        snowflakes.style.display = isSnowActive ? 'block' : 'none';
        event.stopPropagation();
    });
});

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    try {
        // 更新当前日期
        updateCurrentDate();
        
        // 立即更新一次倒计时
        updateCountdown();
        
        // 每秒更新倒计时
        setInterval(updateCountdown, 1000);
        
        // 每分钟更新日期显示
        setInterval(updateCurrentDate, 60000);
    } catch (error) {
        console.error('初始化失败:', error);
    }
});