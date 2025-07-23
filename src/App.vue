<script setup lang="ts">
import { Icon, addCollection } from '@iconify/vue'
import iconsData from 'jy-icons/icons.json'

// 注册自定义 icon 集合
addCollection(iconsData)

// 获取所有图标名
const iconNames = Object.keys(iconsData.icons)
console.log(iconNames, 'iconNames');
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
