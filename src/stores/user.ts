import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { IUserInfo, ILoginRequest, ILoginResponse } from '@/types/user';

export const useUserStore = defineStore(
  'user',
  () => {
    const userInfo = ref<IUserInfo | null>(null);
    const token = ref<string>('');

    const isLoggedIn = computed(() => !!token.value && !!userInfo.value);

    async function login(request: ILoginRequest) {
      try {
        const response = await uni.request({
          url: '/api/auth/login',
          method: 'POST',
          data: request,
        });

        if (response.statusCode === 200) {
          const data = response.data as ILoginResponse;
          token.value = data.token;
          userInfo.value = data.userInfo;

          uni.showToast({
            title: '登录成功',
            icon: 'success',
          });
          return true;
        } else {
          uni.showToast({
            title: '登录失败',
            icon: 'error',
          });
          return false;
        }
      } catch (error) {
        console.error('登录失败', error);
        uni.showToast({
          title: '网络错误',
          icon: 'error',
        });
        return false;
      }
    }

    async function logout() {
      try {
        await uni.request({
          url: '/api/auth/logout',
          method: 'POST',
          header: {
            Authorization: `Bearer ${token.value}`,
          },
        });

        token.value = '';
        userInfo.value = null;

        uni.showToast({
          title: '已退出登录',
          icon: 'success',
        });

        uni.reLaunch({
          url: '/pages/login/login',
        });
      } catch (error) {
        console.error('退出失败', error);
        uni.showToast({
          title: '网络错误',
          icon: 'error',
        });
      }
    }

    function getUserInfo() {
      return userInfo.value;
    }

    function getToken() {
      return token.value;
    }

    return {
      userInfo,
      token,
      isLoggedIn,
      login,
      logout,
      getUserInfo,
      getToken,
    };
  },
  {
    persist: true,
  }
);
