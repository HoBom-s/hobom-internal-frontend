import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
  Box,
  Divider,
  Typography,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Search as SearchIcon,
  BarChart as VisualizationIcon,
  Storage as IndexIcon,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { useLayout } from "@/app/providers/layout-provider";
import { RoutesConfig } from "@/shared/router/config/routes.config";

const DRAWER_WIDTH = 280;

interface MenuItem {
  text: string;
  icon: React.ReactNode;
  path: string;
}

const menuItems: MenuItem[] = [
  {
    text: "대시보드",
    icon: <DashboardIcon />,
    path: RoutesConfig.MAIN.DASHBOARD,
  },
  {
    text: "데이터 검색",
    icon: <SearchIcon />,
    path: RoutesConfig.MAIN.ANALYTICS.SEARCH,
  },
  {
    text: "시각화",
    icon: <VisualizationIcon />,
    path: RoutesConfig.MAIN.ANALYTICS.VISUALIZATIONS,
  },
  {
    text: "인덱스 관리",
    icon: <IndexIcon />,
    path: RoutesConfig.MAIN.ANALYTICS.INDEX_MANAGEMENT,
  },
];

export const AppSidebar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { isMobile, isSidebarOpen, closeSidebar } = useLayout();

  const handleItemClick = (path: string) => {
    navigate(path);
    if (isMobile) {
      closeSidebar();
    }
  };

  const drawer = (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Box sx={{ p: 2 }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: 700, color: "primary.main" }}
        >
          Kibana Analytics
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          데이터 분석 플랫폼
        </Typography>
      </Box>

      <Divider />

      <List sx={{ flexGrow: 1, pt: 2 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <ListItem key={item.text} disablePadding sx={{ px: 2, mb: 0.5 }}>
              <ListItemButton
                onClick={() => handleItemClick(item.path)}
                sx={{
                  borderRadius: 2,
                  backgroundColor: isActive ? "primary.main" : "transparent",
                  color: isActive ? "primary.contrastText" : "text.primary",
                  "&:hover": {
                    backgroundColor: isActive ? "primary.dark" : "action.hover",
                  },
                  "& .MuiListItemIcon-root": {
                    color: isActive ? "primary.contrastText" : "text.secondary",
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontWeight: isActive ? 600 : 400,
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Divider />

      <Box sx={{ p: 2 }}>
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          버전 1.0.0
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Drawer
      variant={isMobile ? "temporary" : "permanent"}
      open={isSidebarOpen}
      onClose={closeSidebar}
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: DRAWER_WIDTH,
          boxSizing: "border-box",
          backgroundColor: theme.palette.background.paper,
          borderRight: `1px solid ${theme.palette.divider}`,
          marginTop: "64px",
          height: "calc(100vh - 64px)",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: theme.zIndex.drawer,
        },
      }}
      ModalProps={{
        keepMounted: true, // 모바일에서 성능 향상
      }}
    >
      {drawer}
    </Drawer>
  );
};
