import type { App } from 'vue';
import {
  create,
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
  NInput,
  NInputGroup,
  NInputNumber,
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
  NSpace,
  NStatistic,
  NSwitch,
  NSpin,
  NTabs,
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
      NInput,
      NInputGroup,
      NInputNumber,
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
      NSpace,
      NStatistic,
      NSwitch,
      NSpin,
      NTabs,
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
