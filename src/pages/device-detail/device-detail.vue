<script setup lang="ts">
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { IDeviceStatus } from '@/types/device';
import type { IDeviceDetail, IMaintenanceRecord, IAlertRecord } from '@/types/device';
import { fetchDeviceDetail, fetchMaintenanceRecords, fetchAlertRecords } from '@/services/device';

const deviceId = ref('');
const deviceDetail = ref<IDeviceDetail | null>(null);
const maintenanceRecords = ref<IMaintenanceRecord[]>([]);
const alertRecords = ref<IAlertRecord[]>([]);
const loading = ref(false);
const activeTab = ref('basic'); // basic, maintenance, alerts

onLoad((options) => {
  if (options?.id) {
    deviceId.value = options.id;
    loadDeviceDetail();
  }
});

async function loadDeviceDetail() {
  if (!deviceId.value) return;

  loading.value = true;
  try {
    const [detail, maintenance, alerts] = await Promise.all([
      fetchDeviceDetail(deviceId.value),
      fetchMaintenanceRecords(deviceId.value),
      fetchAlertRecords(deviceId.value),
    ]);

    deviceDetail.value = detail;
    maintenanceRecords.value = maintenance;
    alertRecords.value = alerts;
  } catch (error) {
    console.error('加载设备详情失败', error);
    uni.showToast({
      title: '加载失败',
      icon: 'error',
    });
  } finally {
    loading.value = false;
  }
}

function getStatusText(status: IDeviceStatus): string {
  const statusMap: Record<IDeviceStatus, string> = {
    [IDeviceStatus.Online]: '在线',
    [IDeviceStatus.Offline]: '离线',
    [IDeviceStatus.Maintenance]: '维护中',
    [IDeviceStatus.Error]: '故障',
  };
  return statusMap[status] || '未知';
}

function getStatusColor(status: IDeviceStatus): string {
  const colorMap: Record<IDeviceStatus, string> = {
    [IDeviceStatus.Online]: '#4cd964',
    [IDeviceStatus.Offline]: '#999',
    [IDeviceStatus.Maintenance]: '#f0ad4e',
    [IDeviceStatus.Error]: '#dd524d',
  };
  return colorMap[status] || '#999';
}

function getAlertLevelColor(level: string): string {
  const colorMap: Record<string, string> = {
    low: '#f0ad4e',
    medium: '#ff9800',
    high: '#ff5722',
    critical: '#dd524d',
  };
  return colorMap[level] || '#999';
}

function getAlertLevelText(level: string): string {
  const textMap: Record<string, string> = {
    low: '低',
    medium: '中',
    high: '高',
    critical: '紧急',
  };
  return textMap[level] || level;
}

function formatRuntime(hours: number): string {
  const days = Math.floor(hours / 24);
  const remainingHours = hours % 24;
  if (days > 0) {
    return `${days}天${remainingHours}小时`;
  }
  return `${hours}小时`;
}

function goBack() {
  uni.navigateBack();
}
</script>

