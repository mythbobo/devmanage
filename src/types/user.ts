export interface IUserInfo {
  id: string;
  username: string;
  email?: string;
  phone?: string;
  avatar?: string;
  role: string;
  createTime: string;
}

export interface ILoginRequest {
  username: string;
  password: string;
}

export interface ILoginResponse {
  token: string;
  userInfo: IUserInfo;
}

export interface ILogoutRequest {
  token: string;
}

export interface ILogoutResponse {
  success: boolean;
}
