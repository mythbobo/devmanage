<script setup lang="ts">import { ref, onMounted } from 'vue';
import { IDeviceStatus } from '@/types/device';
import type { IAlertRecord } from '@/types/device';
import {
  getDeviceStatusText,
  getDeviceStatusColor,
  getAlertLevelColor,
  getAlertLevelText,
} from '@/utils/device';

interface IDeviceStats {
  total: number;
  online: number;
  offline: number;
  error: number;
  maintenance: number;
}

const deviceStats = ref<IDeviceStats>({
  total: 0,
  online: 0,
  offline: 0,
  error: 0,
  maintenance: 0,
});

const recentAlerts = ref<IAlertRecord[]>([]);
const loading = ref(false);

onMounted(() => {
  loadDeviceStats();
  loadRecentAlerts();
});

// 加载设备统计数据
async function loadDeviceStats() {
  loading.value = true;
  try {
    // 模拟数据 - 实际项目中应从API获取
    // const response = await fetchDeviceStats();
    // deviceStats.value = response;

    // 模拟数据
    setTimeout(() => {
      deviceStats.value = {
        total: 128,
        online: 98,
        offline: 15,
        error: 8,
        maintenance: 7,
      };
    }, 500);
  } catch (error) {
    console.error('加载设备统计失败', error);
  } finally {
    loading.value = false;
  }
}

// 加载最近告警
async function loadRecentAlerts() {
  try {
    // 模拟数据 - 实际项目中应从API获取
    // const response = await fetchRecentAlerts();
    // recentAlerts.value = response;

    // 模拟数据
    setTimeout(() => {
      recentAlerts.value = [
        {
          id: '1',
          deviceId: 'dev-001',
          alertType: '温度异常',
          alertLevel: 'high',
          message: '设备温度超过阈值，当前温度: 85°C',
          createTime: '2024-01-15 14:30:00',
          status: 'active',
        },
        {
          id: '2',
          deviceId: 'dev-002',
          alertType: '压力异常',
          alertLevel: 'critical',
          message: '设备压力异常，当前压力: 2.5MPa',
          createTime: '2024-01-15 13:15:00',
          status: 'active',
        },
        {
          id: '3',
          deviceId: 'dev-003',
          alertType: '离线告警',
          alertLevel: 'medium',
          message: '设备已离线超过30分钟',
          createTime: '2024-01-15 12:00:00',
          status: 'resolved',
          resolvedTime: '2024-01-15 12:30:00',
        },
      ];
    }, 600);
  } catch (error) {
    console.error('加载最近告警失败', error);
  }
}

// 跳转到设备列表
function goToDeviceList() {
  uni.navigateTo({
    url: '/pages/device-list/device-list',
  });
}

// 跳转到设备列表并筛选指定状态
function goToDeviceListByStatus(status: IDeviceStatus) {
  uni.navigateTo({
    url: `/pages/device-list/device-list?status=${status}`,
  });
}

// 获取告警等级颜色
function getAlertLevelColor(level: string): string {
  const colorMap: Record<string, string> = {
    low: '#f0ad4e',
    medium: '#ff9800',
    high: '#ff5722',
    critical: '#dd524d',
  };
  return colorMap[level] || '#999';
}

// 获取告警等级文本
function getAlertLevelText(level: string): string {
  const textMap: Record<string, string> = {
    low: '低',
    medium: '中',
    high: '高',
    critical: '紧急',
  };
  return textMap[level] || level;
}

// 获取状态颜色（使用工具函数）
function getStatusColor(status: IDeviceStatus): string {
  return getDeviceStatusColor(status);
}
</script>

