# CHANGELOG

> 修改因果链（交接日志）。每个 agent 会话收工时在**顶部**追加一条：日期、改动内容、为什么改。
> 纪律见 `general/docs/多agent协作体系规范.md` 第五章。

## 2026-08-29

- **改动**：修复线上无 CSS 效果问题——将 GitHub Pages 部署模式由 `legacy`（直接发布 main 分支 root 源码）改为 `workflow`（由 `.github/workflows/deploy.yml` 构建 `dist/` 后再发布），并触发一次 Actions 完成构建部署。
- **为什么**：重构迁移到 Vite 后，Pages 仍停留在 legacy 模式，导致线上发布的是未构建的源码（`index.html` 无构建后的 CSS 引用、`/assets` 404、favicon 也 404），页面完全没有 CSS 效果。切换后线上正常加载 `/assets/index-*.css`、`/assets/index-*.js` 与 `/images/favicon.ico`。
- **注意**：Pages 配置不在仓库内、由仓库 Settings 控制；若日后迁移框架或改构建方式，务必确认 Pages Source 为「GitHub Actions」而非「Deploy from a branch」。

## 2026-08-14

- **改动**：项目纳入多 agent 协作体系——新增 CHANGELOG、docs/adr/0001（多 agent 协作存储结构）、AGENTS.md（交接协议与 commit 纪律）；README 补「当前状态与 Roadmap」。
- **为什么**：切换 AI 工具不再拷贝项目——本目录即唯一事实源，git 远程 + 串行交接协议汇合修改，每一步修改有因果链。
