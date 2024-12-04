// 15周年纪念日倒计时
const TARGET_DATE = new Date('2024-12-10T00:00:00+08:00'); // 使用北京时间

// 获取倒计时元素
const daysElement = document.getElementById('countdown-days');
const hoursElement = document.getElementById('countdown-hours');
const minutesElement = document.getElementById('countdown-minutes');
const secondsElement = document.getElementById('countdown-seconds');

// 存储上一次的值，用于优化更新
let lastDays, lastHours, lastMinutes, lastSeconds;

// 添加数字更新动画
function addUpdateAnimation(element) {
    element.classList.add('updating');
    setTimeout(() => element.classList.remove('updating'), 300);
}

// 计算倒计时
function calculateTimeLeft() {
    const now = new Date();
    const difference = TARGET_DATE - now;

    if (difference <= 0) {
        // 已经到达或超过目标日期
        return {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            completed: true
        };
    }

    return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
        completed: false
    };
}

// 更新倒计时显示
function updateCountdown() {
    const timeLeft = calculateTimeLeft();

    // 只在值变化时更新DOM并添加动画
    if (timeLeft.days !== lastDays) {
        daysElement.textContent = String(timeLeft.days).padStart(2, '0');
        addUpdateAnimation(daysElement);
        lastDays = timeLeft.days;
    }
    if (timeLeft.hours !== lastHours) {
        hoursElement.textContent = String(timeLeft.hours).padStart(2, '0');
        addUpdateAnimation(hoursElement);
        lastHours = timeLeft.hours;
    }
    if (timeLeft.minutes !== lastMinutes) {
        minutesElement.textContent = String(timeLeft.minutes).padStart(2, '0');
        addUpdateAnimation(minutesElement);
        lastMinutes = timeLeft.minutes;
    }
    if (timeLeft.seconds !== lastSeconds) {
        secondsElement.textContent = String(timeLeft.seconds).padStart(2, '0');
        addUpdateAnimation(secondsElement);
        lastSeconds = timeLeft.seconds;
    }

    if (!timeLeft.completed) {
        requestAnimationFrame(updateCountdown);
    } else {
        // 到达目标日期时的特殊效果
        celebrateAnniversary();
    }
}

// 庆祝动画效果
function celebrateAnniversary() {
    const countdownGlass = document.querySelector('.countdown-glass');
    countdownGlass.style.background = 'rgba(255, 215, 0, 0.2)'; // 金色背景
    countdownGlass.innerHTML = `
        <h2 style="color: #FFD700; font-size: 2rem;">🎉 Happy 15th Anniversary! 🎉</h2>
        <p style="text-align: center; margin-top: 1rem; color: #333;">
            十五年的爱情长跑，感谢一路相伴！❤️
        </p>
    `;
}

// 启动倒计时
updateCountdown();
