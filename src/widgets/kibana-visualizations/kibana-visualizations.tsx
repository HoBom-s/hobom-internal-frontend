import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Paper,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  MoreVert,
  Fullscreen,
  Edit,
  Delete,
  TrendingUp,
  DonutLarge,
  BarChart,
  TableChart,
} from "@mui/icons-material";
import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export const KibanaVisualizations = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedViz, setSelectedViz] = useState<string | null>(null);

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    vizId: string
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedViz(vizId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedViz(null);
  };

  // 시계열 데이터
  const timeSeriesData = [
    { time: "10:00", requests: 120, errors: 5 },
    { time: "11:00", requests: 150, errors: 8 },
    { time: "12:00", requests: 200, errors: 12 },
    { time: "13:00", requests: 180, errors: 6 },
    { time: "14:00", requests: 220, errors: 15 },
    { time: "15:00", requests: 190, errors: 9 },
  ];

  // 로그 레벨 분포
  const logLevelData = [
    { name: "INFO", value: 60, color: "#4caf50" },
    { name: "WARN", value: 25, color: "#ff9800" },
    { name: "ERROR", value: 10, color: "#f44336" },
    { name: "DEBUG", value: 5, color: "#2196f3" },
  ];

  // 응답 시간 히트맵 데이터
  const heatmapData = [
    { time: "08:00", endpoint: "/api/users", responseTime: 45 },
    { time: "09:00", endpoint: "/api/users", responseTime: 52 },
    { time: "10:00", endpoint: "/api/users", responseTime: 38 },
    { time: "08:00", endpoint: "/api/orders", responseTime: 78 },
    { time: "09:00", endpoint: "/api/orders", responseTime: 65 },
    { time: "10:00", endpoint: "/api/orders", responseTime: 82 },
  ];

  const visualizations = [
    {
      id: "requests-timeline",
      title: "요청 수 추이",
      type: "Line Chart",
      icon: <TrendingUp />,
      component: (
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={timeSeriesData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="time" stroke="#fff" fontSize={12} />
            <YAxis stroke="#fff" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e1e1e",
                border: "1px solid #333",
                borderRadius: "4px",
              }}
            />
            <Line
              type="monotone"
              dataKey="requests"
              stroke="#2196f3"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      ),
    },
    {
      id: "error-area",
      title: "오류 발생 추이",
      type: "Area Chart",
      icon: <TrendingUp />,
      component: (
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={timeSeriesData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="time" stroke="#fff" fontSize={12} />
            <YAxis stroke="#fff" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e1e1e",
                border: "1px solid #333",
                borderRadius: "4px",
              }}
            />
            <Area
              type="monotone"
              dataKey="errors"
              stroke="#f44336"
              fill="#f44336"
              fillOpacity={0.3}
            />
          </AreaChart>
        </ResponsiveContainer>
      ),
    },
    {
      id: "log-levels",
      title: "로그 레벨 분포",
      type: "Pie Chart",
      icon: <DonutLarge />,
      component: (
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={logLevelData}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={80}
              dataKey="value"
            >
              {logLevelData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e1e1e",
                border: "1px solid #333",
                borderRadius: "4px",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      ),
    },
    {
      id: "response-heatmap",
      title: "응답 시간 히트맵",
      type: "Heatmap",
      icon: <TableChart />,
      component: (
        <Box sx={{ p: 2 }}>
          <Grid container spacing={1}>
            {heatmapData.map((item, index) => (
              <Grid size={{ xs: 6, sm: 4, md: 3, lg: 2 }} key={index}>
                <Paper
                  sx={{
                    p: 1,
                    textAlign: "center",
                    backgroundColor:
                      item.responseTime > 70
                        ? "#f44336"
                        : item.responseTime > 50
                        ? "#ff9800"
                        : "#4caf50",
                    color: "white",
                  }}
                >
                  <Typography variant="caption" sx={{ display: "block" }}>
                    {item.endpoint}
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {item.responseTime}ms
                  </Typography>
                  <Typography variant="caption">{item.time}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      ),
    },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        p: { xs: 1.5, sm: 2, md: 3 },
        overflow: "auto",
        maxWidth: "100%",
        boxSizing: "border-box",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: { xs: 2, md: 3 },
          px: { xs: 0, sm: 1 },
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            fontSize: { xs: "1rem", md: "1.25rem" },
          }}
        >
          대시보드 시각화
        </Typography>
        <Button
          variant="outlined"
          size="small"
          sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
        >
          편집 모드
        </Button>
      </Box>

      <Grid container spacing={2}>
        {visualizations.map((viz) => (
          <Grid size={{ xs: 12, md: 6 }} key={viz.id}>
            <Card
              sx={{
                height: "100%",
                minHeight: { xs: 280, md: 320 },
                border: "1px solid",
                borderColor: "divider",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: 6,
                },
              }}
            >
              <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box sx={{ color: "primary.main", mr: 1 }}>{viz.icon}</Box>
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          fontSize: { xs: "1rem", md: "1.125rem" },
                        }}
                      >
                        {viz.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                      >
                        {viz.type}
                      </Typography>
                    </Box>
                  </Box>
                  <Box>
                    <IconButton size="small">
                      <Fullscreen />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={(e) => handleMenuOpen(e, viz.id)}
                    >
                      <MoreVert />
                    </IconButton>
                  </Box>
                </Box>
                {viz.component}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* 추가 시각화 생성 카드 */}
      <Grid container spacing={2} sx={{ mt: { xs: 1.5, md: 2 } }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card
            sx={{
              height: 200,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "2px dashed",
              borderColor: "divider",
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "action.hover",
                borderColor: "primary.main",
              },
            }}
          >
            <Box sx={{ textAlign: "center" }}>
              <BarChart
                sx={{
                  fontSize: { xs: 40, md: 48 },
                  color: "text.secondary",
                  mb: 1,
                }}
              />
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }}
              >
                새 시각화 추가
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
              >
                클릭하여 새로운 차트를 생성하세요
              </Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>

      {/* 컨텍스트 메뉴 */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>
          <Edit sx={{ mr: 1 }} />
          편집
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Fullscreen sx={{ mr: 1 }} />
          전체화면
        </MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ color: "error.main" }}>
          <Delete sx={{ mr: 1 }} />
          삭제
        </MenuItem>
      </Menu>
    </Box>
  );
};
