class SeasonalTheme {
    constructor() {
        this.container = document.getElementById('seasonal-container');
        this.body = document.body;
        this.currentSeason = this.getCurrentSeason();
        this.effectsEnabled = true;
        this.particles = [];
        this.maxParticles = 30;
        
        this.setupThemeToggle();
        this.init();
    }

    getCurrentSeason() {
        const month = new Date().getMonth() + 1; // getMonth() returns 0-11
        if (month >= 3 && month <= 5) return 'spring';
        if (month >= 6 && month <= 8) return 'summer';
        if (month >= 9 && month <= 11) return 'autumn';
        return 'winter';
    }

    init() {
        this.body.className = this.currentSeason;
        this.startSeasonalEffect();
    }

    setupThemeToggle() {
        const toggle = document.createElement('button');
        toggle.className = 'theme-toggle';
        toggle.textContent = '关闭特效';
        toggle.onclick = () => this.toggleEffects();
        document.body.appendChild(toggle);
    }

    toggleEffects() {
        this.effectsEnabled = !this.effectsEnabled;
        const toggle = document.querySelector('.theme-toggle');
        toggle.textContent = this.effectsEnabled ? '关闭特效' : '开启特效';
        
        if (!this.effectsEnabled) {
            this.clearParticles();
        } else {
            this.startSeasonalEffect();
        }
    }

    clearParticles() {
        this.particles.forEach(particle => particle.remove());
        this.particles = [];
    }

    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // 根据季节设置不同的特效样式
        switch(this.currentSeason) {
            case 'spring':
                this.createSakura(particle);
                break;
            case 'summer':
                this.createSunshine(particle);
                break;
            case 'autumn':
                this.createLeaf(particle);
                break;
            case 'winter':
                this.createSnow(particle);
                break;
        }

        this.container.appendChild(particle);
        this.particles.push(particle);

        // 移除超出视图的粒子
        setTimeout(() => {
            particle.remove();
            this.particles = this.particles.filter(p => p !== particle);
        }, 10000);
    }

    createSakura(particle) {
        particle.style.cssText = `
            width: 15px;
            height: 15px;
            background: pink;
            border-radius: 15px 0;
            transform: rotate(${Math.random() * 360}deg);
            left: ${Math.random() * 100}vw;
            animation: sakuraFall 10s linear;
        `;
    }

    createSunshine(particle) {
        particle.style.cssText = `
            width: 20px;
            height: 20px;
            background: rgba(255, 255, 190, 0.6);
            border-radius: 50%;
            left: ${Math.random() * 100}vw;
            animation: sunshineFade 8s linear;
        `;
    }

    createLeaf(particle) {
        particle.style.cssText = `
            width: 15px;
            height: 15px;
            background: #d35400;
            clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
            left: ${Math.random() * 100}vw;
            animation: leafFall 15s linear;
        `;
    }

    createSnow(particle) {
        particle.style.cssText = `
            width: 8px;
            height: 8px;
            background: white;
            border-radius: 50%;
            left: ${Math.random() * 100}vw;
            animation: snowFall 12s linear;
        `;
    }

    startSeasonalEffect() {
        if (!this.effectsEnabled) return;
        
        const createParticleWithInterval = () => {
            if (this.effectsEnabled && this.particles.length < this.maxParticles) {
                this.createParticle();
            }
        };

        // 每200ms创建一个新粒子
        setInterval(createParticleWithInterval, 200);
    }
}

// 页面加载完成后初始化季节主题
document.addEventListener('DOMContentLoaded', () => {
    new SeasonalTheme();
});
