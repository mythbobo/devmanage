<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app';

onLaunch(() => {
  console.warn('App Launch');
});

onShow(() => {
  console.warn('App Show');
});

onHide(() => {
  console.warn('App Hide');
});
</script>

<style lang="scss">
@import '@/uni.scss';

page {
  background-color: $uni-bg-color;
  font-size: $uni-font-size-base;
  color: $uni-text-color;
}
</style>
