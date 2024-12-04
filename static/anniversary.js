// 15周年特效
class AnniversaryEffect {
    constructor() {
        this.daysElement = document.querySelector('.days');
        this.sound = new Audio('/static/chime.mp3');
        this.isAnniversaryTriggered = false;
        this.targetDate = new Date('2024-12-10T00:00:00+08:00');
        this.endDate = new Date('2024-12-11T00:00:00+08:00');
        
        // 初始化
        this.init();
    }

    init() {
        /* 测试模式（暂时注释掉）
        setTimeout(() => this.triggerAnniversaryEffect(), 3000);
        */
        
        // 正式代码
        // 检查是否在目标日期范围内
        this.checkAnniversary();
        
        // 每秒检查一次
        setInterval(() => this.checkAnniversary(), 1000);
    }

    checkAnniversary() {
        const now = new Date();
        const beijingOffset = 8 * 60 * 60 * 1000; // 北京时间偏移
        const beijingNow = new Date(now.getTime() + (now.getTimezoneOffset() * 60 * 1000) + beijingOffset);
        
        // 严格检查是否是2024年12月10日
        const isAnniversaryDay = (
            beijingNow.getFullYear() === 2024 &&
            beijingNow.getMonth() === 11 && // 11 表示12月
            beijingNow.getDate() === 10
        );
        
        // 只在15周年当天显示特效
        if (isAnniversaryDay && !this.isAnniversaryTriggered) {
            this.triggerAnniversaryEffect();
        } else if (!isAnniversaryDay) {
            this.removeAnniversaryEffect();
        }
    }

    async triggerAnniversaryEffect() {
        this.isAnniversaryTriggered = true;
        
        // 添加周年样式
        this.daysElement.classList.add('anniversary');
        
        // 等待一小段时间后开始动画
        await this.sleep(500);
        
        // 播放音效
        this.playSound();
        
        // 开始翻转动画
        this.daysElement.classList.add('flipping');
        
        // 更新数字
        setTimeout(() => {
            this.daysElement.textContent = '5478';
            this.daysElement.classList.add('glowing');
            this.showAnniversaryMessage();
        }, 400);
        
        // 动画结束后移除翻转类
        setTimeout(() => {
            this.daysElement.classList.remove('flipping');
        }, 800);
    }

    removeAnniversaryEffect() {
        // 移除所有特效相关的类
        this.daysElement.classList.remove('anniversary', 'glowing');
        
        // 移除祝福消息
        const message = document.querySelector('.anniversary-message');
        if (message) {
            message.remove();
        }
        
        // 恢复倒计时区域
        const countdownElement = document.querySelector('.anniversary-countdown');
        if (countdownElement) {
            countdownElement.innerHTML = `
                <div class="countdown-glass">
                    <h2>距离我们的15周年纪念日还有</h2>
                    <div class="countdown-timer">
                        <div class="countdown-item">
                            <span class="countdown-value" id="countdown-days">--</span>
                            <span class="countdown-label">天</span>
                        </div>
                        <div class="countdown-item">
                            <span class="countdown-value" id="countdown-hours">--</span>
                            <span class="countdown-label">时</span>
                        </div>
                        <div class="countdown-item">
                            <span class="countdown-value" id="countdown-minutes">--</span>
                            <span class="countdown-label">分</span>
                        </div>
                        <div class="countdown-item">
                            <span class="countdown-value" id="countdown-seconds">--</span>
                            <span class="countdown-label">秒</span>
                        </div>
                    </div>
                </div>
            `;
            this.startCountdown(); // 重新启动倒计时
        }
    }

    startCountdown() {
        const targetDate = new Date('2024-12-10T00:00:00+08:00');
        
        const updateCountdown = () => {
            const now = new Date();
            const beijingOffset = 8 * 60 * 60 * 1000;
            const beijingNow = new Date(now.getTime() + (now.getTimezoneOffset() * 60 * 1000) + beijingOffset);
            
            const timeLeft = targetDate - beijingNow;
            
            if (timeLeft <= 0) {
                document.getElementById('countdown-days').textContent = '0';
                document.getElementById('countdown-hours').textContent = '0';
                document.getElementById('countdown-minutes').textContent = '0';
                document.getElementById('countdown-seconds').textContent = '0';
                return;
            }
            
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            
            document.getElementById('countdown-days').textContent = days;
            document.getElementById('countdown-hours').textContent = hours;
            document.getElementById('countdown-minutes').textContent = minutes;
            document.getElementById('countdown-seconds').textContent = seconds;
        };
        
        // 立即更新一次
        updateCountdown();
        
        // 每秒更新一次
        setInterval(updateCountdown, 1000);
    }

    showAnniversaryMessage() {
        // 移除倒计时区块
        const countdownElement = document.querySelector('.anniversary-countdown');
        if (countdownElement) {
            countdownElement.innerHTML = '<div class="anniversary-message">恋爱 15 周年快乐！</div>';
            setTimeout(() => {
                document.querySelector('.anniversary-message').classList.add('show');
            }, 100);
        }
    }

    playSound() {
        // 尝试播放音效
        this.sound.play().catch(error => {
            console.log('Auto-play prevented:', error);
        });
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// 当页面加载完成后初始化特效
document.addEventListener('DOMContentLoaded', () => {
    new AnniversaryEffect();
});
