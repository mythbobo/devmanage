<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '@/stores/user';
import type { ILoginRequest } from '@/types/user';

const userStore = useUserStore();

const formData = ref<ILoginRequest>({
  username: '',
  password: '',
});

const loading = ref(false);

async function handleLogin() {
  if (!formData.value.username || !formData.value.password) {
    uni.showToast({
      title: '请输入用户名和密码',
      icon: 'error',
    });
    return;
  }

  loading.value = true;

  try {
    const success = await userStore.login(formData.value);

    if (success) {
      uni.reLaunch({
        url: '/pages/index/index',
      });
    }
  } catch (error) {
    console.error('登录失败', error);
  } finally {
    loading.value = false;
  }
}

function handleUsernameInput(e: Event) {
  const target = e.target as HTMLInputElement;
  formData.value.username = target.value;
}

function handlePasswordInput(e: Event) {
  const target = e.target as HTMLInputElement;
  formData.value.password = target.value;
}
</script>

<template>
  <view class="login-container">
    <view class="login-form">
      <view class="form-header">
        <text class="title">设备管理系统</text>
        <text class="subtitle">请登录以继续</text>
      </view>

      <view class="form-body">
        <view class="form-item">
          <text class="label">用户名</text>
          <input
            class="input"
            type="text"
            placeholder="请输入用户名"
            :value="formData.username"
            @input="handleUsernameInput"
          />
        </view>

        <view class="form-item">
          <text class="label">密码</text>
          <input
            class="input"
            type="password"
            placeholder="请输入密码"
            :value="formData.password"
            @input="handlePasswordInput"
          />
        </view>

        <button class="login-btn" :loading="loading" @click="handleLogin">
          {{ loading ? '登录中...' : '登录' }}
        </button>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: $uni-spacing-col-lg;
}

.login-form {
  width: 100%;
  max-width: 600rpx;
  background: #fff;
  border-radius: $uni-radius-lg;
  padding: $uni-spacing-col-xl;
  box-shadow: 0 10rpx 40rpx rgba(0, 0, 0, 0.1);
}

.form-header {
  text-align: center;
  margin-bottom: $uni-spacing-col-xl;

  .title {
    display: block;
    font-size: 48rpx;
    font-weight: bold;
    color: #333;
    margin-bottom: $uni-spacing-row-sm;
  }

  .subtitle {
    font-size: $uni-font-size-base;
    color: #666;
  }
}

.form-body {
  .form-item {
    margin-bottom: $uni-spacing-col-base;

    .label {
      display: block;
      font-size: $uni-font-size-base;
      color: #333;
      margin-bottom: $uni-spacing-row-sm;
    }

    .input {
      width: 100%;
      height: 80rpx;
      padding: 0 $uni-spacing-row-base;
      border: 1px solid #ddd;
      border-radius: $uni-radius-base;
      background-color: #f9f9f9;
      font-size: $uni-font-size-base;
      box-sizing: border-box;
    }
  }

  .login-btn {
    width: 100%;
    height: 88rpx;
    margin-top: $uni-spacing-col-lg;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: #fff;
    border: none;
    border-radius: $uni-radius-base;
    font-size: 32rpx;
    font-weight: bold;
  }
}
</style>
