import type {
  IDeviceListRequest,
  IDeviceListResponse,
  IDeviceDetail,
  IMaintenanceRecord,
  IAlertRecord,
} from '@/types/device';

const BASE_URL = 'http://localhost:3000';

export async function fetchDeviceList(request: IDeviceListRequest): Promise<IDeviceListResponse> {
  const response = await uni.request({
    url: `${BASE_URL}/api/device/list`,
    method: 'GET',
    data: request,
  });

  if (response.statusCode === 200) {
    return response.data as IDeviceListResponse;
  } else {
    throw new Error('获取设备列表失败');
  }
}

export async function searchDevices(keyword: string): Promise<IDeviceListResponse> {
  const response = await uni.request({
    url: `${BASE_URL}/api/device/search`,
    method: 'GET',
    data: { keyword },
  });

  if (response.statusCode === 200) {
    return response.data as IDeviceListResponse;
  } else {
    throw new Error('搜索设备失败');
  }
}

// 获取设备详情
export async function fetchDeviceDetail(deviceId: string): Promise<IDeviceDetail> {
  const response = await uni.request({
    url: `${BASE_URL}/api/device/${deviceId}`,
    method: 'GET',
  });

  if (response.statusCode === 200) {
    return response.data as IDeviceDetail;
  } else {
    throw new Error('获取设备详情失败');
  }
}

// 获取维护记录
export async function fetchMaintenanceRecords(deviceId: string): Promise<IMaintenanceRecord[]> {
  const response = await uni.request({
    url: `${BASE_URL}/api/device/${deviceId}/maintenance`,
    method: 'GET',
  });

  if (response.statusCode === 200) {
    return response.data as IMaintenanceRecord[];
  } else {
    throw new Error('获取维护记录失败');
  }
}

// 获取报警记录
export async function fetchAlertRecords(deviceId: string): Promise<IAlertRecord[]> {
  const response = await uni.request({
    url: `${BASE_URL}/api/device/${deviceId}/alerts`,
    method: 'GET',
  });

  if (response.statusCode === 200) {
    return response.data as IAlertRecord[];
  } else {
    throw new Error('获取报警记录失败');
  }
}

// 获取设备运行数据
export async function fetchDeviceRuntimeData(deviceId: string): Promise<{
  runtime: number;
  temperature: number;
  pressure: number;
}> {
  const response = await uni.request({
    url: `${BASE_URL}/api/device/${deviceId}/runtime`,
    method: 'GET',
  });

  if (response.statusCode === 200) {
    return response.data as { runtime: number; temperature: number; pressure: number };
  } else {
    throw new Error('获取设备运行数据失败');
  }
}
