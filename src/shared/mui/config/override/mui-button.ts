import { type Components, alpha } from "@mui/material/styles";

// Button 컴포넌트의 기본 스타일을 재정의합니다.
export const MuiButton: Components["MuiButton"] = {
  styleOverrides: {
    root: {
      fontWeight: 600,
      textTransform: "none",
      borderRadius: "8px",
      boxShadow: "none",
      "&:hover": {
        boxShadow: "none",
      },
    },
    containedPrimary: {
      color: "#fff",
    },
    // Outlined 버튼 스타일 추가
    outlined: {
      borderColor: "#64748B", // grey.500 - 기본 아웃라인 색상
      color: "#F8FAFC", // text.primary와 동일한 색상
      "&:hover": {
        borderColor: "#94A3B8", // grey.400 - 호버 시 더 밝게
        backgroundColor: alpha("#94A3B8", 0.08), // 호버 시 약간의 배경색
      },
      "&:focus": {
        borderColor: "#10B981", // secondary.main - 포커스 시 초록색
      },
    },
    outlinedPrimary: {
      borderColor: "#233043", // primary.main
      color: "#4882da", // primary.light - 텍스트는 더 밝게
      "&:hover": {
        borderColor: "#4882da", // primary.light
        backgroundColor: alpha("#4882da", 0.08),
      },
    },
    outlinedSecondary: {
      borderColor: "#10B981", // secondary.main
      color: "#34D399", // secondary.light
      "&:hover": {
        borderColor: "#34D399", // secondary.light
        backgroundColor: alpha("#34D399", 0.08),
      },
    },
  },
};
