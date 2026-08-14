# Yeximiao.github.io

喵の窝 —— 夜袭喵的个人空间（个人主页 / 个人网站）。

## 技术栈

- [Vite](https://vitejs.dev/) + [TypeScript](https://www.typescriptlang.org/) 构建
- [GSAP](https://gsap.com/) 动画
- [GitHub Pages](https://pages.github.com/) 托管（构建产物为纯静态）

## 本地开发

```bash
npm install     # 安装依赖
npm run dev     # 启动开发服务器（默认 http://localhost:5173）
npm run build   # 类型检查 + 生产构建，产物输出到 dist/
npm run preview # 本地预览构建产物
```

## 目录结构

```
├── index.html              # 入口页面
├── src/
│   ├── main.ts             # 入口模块
│   ├── style.css           # 全局样式
│   └── modules/            # 功能模块（星空/打字机/滚动/导航/背景模式/时钟/图标/动画）
├── public/                 # 静态资源（原样拷贝到构建产物）
│   ├── images/             # 头像、背景图、favicon
│   ├── pages/              # 工具页（开镜灵敏度计算器、赛制计算器）
│   └── mottos.txt          # 座右铭（打字机效果数据源）
├── .github/workflows/      # GitHub Pages 自动部署
└── vite.config.ts          # Vite 配置
```

## 部署

推送到 `main` 分支后由 GitHub Actions 自动构建并部署。
首次使用需在仓库 **Settings → Pages → Source** 选择 **"GitHub Actions"**。

## 当前状态与 Roadmap

- **当前**（2026-08-14）：Vite+TS+GSAP 架构已迁移完成，UI 三变体原型（A 深空极简 / B 赛博霓虹 / C 暗色杂志）已产出，待选定方向。
- **下一步**：选定 UI 方向并打磨；内容更新（联系方式、社交媒体入口、VTB 身份页）。
- **规划中**：与「全网独一无二数字身份」目标对齐的功能（见 MyMemories `项目/个人主页` 档案）。
