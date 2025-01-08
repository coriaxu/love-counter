// 设置恋爱开始的日期和结束日期
const startDate = new Date('2009-12-10T00:00:00');
const endDate = new Date('2025-01-08T00:00:00');

// 更新计数器
function updateCounter() {
    // 获取后端传递的总天数
    const totalDaysElement = document.querySelector('.days');
    const totalDays = parseInt(totalDaysElement.textContent);
    
    // 计算当前时分秒（基于当前时间）
    const now = new Date();
    const diff = endDate - now;
    
    // 计算剩余时间
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    // 更新倒计时显示
    document.getElementById('days').textContent = String(Math.abs(days)).padStart(2, '0');
    document.getElementById('hours').textContent = String(Math.abs(hours)).padStart(2, '0');
    document.getElementById('minutes').textContent = String(Math.abs(minutes)).padStart(2, '0');
    document.getElementById('seconds').textContent = String(Math.abs(seconds)).padStart(2, '0');
    
    // 更新当前日期
    const currentDate = new Date();
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('current-date').textContent = currentDate.toLocaleDateString('zh-CN', dateOptions);
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    setInterval(updateCounter, 1000);
    updateCounter();
});
