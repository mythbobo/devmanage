<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { useDeviceStore } from '@/stores/device';
import { IDeviceStatus } from '@/types/device';
import type { IDeviceInfo } from '@/types/device';
import { getDeviceStatusText, getDeviceStatusColor } from '@/utils/device';

const deviceStore = useDeviceStore();

const searchText = ref('');
const currentStatus = ref<IDeviceStatus | undefined>(undefined);
let searchTimer: ReturnType<typeof setTimeout> | null = null;

onLoad((options) => {
  // 从URL参数中获取筛选状态
  if (options?.status) {
    currentStatus.value = options.status as IDeviceStatus;
    deviceStore.setInitialFilter(currentStatus.value);
  }
});

onMounted(() => {
  deviceStore.loadDevices(true);
});

onUnmounted(() => {
  // 清理定时器
  if (searchTimer) {
    clearTimeout(searchTimer);
  }
});

function handleRefresh() {
  deviceStore.refreshDevices();
}

function handleLoadMore() {
  deviceStore.loadMore();
}

// 防抖搜索
function handleSearchInput() {
  // 清除之前的定时器
  if (searchTimer) {
    clearTimeout(searchTimer);
  }
  // 设置新的定时器，300ms后执行搜索
  searchTimer = setTimeout(() => {
    deviceStore.searchDevices(searchText.value);
  }, 300);
}

// 清除搜索
function clearSearch() {
  searchText.value = '';
  deviceStore.searchDevices('');
}

function handleFilter(status?: IDeviceStatus) {
  currentStatus.value = status;
  deviceStore.filterDevices(status);
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
      <view class="search-input-wrapper">
        <text class="search-icon">🔍</text>
        <input
          class="search-input"
          placeholder="搜索设备名称、编号..."
          v-model="searchText"
          @input="handleSearchInput"
          confirm-type="search"
          @confirm="handleSearchInput"
        />
        <view v-if="searchText" class="clear-btn" @click="clearSearch">
          <text class="clear-icon">✕</text>
        </view>
      </view>
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
          <view class="device-status" :style="{ backgroundColor: getDeviceStatusColor(device.status) }">
            <text class="status-text">{{ getDeviceStatusText(device.status) }}</text>
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

  .search-input-wrapper {
    display: flex;
    align-items: center;
    background-color: #f5f5f5;
    border-radius: $uni-radius-lg;
    padding: 0 $uni-spacing-row-base;
    height: 72rpx;

    .search-icon {
      font-size: 28rpx;
      margin-right: $uni-spacing-row-sm;
      color: $uni-text-color-grey;
    }

    .search-input {
      flex: 1;
      height: 100%;
      font-size: $uni-font-size-base;
      background: transparent;
      border: none;

      &::placeholder {
        color: $uni-text-color-placeholder;
      }
    }

    .clear-btn {
      padding: $uni-spacing-row-sm;

      .clear-icon {
        font-size: 24rpx;
        color: $uni-text-color-grey;
      }
    }
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
