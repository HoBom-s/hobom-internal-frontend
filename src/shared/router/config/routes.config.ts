// 라우트 경로 상수 정의
export const RoutesConfig = {
  MAIN: {
    DASHBOARD: "/",
    ANALYTICS: {
      OVERVIEW: "/analytics/overview",
      SEARCH: "/analytics/search",
      VISUALIZATIONS: "/analytics/visualizations",
      INDEX_MANAGEMENT: "/analytics/index-management",
    },
    EMAIL_MANAGEMENT: {
      DASHBOARD: "/email/dashboard",
      NOTIFICATIONS_MANAGEMENT: "/notifications/management", // 새로운 통합 페이지
      EMAIL_NOTIFICATIONS: "/email/notifications",
      PUSH_NOTIFICATIONS: "/push/notifications",
      HISTORY: "/notifications/history",
    },
  },
} as const;
