// 15周年特效
class AnniversaryEffect {
    constructor() {
        this.daysElement = document.querySelector('.days');
        this.sound = new Audio('/static/chime.mp3');
        this.isAnniversaryTriggered = false;
        this.anniversaryDate = new Date('2024-12-10T00:00:00+08:00');
        
        // 初始化
        this.init();
    }

    init() {
        // 测试模式：3秒后触发特效
        setTimeout(() => this.checkAndTriggerEffect(), 3000);
        
        /* 正式代码（测试完后取消注释）
        // 检查是否在目标日期附近
        this.checkAndTriggerEffect();
        
        // 每秒检查一次
        setInterval(() => this.checkAndTriggerEffect(), 1000);
        */
    }

    checkAndTriggerEffect() {
        const now = new Date();
        const beijingOffset = 8 * 60 * 60 * 1000; // 北京时间偏移
        const beijingNow = new Date(now.getTime() + (now.getTimezoneOffset() * 60 * 1000) + beijingOffset);
        
        // 检查是否是2024年12月10日
        if (this.isAnniversaryDate(beijingNow)) {
            if (!this.isAnniversaryTriggered) {
                this.triggerAnniversaryEffect();
            }
        } else if (beijingNow > this.anniversaryDate) {
            // 如果已经过了纪念日，恢复正常显示
            this.resetToNormal();
        }
    }

    isAnniversaryDate(date) {
        return date.getFullYear() === 2024 && 
               date.getMonth() === 11 && // 11 表示12月
               date.getDate() === 10;
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

    resetToNormal() {
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
            countdownElement.innerHTML = '<div class="countdown-text">距离下一个纪念日还有</div>';
        }
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
