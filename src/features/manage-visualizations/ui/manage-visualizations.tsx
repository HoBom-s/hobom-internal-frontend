import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  IconButton,
  Paper,
} from "@mui/material";
import {
  BarChart,
  ShowChart,
  DonutLarge,
  ScatterPlot,
  Edit,
  Delete,
  Visibility,
} from "@mui/icons-material";
import { useState } from "react";

interface Visualization {
  id: number;
  title: string;
  type: string;
  description: string;
  lastModified: string;
  status: "active" | "draft";
  icon: React.ReactNode;
}

export const ManageVisualizations = () => {
  const [visualizations] = useState<Visualization[]>([
    {
      id: 1,
      title: "시스템 로그 분석",
      type: "Bar Chart",
      description: "시간대별 로그 레벨 분포",
      lastModified: "2024-01-15",
      status: "active",
      icon: <BarChart />,
    },
    {
      id: 2,
      title: "응답 시간 추이",
      type: "Line Chart",
      description: "API 응답 시간 변화 추이",
      lastModified: "2024-01-14",
      status: "active",
      icon: <ShowChart />,
    },
    {
      id: 3,
      title: "오류 분포도",
      type: "Pie Chart",
      description: "오류 유형별 분포",
      lastModified: "2024-01-13",
      status: "draft",
      icon: <DonutLarge />,
    },
    {
      id: 4,
      title: "사용자 활동 패턴",
      type: "Scatter Plot",
      description: "시간대별 사용자 활동 분포",
      lastModified: "2024-01-12",
      status: "active",
      icon: <ScatterPlot />,
    },
  ]);

  return (
    <Box
      sx={{
        p: { xs: 1.5, sm: 2, md: 3 },
        width: "100%",
        height: "100%",
        maxWidth: "100%",
        boxSizing: "border-box",
        overflow: "auto",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          mb: { xs: 2, md: 3 },
          gap: { xs: 2, sm: 0 },
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            fontSize: { xs: "1.5rem", sm: "2rem", md: "2.125rem" },
          }}
        >
          시각화 관리
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
        >
          새 시각화 만들기
        </Button>
      </Box>

      <Grid container spacing={2}>
        {visualizations.map((viz) => (
          <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={viz.id}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.2s ease-in-out",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: 4,
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Box sx={{ color: "secondary.main", mr: 2 }}>{viz.icon}</Box>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {viz.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {viz.type}
                    </Typography>
                  </Box>
                  <Chip
                    label={viz.status}
                    color={viz.status === "active" ? "success" : "default"}
                    size="small"
                  />
                </Box>

                <Typography variant="body2" sx={{ mb: 2 }}>
                  {viz.description}
                </Typography>

                <Typography variant="caption" color="text.secondary">
                  최종 수정: {viz.lastModified}
                </Typography>
              </CardContent>

              <CardActions
                sx={{ justifyContent: "space-between", px: 2, pb: 2 }}
              >
                <Box>
                  <IconButton size="small" color="primary">
                    <Visibility />
                  </IconButton>
                  <IconButton size="small" color="primary">
                    <Edit />
                  </IconButton>
                </Box>
                <IconButton size="small" color="error">
                  <Delete />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* 시각화 템플릿 섹션 */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
          템플릿에서 시작하기
        </Typography>
        <Grid container spacing={2}>
          {[
            { name: "막대 차트", icon: <BarChart /> },
            { name: "선 차트", icon: <ShowChart /> },
            { name: "원형 차트", icon: <DonutLarge /> },
            { name: "산점도", icon: <ScatterPlot /> },
          ].map((template) => (
            <Grid size={{ xs: 6, sm: 6, md: 3 }} key={template.name}>
              <Paper
                sx={{
                  p: 3,
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    backgroundColor: "action.hover",
                    transform: "scale(1.02)",
                  },
                }}
              >
                <Box sx={{ color: "secondary.main", mb: 1 }}>
                  {template.icon}
                </Box>
                <Typography variant="body2">{template.name}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};
