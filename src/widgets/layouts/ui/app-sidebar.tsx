import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  Typography,
  ListItemIcon,
  Collapse,
  Chip,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import {
  Dashboard,
  ExpandMore,
  ExpandLess,
  Email,
  NotificationsActive,
  Search,
  BarChart,
  Storage,
  Analytics,
  History,
} from "@mui/icons-material";
import { useState } from "react";
import { useLayout } from "../../../app/providers/layout-provider";
import { RoutesConfig } from "../../../shared/router/config/routes.config";

const DRAWER_WIDTH = 280;

// 배지가 있는 메뉴 아이템 타입
interface MenuItem {
  text: string;
  path?: string;
  icon: React.ReactNode;
  badge?: string | number;
  children?: MenuItem[];
  expanded?: boolean;
}

const dashboardMenuStructure: MenuItem[] = [
  {
    text: "Analytics Dashboard",
    path: RoutesConfig.MAIN.DASHBOARD,
    icon: <Dashboard />,
  },
  {
    text: "Email Dashboard",
    path: RoutesConfig.MAIN.EMAIL_MANAGEMENT.DASHBOARD,
    icon: <Email />,
  },
];

const analyticsMenuStructure: MenuItem[] = [
  {
    text: "Analytics",
    icon: <Analytics />,
    children: [
      {
        text: "데이터 검색",
        path: RoutesConfig.MAIN.ANALYTICS.SEARCH,
        icon: <Search />,
      },
      {
        text: "시각화",
        path: RoutesConfig.MAIN.ANALYTICS.VISUALIZATIONS,
        icon: <BarChart />,
      },
      {
        text: "인덱스 관리",
        path: RoutesConfig.MAIN.ANALYTICS.INDEX_MANAGEMENT,
        icon: <Storage />,
      },
    ],
  },
];

const notificationsMenuStructure: MenuItem[] = [
  {
    text: "알림 관리",
    icon: <NotificationsActive />,
    children: [
      {
        text: "통합 관리",
        path: RoutesConfig.MAIN.EMAIL_MANAGEMENT.NOTIFICATIONS_MANAGEMENT,
        icon: <NotificationsActive />,
      },
      {
        text: "이메일",
        path: RoutesConfig.MAIN.EMAIL_MANAGEMENT.EMAIL_NOTIFICATIONS,
        icon: <Email />,
      },
      {
        text: "PUSH",
        path: RoutesConfig.MAIN.EMAIL_MANAGEMENT.PUSH_NOTIFICATIONS,
        icon: <NotificationsActive />,
      },
      {
        text: "전송 내역",
        path: RoutesConfig.MAIN.EMAIL_MANAGEMENT.HISTORY,
        icon: <History />,
      },
    ],
  },
];