<template>
  <view class="device-detail-container">
    <!-- 头部 -->
    <view class="header">
      <view class="back-btn" @click="goBack">
        <text class="back-icon">←</text>
      </view>
      <text class="title">设备详情</text>
      <view class="placeholder"></view>
    </view>

    <!-- 加载状态 -->
    <view v-if="loading" class="loading-container">
      <text class="loading-text">加载中...</text>
    </view>

    <template v-else-if="deviceDetail">
      <!-- 设备概览卡片 -->
      <view class="overview-card">
        <view class="device-header">
          <text class="device-name">{{ deviceDetail.name }}</text>
          <view
            class="device-status"
            :style="{ backgroundColor: getStatusColor(deviceDetail.status) }"
          >
            <text class="status-text">{{ getStatusText(deviceDetail.status) }}</text>
          </view>
        </view>
        <view class="device-code">编号: {{ deviceDetail.code }}</view>
      </view>

      <!-- 标签切换 -->
      <view class="tab-bar">
        <view
          class="tab-item"
          :class="{ active: activeTab === 'basic' }"
          @click="activeTab = 'basic'"
        >
          基本信息
        </view>
        <view
          class="tab-item"
          :class="{ active: activeTab === 'maintenance' }"
          @click="activeTab = 'maintenance'"
        >
          维护记录({{ maintenanceRecords.length }})
        </view>
        <view
          class="tab-item"
          :class="{ active: activeTab === 'alerts' }"
          @click="activeTab = 'alerts'"
        >
          报警记录({{ alertRecords.length }})
        </view>
      </view>

      <!-- 基本信息 -->
      <view v-if="activeTab === 'basic'" class="tab-content">
        <!-- 基本信息卡片 -->
        <view class="info-card">
          <view class="card-title">基本信息</view>
          <view class="info-list">
            <view class="info-row">
              <text class="info-label">设备类型</text>
              <text class="info-value">{{ deviceDetail.type }}</text>
            </view>
            <view class="info-row">
              <text class="info-label">所在位置</text>
              <text class="info-value">{{ deviceDetail.location }}</text>
            </view>
            <view class="info-row">
              <text class="info-label">创建时间</text>
              <text class="info-value">{{ deviceDetail.createTime }}</text>
            </view>
            <view class="info-row" v-if="deviceDetail.lastMaintenanceTime">
              <text class="info-label">上次维护</text>
              <text class="info-value">{{ deviceDetail.lastMaintenanceTime }}</text>
            </view>
          </view>
        </view>

        <!-- 技术参数卡片 -->
        <view class="info-card" v-if="deviceDetail.manufacturer || deviceDetail.model">
          <view class="card-title">技术参数</view>
          <view class="info-list">
            <view class="info-row" v-if="deviceDetail.manufacturer">
              <text class="info-label">制造商</text>
              <text class="info-value">{{ deviceDetail.manufacturer }}</text>
            </view>
            <view class="info-row" v-if="deviceDetail.model">
              <text class="info-label">型号</text>
              <text class="info-value">{{ deviceDetail.model }}</text>
            </view>
            <view class="info-row" v-if="deviceDetail.serialNumber">
              <text class="info-label">序列号</text>
              <text class="info-value">{{ deviceDetail.serialNumber }}</text>
            </view>
            <view class="info-row" v-if="deviceDetail.purchaseDate">
              <text class="info-label">购买日期</text>
              <text class="info-value">{{ deviceDetail.purchaseDate }}</text>
            </view>
            <view class="info-row" v-if="deviceDetail.warrantyExpiry">
              <text class="info-label">保修到期</text>
              <text class="info-value">{{ deviceDetail.warrantyExpiry }}</text>
            </view>
          </view>
        </view>

        <!-- 运行数据卡片 -->
        <view class="info-card" v-if="deviceDetail.runtime !== undefined">
          <view class="card-title">运行数据</view>
          <view class="runtime-grid">
            <view class="runtime-item">
              <text class="runtime-value">{{ formatRuntime(deviceDetail.runtime || 0) }}</text>
              <text class="runtime-label">累计运行时长</text>
            </view>
            <view class="runtime-item" v-if="deviceDetail.temperature !== undefined">
              <text class="runtime-value">{{ deviceDetail.temperature }}°C</text>
              <text class="runtime-label">当前温度</text>
            </view>
            <view class="runtime-item" v-if="deviceDetail.pressure !== undefined">
              <text class="runtime-value">{{ deviceDetail.pressure }}MPa</text>
              <text class="runtime-label">当前压力</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 维护记录 -->
      <view v-else-if="activeTab === 'maintenance'" class="tab-content">
        <view v-if="maintenanceRecords.length === 0" class="empty-state">
          <text class="empty-text">暂无维护记录</text>
        </view>
        <view v-else class="record-list">
          <view v-for="record in maintenanceRecords" :key="record.id" class="record-item">
            <view class="record-header">
              <text class="record-type">{{ record.maintenanceType }}</text>
              <text class="record-time">{{ record.maintenanceTime }}</text>
            </view>
            <text class="record-desc">{{ record.description }}</text>
            <view class="record-footer">
              <text class="record-operator">操作人: {{ record.operator }}</text>
              <text v-if="record.cost" class="record-cost">费用: ¥{{ record.cost }}</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 报警记录 -->
      <view v-else-if="activeTab === 'alerts'" class="tab-content">
        <view v-if="alertRecords.length === 0" class="empty-state">
          <text class="empty-text">暂无报警记录</text>
        </view>
        <view v-else class="record-list">
          <view
            v-for="alert in alertRecords"
            :key="alert.id"
            class="alert-item"
            :class="{ resolved: alert.status === 'resolved' }"
          >
            <view class="alert-header">
              <view
                class="alert-level"
                :style="{ backgroundColor: getAlertLevelColor(alert.alertLevel) }"
              >
                <text class="level-text">{{ getAlertLevelText(alert.alertLevel) }}</text>
              </view>
              <text class="alert-type">{{ alert.alertType }}</text>
            </view>
            <text class="alert-message">{{ alert.message }}</text>
            <view class="alert-footer">
              <text class="alert-time">{{ alert.createTime }}</text>
              <text v-if="alert.status === 'resolved'" class="resolved-badge">已解决</text>
              <text v-else class="active-badge">未解决</text>
            </view>
          </view>
        </view>
      </view>
    </template>
  </view>
</template>

<style lang="scss" scoped>
.device-detail-container {
  min-height: 100vh;
  background-color: $uni-bg-color;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: $uni-spacing-col-base;
  background-color: #fff;
  border-bottom: 1px solid $uni-border-color;

  .back-btn {
    padding: $uni-spacing-row-sm;

    .back-icon {
      font-size: 36rpx;
      color: $uni-text-color;
    }
  }

  .title {
    font-size: $uni-font-size-lg;
    font-weight: bold;
    color: $uni-text-color;
  }

  .placeholder {
    width: 60rpx;
  }
}

.loading-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: $uni-spacing-col-xl;

  .loading-text {
    font-size: $uni-font-size-base;
    color: $uni-text-color-grey;
  }
}

