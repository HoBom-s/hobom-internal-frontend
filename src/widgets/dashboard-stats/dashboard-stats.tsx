import { Box, Card, CardContent, Typography, Paper, Grid } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  type PieLabel,
} from "recharts";

export const DashboardStats = () => {
  // 시간대별 로그 분포 데이터
  const logDistribution = [
    { time: "00:00", info: 120, warning: 30, error: 5 },
    { time: "04:00", info: 80, warning: 15, error: 2 },
    { time: "08:00", info: 200, warning: 45, error: 8 },
    { time: "12:00", info: 350, warning: 60, error: 12 },
    { time: "16:00", info: 280, warning: 50, error: 10 },
    { time: "20:00", info: 150, warning: 35, error: 7 },
  ];

  // 응답 시간 추이 데이터
  const responseTime = [
    { time: "10:00", avg: 45, p95: 120, p99: 250 },
    { time: "11:00", avg: 52, p95: 130, p99: 280 },
    { time: "12:00", avg: 48, p95: 125, p99: 260 },
    { time: "13:00", avg: 55, p95: 140, p99: 300 },
    { time: "14:00", avg: 42, p95: 110, p99: 230 },
    { time: "15:00", avg: 38, p95: 105, p99: 220 },
  ];

  // 인덱스 크기 분포
  const indexSizes = [
    { name: "logstash", value: 35, color: "#0088FE" },
    { name: "metricbeat", value: 25, color: "#00C49F" },
    { name: "filebeat", value: 20, color: "#FFBB28" },
    { name: "auditbeat", value: 15, color: "#FF8042" },
    { name: "기타", value: 5, color: "#8884D8" },
  ];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    percent: number;
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize={12}
        fontWeight={600}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
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
      <Grid container spacing={2}>
        {/* 로그 레벨 분포 */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Card
            sx={{
              height: { xs: 350, md: 400 },
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  mb: { xs: 1.5, md: 2 },
                  fontSize: { xs: "1rem", md: "1.25rem" },
                }}
              >
                시간대별 로그 분포
              </Typography>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={logDistribution}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="time" stroke="#fff" />
                  <YAxis stroke="#fff" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1e1e1e",
                      border: "1px solid #333",
                      borderRadius: "4px",
                    }}
                  />
                  <Bar dataKey="info" stackId="a" fill="#4caf50" />
                  <Bar dataKey="warning" stackId="a" fill="#ff9800" />
                  <Bar dataKey="error" stackId="a" fill="#f44336" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* 인덱스 크기 분포 */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card
            sx={{
              height: { xs: 350, md: 400 },
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                인덱스 크기 분포
              </Typography>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={indexSizes}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel as PieLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {indexSizes.map((entry, index) => (
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
              <Box sx={{ mt: 2 }}>
                {indexSizes.map((item, index) => (
                  <Box
                    key={index}
                    sx={{ display: "flex", alignItems: "center", mb: 1 }}
                  >
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        backgroundColor: item.color,
                        mr: 1,
                        borderRadius: "50%",
                      }}
                    />
                    <Typography variant="body2">{item.name}</Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* 응답 시간 추이 */}
        <Grid size={{ xs: 12 }}>
          <Card
            sx={{
              height: { xs: 350, md: 400 },
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                검색 응답 시간 추이
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={responseTime}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="time" stroke="#fff" />
                  <YAxis stroke="#fff" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1e1e1e",
                      border: "1px solid #333",
                      borderRadius: "4px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="avg"
                    stroke="#2196f3"
                    strokeWidth={2}
                    name="평균"
                  />
                  <Line
                    type="monotone"
                    dataKey="p95"
                    stroke="#ff9800"
                    strokeWidth={2}
                    name="95%"
                  />
                  <Line
                    type="monotone"
                    dataKey="p99"
                    stroke="#f44336"
                    strokeWidth={2}
                    name="99%"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* 성능 지표 요약 */}
      <Grid size={{ xs: 12 }}>
        <Grid container spacing={2}>
          {[
            { label: "평균 쿼리 시간", value: "45ms", color: "info.main" },
            { label: "처리량/초", value: "1,250", color: "success.main" },
            { label: "활성 연결", value: "87", color: "warning.main" },
            { label: "대기 중인 작업", value: "3", color: "error.main" },
          ].map((metric, index) => (
            <Grid size={{ xs: 6, sm: 6, md: 3 }} key={index}>
              <Paper sx={{ p: 2, textAlign: "center" }}>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 700, color: metric.color }}
                >
                  {metric.value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {metric.label}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};
