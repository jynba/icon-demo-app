# Iconify CI & Demo Projects

## figma-iconify-bot

[项目地址](https://github.com/jynba/figma-iconify-bot)

- 通过 Figma 插件调用 GitHub Action Dispatch
- 自动从 Figma 拉取 SVG 图标
- 使用 `@iconify/tools` 转换为 Iconify JSON
- 自动提交 & 发布 npm 包
- 自动更新 GitHub 仓库代码，同步最新 npm 包版本

使用步骤：

1. 配置 `FIGMA_TOKEN` 和 `NPM_TOKEN` Secrets。
2. 修改 `scripts/figma.config.js` 的 Figma fileId。
3. Figma 插件推送到 GitHub Actions 自动运行。

### 待完善

- 将 iconify json 转成 svg 的组件，如`@element-plus/icons-vue`，通过 vite iconResolver 按需引入。

## icon-demo-app

- 演示如何在 Vue 中使用生成的 `jy-icons`（Iconify JSON 格式的自定义图标集）
- 配置 Renovate 自动发 MR 更新 `jy-icons` 图标依赖。

### 使用方法

1. **安装依赖**

   已在 `package.json` 配置：

   ```json
   "dependencies": {
     "@iconify/vue": "^4.1.0",
     "jy-icons": "^1.0.12",
     "vue": "^3.2.47"
   }
   ```

   如需手动安装：

   ```bash
   pnpm add @iconify/vue jy-icons
   # 或 npm install @iconify/vue jy-icons
   ```

2. **在 Vue 组件中批量展示 jy-icons**

   以 `src/App.vue` 为例：

   ```vue
   <script setup lang="ts">
   import { Icon, addCollection } from "@iconify/vue";
   import iconsData from "jy-icons/icons.json";

   // 注册自定义 icon 集合
   addCollection(iconsData);

   // 获取所有图标名
   const iconNames = Object.keys(iconsData.icons);
   </script>

   <template>
     <div class="icon-list">
       <div v-for="name in iconNames" :key="name" class="icon-item">
         <Icon :icon="`custom:${name}`" width="32" height="32" />
         <div class="icon-label">{{ name }}</div>
       </div>
     </div>
   </template>

   <style scoped>
   .icon-list {
     display: flex;
     flex-wrap: wrap;
     gap: 16px;
   }
   .icon-item {
     display: flex;
     flex-direction: column;
     align-items: center;
     width: 64px;
     margin-bottom: 12px;
   }
   .icon-label {
     font-size: 12px;
     color: #888;
     margin-top: 4px;
     word-break: break-all;
     text-align: center;
   }
   </style>
   ```

3. **效果说明**

   - 所有 jy-icons 图标会以 flex-wrap 自动换行展示。
   - 每个图标下方显示其名称。
   - 支持自定义样式和筛选部分图标。

---

### 自动依赖更新（Renovate）

本项目推荐使用 [Renovate](https://docs.renovatebot.com/) 自动检测和更新依赖，保证 `jy-icons` 等 icon 包始终为最新版本。

#### 1. 配置方法

在项目根目录新建 `renovate.json`，示例内容：

```json
{
  "extends": ["config:base"],
  "packageRules": [
    {
      "matchPackageNames": ["jy-icons"],
      "groupName": "icon dependencies",
      "automerge": true,
      "automergeType": "branch"
    }
  ],
  "labels": ["dependencies", "auto-update"],
  "prHourlyLimit": 2,
  "prConcurrentLimit": 5
}
```

#### 2. 字段说明

- `extends`：继承官方推荐基础配置。
- `packageRules`：对特定依赖（如 jy-icons）设置自动合并、分组等策略。
- `labels`：自动 PR 打标签，便于筛选。
- `prHourlyLimit`/`prConcurrentLimit`：限制 PR 数量，防止打扰。
- `automerge`：自动合并通过测试的依赖更新。

#### 3. 启用方式

- 将 `renovate.json` 放到项目根目录。
- 在 GitHub（或其他平台）安装并启用 Renovate App。
- 合并自动 PR 后即可自动保持依赖最新。

更多高级用法和配置请参考：[Renovate 官方文档](https://docs.renovatebot.com/configuration-options/)

---