.overview-card {
  background-color: #fff;
  padding: $uni-spacing-col-lg;
  margin-bottom: $uni-spacing-col-base;

  .device-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: $uni-spacing-row-sm;

    .device-name {
      font-size: 40rpx;
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

  .device-code {
    font-size: $uni-font-size-base;
    color: $uni-text-color-grey;
  }
}

.tab-bar {
  display: flex;
  background-color: #fff;
  border-bottom: 1px solid $uni-border-color;

  .tab-item {
    flex: 1;
    padding: $uni-spacing-col-base;
    text-align: center;
    font-size: $uni-font-size-base;
    color: $uni-text-color-grey;
    border-bottom: 4rpx solid transparent;

    &.active {
      color: $uni-color-primary;
      border-bottom-color: $uni-color-primary;
    }
  }
}

.tab-content {
  padding: $uni-spacing-col-base;
}

.info-card {
  background-color: #fff;
  border-radius: $uni-radius-base;
  padding: $uni-spacing-col-base;
  margin-bottom: $uni-spacing-col-base;

  .card-title {
    font-size: $uni-font-size-lg;
    font-weight: bold;
    color: $uni-text-color;
    margin-bottom: $uni-spacing-col-base;
    padding-bottom: $uni-spacing-col-base;
    border-bottom: 1px solid $uni-border-color;
  }

  .info-list {
    .info-row {
      display: flex;
      justify-content: space-between;
      padding: $uni-spacing-col-sm 0;
      border-bottom: 1px solid $uni-bg-color;

      &:last-child {
        border-bottom: none;
      }

      .info-label {
        font-size: $uni-font-size-base;
        color: $uni-text-color-grey;
      }

      .info-value {
        font-size: $uni-font-size-base;
        color: $uni-text-color;
        font-weight: 500;
      }
    }
  }

  .runtime-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: $uni-spacing-col-base;

    .runtime-item {
      text-align: center;
      padding: $uni-spacing-col-base;
      background-color: $uni-bg-color;
      border-radius: $uni-radius-base;

      .runtime-value {
        display: block;
        font-size: 36rpx;
        font-weight: bold;
        color: $uni-color-primary;
        margin-bottom: $uni-spacing-row-xs;
      }

      .runtime-label {
        font-size: $uni-font-size-sm;
        color: $uni-text-color-grey;
      }
    }
  }
}

.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: $uni-spacing-col-xl;
  background-color: #fff;
  border-radius: $uni-radius-base;

  .empty-text {
    font-size: $uni-font-size-base;
    color: $uni-text-color-grey;
  }
}

.record-list {
  .record-item {
    background-color: #fff;
    border-radius: $uni-radius-base;
    padding: $uni-spacing-col-base;
    margin-bottom: $uni-spacing-col-base;

    .record-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: $uni-spacing-row-sm;

      .record-type {
        font-size: $uni-font-size-base;
        font-weight: bold;
        color: $uni-text-color;
      }

      .record-time {
        font-size: $uni-font-size-sm;
        color: $uni-text-color-grey;
      }
    }

    .record-desc {
      font-size: $uni-font-size-base;
      color: $uni-text-color-grey;
      margin-bottom: $uni-spacing-row-sm;
      line-height: 1.5;
    }

    .record-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .record-operator {
        font-size: $uni-font-size-sm;
        color: $uni-text-color-grey;
      }

      .record-cost {
        font-size: $uni-font-size-sm;
        color: $uni-color-primary;
        font-weight: bold;
      }
    }
  }

  .alert-item {
    background-color: #fff;
    border-radius: $uni-radius-base;
    padding: $uni-spacing-col-base;
    margin-bottom: $uni-spacing-col-base;
    border-left: 8rpx solid #dd524d;

    &.resolved {
      border-left-color: #4cd964;
    }

    .alert-header {
      display: flex;
      align-items: center;
      margin-bottom: $uni-spacing-row-sm;

      .alert-level {
        padding: $uni-spacing-row-xs $uni-spacing-row-sm;
        border-radius: $uni-radius-base;
        margin-right: $uni-spacing-row-sm;

        .level-text {
          font-size: $uni-font-size-sm;
          color: #fff;
          font-weight: bold;
        }
      }

      .alert-type {
        font-size: $uni-font-size-base;
        font-weight: bold;
        color: $uni-text-color;
      }
    }

    .alert-message {
      font-size: $uni-font-size-base;
      color: $uni-text-color-grey;
      margin-bottom: $uni-spacing-row-sm;
      line-height: 1.5;
    }

    .alert-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .alert-time {
        font-size: $uni-font-size-sm;
        color: $uni-text-color-grey;
      }

      .resolved-badge {
        font-size: $uni-font-size-sm;
        color: #4cd964;
        background-color: rgba(76, 217, 100, 0.1);
        padding: $uni-spacing-row-xs $uni-spacing-row-sm;
        border-radius: $uni-radius-base;
      }

      .active-badge {
        font-size: $uni-font-size-sm;
        color: #dd524d;
        background-color: rgba(221, 82, 77, 0.1);
        padding: $uni-spacing-row-xs $uni-spacing-row-sm;
        border-radius: $uni-radius-base;
      }
    }
  }
}
</style>
