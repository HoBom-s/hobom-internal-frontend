import { createTheme } from "@mui/material/styles";

// 키바나 스타일을 반영한 다크 테마 생성
export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2",
      light: "#42a5f5",
      dark: "#121212",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#f50057",
      light: "#ff5983",
      dark: "#bb002f",
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
    text: {
      primary: "#ffffff",
      secondary: "#b3b3b3",
    },
    divider: "#333333",
    error: {
      main: "#f44336",
    },
    warning: {
      main: "#ff9800",
    },
    info: {
      main: "#2196f3",
    },
    success: {
      main: "#4caf50",
    },
  },
  typography: {
    fontFamily: "Pretendard, -apple-system, BlinkMacSystemFont, sans-serif",
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 600,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 600,
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 500,
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 500,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.5,
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.4,
    },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#1e1e1e",
          borderRight: "1px solid #333333",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#1e1e1e",
          borderBottom: "1px solid #333333",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#1e1e1e",
          border: "1px solid #333333",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#1e1e1e",
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          backgroundColor: "#1e1e1e",
          border: "1px solid #333333",
          "& .MuiDataGrid-cell": {
            borderColor: "#333333",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#2d2d2d",
            borderColor: "#333333",
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: "#2d2d2d",
            borderColor: "#333333",
          },
        },
      },
    },
  },
});
