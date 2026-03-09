# AGENTS.md - 设备管理系统 (UniApp)

## 项目概述
基于 UniApp 的微信小程序设备管理系统，使用 Vue 3 + TypeScript 开发。

## 开发命令

### 安装依赖
```bash
npm install
```

### 开发调试
```bash
# 运行开发服务器（微信小程序）
npm run dev:mp-weixin

# 构建生产版本
npm run build:mp-weixin
```

### 代码检查
```bash
# 代码检查
npm run lint

# 自动修复 lint 问题
npm run lint:fix

# TypeScript 类型检查
npm run type-check
```

## Git 与 GitHub 管理

### 提交规范
```bash
# 每个功能模块完成后提交到 GitHub
git add .
git commit -m "feat: 完成设备列表模块"
git push origin main
```

### 分支管理
- `main` - 主分支，生产环境代码
- `dev` - 开发分支，日常开发使用
- `feature/*` - 功能分支，如 `feature/device-list`

### GitHub 同步策略
**重要**：每个模块开发完成并测试通过后，立即提交到 GitHub。
- 避免长时间未同步
- 保持 GitHub 代码始终可运行
- 每个 commit 应该是一个独立可用的功能单元

## 开发规范

### 导入规范
- 使用 `@/` 别名进行绝对路径导入
- 导入分组：第三方库 → 内部模块 → 类型定义
- 导入顺序：Vue → composables → utils → components → pages

```typescript
import { ref, computed } from 'vue'
import { useDeviceStore } from '@/stores/device'
import { formatDate } from '@/utils/date'
```

### 组件规范
- 使用 Vue 3 Composition API，格式：`<script setup lang="ts">`
- 单文件组件：`.vue` 后缀
- 组件名：PascalCase，与文件名一致
- Props：使用 `defineProps<T>()` 接口定义
- Emits：使用 `defineEmits<T>()` 接口定义

### 样式规范
- 使用 SCSS 编写组件样式
- 遵循 uni-app 样式指南
- 使用 `rpx` 作为响应式单位
- 避免使用内联样式

### 状态管理
- 使用 Pinia 管理状态（stores/*.ts）
- Store 文件命名：小写，如 `device.ts`、`user.ts`
- 使用 TypeScript 接口定义状态类型

### API 与服务
- API 调用集中在 `services/api.ts`
- 使用 async/await 并正确处理错误
- 请求/响应模型定义在 `types/api.ts`

### 错误处理
- 异步操作使用 try-catch 包裹
- 通过 uni.showToast 显示用户友好的错误提示
- 使用 console.log 记录错误信息便于调试

### 命名规范
- 文件名：kebab-case，如 `device-list.vue`
- 变量名：camelCase
- 常量名：UPPER_SNAKE_CASE
- 类型/接口名：PascalCase + I 前缀，如 `IDeviceInfo`
- 枚举名：PascalCase

### 文件结构
```
src/
├── pages/          # 页面组件
├── components/     # 可复用组件
├── stores/         # Pinia 状态管理
├── services/       # API 服务
├── utils/          # 工具函数
├── types/          # TypeScript 类型定义
└── static/         # 静态资源
```

### UniApp 最佳实践
- 使用 `uni.*` API 调用平台特性
- 使用 `#ifdef` 进行条件编译
- 遵守微信小程序限制
- 使用 `onLoad`、`onShow`、`onReady` 生命周期钩子

### TypeScript 规范
- 启用严格模式
- 避免使用 `any` 类型，需要时使用 `unknown`
- 为所有数据结构定义接口
- 使用类型推断

### 微信小程序特性
- 页面路径在 `pages.json` 中注册
- 应用配置在 `manifest.json` 中
- 遵守 2MB 包大小限制
- 大型应用使用分包加载

## 模块开发流程

### 每个模块必须完成的步骤
1. **规划阶段**
   - 明确模块功能需求
   - 设计数据结构和 API 接口
   - 规划 UI 布局和交互

2. **开发阶段**
   - 创建必要的类型定义
   - 实现 API 服务和状态管理
   - 开发页面和组件

3. **测试阶段**
   - 本地功能测试
   - TypeScript 类型检查（npm run type-check）
   - 代码规范检查（npm run lint）

4. **提交阶段**
   - Git commit（清晰的 commit message）
   - 推送到 GitHub（git push）
   - 验证 GitHub 仓库代码可正常运行

**注意**：只有当前模块完全可用并通过所有检查后，才能开始下一个模块。
