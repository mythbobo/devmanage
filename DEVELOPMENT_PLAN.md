# 设备管理系统开发计划

## 项目目标
基于 UniApp 开发微信小程序设备管理系统

## 开发原则
- **分步式开发**：每个模块独立开发、测试、提交
- **模块可用性**：只有当前模块完全可用后，才进行下一个模块
- **GitHub 同步**：每个模块完成后立即提交到 GitHub
- **代码质量**：通过 TypeScript 类型检查和 ESLint 检查

---

## 模块一：项目基础搭建

### 目标
初始化 UniApp 项目结构，配置基础开发环境

### 任务清单
1. **初始化项目配置**
   - 创建 package.json（依赖：vue3、typescript、pinia、uni-app）
   - 配置 tsconfig.json（TypeScript 严格模式）
   - 配置 .eslintrc.js（代码规范）
   - 配置 .prettierrc.js（代码格式化）

2. **创建目录结构**
   ```
   src/
   ├── pages/
   ├── components/
   ├── stores/
   ├── services/
   ├── utils/
   ├── types/
   └── static/
   ```

3. **配置 UniApp 文件**
   - pages.json（页面路由配置）
   - manifest.json（应用配置）
   - uni.scss（全局样式变量）

4. **创建入口文件**
   - App.vue（应用入口）
   - main.ts（应用主文件）

### 验收标准
- ✅ npm install 成功
- ✅ npm run dev:mp-weixin 可启动
- ✅ TypeScript 类型检查通过
- ✅ ESLint 检查通过

### 提交内容
- 基础项目结构
- 配置文件
- 入口文件

---

## 模块二：用户认证模块

### 目标
实现用户登录、登出功能，管理用户状态

### 任务清单
1. **类型定义**（types/user.ts）
   - IUserInfo（用户信息接口）
   - ILoginRequest（登录请求接口）
   - ILoginResponse（登录响应接口）

2. **状态管理**（stores/user.ts）
   - userInfo（用户信息）
   - token（访问令牌）
   - isLoggedIn（登录状态）
   - login()（登录方法）
   - logout()（登出方法）

3. **API 服务**（services/auth.ts）
   - 登录接口
   - 登出接口
   - 获取用户信息接口

4. **页面开发**
   - pages/login/login.vue（登录页）
   - 包含用户名/密码输入
   - 登录按钮
   - 错误提示

### 验收标准
- ✅ 用户可成功登录
- ✅ 登录状态持久化（本地存储）
- ✅ 登出功能正常
- ✅ 所有 API 错误正确处理

### 提交内容
- 用户类型定义
- 用户状态管理
- 认证 API 服务
- 登录页面

---

## 模块三：设备列表模块

### 目标
展示设备列表，支持分页、搜索、筛选

### 任务清单
1. **类型定义**（types/device.ts）
   - IDeviceInfo（设备信息接口）
   - IDeviceStatus（设备状态枚举）
   - IDeviceListRequest（列表查询接口）
   - IDeviceListResponse（列表响应接口）

2. **状态管理**（stores/device.ts）
   - deviceList（设备列表）
   - totalCount（总数）
   - currentPage（当前页）
   - fetchDeviceList()（获取列表方法）

3. **API 服务****（services/device.ts）
   - 获取设备列表接口
   - 搜索设备接口

4. **页面开发**
   - pages/device-list/device-list.vue（设备列表页）
   - 设备卡片组件（components/device-card.vue）
   - 下拉刷新、上拉加载更多
   - 搜索框
   - 状态筛选

### 验收标准
- ✅ 设备列表正确展示
- ✅ 下拉刷新功能正常
- ✅ 上拉加载更多正常
- ✅ 搜索功能正常
- ✅ 筛选功能正常

### 提交内容
- 设备类型定义
- 设备状态管理
- 设备 API 服务
- 设备列表页
- 设备卡片组件

---

## 模块四：设备详情模块

