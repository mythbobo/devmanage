<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useDeviceStore } from '@/stores/device';
import { IDeviceStatus } from '@/types/device';
import type { IDeviceInfo } from '@/types/device';

const deviceStore = useDeviceStore();

const searchText = ref('');
const currentStatus = ref<IDeviceStatus | undefined>(undefined);

onMounted(() => {
  deviceStore.loadDevices(true);
});

function handleRefresh() {
  deviceStore.refreshDevices();
}

function handleLoadMore() {
  deviceStore.loadMore();
}

function handleSearch() {
  deviceStore.searchDevices(searchText.value);
}

function handleFilter(status?: IDeviceStatus) {
  currentStatus.value = status;
  deviceStore.filterDevices(status);
}

function getStatusText(status: IDeviceStatus): string {
  const statusMap: Record<string, string> = {
    online: '在线',
    offline: '离线',
    maintenance: '维护中',
    error: '故障',
  };
  return statusMap[status] || '未知';
}

function getStatusColor(status: IDeviceStatus): string {
  const colorMap: Record<string, string> = {
    online: '#4cd964',
    offline: '#999',
    maintenance: '#f0ad4e',
    error: '#dd524d',
  };
  return colorMap[status] || '#999';
}

function handleDeviceClick(device: IDeviceInfo) {
  uni.navigateTo({
    url: `/pages/device-detail/device-detail?id=${device.id}`,
  });
}
</script>

<template>
  <view class="device-list-container">
    <view class="search-bar">
      <input
        class="search-input"
        placeholder="搜索设备..."
        :value="searchText"
        @input="handleSearch"
      />
    </view>

    <view class="filter-bar">
      <view
        class="filter-item"
        :class="{ active: currentStatus === undefined }"
        @click="handleFilter(undefined)"
      >
        全部
      </view>
      <view
        class="filter-item"
        :class="{ active: currentStatus === IDeviceStatus.Online }"
        @click="handleFilter(IDeviceStatus.Online)"
      >
        在线
      </view>
      <view
        class="filter-item"
        :class="{ active: currentStatus === IDeviceStatus.Offline }"
        @click="handleFilter(IDeviceStatus.Offline)"
      >
        离线
      </view>
      <view
        class="filter-item"
        :class="{ active: currentStatus === IDeviceStatus.Maintenance }"
        @click="handleFilter(IDeviceStatus.Maintenance)"
      >
        维护中
      </view>
      <view
        class="filter-item"
        :class="{ active: currentStatus === IDeviceStatus.Error }"
        @click="handleFilter(IDeviceStatus.Error)"
      >
        故障
      </view>
    </view>

    <scroll-view
      class="device-list"
      scroll-y
      :refresher-enabled="true"
      :refresher-triggered="deviceStore.loading"
      @refresherrefresh="handleRefresh"
      @scrolltolower="handleLoadMore"
    >
      <view v-if="deviceStore.deviceList.length === 0 && !deviceStore.loading" class="empty">
        <text class="empty-text">暂无设备</text>
      </view>

      <view
        v-for="device in deviceStore.deviceList"
        :key="device.id"
        class="device-item"
        @click="handleDeviceClick(device)"
      >
        <view class="device-header">
          <text class="device-name">{{ device.name }}</text>
          <view class="device-status" :style="{ backgroundColor: getStatusColor(device.status) }">
            <text class="status-text">{{ getStatusText(device.status) }}</text>
          </view>
        </view>
        <view class="device-info">
          <text class="info-item">设备编号：{{ device.code }}</text>
          <text class="info-item">设备类型：{{ device.type }}</text>
          <text class="info-item">位置：{{ device.location }}</text>
        </view>
        <view v-if="device.lastMaintenanceTime" class="device-footer">
          <text class="maintenance-time">上次维护：{{ device.lastMaintenanceTime }}</text>
        </view>
      </view>

      <view v-if="deviceStore.loading" class="loading-more">
        <text class="loading-text">加载中...</text>
      </view>

      <view v-if="!deviceStore.hasMore && deviceStore.deviceList.length > 0" class="no-more">
        <text class="no-more-text">没有更多了</text>
      </view>
    </scroll-view>
  </view>
</template>

<style lang="scss" scoped>
.device-list-container {
  min-height: 100vh;
  background-color: $uni-bg-color;
  display: flex;
  flex-direction: column;
}

.search-bar {
  padding: $uni-spacing-col-base;
  background-color: #fff;

  .search-input {
    width: 100%;
    height: 72rpx;
    padding: 0 $uni-spacing-row-base;
    border: 1px solid $uni-border-color;
    border-radius: $uni-radius-lg;
    background-color: #f5f5f5;
    font-size: $uni-font-size-base;
  }
}

.filter-bar {
  display: flex;
  padding: $uni-spacing-row-base $uni-spacing-col-base;
  background-color: #fff;
  border-bottom: 1px solid $uni-border-color;

  .filter-item {
    padding: $uni-spacing-row-sm $uni-spacing-row-base;
    margin-right: $uni-spacing-row-base;
    border-radius: $uni-radius-base;
    font-size: $uni-font-size-base;
    color: $uni-text-color-grey;

    &.active {
      background-color: $uni-color-primary;
      color: #fff;
    }
  }
}

.device-list {
  flex: 1;
  padding: $uni-spacing-col-base;

  .empty {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: $uni-spacing-col-xl;

    .empty-text {
      font-size: $uni-font-size-base;
      color: $uni-text-color-grey;
    }
  }

  .device-item {
    background-color: #fff;
    border-radius: $uni-radius-base;
    padding: $uni-spacing-col-base;
    margin-bottom: $uni-spacing-col-base;
    box-shadow: $uni-shadow-base;

    .device-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: $uni-spacing-row-sm;

      .device-name {
        font: 32rpx;
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

    .device-info {
      margin-bottom: $uni-spacing-row-sm;

      .info-item {
        display: block;
        font-size: $uni-font-size-base;
        color: $uni-text-color-grey;
        margin-bottom: $uni-spacing-row-xs;
      }
    }

    .device-footer {
      .maintenance-time {
        font-size: $uni-font-size-sm;
        color: $uni-text-color-placeholder;
      }
    }
  }

  .loading-more,
  .no-more {
    padding: $uni-spacing-col-base;
    text-align: center;

    .loading-text,
    .no-more-text {
      font-size: $uni-font-size-base;
      color: $uni-text-color-grey;
    }
  }
}
</style>
