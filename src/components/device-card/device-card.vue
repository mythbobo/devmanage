<script setup lang="ts">
import type { IDeviceInfo, IDeviceStatus } from '@/types/device';

interface Props {
  device: IDeviceInfo;
}

defineProps<Props>();
function getStatusText(status: IDeviceStatus): string {
  const statusMap: Record<IDeviceStatus, string> = {
    online: '在线',
    offline: '离线',
    maintenance: '维护中',
    error: '故障',
  };
  return statusMap[status] || '未知';
}

function getStatusColor(status: IDeviceStatus): string {
  const colorMap: Record<IDeviceStatus, string> = {
    online: '#4cd964',
    offline: '#999',
    maintenance: '#f0ad4e',
    error: '#dd524d',
  };
  return colorMap[status] || '#999';
}
</script>

<template>
  <view class="device-card" @click="$emit('click', device)">
    <view class="card-header">
      <text class="device-name">{{ device.name }}</text>
      <view class="device-status" :style="{ backgroundColor: getStatusColor(device.status) }">
        <text class="status-text">{{ getStatusText(device.status) }}</text>
      </view>
    </view>
    <view class="card-body">
      <text class="info-item">设备编号：{{ device.code }}</text>
      <text class="info-item">设备类型：{{ device.type }}</text>
      <text class="info-item">位置：{{ device.location }}</text>
    </view>
    <view v-if="device.lastMaintenanceTime" class="card-footer">
      <text class="maintenance-time">上次维护：{{ device.lastMaintenanceTime }}</text>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.device-card {
  background-color: #fff;
  border-radius: $uni-radius-base;
  padding: $uni-spacing-col-base;
  margin-bottom: $uni-spacing-col-base;
  box-shadow: $uni-shadow-base;

  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: $uni-spacing-row-sm;

    .device-name {
      font-size: 32rpx;
      font-weight: bold;
      color: $uni-text-color;
    }

    .device-status {
      padding: $uni-spacing-row-sm $uni-spacing-row-base;
      border-radius: $uni-radius-circle;

      .status-text {
        font-size: $uni-font-size-sm;
        color: #fff;
      }
    }
  }

  .card-body {
    margin-bottom: $uni-spacing-row-sm;

    .info-item {
      display: block;
      font-size: $uni-font-size-base;
      color: $uni-text-color-grey;
      margin-bottom: $uni-spacing-row-xs;
    }
  }

  .card-footer {
    .maintenance-time {
      font-size: $uni-font-size-sm;
      color: $uni-text-color-placeholder;
    }
  }
}
</style>
