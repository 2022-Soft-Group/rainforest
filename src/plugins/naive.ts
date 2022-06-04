import type { App } from 'vue';
import {
  create,
  NBadge,
  NBreadcrumb,
  NBreadcrumbItem,
  NButton,
  NBackTop,
  NCard,
  NCheckbox,
  NColorPicker,
  NConfigProvider,
  NCollapse,
  NCollapseItem,
  NCountdown,
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
  NRadio,
  NScrollbar,
  NSelect,
  NSkeleton,
  NSpace,
  NStatistic,
  NSwitch,
  NSpin,
  NPopselect,
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
  NAnchor,
  NAnchorLink,
  NH1,
  NText,
  NUpload,
  NCarousel,
  NCarouselItem,
} from 'naive-ui';

/** 按需引入naiveUI */
export default function setupNaiveUI(app: App) {
  const naive = create({
    components: [
      NAvatar,
      NBadge,
      NBackTop,
      NBreadcrumb,
      NBreadcrumbItem,
      NButton,
      NCard,
      NCheckbox,
      NColorPicker,
      NConfigProvider,
      NCollapse,
      NCollapseItem,
      NCountdown,
      NCarousel,
      NCarouselItem,
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
      NRadio,
      NScrollbar,
      NSelect,
      NSkeleton,
      NSpace,
      NStatistic,
      NSwitch,
      NSpin,
      NPopselect,
      NTabs,
      NTab,
      NTabPane,
      NTag,
      NThing,
      NTimeline,
      NTimelineItem,
      NTooltip,
      NAnchor,
      NAnchorLink,
      NH1,
      NText,
      NUpload,
    ],
  });
  app.use(naive);
}