export const AppSidebar = () => {
  const location = useLocation();
  const { isMobile, isSidebarOpen, closeSidebar } = useLayout();

  // 각 확장 가능한 메뉴의 상태 관리
  const [expandedMenus, setExpandedMenus] = useState<{
    [key: string]: boolean;
  }>({
    Analytics: location.pathname.startsWith("/analytics"),
    "알림 관리":
      location.pathname.includes("/notifications") ||
      location.pathname.includes("/email") ||
      location.pathname.includes("/push"),
  });

  const handleMenuToggle = (menuText: string) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menuText]: !prev[menuText],
    }));
  };

  const renderMenuItem = (item: MenuItem, isSubItem = false) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedMenus[item.text];
    const isActive = item.path ? location.pathname === item.path : false;
    const isParentActive =
      hasChildren &&
      item.children?.some(
        (child) => child.path && location.pathname === child.path
      );

    return (
      <Box key={item.text}>
        <ListItem disablePadding sx={{ mb: 0.5 }}>
          <ListItemButton
            component={item.path ? Link : "div"}
            to={item.path}
            onClick={
              hasChildren ? () => handleMenuToggle(item.text) : undefined
            }
            sx={{
              borderRadius: "8px",
              backgroundColor:
                isActive || isParentActive
                  ? "rgba(255, 255, 255, 0.1)"
                  : "transparent",
              color: isActive || isParentActive ? "#FFFFFF" : "#94A3B8",
              py: 1.5,
              pl: isSubItem ? 4 : 2,
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                color: "#FFFFFF",
              },
              "& .MuiListItemIcon-root": {
                color: isActive || isParentActive ? "#FFFFFF" : "#94A3B8",
                minWidth: isSubItem ? 32 : 40,
              },
            }}
          >
            <ListItemIcon sx={{ fontSize: isSubItem ? "0.875rem" : "1.25rem" }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              sx={{
                "& .MuiListItemText-primary": {
                  fontSize: "0.875rem",
                  fontWeight: isActive || isParentActive ? 600 : 400,
                },
              }}
            />
            {item.badge && (
              <Chip
                label={item.badge}
                size="small"
                sx={{
                  backgroundColor: "#3182CE",
                  color: "#FFFFFF",
                  fontSize: "0.75rem",
                  height: "20px",
                  "& .MuiChip-label": {
                    px: 1,
                  },
                }}
              />
            )}
            {hasChildren && (isExpanded ? <ExpandLess /> : <ExpandMore />)}
          </ListItemButton>
        </ListItem>

        {/* 하위 메뉴 */}
        {hasChildren && (
          <Collapse in={isExpanded} timeout="auto" unmountOnExit>
            <List sx={{ py: 0 }}>
              {item.children?.map((child) => renderMenuItem(child, true))}
            </List>
          </Collapse>
        )}
      </Box>
    );
  };

  return (
    <Drawer
      sx={{
        width: isMobile ? 0 : DRAWER_WIDTH,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: DRAWER_WIDTH,
          boxSizing: "border-box",
          backgroundColor: "#334155",
          border: "none",
          color: "#94A3B8",
        },
      }}
      variant={isMobile ? "temporary" : "permanent"}
      anchor="left"
      open={isMobile ? isSidebarOpen : true}
      onClose={closeSidebar}
    >
      {/* 브랜드 로고 영역 */}
      <Box sx={{ p: 3, borderBottom: "1px solid rgba(148, 163, 184, 0.1)" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box
            sx={{
              width: 32,
              height: 32,
              backgroundColor: "#3182CE",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: 12,
                height: 12,
                backgroundColor: "#63B3ED",
                borderRadius: "50%",
                mr: "2px",
              }}
            />
            <Box
              sx={{
                width: 8,
                height: 8,
                backgroundColor: "#90CDF4",
                borderRadius: "50%",
              }}
            />
          </Box>
          <Typography
            variant="h6"
            sx={{
              color: "#FFFFFF",
              fontWeight: 700,
              fontSize: "1.125rem",
            }}
          >
            Analytics Hub
          </Typography>
        </Box>
      </Box>

      <Box sx={{ flex: 1, overflowY: "auto" }}>
        {/* DASHBOARD 섹션 */}
        <Box sx={{ px: 2, pb: 2, mt: 2 }}>
          <Typography
            variant="body2"
            sx={{
              color: "#64748B",
              fontWeight: 600,
              mb: 2,
              px: 1,
              fontSize: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            DASHBOARD
          </Typography>
          <List sx={{ py: 0 }}>
            {dashboardMenuStructure.map((item) => renderMenuItem(item))}
          </List>
        </Box>

        {/* ANALYTICS 섹션 */}
        <Box sx={{ px: 2, pb: 2 }}>
          <Typography
            variant="body2"
            sx={{
              color: "#64748B",
              fontWeight: 600,
              mb: 2,
              px: 1,
              fontSize: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            ANALYTICS
          </Typography>
          <List sx={{ py: 0 }}>
            {analyticsMenuStructure.map((item) => renderMenuItem(item))}
          </List>
        </Box>

        {/* NOTIFICATIONS 섹션 */}
        <Box sx={{ px: 2, pb: 2 }}>
          <Typography
            variant="body2"
            sx={{
              color: "#64748B",
              fontWeight: 600,
              mb: 2,
              px: 1,
              fontSize: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            NOTIFICATIONS
          </Typography>
          <List sx={{ py: 0 }}>
            {notificationsMenuStructure.map((item) => renderMenuItem(item))}
          </List>
        </Box>
      </Box>
    </Drawer>
  );
};
