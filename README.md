# Iconify CI & Demo Projects

这是一个完整的图标工作流解决方案，包含从 Figma 设计到 Vue 组件的自动化流程。

## 项目结构

```
iconify-ci-demo/
├── figma-iconify-bot/          # Figma 图标自动化工具
│   ├── build-iconify.js        # 构建脚本
│   ├── figma.config.js         # Figma 导出配置
│   ├── json/                   # Iconify JSON 包
│   ├── svg/                    # SVG 文件包
│   └── vue/                    # Vue 组件包
└── icon-demo-app/              # Vue 演示应用
    ├── src/
    ├── vite.config.ts          # Vite 配置（包含按需导入）
    └── package.json
```

## figma-iconify-bot

[项目地址](https://github.com/jynba/figma-iconify-bot)

### 功能特性

- 🎨 通过 Figma 插件调用 GitHub Action Dispatch
- 📦 自动从 Figma 拉取 SVG 图标
- 🔧 使用 `@iconify/tools` 转换图标格式
- 🚀 自动提交 & 发布 npm 包
- 🔄 自动更新 GitHub 仓库代码，同步最新 npm 包版本

### 使用步骤

1. 配置 `FIGMA_TOKEN` 和 `NPM_TOKEN` Secrets
2. 修改 `figma.config.js` 的 Figma fileId
3. Figma 插件推送到 GitHub Actions 自动运行

### 通过 Figma 插件触发工作流

你可以使用 [Continuous Design - Run CI from Figma](https://www.figma.com/community/plugin/977948326423807703/continuous-design-run-ci-from-figma) 插件，在 Figma 内直接触发本项目的自动化流程（如导出、构建、发布等），实现设计到代码的持续集成。

## icon-demo-app

演示如何在 Vue 3 项目中使用 `@mot-iron/iconify-vue` 图标组件，配置按需导入和自动组件解析。

[demo 地址](https://jynba.github.io/icon-demo-app/)

### 功能特性

#### Web 端：

- ⚡ **按需导入**: 只打包使用到的图标组件
- 🎯 **自动解析**: 无需手动 import，直接使用组件名
- 📦 **Tree-shaking**: 未使用的图标会被自动移除
- 🔧 **TypeScript 支持**: 完整的类型定义
- 🎨 **多种使用方式**: 支持简化前缀和完整前缀

#### 小程序端：

- ⚡ **通过 CDN 链接访问 svg**: 远程链接访问，不增加包体积

```vue
<template>
  <div>
    <image src="https://cdn.jsdelivr.net/npm/@mot-iron/iconify-svg/arrow-down-right.svg" width="24" height="24" />
  </div>
</template>
```

### 安装依赖

```bash
# 使用 pnpm（推荐）
pnpm install

# 或使用 npm
npm install
```

### 配置说明

#### 1. Vite 配置 (`vite.config.ts`)

```typescript
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import Components from "unplugin-vue-components/vite";

// 自定义 resolver 用于 @mot-iron/iconify-vue
function MotIconsResolver() {
  return (name: string) => {
    // 处理 m- 前缀的组件（简化版）
    if (name.startsWith("m-")) {
      const iconName = name.replace("m-", "");
      return {
        name: iconName,
        from: "@mot-iron/iconify-vue",
      };
    }
    // 处理 M 前缀的组件
    if (name.startsWith("M")) {
      const iconName = name.replace("M", "");
      return {
        name: iconName,
        from: "@mot-iron/iconify-vue",
      };
    }
  };
}

export default defineConfig({
  plugins: [
    vue(),
    Icons({
      compiler: "vue3",
      autoInstall: true,
    }),
    Components({
      resolvers: [
        MotIconsResolver(),
        IconsResolver({
          enabledCollections: ["custom"],
        }),
      ],
    }),
  ],
});
```

#### 2. 依赖配置 (`package.json`)

```json
{
  "dependencies": {
    "@mot-iron/iconify-json": "^1.0.0",
    "@mot-iron/iconify-svg": "^1.0.0",
    "@mot-iron/iconify-vue": "^1.0.0",
    "vue": "^3.2.47"
  },
  "devDependencies": {
    "@iconify/vue": "^5.0.0",
    "@vitejs/plugin-vue": "^4.1.0",
    "unplugin-icons": "^22.1.0",
    "unplugin-vue-components": "^0.25.0"
  }
}
```

### 使用方法

#### 1. 简化前缀使用（推荐）

```vue
<template>
  <div>
    <!-- 使用 m- 前缀，更简洁 -->
    <m-arrow-down-right width="24" height="24" />
    <m-check width="20" height="20" color="#4CAF50" />
    <m-bell width="32" height="32" />
    <m-camera width="48" height="48" />
  </div>
</template>
```

#### 2. 大写前缀使用

```vue
<template>
  <div>
    <!-- 使用 M 前缀 -->
    <MArrowDownRight width="24" height="24" />
    <MCheck width="20" height="20" />
    <MBell width="32" height="32" />
  </div>
</template>
```

#### 3. 手动导入（Ts 支持）可全量导入

```vue
<script setup lang="ts">
import { ArrowDownRight } from "@mot-iron/iconify-vue";
</script>

<template>
  <div>
    <arrow-down-right width="32" height="32" />
  </div>
</template>
```

```ts
import * as icons from "@mot-iron/iconify-vue";
const app = createApp(App);
for (const [key, component] of Object.entries(icons)) {
  app.component(key, component);
}
app.mount("#app");
```

#### 4. svg 图标远程链接

```vue
<template>
  <div>
    <img src="https://cdn.jsdelivr.net/npm/@mot-iron/iconify-svg/arrow-down-right.svg" width="32" height="32" />
  </div>
</template>
```

#### 5. Iconify 格式使用

```vue
<script setup lang="ts">
import { Icon, addCollection } from "@iconify/vue";
import iconsData from "@mot-iron/iconify-json/icons.json";

// 注册自定义 icon 集合
addCollection(iconsData);
</script>

<template>
  <div>
    <Icon icon="custom:arrow-down-right" width="24" height="24" />
    <Icon icon="custom:check" width="20" height="20" />
  </div>
</template>
```

### 图标属性

所有图标组件都支持标准的 SVG 属性：

```vue
<template>
  <m-camera width="48" height="48" color="#2196F3" class="camera-icon" style="opacity: 0.8;" />
</template>

<style scoped>
.camera-icon {
  transition: transform 0.2s;
}

.camera-icon:hover {
  transform: scale(1.1);
}
</style>
```

---

## 自动依赖更新（Renovate）

本项目推荐使用 [Renovate](https://docs.renovatebot.com/) 自动检测和更新依赖，保证图标包始终为最新版本。

### 配置方法

在项目根目录新建 `renovate.json`：

```json
{
  "extends": ["config:recommended"],
  "forkProcessing": "enabled",
  "packageRules": [
    {
      "matchPackageNames": ["@mot-iron/iconify-json", "@mot-iron/iconify-svg", "@mot-iron/iconify-vue"],
      "matchDepTypes": ["dependencies"],
      "enabled": true,
      "rangeStrategy": "bump",
      "automerge": true,
      "automergeType": "pr",
      "requiredStatusChecks": null
    },
    {
      "matchDepTypes": ["dependencies", "devDependencies", "peerDependencies"],
      "enabled": false,
      "excludePackageNames": ["@mot-iron/iconify-json", "@mot-iron/iconify-svg", "@mot-iron/iconify-vue"]
    }
  ]
}
```

### 字段说明

- `extends`: 继承官方推荐基础配置
- `forkProcessing`: 允许 Renovate 处理 fork 仓库
- `packageRules`: 对特定依赖设置自动合并、分组等策略
- `automerge`: 自动合并通过测试的依赖更新
- `automergeType`: 自动合并的类型，可选 `pr`、`branch`
- `requiredStatusChecks`: Renovate 默认只在 CI 通过时才会自动合并；如果仓库没有任何 CI 工作流，则写 null

### 启用方式

1. 将 `renovate.json` 放到项目根目录
2. 在 GitHub（或其他平台）安装并启用 Renovate App
3. 合并自动 PR 后即可自动保持依赖最新

更多高级用法和配置请参考：[Renovate 官方文档](https://docs.renovatebot.com/configuration-options/)

---

## 技术栈

- **Vue 3**: 渐进式 JavaScript 框架
- **Vite**: 下一代前端构建工具
- **TypeScript**: JavaScript 的超集
- **unplugin-icons**: 图标按需导入插件
- **unplugin-vue-components**: Vue 组件自动导入
- **@iconify/vue**: Iconify Vue 组件
- **@mot-iron/iconify-vue**: 自定义图标组件包
