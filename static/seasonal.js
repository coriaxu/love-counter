class SeasonalTheme {
    constructor() {
        this.container = document.getElementById('seasonal-container');
        this.body = document.body;
        this.currentSeason = this.getCurrentSeason();
        this.effectsEnabled = true;
        this.particles = [];
        this.maxParticles = 50; // 增加特效数量
        
        this.setupThemeToggle();
        this.init();
    }

    getCurrentSeason() {
        const month = new Date().getMonth() + 1;
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

        setTimeout(() => {
            particle.remove();
            this.particles = this.particles.filter(p => p !== particle);
        }, 15000); // 增加动画持续时间
    }

    createSakura(particle) {
        particle.innerHTML = '🌸';
        particle.style.cssText = `
            font-size: ${20 + Math.random() * 15}px;
            left: ${Math.random() * 100}vw;
            animation: sakuraFall ${10 + Math.random() * 5}s linear;
            opacity: 0.9;
        `;
    }

    createSunshine(particle) {
        particle.innerHTML = '☀️';
        particle.style.cssText = `
            font-size: ${25 + Math.random() * 20}px;
            left: ${Math.random() * 100}vw;
            animation: sunshineFade ${8 + Math.random() * 4}s linear;
            opacity: 0.8;
        `;
    }

    createLeaf(particle) {
        const leaves = ['🍁', '🍂'];
        particle.innerHTML = leaves[Math.floor(Math.random() * leaves.length)];
        particle.style.cssText = `
            font-size: ${20 + Math.random() * 15}px;
            left: ${Math.random() * 100}vw;
            animation: leafFall ${12 + Math.random() * 6}s linear;
            opacity: 0.9;
        `;
    }

    createSnow(particle) {
        particle.innerHTML = '❄️';
        particle.style.cssText = `
            font-size: ${20 + Math.random() * 15}px;
            left: ${Math.random() * 100}vw;
            animation: snowFall ${10 + Math.random() * 5}s linear;
            opacity: 0.9;
        `;
    }

    startSeasonalEffect() {
        if (!this.effectsEnabled) return;
        
        const createParticleWithInterval = () => {
            if (this.effectsEnabled && this.particles.length < this.maxParticles) {
                this.createParticle();
            }
        };

        setInterval(createParticleWithInterval, 200);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new SeasonalTheme();
});
