// 设置恋爱开始的日期和结束日期（使用北京时间 UTC+8）
const startDate = new Date('2009-12-10T00:00:00+08:00');
const endDate = new Date('2025-01-08T00:00:00+08:00');

// 缓存DOM元素
const elements = {
    days: document.getElementById('days'),
    hours: document.getElementById('hours'),
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds'),
    currentDate: document.getElementById('current-date'),
    totalDays: document.querySelector('.days')
};

// 格式化数字，保持两位数
function formatNumber(number) {
    return String(Math.abs(number)).padStart(2, '0');
}

// 防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 平滑更新数字
function smoothUpdateNumber(element, newValue) {
    if (!element) return;
    const currentValue = parseInt(element.textContent);
    if (currentValue === newValue) return;

    // 使用 requestAnimationFrame 进行动画
    requestAnimationFrame(() => {
        element.classList.add('updating');
        element.textContent = formatNumber(newValue);

        // 移除过渡效果的类
        const removeUpdateClass = () => {
            element.classList.remove('updating');
            element.removeEventListener('animationend', removeUpdateClass);
        };
        element.addEventListener('animationend', removeUpdateClass);
    });
}

// 格式化中文日期
function formatChineseDate(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}年${month}月${day}日`;
}

// 更新计数器
const updateCounter = debounce(async () => {
    try {
        // 从服务器获取时间信息
        const response = await fetch('/api/time');
        const data = await response.json();

        if (!data) return;

        // 更新总天数
        if (elements.totalDays) {
            elements.totalDays.textContent = data.days_together;
        }

        // 更新倒计时
        const timeToAnniversary = data.time_to_anniversary;
        smoothUpdateNumber(elements.days, timeToAnniversary.days);
        smoothUpdateNumber(elements.hours, timeToAnniversary.hours);
        smoothUpdateNumber(elements.minutes, timeToAnniversary.minutes);
        smoothUpdateNumber(elements.seconds, timeToAnniversary.seconds);

        // 更新当前日期
        if (elements.currentDate) {
            elements.currentDate.textContent = formatChineseDate(new Date());
        }

    } catch (error) {
        console.error('Failed to update time:', error);
    }
}, 50);

// 添加页面加载动画
function addLoadingAnimation() {
    document.body.classList.add('loading');

    // 使用 requestAnimationFrame 确保动画流畅
    requestAnimationFrame(() => {
        document.body.classList.remove('loading');
        document.body.classList.add('loaded');
    });
}

// 雪花效果
function createSnowflakes() {
    const snowflakesContainer = document.createElement('div');
    snowflakesContainer.classList.add('snowflakes-container');
    document.body.appendChild(snowflakesContainer);

    const numberOfSnowflakes = 50; // 雪花数量

    for (let i = 0; i < numberOfSnowflakes; i++) {
        createSnowflake(snowflakesContainer);
    }
}

function createSnowflake(snowflakesContainer) {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');

    // 给自定义属性随机赋值
    const randomX = Math.random();  // 0 ~ 1
    const randomY = Math.random();
    const randomScale = Math.random() * 0.5 + 0.5; // 0.5 ~ 1
    const randomDuration = Math.random() * 5 + 5;  // 5 ~ 10
    const randomDelay = Math.random() * 5;         // 0 ~ 5

    // 把这些值塞给自定义属性
    snowflake.style.setProperty('--random-x', randomX);
    snowflake.style.setProperty('--random-y', randomY);
    snowflake.style.setProperty('--random-scale', randomScale);
    snowflake.style.setProperty('--random-duration', randomDuration);
    snowflake.style.setProperty('--random-delay', randomDelay);

    // 设置雪花文本为 emoji 表情
    snowflake.textContent = '❄️';

    snowflakesContainer.appendChild(snowflake);

    // 雪花飘落到底部后重新设置位置和速度
    snowflake.addEventListener('animationend', () => {
        const newXPos = Math.random();
        const newYPos = Math.random();
        const newScale = Math.random() * 0.5 + 0.5; // 随机缩放
        const newSpeed = 5 + Math.random() * 10;

        snowflake.style.setProperty('--random-x', newXPos);
        snowflake.style.setProperty('--random-y', newYPos);
        snowflake.style.setProperty('--random-scale', newScale);
        snowflake.style.setProperty('--random-duration', newSpeed);
        snowflake.style.setProperty('--random-delay', 0);
    });
}

// 性能优化：使用 requestAnimationFrame
let animationFrameId = null;
let lastUpdate = 0;

function startCounter() {
    const updateLoop = (timestamp) => {
        if (!lastUpdate || timestamp - lastUpdate >= 1000) {
            updateCounter();
            lastUpdate = timestamp;
        }
        animationFrameId = requestAnimationFrame(updateLoop);
    };
    animationFrameId = requestAnimationFrame(updateLoop);
}

function stopCounter() {
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
    }
}

// 页面可见性变化时的处理
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        stopCounter();
    } else {
        startCounter();
    }
});

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    // 确保所有DOM元素都已加载
    for (const key in elements) {
        if (!elements[key]) {
            console.warn(`Element ${key} not found`);
        }
    }

    addLoadingAnimation();
    startCounter();
    createSnowflakes(); // 创建雪花
});