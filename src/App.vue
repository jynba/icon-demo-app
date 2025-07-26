<script setup lang="ts">
import { ArrowDownRight } from '@mot-iron/iconify-vue'
import { Icon, addCollection } from '@iconify/vue'
import iconsData from '@mot-iron/iconify-json/icons.json'

// 注册自定义 icon 集合
addCollection(iconsData)

// 获取所有图标名
const iconNames = Object.keys(iconsData.icons)
console.log(iconNames, 'iconNames');
</script>

<template>
  <div class="icon-list">
    <h2>使用前缀 m- 的图标组件</h2>
    <div class="icon-item">
      <m-arrow-down-right width="32" height="32" />
      <div class="icon-label">m-arrow-down-right</div>
    </div>

    <h2>直接导入组件</h2>
    <div class="icon-item">
      <arrow-down-right width="32" height="32" />
      <div class="icon-label">arrow-down-right</div>
    </div>

    <h2>访问cdn直接使用svg图标</h2>
    <div class="icon-item">
      <img src="https://cdn.jsdelivr.net/npm/@mot-iron/iconify-svg/arrow-down-right.svg" width="32" height="32" />
      <div class="icon-label">arrow-down-right</div>
    </div>

    <h2>使用 Iconify 格式的图标</h2>
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
  padding: 20px;
}

.icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 120px;
  margin-bottom: 12px;
  padding: 8px;
  border: 1px solid #eee;
  border-radius: 8px;
}

.icon-label {
  font-size: 10px;
  color: #888;
  margin-top: 4px;
  word-break: break-all;
  text-align: center;
}

h2 {
  width: 100%;
  margin: 20px 0 10px 0;
  color: #333;
  font-size: 16px;
}
</style>