<template>
  <view class="home-container">
    <!-- 页面标题 -->
    <view class="page-header">
      <text class="page-title">设备管理看板</text>
      <text class="page-subtitle">实时监控设备运行状态</text>
    </view>

    <!-- 设备统计卡片 -->
    <view class="stats-section">
      <view class="stats-card total" @click="goToDeviceList">
        <view class="stats-icon">📊</view>
        <view class="stats-info">
          <text class="stats-value">{{ deviceStats.total }}</text>
          <text class="stats-label">设备总数</text>
        </view>
      </view>

      <view class="stats-row">
        <view class="stats-item online" @click="goToDeviceListByStatus(IDeviceStatus.Online)">
          <view class="status-dot" :style="{ backgroundColor: getStatusColor(IDeviceStatus.Online) }"></view>
          <text class="item-value">{{ deviceStats.online }}</text>
          <text class="item-label">在线</text>
        </view>

        <view class="stats-item offline" @click="goToDeviceListByStatus(IDeviceStatus.Offline)">
          <view class="status-dot" :style="{ backgroundColor: getStatusColor(IDeviceStatus.Offline) }"></view>
          <text class="item-value">{{ deviceStats.offline }}</text>
          <text class="item-label">离线</text>
        </view>

        <view class="stats-item error" @click="goToDeviceListByStatus(IDeviceStatus.Error)">
          <view class="status-dot" :style="{ backgroundColor: getStatusColor(IDeviceStatus.Error) }"></view>
          <text class="item-value">{{ deviceStats.error }}</text>
          <text class="item-label">故障</text>
        </view>

        <view class="stats-item maintenance" @click="goToDeviceListByStatus(IDeviceStatus.Maintenance)">
          <view class="status-dot" :style="{ backgroundColor: getStatusColor(IDeviceStatus.Maintenance) }"></view>
          <text class="item-value">{{ deviceStats.maintenance }}</text>
          <text class="item-label">维护</text>
        </view>
      </view>
    </view>

    <!-- 功能入口 -->
    <view class="quick-actions">
      <view class="section-title">快捷功能</view>
      <view class="actions-grid">
        <view class="action-item" @click="goToDeviceList">
          <view class="action-icon primary">📋</view>
          <text class="action-label">设备列表</text>
        </view>
        <view class="action-item" @click="goToDeviceListByStatus(IDeviceStatus.Error)">
          <view class="action-icon danger">⚠️</view>
          <text class="action-label">故障设备</text>
        </view>
        <view class="action-item" @click="goToDeviceListByStatus(IDeviceStatus.Maintenance)">
          <view class="action-icon warning">🔧</view>
          <text class="action-label">维护计划</text>
        </view>
        <view class="action-item" @click="goToDeviceListByStatus(IDeviceStatus.Offline)">
          <view class="action-icon info">📴</view>
          <text class="action-label">离线设备</text>
        </view>
      </view>
    </view>

    <!-- 最近告警 -->
    <view class="alerts-section">
      <view class="section-header">
        <text class="section-title">最近告警</text>
        <text class="view-all" @click="goToDeviceListByStatus(IDeviceStatus.Error)">查看全部</text>
      </view>

      <view v-if="recentAlerts.length === 0" class="empty-alerts">
        <text class="empty-text">暂无告警信息</text>
      </view>

      <view v-else class="alerts-list">
        <view
          v-for="alert in recentAlerts.slice(0, 3)"
          :key="alert.id"
          class="alert-card"
          :class="{ resolved: alert.status === 'resolved' }"
        >
          <view class="alert-header">
            <view
              class="alert-level-badge"
              :style="{ backgroundColor: getAlertLevelColor(alert.alertLevel) }"
            >
              {{ getAlertLevelText(alert.alertLevel) }}
            </view>
            <text class="alert-type">{{ alert.alertType }}</text>
            <view v-if="alert.status === 'resolved'" class="resolved-tag">已解决</view>
          </view>
          <text class="alert-message">{{ alert.message }}</text>
          <text class="alert-time">{{ alert.createTime }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.home-container {
  min-height: 100vh;
  background-color: $uni-bg-color;
  padding-bottom: $uni-spacing-col-lg;
}

.page-header {
  background: linear-gradient(135deg, $uni-color-primary 0%, darken($uni-color-primary, 10%) 100%);
  padding: $uni-spacing-col-xl $uni-spacing-col-lg;
  padding-top: 80rpx;

  .page-title {
    display: block;
    font-size: 48rpx;
    font-weight: bold;
    color: #fff;
    margin-bottom: $uni-spacing-row-sm;
  }

  .page-subtitle {
    display: block;
    font-size: $uni-font-size-base;
    color: rgba(255, 255, 255, 0.8);
  }
}

// 统计区域
.stats-section {
  margin: -60rpx $uni-spacing-col-lg $uni-spacing-col-lg;

  .stats-card {
    background: #fff;
    border-radius: $uni-radius-lg;
    padding: $uni-spacing-col-lg;
    display: flex;
    align-items: center;
    box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
    margin-bottom: $uni-spacing-col-base;

    &.total {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

      .stats-icon {
        background: rgba(255, 255, 255, 0.2);
      }

      .stats-value,
      .stats-label {
        color: #fff;
      }
    }

    .stats-icon {
      width: 100rpx;
      height: 100rpx;
      border-radius: $uni-radius-circle;
      background: rgba(102, 126, 234, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 48rpx;
      margin-right: $uni-spacing-col-base;
    }

    .stats-info {
      flex: 1;

      .stats-value {
        display: block;
        font-size: 48rpx;
        font-weight: bold;
        color: $uni-text-color;
        margin-bottom: $uni-spacing-row-xs;
      }

      .stats-label {
        display: block;
        font-size: $uni-font-size-base;
        color: $uni-text-color-grey;
      }
    }
  }

  .stats-row {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: $uni-spacing-col-sm;

    .stats-item {
      background: #fff;
      border-radius: $uni-radius-base;
      padding: $uni-spacing-col-base;
      text-align: center;
      box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);

      .status-dot {
        width: 16rpx;
        height: 16rpx;
        border-radius: $uni-radius-circle;
        margin: 0 auto $uni-spacing-row-xs;
      }

      .item-value {
        display: block;
        font-size: 36rpx;
        font-weight: bold;
        color: $uni-text-color;
        margin-bottom: $uni-spacing-row-xs;
      }

      .item-label {
        display: block;
        font-size: $uni-font-size-sm;
        color: $uni-text-color-grey;
      }
    }
  }
}

// 快捷功能
.quick-actions {
  background: #fff;
  margin: 0 $uni-spacing-col-lg $uni-spacing-col-lg;
  border-radius: $uni-radius-lg;
  padding: $uni-spacing-col-lg;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);

  .section-title {
    display: block;
    font-size: $uni-font-size-lg;
    font-weight: bold;
    color: $uni-text-color;
    margin-bottom: $uni-spacing-col-base;
  }

  .actions-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: $uni-spacing-col-base;

    .action-item {
      text-align: center;

      .action-icon {
        width: 100rpx;
        height: 100rpx;
        border-radius: $uni-radius-circle;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 48rpx;
        margin: 0 auto $uni-spacing-row-sm;

        &.primary {
          background: rgba(102, 126, 234, 0.1);
        }

        &.danger {
          background: rgba(221, 82, 77, 0.1);
        }

        &.warning {
          background: rgba(240, 173, 78, 0.1);
        }

        &.info {
          background: rgba(153, 153, 153, 0.1);
        }
      }

      .action-label {
        display: block;
        font-size: $uni-font-size-sm;
        color: $uni-text-color-grey;
      }
    }
  }
}

