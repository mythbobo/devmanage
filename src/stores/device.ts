import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { IDeviceInfo, IDeviceStatus } from '@/types/device';
import { fetchDeviceList } from '@/services/device';

export const useDeviceStore = defineStore('device', () => {
  const deviceList = ref<IDeviceInfo[]>([]);
  const totalCount = ref(0);
  const currentPage = ref(1);
  const pageSize = ref(10);
  const loading = ref(false);
  const keyword = ref('');
  const filterStatus = ref<IDeviceStatus | undefined>(undefined);
  const hasMore = computed(() => deviceList.value.length < totalCount.value);

  async function loadDevices(refresh = false) {
    if (loading.value) return;

    loading.value = true;

    try {
      const request = {
        page: refresh ? 1 : currentPage.value,
        pageSize: pageSize.value,
        keyword: keyword.value || undefined,
        status: filterStatus.value,
      };

      const response = await fetchDeviceList(request);

      if (refresh) {
        deviceList.value = response.list;
      } else {
        deviceList.value = [...deviceList.value, ...response.list];
      }

      totalCount.value = response.total;
      currentPage.value = refresh ? 1 : currentPage.value;
    } catch (error) {
      console.error('加载设备列表失败', error);
      uni.showToast({
        title: '加载失败',
        icon: 'error',
      });
    } finally {
      loading.value = false;
    }
  }

  function searchDevices(newKeyword: string) {
    keyword.value = newKeyword;
    currentPage.value = 1;
    deviceList.value = [];
    return loadDevices(true);
  }

  function filterDevices(status: IDeviceStatus | undefined) {
    filterStatus.value = status;
    currentPage.value = 1;
    deviceList.value = [];
    return loadDevices(true);
  }

  function refreshDevices() {
    currentPage.value = 1;
    return loadDevices(true);
  }

  function loadMore() {
    if (loading.value || !hasMore.value) return;
    currentPage.value++;
    return loadDevices();
  }

  // 设置初始筛选状态（从URL参数）
  function setInitialFilter(status: IDeviceStatus | undefined) {
    filterStatus.value = status;
  }

  return {
    deviceList,
    totalCount,
    currentPage,
    pageSize,
    loading,
    keyword,
    filterStatus,
    hasMore,
    loadDevices,
    searchDevices,
    filterDevices,
    refreshDevices,
    loadMore,
    setInitialFilter,
  };
});
