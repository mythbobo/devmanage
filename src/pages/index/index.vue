<script setup lang="ts">
import { ref } from 'vue';

const title = ref('设备管理系统');
</script>

<template>
  <view class="container">
    <view class="header">
      <text class="title">{{ title }}</text>
    </view>
    <view class="content">
      <text class="welcome">欢迎使用设备管理系统</text>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  padding: $uni-spacing-col-lg;
  background-color: $uni-color-primary;
  color: #fff;

  .title {
    font-size: $uni-font-size-lg;
    font-weight: bold;
  }
}

.content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: $uni-spacing-col-lg;

  .welcome {
    font-size: $uni-font-size-base;
    color: $uni-text-color-grey;
  }
}
</style>