### 目标
展示设备详细信息，支持设备操作

### 任务清单
1. **类型定义**
   - IDeviceDetail（设备详情接口，扩展 IDeviceInfo）
   - IDeviceAction（设备操作接口）

2. **API 服务**
   - 获取设备详情接口
   - 设备启停接口
   - 设备删除接口

3. **页面开发**
   - pages/device-detail/device-detail.vue（设备详情页）
   - 设备基本信息展示
   - 设备状态图表（可选）
   - 启停按钮
   - 编辑按钮
   - 删除按钮（带确认）

### 验收标准
- ✅ 设备详情正确展示
- ✅ 启停操作正常
- ✅ 删除操作正常
- ✅ 操作后有正确反馈

### 提交内容
- 设备详情类型
- 设备详情 API
- 设备详情页

---

## 模块五：设备管理模块

### 目标
实现设备添加、编辑功能

### 任务清单
1. **类型定义**
   - IDeviceForm（设备表单接口）
   - IDeviceCategory（设备分类枚举）

2. **API 服务**
   - 创建设备接口
   - 更新设备接口
   - 获取设备分类接口

3. **页面开发**
   - pages/device-form/device-form.vue（设备表单页）
   - 表单验证
   - 图片上传（设备照片）
   - 保存功能

### 验收标准
- ✅ 设备添加功能正常
- ✅ 设备编辑功能正常
- ✅ 表单验证正确
- ✅ 图片上传正常

### 提交内容
- 设备表单类型
- 设备管理 API
- 设备表单页

---

## 模块六：维护记录模块

### 目标
记录设备维护历史，支持添加维护记录

### 任务清单
1. **类型定义**（types/maintenance.ts）
   - IMaintenanceRecord（维护记录接口）
   - IMaintenanceType（维护类型枚举）
   - IMaintenanceListRequest（维护列表请求）
   - IMaintenanceListResponse（维护列表响应）

2. **状态管理**（stores/maintenance.ts）
   - maintenanceList（维护列表）
   - fetchMaintenanceList()（获取维护列表方法）

3. **API 服务**（services/maintenance.ts）
   - 获取维护记录列表接口
   - 添加维护记录接口
   - 删除维护记录接口

4. **页面开发**
   - pages/maintenance-list/maintenance-list.vue（维护记录列表页）
   - pages/maintenance-form/maintenance-form.vue（维护记录表单页）
   - 维护记录组件

### 验收标准
- ✅ 维护记录正确展示
- ✅ 添加维护记录正常
- ✅ 删除维护记录正常
- ✅ 与设备关联正确

### 提交内容
- 维护类型定义
- 维护状态管理
- 维护 API 服务
- 维护记录列表页
- 维护记录表单页

---

## 模块七：库存管理模块

### 目标
管理设备配件和备件库存

### 任务清单
1. **类型定义**（types/inventory.ts）
   - IInventoryItem（库存项接口）
   - IInventoryOperation（库存操作枚举）
   - IStockRecord（库存记录接口）

2. **状态管理**（stores/inventory.ts）
   - inventoryList（库存列表）
   - fetchInventoryList()（获取库存方法）

3. **API 服务**（services/inventory.ts）
   - 获取库存列表接口
   - 库存入库接口
   - 库存出库接口
   - 调整库存接口

4. **页面开发**
   - pages/inventory-list/inventory-list.vue（库存列表页）
   - pages/inventory-operation/inventory-operation.vue（库存操作页）

### 验收标准
- ✅ 库存列表正确展示
- ✅ 入库功能正常
- ✅ 出库功能正常
- ✅ 库存数量正确更新

### 提交内容
- 库存类型定义
- 库存状态管理
- 库存 API 服务
- 库存列表页
- 库存操作页

---

## 模块八：统计报表模块

### 目标
展示设备统计数据和报表

### 任务清单
1. **类型定义**（types/statistics.ts）
   - IDeviceStatistics（设备统计接口）
   - IMaintenanceStatistics（维护统计接口）
   - IInventoryStatistics（库存统计接口）

