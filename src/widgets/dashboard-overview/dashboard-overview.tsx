import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Avatar,
  Paper,
} from "@mui/material";
import {
  TrendingUp,
  Storage,
  Speed,
  Error as ErrorIcon,
  CheckCircle,
  Warning,
} from "@mui/icons-material";

export const DashboardOverview = () => {
  const metrics = [
    {
      title: "총 문서 수",
      value: "2,847,392",
      change: "+12.5%",
      trend: "up",
      icon: <Storage />,
      color: "primary.main",
    },
    {
      title: "인덱스 수",
      value: "24",
      change: "+2",
      trend: "up",
      icon: <TrendingUp />,
      color: "success.main",
    },
    {
      title: "클러스터 상태",
      value: "정상",
      change: "100%",
      trend: "stable",
      icon: <CheckCircle />,
      color: "success.main",
    },
    {
      title: "검색 속도",
      value: "45ms",
      change: "-5ms",
      trend: "up",
      icon: <Speed />,
      color: "info.main",
    },
  ];

  const clusterHealth = [
    { name: "Green", value: 85, color: "success.main" },
    { name: "Yellow", value: 12, color: "warning.main" },
    { name: "Red", value: 3, color: "error.main" },
  ];

  const recentActivity = [
    {
      time: "5분 전",
      action: "새 인덱스 생성",
      detail: "logstash-2024.01.15",
      status: "success",
    },
    {
      time: "12분 전",
      action: "검색 쿼리 실행",
      detail: "1,247건 검색됨",
      status: "info",
    },
    {
      time: "25분 전",
      action: "샤드 재분배",
      detail: "metricbeat-2024.01.14",
      status: "warning",
    },
    {
      time: "1시간 전",
      action: "인덱스 최적화",
      detail: "filebeat-2024.01.13",
      status: "success",
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle color="success" />;
      case "warning":
        return <Warning color="warning" />;
      case "error":
        return <ErrorIcon color="error" />;
      default:
        return <CheckCircle color="info" />;
    }
  };

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
      {/* 메트릭 카드들 */}
      <Grid container spacing={2} sx={{ mb: { xs: 2, md: 4 } }}>
        {metrics.map((metric, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 6, lg: 3 }} key={index}>
            <Card
              sx={{
                height: "100%",
                minHeight: { xs: 100, sm: 120 },
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: 8,
                },
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    height: "100%",
                  }}
                >
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography
                      color="text.secondary"
                      gutterBottom
                      variant="body2"
                      sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                    >
                      {metric.title}
                    </Typography>
                    <Typography
                      variant="h5"
                      component="div"
                      sx={{
                        fontWeight: 700,
                        fontSize: { xs: "1.25rem", sm: "1.5rem" },
                        mb: 0.5,
                      }}
                    >
                      {metric.value}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color:
                          metric.trend === "up"
                            ? "success.main"
                            : "text.secondary",
                        fontWeight: 500,
                        fontSize: { xs: "0.75rem", sm: "0.875rem" },
                      }}
                    >
                      {metric.change}
                    </Typography>
                  </Box>
                  <Avatar
                    sx={{
                      backgroundColor: metric.color,
                      width: { xs: 48, sm: 56 },
                      height: { xs: 48, sm: 56 },
                      ml: 2,
                    }}
                  >
                    {metric.icon}
                  </Avatar>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2}>
        {/* 클러스터 상태 */}
        <Grid size={{ xs: 12, md: 5, lg: 4 }}>
          <Card
            sx={{
              height: { xs: "auto", md: 400 },
              display: "flex",
              flexDirection: "column",
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <CardContent sx={{ flex: 1, p: { xs: 2, sm: 3 } }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                클러스터 상태
              </Typography>
              <Box sx={{ flex: 1 }}>
                {clusterHealth.map((item, index) => (
                  <Box key={index} sx={{ mb: 3 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 1,
                      }}
                    >
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {item.name}
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {item.value}%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={item.value}
                      sx={{
                        height: 10,
                        borderRadius: 5,
                        backgroundColor: "grey.800",
                        "& .MuiLinearProgress-bar": {
                          backgroundColor: item.color,
                          borderRadius: 5,
                        },
                      }}
                    />
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* 최근 활동 */}
        <Grid size={{ xs: 12, md: 7, lg: 8 }}>
          <Card
            sx={{
              height: { xs: "auto", md: 400 },
              display: "flex",
              flexDirection: "column",
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <CardContent
              sx={{
                flex: 1,
                p: { xs: 2, sm: 3 },
                display: "flex",
                flexDirection: "column",
                overflow: "auto",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                최근 활동
              </Typography>
              <Box
                sx={{
                  flex: 1,
                  overflowY: "auto",
                  pr: 1,
                  "&::-webkit-scrollbar": {
                    width: 6,
                  },
                  "&::-webkit-scrollbar-track": {
                    backgroundColor: "transparent",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "rgba(255,255,255,0.2)",
                    borderRadius: 3,
                  },
                }}
              >
                {recentActivity.map((activity, index) => (
                  <Paper
                    key={index}
                    sx={{
                      p: 2,
                      mb: 2,
                      backgroundColor: "background.default",
                      border: "1px solid",
                      borderColor: "divider",
                      transition: "all 0.2s ease-in-out",
                      "&:hover": {
                        backgroundColor: "action.hover",
                        borderColor: "primary.main",
                      },
                      "&:last-child": {
                        mb: 0,
                      },
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Box sx={{ mr: 2, flexShrink: 0 }}>
                        {getStatusIcon(activity.status)}
                      </Box>
                      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 600,
                            mb: 0.5,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {activity.action}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            display: "block",
                          }}
                        >
                          {activity.detail}
                        </Typography>
                      </Box>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{
                          flexShrink: 0,
                          ml: 1,
                          fontSize: "0.75rem",
                        }}
                      >
                        {activity.time}
                      </Typography>
                    </Box>
                  </Paper>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
