# yeximiao.github.io 协作约定

> 所有 AI 工具会话开工自动继承。完整规则见 `general/docs/多agent协作体系规范.md`。

## 串行交接协议

同一时刻只有一个 agent 修改本项目。

- **开工**：`git pull` → 读本 README → 读 `CHANGELOG.md` 最近条目 → 读 MyMemories `项目/个人主页/交接记录.md` 最新一条
- **收工**：`git commit` + `git push`（不 push 视为未交接）→ `CHANGELOG.md` 顶部追加一条 → 更新 MyMemories 交接记录
- **兜底**：忘记 pull → `git stash` + `git pull --rebase` + `git stash pop`；push 被拒 → `git pull --rebase` 后重推

## commit 纪律

- 一次修改一个 commit；Conventional Commits + 主题行；message 必写「为什么这样改、影响什么」。
- 架构级决策先写 `docs/adr/NNNN-slug.md` 再动代码。
- 注意：推送到 `main` 会触发 GitHub Actions 自动部署，提交前确认改动可发布。

## 项目知识入口

- 用途/技术栈/开发/目录：`README.md`；修改因果链：`CHANGELOG.md` + `docs/adr/`
- 构建产物（`dist/`）与工具会话状态不入 git，见 `.gitignore`
