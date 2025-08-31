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
  },
} as const;
