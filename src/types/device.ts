export enum IDeviceStatus {
  Online = 'online',
  Offline = 'offline',
  Maintenance = 'maintenance',
  Error = 'error',
}

export interface IDeviceInfo {
  id: string;
  name: string;
  code: string;
  type: string;
  status: IDeviceStatus;
  location: string;
  lastMaintenanceTime?: string;
  createTime: string;
}

export interface IDeviceListRequest {
  page: number;
  pageSize: number;
  keyword?: string;
  status?: IDeviceStatus;
}

export interface IDeviceListResponse {
  list: IDeviceInfo[];
  total: number;
  page: number;
  pageSize: number;
}

// 设备详情扩展类型
export interface IDeviceDetail extends IDeviceInfo {
  manufacturer?: string;
  model?: string;
  serialNumber?: string;
  purchaseDate?: string;
  warrantyExpiry?: string;
  runtime?: number;
  temperature?: number;
  pressure?: number;
  nextMaintenanceTime?: string;
  maintenanceCount?: number;
}

// 维护记录类型
export interface IMaintenanceRecord {
  id: string;
  deviceId: string;
  maintenanceTime: string;
  maintenanceType: string;
  description: string;
  operator: string;
  cost?: number;
}

// 报警记录类型
export interface IAlertRecord {
  id: string;
  deviceId: string;
  alertType: string;
  alertLevel: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  createTime: string;
  resolvedTime?: string;
  status: 'active' | 'resolved';
}
