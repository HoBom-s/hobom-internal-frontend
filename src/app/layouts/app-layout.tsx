import { Box, useTheme } from "@mui/material";
import { AppHeader } from "@/widgets/app-header/app-header";
import { AppSidebar } from "@/widgets/app-sidebar/app-sidebar";
import { Outlet } from "react-router-dom";
import { useLayout } from "@/app/providers/layout-provider";

const DRAWER_WIDTH = 280;

// 앱의 전체적인 레이아웃을 정의합니다.
export const AppLayout = () => {
  const theme = useTheme();
  const { isMobile } = useLayout();

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.primary.dark,
        width: "100vw",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <AppHeader />
      <AppSidebar />
      <Box
        component="main"
        sx={{
          marginTop: "64px",
          marginLeft: isMobile ? 0 : `${DRAWER_WIDTH}px`,
          backgroundColor: theme.palette.primary.dark,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "auto",
          transition: theme.transitions.create(["margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};
