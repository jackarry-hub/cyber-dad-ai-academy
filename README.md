# 赛博老爸AI学院

AI教育类 H5 移动端原型项目，第一阶段聚焦学生端核心闭环：选学段、看课程、刷题练习、AI讲题、错题本和学习报告。

## 技术栈

- Vite + React + TypeScript
- Tailwind CSS
- React Router
- lucide-react 图标
- mock 数据驱动，无后端、无数据库、无真实 AI 接口

## 启动方式

```bash
npm install
npm run dev
```

默认开发地址：

```bash
http://localhost:5173
```

生产构建：

```bash
npm run build
```

## 当前页面

- `/` 首页：品牌区、搜索框、Banner、快捷入口、我的学习、推荐课程、AI工具箱。
- `/stages` 学段入口：幼小衔接、小学、初中分区清晰，预留家长端和教师端入口。
- `/courses` 课程中心：按学段和学科筛选 mock 课程。
- `/practice` 做题练习：mock 题目，支持选择答案、提交、显示对错和解析。
- `/ai-explain` 我给AI讲习题：输入学生讲解，生成模拟错因分析。
- `/mistakes` 错题本：按学科、知识点和错因标签展示。
- `/report` 学习报告：今日学习、正确率、薄弱点和 AI 建议。
- `/profile` 我的：头像、年级、等级、积分和设置入口。

## 后续开发顺序建议

1. 先完善学生端题目数据结构：学段、年级、学科、知识点、难度、选项、答案、解析、错因标签。
2. 接入真实题库接口，保持当前 mock 数据字段作为接口契约草案。
3. 将 AI讲题页从 mock 分析替换为真实 AI 错因分析接口。
4. 增加学习报告聚合逻辑，沉淀正确率、薄弱知识点、练习时长等统计。
5. 扩展家长端：学习进度、薄弱点、建议任务、陪伴提醒。
6. 扩展教师端：班级概览、错因分布、作业布置、个性化练习包。

## 目录说明

```text
src/components/layout   移动端外壳与底部导航
src/components/common   通用卡片、按钮、标题、进度条
src/components/home     首页业务组件
src/pages               页面级组件
src/data                mock 数据
src/types               领域类型
src/router              前端路由
src/utils               工具函数
```
