# 多 agent 协作的存储结构：单一项目目录 + git 远程中枢

2026-08 起，本项目与用户所有项目不再为不同 AI 工具（Reasonix / Harness 等）拷贝副本：每个项目只保留一个 git 仓库目录，所有工具直接打开同一目录，经 GitHub 远程 + 串行 git 交接协议（开工 pull、收工 commit+push）汇合修改。因果链由 commit message → CHANGELOG.md → docs/adr/ 三层承载；技能库与记忆库另有唯一事实源（`skills/` 仓库、MyMemories vault）。

## Consequences

- 切换工具零拷贝；同一时刻只允许一个 agent 修改本项目。
- 工具会话状态（`.reasonix/`、`.harness/` 等）gitignore，互不干扰。
