// 设置恋爱开始的日期和结束日期
const startDate = new Date('2009-12-10T00:00:00');
const endDate = new Date('2025-01-08T00:00:00');
const totalDaysFromStart = 5509;  // 准确计算的总天数

// 更新计数器
function updateCounter() {
    // 显示总天数
    document.getElementById('totalDays').textContent = totalDaysFromStart;
    
    // 计算年月日
    const years = Math.floor(totalDaysFromStart / 365);
    const months = Math.floor((totalDaysFromStart % 365) / 30);
    const days = Math.floor(totalDaysFromStart % 30);

    // 计算当前时分秒（基于当前时间）
    const now = new Date();
    const diff = endDate - now;
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('years').textContent = String(years).padStart(2, '0');
    document.getElementById('months').textContent = String(months).padStart(2, '0');
    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(Math.abs(hours)).padStart(2, '0');
    document.getElementById('minutes').textContent = String(Math.abs(minutes)).padStart(2, '0');
    document.getElementById('seconds').textContent = String(Math.abs(seconds)).padStart(2, '0');
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    setInterval(updateCounter, 1000);
    updateCounter();
});
