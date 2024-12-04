// 实时更新天数和日期
function updateCounter() {
    const startDate = new Date('2009-12-10');
    const today = new Date();
    
    // 更新天数
    const days = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
    document.getElementById('days').textContent = days;
    
    // 更新今天的日期
    const todayStr = today.getFullYear() + '年' + 
                     (today.getMonth() + 1) + '月' + 
                     today.getDate() + '日';
    document.getElementById('today-date').textContent = todayStr;
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
    updateCounter();
    // 每秒更新一次
    setInterval(updateCounter, 1000);
});
