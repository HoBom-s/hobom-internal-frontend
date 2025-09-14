import { RoutesConfig } from "./routes.config";

// 라우트 설정만 export (컴포넌트 import는 app 레이어에서 처리)
export const routesConfig = [
  {
    path: RoutesConfig.MAIN.DASHBOARD,
    // app 레이어에서 실제 컴포넌트를 주입받도록 함
    layoutKey: "AppLayout",
    children: [
      {
        index: true,
        pageKey: "DashboardPage",
      },
      // Analytics Hub routes
      {
        path: RoutesConfig.MAIN.ANALYTICS.OVERVIEW,
        pageKey: "AnalyticsOverviewPage",
      },
      {
        path: RoutesConfig.MAIN.ANALYTICS.SEARCH,
        pageKey: "SearchPage",
      },
      {
        path: RoutesConfig.MAIN.ANALYTICS.VISUALIZATIONS,
        pageKey: "VisualizationsPage",
      },
      {
        path: RoutesConfig.MAIN.ANALYTICS.INDEX_MANAGEMENT,
        pageKey: "IndexManagementPage",
      },
      // Email Management routes
      {
        path: RoutesConfig.MAIN.EMAIL_MANAGEMENT.DASHBOARD,
        pageKey: "EmailDashboardPage",
      },
      {
        path: RoutesConfig.MAIN.EMAIL_MANAGEMENT.NOTIFICATIONS_MANAGEMENT,
        pageKey: "NotificationManagementPage",
      },
      {
        path: RoutesConfig.MAIN.EMAIL_MANAGEMENT.EMAIL_NOTIFICATIONS,
        pageKey: "EmailNotificationPage",
      },
      {
        path: RoutesConfig.MAIN.EMAIL_MANAGEMENT.PUSH_NOTIFICATIONS,
        pageKey: "PushNotificationPage",
      },
      {
        path: RoutesConfig.MAIN.EMAIL_MANAGEMENT.HISTORY,
        pageKey: "HistoryPage",
      },
    ],
  },
];