// 告警区域
.alerts-section {
  margin: 0 $uni-spacing-col-lg;

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: $uni-spacing-col-base;

    .section-title {
      font-size: $uni-font-size-lg;
      font-weight: bold;
      color: $uni-text-color;
    }

    .view-all {
      font-size: $uni-font-size-sm;
      color: $uni-color-primary;
    }
  }

  .empty-alerts {
    background: #fff;
    border-radius: $uni-radius-base;
    padding: $uni-spacing-col-xl;
    text-align: center;
    box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);

    .empty-text {
      font-size: $uni-font-size-base;
      color: $uni-text-color-grey;
    }
  }

  .alerts-list {
    .alert-card {
      background: #fff;
      border-radius: $uni-radius-base;
      padding: $uni-spacing-col-base;
      margin-bottom: $uni-spacing-col-base;
      box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
      border-left: 8rpx solid #dd524d;

      &.resolved {
        border-left-color: #4cd964;
      }

      .alert-header {
        display: flex;
        align-items: center;
        margin-bottom: $uni-spacing-row-sm;

        .alert-level-badge {
          padding: $uni-spacing-row-xs $uni-spacing-row-sm;
          border-radius: $uni-radius-base;
          font-size: $uni-font-size-xs;
          color: #fff;
          font-weight: bold;
          margin-right: $uni-spacing-row-sm;
        }

        .alert-type {
          font-size: $uni-font-size-base;
          font-weight: bold;
          color: $uni-text-color;
          flex: 1;
        }

        .resolved-tag {
          font-size: $uni-font-size-xs;
          color: #4cd964;
          background: rgba(76, 217, 100, 0.1);
          padding: $uni-spacing-row-xs $uni-spacing-row-sm;
          border-radius: $uni-radius-base;
        }
      }

      .alert-message {
        display: block;
        font-size: $uni-font-size-base;
        color: $uni-text-color-grey;
        margin-bottom: $uni-spacing-row-sm;
        line-height: 1.5;
      }

      .alert-time {
        display: block;
        font-size: $uni-font-size-sm;
        color: $uni-text-color-placeholder;
      }
    }
  }
}
</style>