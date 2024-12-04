// 15周年特效
class AnniversaryEffect {
    constructor() {
        this.daysElement = document.querySelector('.days');
        this.sound = new Audio('/static/chime.mp3');
        this.isAnniversaryTriggered = false;
        this.targetDate = new Date('2024-12-10T00:00:00+08:00');
        
        // 初始化
        this.init();
    }

    init() {
        // 检查是否在目标日期附近
        this.checkAnniversary();
        
        // 每秒检查一次
        setInterval(() => this.checkAnniversary(), 1000);
    }

    checkAnniversary() {
        const now = new Date();
        const beijingOffset = 8 * 60 * 60 * 1000; // 北京时间偏移
        const beijingNow = new Date(now.getTime() + (now.getTimezoneOffset() * 60 * 1000) + beijingOffset);
        
        // 检查是否是2024年12月10日凌晨
        if (beijingNow.getFullYear() === 2024 && 
            beijingNow.getMonth() === 11 && // 11 表示12月
            beijingNow.getDate() === 10 && 
            beijingNow.getHours() === 0 && 
            beijingNow.getMinutes() === 0 && 
            !this.isAnniversaryTriggered) {
            
            this.triggerAnniversaryEffect();
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
            this.createParticles();
            this.daysElement.classList.add('glowing');
        }, 400);
        
        // 动画结束后移除翻转类
        setTimeout(() => {
            this.daysElement.classList.remove('flipping');
        }, 800);
    }

    createParticles() {
        const particleCount = 20;
        const container = document.querySelector('.love-counter');
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            container.appendChild(particle);
            
            const size = Math.random() * 8 + 4;
            const angle = (Math.random() * 360) * (Math.PI / 180);
            const velocity = Math.random() * 100 + 50;
            const startX = this.daysElement.offsetLeft + this.daysElement.offsetWidth / 2;
            const startY = this.daysElement.offsetTop + this.daysElement.offsetHeight / 2;
            
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.left = startX + 'px';
            particle.style.top = startY + 'px';
            
            // 设置动画
            particle.animate([
                {
                    transform: `translate(0, 0) scale(1)`,
                    opacity: 1
                },
                {
                    transform: `translate(${Math.cos(angle) * velocity}px, ${Math.sin(angle) * velocity}px) scale(0)`,
                    opacity: 0
                }
            ], {
                duration: 1000,
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
                fill: 'forwards'
            });
            
            // 动画结束后移除粒子
            setTimeout(() => particle.remove(), 1000);
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
