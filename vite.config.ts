import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'

// 自定义 resolver 用于 @mot-iron/iconify-vue
function MotIconsResolver() {
  return (name: string) => {
    // 处理 m- 前缀的组件（简化版）
    if (name.startsWith('m-')) {
      const iconName = name.replace('m-', '')
      return {
        name: iconName,
        from: '@mot-iron/iconify-vue'
      }
    }
    // 处理 M 前缀的组件
    if (name.startsWith('M')) {
      const iconName = name.replace('M', '')
      return {
        name: iconName,
        from: '@mot-iron/iconify-vue'
      }
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  base: '/iconify-ci-demo/', // 添加此行，设置GitHub Pages的基础路径
  plugins: [
    vue(),
    Icons({
      compiler: 'vue3',
      autoInstall: true,
    }),
    Components({
      resolvers: [
        // 自定义 mot-icons resolver
        MotIconsResolver(),
        // Iconify resolver 用于其他图标集
        IconsResolver({
          enabledCollections: ['custom'],
        }),
      ],
    }),
  ],
})
