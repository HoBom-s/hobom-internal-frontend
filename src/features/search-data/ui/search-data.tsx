import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Paper,
  Chip,
  Stack,
  Grid,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";

export const SearchData = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults] = useState([
    {
      id: 1,
      index: "logstash-2024.01.15",
      timestamp: "2024-01-15 14:30:22",
      level: "INFO",
      message: "Application started successfully",
      source: "app.log",
    },
    {
      id: 2,
      index: "logstash-2024.01.15",
      timestamp: "2024-01-15 14:31:45",
      level: "ERROR",
      message: "Database connection failed",
      source: "error.log",
    },
    {
      id: 3,
      index: "metricbeat-2024.01.15",
      timestamp: "2024-01-15 14:32:10",
      level: "INFO",
      message: "CPU usage: 45%",
      source: "metrics.log",
    },
  ]);

  const handleSearch = () => {
    console.log("검색 실행:", searchQuery);
  };

  return (
    <Box
      sx={{
        p: { xs: 2, sm: 3 },
        width: "100%",
        height: "100%",
        maxWidth: "100%",
        boxSizing: "border-box",
        overflow: "auto",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          mb: { xs: 2, sm: 3 },
          fontSize: { xs: "1.5rem", sm: "2rem", md: "2.125rem" },
        }}
      >
        데이터 검색
      </Typography>

      {/* 검색 입력부 */}
      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
          <Grid container spacing={2} alignItems="center">
            <Grid size={{ xs: 12, sm: 8, lg: 9 }}>
              <TextField
                fullWidth
                placeholder="검색어를 입력하세요 (예: level:ERROR)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <SearchIcon sx={{ mr: 1, color: "text.secondary" }} />
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "background.default",
                  },
                }}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 2, lg: 1.5 }}>
              <Button
                variant="contained"
                startIcon={<FilterListIcon />}
                fullWidth
                sx={{
                  minWidth: { xs: "auto", sm: 80 },
                  fontSize: { xs: "0.875rem", sm: "1rem" },
                }}
              >
                필터
              </Button>
            </Grid>
            <Grid size={{ xs: 6, sm: 2, lg: 1.5 }}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<SearchIcon />}
                onClick={handleSearch}
                fullWidth
                sx={{
                  minWidth: { xs: "auto", sm: 80 },
                  fontSize: { xs: "0.875rem", sm: "1rem" },
                }}
              >
                검색
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* 검색 결과 */}
      <Typography variant="h6" sx={{ mb: 2 }}>
        검색 결과 ({searchResults.length}건)
      </Typography>

      <Stack spacing={2}>
        {searchResults.map((result) => (
          <Paper
            key={result.id}
            sx={{
              p: { xs: 2, sm: 3 },
              backgroundColor: "background.paper",
              border: "1px solid",
              borderColor: "divider",
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                borderColor: "primary.main",
                backgroundColor: "action.hover",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "space-between",
                alignItems: { xs: "flex-start", sm: "flex-start" },
                mb: 2,
                gap: { xs: 1, sm: 0 },
              }}
            >
              <Box>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", mb: 1 }}
                >
                  {result.timestamp} • {result.index}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  {result.message}
                </Typography>
              </Box>
              <Chip
                label={result.level}
                color={result.level === "ERROR" ? "error" : "info"}
                size="small"
              />
            </Box>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              Source: {result.source}
            </Typography>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
};
