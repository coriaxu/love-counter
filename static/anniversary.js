// 15周年特效
class AnniversaryEffect {
    constructor() {
        this.daysElement = document.querySelector('.days');
        this.sound = new Audio('/static/chime.mp3');
        this.isAnniversaryTriggered = false;
        
        // 检查是否已过15周年
        this.isAfterAnniversary = document.body.hasAttribute('data-after-anniversary');
        
        // 初始化
        if (!this.isAfterAnniversary) {
            this.init();
        }
    }

    init() {
        // 测试模式：3秒后触发特效
        setTimeout(() => this.triggerAnniversaryEffect(), 3000);
        
        /* 正式代码（测试完后取消注释）
        // 检查是否在目标日期附近
        this.checkAnniversary();
        
        // 每秒检查一次
        setInterval(() => this.checkAnniversary(), 1000);
        */
    }

    checkAnniversary() {
        const now = new Date();
        const beijingOffset = 8 * 60 * 60 * 1000; // 北京时间偏移
        const beijingNow = new Date(now.getTime() + (now.getTimezoneOffset() * 60 * 1000) + beijingOffset);
        
        // 检查是否是2024年12月10日
        if (beijingNow.getFullYear() === 2024 && 
            beijingNow.getMonth() === 11 && // 11 表示12月
            beijingNow.getDate() === 10 && 
            !this.isAnniversaryTriggered) {
            
            this.triggerAnniversaryEffect();
        }
    }

    async triggerAnniversaryEffect() {
        if (this.isAfterAnniversary) return;
        
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
