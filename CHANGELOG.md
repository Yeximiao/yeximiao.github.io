# CHANGELOG

> 修改因果链（交接日志）。每个 agent 会话收工时在**顶部**追加一条：日期、改动内容、为什么改。
> 纪律见 `general/docs/多agent协作体系规范.md` 第五章。

## 2026-08-14

- **改动**：项目纳入多 agent 协作体系——新增 CHANGELOG、docs/adr/0001（多 agent 协作存储结构）、AGENTS.md（交接协议与 commit 纪律）；README 补「当前状态与 Roadmap」。
- **为什么**：切换 AI 工具不再拷贝项目——本目录即唯一事实源，git 远程 + 串行交接协议汇合修改，每一步修改有因果链。
