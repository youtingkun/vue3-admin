module.exports = { extends: ['@commitlint/config-conventional'] }
//build：主要目的是修改项目构建系统(例如 glup，webpack，rollup 的配置等)的提交
//ci：主要目的是修改项目继续集成流程(例如 Travis，Jenkins，GitLab CI，Circle 等)的提交
//docs：文档更新
//feat：新增功能
//fix：bug 修复
//perf：性能优化
//refactor：重构代码(既没有新增功能，也没有修复 bug)
//style：代码格式
//test：新增测试用例或是更新现有测试
//revert：回滚某个更早之前的提交
//chore：变更流程或辅助工具
