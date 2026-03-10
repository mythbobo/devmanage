import type { ILoginRequest, ILoginResponse, IUserInfo } from '@/types/user';

const BASE_URL = 'http://localhost:3000';

export async function login(request: ILoginRequest): Promise<ILoginResponse> {
  const response = await uni.request({
    url: `${BASE_URL}/api/auth/login`,
    method: 'POST',
    data: request,
  });

  if (response.statusCode === 200) {
    return response.data as ILoginResponse;
  } else {
    throw new Error('登录失败');
  }
}

export async function logout(token: string): Promise<void> {
  const response = await uni.request({
    url: `${BASE_URL}/api/auth/logout`,
    method: 'POST',
    header: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.statusCode !== 200) {
    throw new Error('退出失败');
  }
}

export async function getUserInfo(token: string): Promise<IUserInfo> {
  const response = await uni.request({
    url: `${BASE_URL}/api/user/info`,
    method: 'GET',
    header: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.statusCode === 200) {
    return response.data as IUserInfo;
  } else {
    throw new Error('获取用户信息失败');
  }
}
