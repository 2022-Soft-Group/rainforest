import type { App } from 'vue';
import {
  create,
  NBadge,
  NBreadcrumb,
  NBreadcrumbItem,
  NButton,
  NCard,
  NCheckbox,
  NColorPicker,
  NConfigProvider,
  NDataTable,
  NDescriptions,
  NDescriptionsItem,
  NDialogProvider,
  NDivider,
  NDrawer,
  NDrawerContent,
  NDropdown,
  NEmpty,
  NForm,
  NFormItem,
  NGradientText,
  NGrid,
  NGridItem,
  NIcon,
  NInput,
  NInputGroup,
  NInputNumber,
  NImage,
  NList,
  NListItem,
  NLoadingBarProvider,
  NModal,
  NMenu,
  NMessageProvider,
  NNotificationProvider,
  NPopover,
  NScrollbar,
  NSelect,
  NSkeleton,
  NSpace,
  NStatistic,
  NSwitch,
  NSpin,
  NTabs,
  NTab,
  NTabPane,
  NTag,
  NThing,
  NTimeline,
  NTimelineItem,
  NTooltip,
  NPageHeader,
  NAvatar,
} from 'naive-ui';

/** 按需引入naiveUI */
export default function setupNaiveUI(app: App) {
  const naive = create({
    components: [
      NAvatar,
      NBadge,
      NBreadcrumb,
      NBreadcrumbItem,
      NButton,
      NCard,
      NCheckbox,
      NColorPicker,
      NConfigProvider,
      NDataTable,
      NDescriptions,
      NDescriptionsItem,
      NDialogProvider,
      NDivider,
      NDrawer,
      NDrawerContent,
      NDropdown,
      NEmpty,
      NForm,
      NFormItem,
      NGradientText,
      NGrid,
      NGridItem,
      NIcon,
      NInput,
      NInputGroup,
      NInputNumber,
      NImage,
      NList,
      NListItem,
      NLoadingBarProvider,
      NModal,
      NMenu,
      NMessageProvider,
      NNotificationProvider,
      NPopover,
      NPageHeader,
      NScrollbar,
      NSelect,
      NSkeleton,
      NSpace,
      NStatistic,
      NSwitch,
      NSpin,
      NTabs,
      NTab,
      NTabPane,
      NTag,
      NThing,
      NTimeline,
      NTimelineItem,
      NTooltip,
    ],
  });
  app.use(naive);
}
