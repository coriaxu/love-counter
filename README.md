# Love Counter 自用恋爱计日器 ❤️

自用恋爱计日网站，采用玫瑰金设计风格。
An elegant anniversary countdown website with a rose gold design theme.

## 特色功能 Features ✨

- 💝 精美的玫瑰金主题设计 / Beautiful rose gold theme design
- ⏰ 精确的纪念日倒计时 / Precise anniversary countdown
- 🌟 优雅的星光动画效果 / Elegant starlight animation effects
- 🎨 玻璃态设计风格 / Glass morphism design style
- 📱 完美支持移动端 / Mobile-friendly responsive design

## 技术栈 Tech Stack 🛠️

- **后端 Backend**: Python Flask
- **前端 Frontend**: HTML5, CSS3, JavaScript
- **设计风格 Design**: 
  - 玫瑰金主题 / Rose gold theme
  - 玻璃态设计 / Glass morphism
  - 响应式布局 / Responsive layout

## 项目结构 Project Structure 📁

```
love-counter/
├── api/
│   └── app.py          # Flask应用主文件
├── static/
│   ├── style.css       # 样式文件
│   └── script.js       # JavaScript文件
├── templates/
│   └── index.html      # 主页模板
├── vercel.json         # Vercel配置文件
└── requirements.txt    # Python依赖
```

## 本地运行 Local Development 🚀

1. 克隆项目 / Clone the repository
```bash
git clone https://github.com/coriaxu/love-counter.git
cd love-counter
```

2. 安装依赖 / Install dependencies
```bash
pip install -r requirements.txt
```

3. 运行项目 / Run the project
```bash
python api/app.py
```

4. 访问网站 / Visit the website
```
http://localhost:5000
```

## 部署 Deployment 🌐

本项目使用 Vercel 平台部署。以下是一些重要的部署注意事项：

### Vercel 配置要点

1. **项目结构**
   - Flask应用需放在 `api` 目录下
   - 静态文件保持在根目录的 `static` 文件夹中
   - 模板文件保持在根目录的 `templates` 文件夹中

2. **vercel.json 配置**
   - 需要正确配置静态文件处理
   - 路由配置要考虑静态文件和应用路由
   ```json
   {
     "builds": [
       { "src": "api/app.py", "use": "@vercel/python" },
       { "src": "static/**", "use": "@vercel/static" }
     ]
   }
   ```

3. **常见问题处理**
   - 静态文件404：检查路由配置
   - 模板找不到：确认模板目录配置
   - 缓存问题：可能需要清除浏览器缓存

### 设计预览 Design Preview 🎨

### 颜色主题 Color Theme
- 主色调 Primary: #B76E79 (玫瑰金 Rose Gold)
- 次要色 Secondary: #C88691 (浅玫瑰金 Light Rose Gold)
- 背景 Background: 玫瑰金到奶油色的渐变 (Gradient from rose gold to cream)

## 开发者 Developer 👩‍💻

- [@coriaxu](https://github.com/coriaxu)

## 许可证 License 📄

MIT License
