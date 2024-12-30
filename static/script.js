// 恋爱开始日期
const startDate = new Date('2009-12-10T00:00:00'); // 2009年12月10日
const totalDaysFromStart = 5499;  // 手动计算的总天数

// 更新计时器
function updateCounter() {
    const now = new Date();
    const diff = now - startDate;
    
    // 显示总天数
    document.getElementById('totalDays').textContent = totalDaysFromStart;
    
    // 计算当前时分秒
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    // 计算年月日
    const years = Math.floor(totalDaysFromStart / 365);
    const months = Math.floor((totalDaysFromStart % 365) / 30);
    const days = Math.floor(totalDaysFromStart % 30);

    document.getElementById('years').textContent = String(years).padStart(2, '0');
    document.getElementById('months').textContent = String(months).padStart(2, '0');
    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

// 背景动画
class Background {
    constructor() {
        this.canvas = document.getElementById('bgCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.resize();
        this.init();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    init() {
        this.particles = [];
        for (let i = 0; i < 50; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2 + 1,
                speedX: Math.random() * 2 - 1,
                speedY: Math.random() * 2 - 1
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            if (particle.x < 0 || particle.x > this.canvas.width) particle.speedX *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.speedY *= -1;

            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = 'rgba(255, 182, 193, 0.5)';
            this.ctx.fill();
        });

        requestAnimationFrame(() => this.animate());
    }
}

// 爱心动画
class Hearts {
    constructor() {
        this.canvas = document.getElementById('heartCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.resize();
        this.hearts = [];
        window.addEventListener('resize', () => this.resize());
        document.addEventListener('click', (e) => this.addHeart(e.clientX, e.clientY));
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    addHeart(x, y) {
        const heart = {
            x,
            y,
            size: 20,
            opacity: 1,
            speed: 2
        };
        this.hearts.push(heart);
    }

    drawHeart(x, y, size, opacity) {
        this.ctx.save();
        this.ctx.translate(x, y);
        this.ctx.scale(size, size);
        this.ctx.beginPath();
        this.ctx.moveTo(0, 0);
        this.ctx.bezierCurveTo(-2, -2, -2, -1, 0, 1);
        this.ctx.bezierCurveTo(2, -1, 2, -2, 0, 0);
        this.ctx.fillStyle = `rgba(255, 105, 180, ${opacity})`;
        this.ctx.fill();
        this.ctx.restore();
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        for (let i = this.hearts.length - 1; i >= 0; i--) {
            const heart = this.hearts[i];
            heart.y -= heart.speed;
            heart.opacity -= 0.01;
            
            if (heart.opacity <= 0) {
                this.hearts.splice(i, 1);
                continue;
            }
            
            this.drawHeart(heart.x, heart.y, heart.size / 10, heart.opacity);
        }
        
        requestAnimationFrame(() => this.animate());
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    setInterval(updateCounter, 1000);
    updateCounter();

    const background = new Background();
    const hearts = new Hearts();
    
    background.animate();
    hearts.animate();
});

