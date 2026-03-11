import { IDeviceStatus } from '@/types/device';

/**
 * 获取设备状态文本
 * @param status 设备状态枚举值
 * @returns 状态文本
 */
export function getDeviceStatusText(status: IDeviceStatus): string {
  const statusMap: Record<IDeviceStatus, string> = {
    [IDeviceStatus.Online]: '在线',
    [IDeviceStatus.Offline]: '离线',
    [IDeviceStatus.Maintenance]: '维护中',
    [IDeviceStatus.Error]: '故障',
  };
  return statusMap[status] || '未知';
}

/**
 * 获取设备状态颜色
 * @param status 设备状态枚举值
 * @returns 颜色值（十六进制）
 */
export function getDeviceStatusColor(status: IDeviceStatus): string {
  const colorMap: Record<IDeviceStatus, string> = {
    [IDeviceStatus.Online]: '#4cd964',
    [IDeviceStatus.Offline]: '#999',
    [IDeviceStatus.Maintenance]: '#f0ad4e',
    [IDeviceStatus.Error]: '#dd524d',
  };
  return colorMap[status] || '#999';
}

/**
 * 获取告警等级颜色
 * @param level 告警等级
 * @returns 颜色值（十六进制）
 */
export function getAlertLevelColor(level: string): string {
  const colorMap: Record<string, string> = {
    low: '#f0ad4e',
    medium: '#ff9800',
    high: '#ff5722',
    critical: '#dd524d',
  };
  return colorMap[level] || '#999';
}

/**
 * 获取告警等级文本
 * @param level 告警等级
 * @returns 等级文本
 */
export function getAlertLevelText(level: string): string {
  const textMap: Record<string, string> = {
    low: '低',
    medium: '中',
    high: '高',
    critical: '紧急',
  };
  return textMap[level] || level;
}

/**
 * 格式化运行时长
 * @param hours 小时数
 * @returns 格式化后的字符串
 */
export function formatRuntime(hours: number): string {
  const days = Math.floor(hours / 24);
  const remainingHours = hours % 24;
  if (days > 0) {
    return `${days}天${remainingHours}小时`;
  }
  return `${hours}小时`;
}

/**
 * 格式化日期时间
 * @param dateStr 日期字符串或Date对象
 * @returns 格式化后的字符串 (YYYY-MM-DD HH:mm:ss)
 */
export function formatDateTime(dateStr: string | Date): string {
  const date = typeof dateStr === 'string' ? new Date(dateStr) : dateStr;
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

/**
 * 格式化日期
 * @param dateStr 日期字符串或Date对象
 * @returns 格式化后的字符串 (YYYY-MM-DD)
 */
export function formatDate(dateStr: string | Date): string {
  const date = typeof dateStr === 'string' ? new Date(dateStr) : dateStr;
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