2. **API 服务**（services/statistics.ts）
   - 获取设备统计接口
   - 获取维护统计接口
   - 获取库存统计接口

3. **页面开发**
   - pages/statistics/statistics.vue（统计页面）
   - 统计卡片组件
   - 图表组件（可选）

### 验收标准
- ✅ 统计数据正确展示
- ✅ 数据实时更新
- ✅ 图表渲染正常（如使用）

### 提交内容
- 统计类型定义
- 统计 API 服务
- 统计页面
- 统计组件

---

## 模块九：系统设置模块

### 目标
用户设置、系统配置

### 任务清单
1. **类型定义**（types/settings.ts）
   - IUserSettings（用户设置接口）
   - ISystemConfig（系统配置接口）

2. **状态管理**（stores/settings.ts）
   - userSettings（用户设置）
   - systemConfig（系统配置）

3. **API 服务**（services/settings.ts）
   - 获取设置接口
   - 更新设置接口

4. **页面开发**
   - pages/settings/settings.vue（设置页）

### 验收标准
- ✅ 设置正确展示
- ✅ 设置保存正常
- ✅ 设置持久化

### 提交内容
- 设置类型定义
- 设置状态管理
- 设置 API 服务
- 设置页面

---

## 模块十：权限管理模块（可选）

### 目标
基于角色的访问控制

### 任务清单
1. **类型定义**（types/permission.ts）
   - IRole（角色接口）
   - IPermission（权限接口）

2. **状态管理**（stores/permission.ts）
   - userRole（用户角色）
   - userPermissions（用户权限）
   - hasPermission()（权限检查方法）

3. **API 服务**（services/permission.ts）
   - 获取用户角色接口
   - 获取用户权限接口

### 验收标准
- ✅ 权限检查正确
- ✅ 无权限页面正确跳转

### 提交内容
- 权限类型定义
- 权限状态管理
- 权限 API 服务
- 权限守卫

---

## 开发时间估算

| 模块 | 预估时间 | 优先级 |
|------|----------|--------|
| 项目基础搭建 | 1-2 小时 | P0 |
| 用户认证模块 | 2-3 小时 | P0 |
| 设备列表模块 | 3-4 小时 | P0 |
| 设备详情模块 | 2-3 小时 | P0 |
| 设备管理模块 | 3-4 小时 | P1 |
|。维护记录模块 | 3-4 小时 | P1 |
| 库存管理模块 | 3-4 小时 | P1 |
| 统计报表模块 | 2-3 小时 | P2 |
| 系统设置模块 | 1-2 小时 | P2 |
| 权限管理模块 | 2-3 小时 | P3 |

**总计**：约 22-32 小时

---

## 开发顺序建议

### 第一阶段（核心功能，必须完成）
1. 项目基础搭建
2. 用户认证模块
3. 设备列表模块
4. 设备详情模块

### 第二阶段（扩展功能）
5. 设备管理模块
6. 维护记录模块
7. 库存管理模块

### 第三阶段（增强功能）
8. 统计报表模块
9. 系统设置模块

### 第四阶段（可选）
10. 权限管理模块

---

## 注意事项

1. **每个模块独立测试**
   - 单元测试（如需要）
   - 集成测试
   - 手动功能测试

2. **代码质量保证**
   - 每个 commit 前运行 `npm run lint`
   - 每个 commit 前运行 `npm run type-check`
   - 修复所有 lint 和 type 错误

3. **Git 提交规范**
   - 使用语义化 commit message
   - 示例：`feat: 完成设备列表模块`
   - 每个 module 完成后立即 push 到 GitHub

4. **错误处理**
   - 所有 API 调用必须有错误处理
   - 用户友好的错误提示
   - 错误日志记录

5. **性能优化**
   - 列表分页加载
   - 图片懒加载
   - 避免不必要的重新渲染
