import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Alert,
} from "@mui/material";
import {
  MoreVert,
  Storage,
  Refresh,
  Add,
  Delete,
  Settings,
} from "@mui/icons-material";
import { useState } from "react";

interface IndexData {
  name: string;
  status: "open" | "close" | "red" | "yellow" | "green";
  health: "green" | "yellow" | "red";
  docsCount: number;
  size: string;
  primaryShards: number;
  replicas: number;
  createdAt: string;
}

export const ManageIndices = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<string | null>(null);

  const [indices] = useState<IndexData[]>([
    {
      name: "logstash-2024.01.15",
      status: "open",
      health: "green",
      docsCount: 1250000,
      size: "2.1 GB",
      primaryShards: 5,
      replicas: 1,
      createdAt: "2024-01-15",
    },
    {
      name: "metricbeat-2024.01.15",
      status: "open",
      health: "yellow",
      docsCount: 890000,
      size: "1.8 GB",
      primaryShards: 3,
      replicas: 1,
      createdAt: "2024-01-15",
    },
    {
      name: "filebeat-2024.01.14",
      status: "close",
      health: "green",
      docsCount: 750000,
      size: "1.5 GB",
      primaryShards: 5,
      replicas: 1,
      createdAt: "2024-01-14",
    },
    {
      name: "auditbeat-2024.01.15",
      status: "open",
      health: "red",
      docsCount: 320000,
      size: "680 MB",
      primaryShards: 2,
      replicas: 0,
      createdAt: "2024-01-15",
    },
  ]);

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    indexName: string
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedIndex(indexName);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedIndex(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "success";
      case "close":
        return "default";
      default:
        return "warning";
    }
  };

  const getHealthColor = (health: string) => {
    switch (health) {
      case "green":
        return "success";
      case "yellow":
        return "warning";
      case "red":
        return "error";
      default:
        return "default";
    }
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num);
  };

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
          인덱스 관리
        </Typography>
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          <Button
            variant="outlined"
            startIcon={<Refresh />}
            sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
          >
            새로고침
          </Button>
          <Button
            variant="contained"
            startIcon={<Add />}
            sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
          >
            인덱스 생성
          </Button>
        </Box>
      </Box>

      {/* 상태 요약 */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(2, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
          },
          gap: { xs: 1.5, sm: 2 },
          mb: { xs: 2, md: 3 },
        }}
      >
        <Card
          sx={{
            border: "1px solid",
            borderColor: "divider",
            transition: "all 0.2s ease-in-out",
            "&:hover": { transform: "translateY(-1px)", boxShadow: 3 },
          }}
        >
          <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Storage sx={{ color: "success.main", mr: 2 }} />
              <Box>
                <Typography
                  variant="h6"
                  sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
                >
                  {indices.length}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                >
                  총 인덱스
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Card
          sx={{
            border: "1px solid",
            borderColor: "divider",
            transition: "all 0.2s ease-in-out",
            "&:hover": { transform: "translateY(-1px)", boxShadow: 3 },
          }}
        >
          <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box
                sx={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  backgroundColor: "success.main",
                  mr: 2,
                }}
              />
              <Box>
                <Typography
                  variant="h6"
                  sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
                >
                  {indices.filter((i) => i.health === "green").length}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                >
                  정상 인덱스
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Card
          sx={{
            border: "1px solid",
            borderColor: "divider",
            transition: "all 0.2s ease-in-out",
            "&:hover": { transform: "translateY(-1px)", boxShadow: 3 },
          }}
        >
          <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box
                sx={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  backgroundColor: "warning.main",
                  mr: 2,
                }}
              />
              <Box>
                <Typography
                  variant="h6"
                  sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
                >
                  {indices.filter((i) => i.health === "yellow").length}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                >
                  주의 인덱스
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Card
          sx={{
            border: "1px solid",
            borderColor: "divider",
            transition: "all 0.2s ease-in-out",
            "&:hover": { transform: "translateY(-1px)", boxShadow: 3 },
          }}
        >
          <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box
                sx={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  backgroundColor: "error.main",
                  mr: 2,
                }}
              />
              <Box>
                <Typography
                  variant="h6"
                  sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
                >
                  {indices.filter((i) => i.health === "red").length}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                >
                  오류 인덱스
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* 알림 */}
      {indices.some((i) => i.health === "red") && (
        <Alert severity="error" sx={{ mb: 3 }}>
          일부 인덱스에 문제가 발생했습니다. 즉시 확인이 필요합니다.
        </Alert>
      )}

      {/* 인덱스 테이블 */}
      <Card
        sx={{
          border: "1px solid",
          borderColor: "divider",
          overflow: "auto",
        }}
      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>인덱스 이름</TableCell>
                <TableCell>상태</TableCell>
                <TableCell>상태</TableCell>
                <TableCell align="right">문서 수</TableCell>
                <TableCell align="right">크기</TableCell>
                <TableCell align="center">프라이머리 샤드</TableCell>
                <TableCell align="center">복제본</TableCell>
                <TableCell>생성일</TableCell>
                <TableCell align="center">작업</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {indices.map((index) => (
                <TableRow key={index.name} hover>
                  <TableCell>
                    <Typography
                      variant="body2"
                      sx={{ fontFamily: "monospace" }}
                    >
                      {index.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={index.status}
                      color={getStatusColor(index.status) as any}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={index.health}
                      color={getHealthColor(index.health) as any}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">
                    {formatNumber(index.docsCount)}
                  </TableCell>
                  <TableCell align="right">{index.size}</TableCell>
                  <TableCell align="center">{index.primaryShards}</TableCell>
                  <TableCell align="center">{index.replicas}</TableCell>
                  <TableCell>{index.createdAt}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      onClick={(e) => handleMenuOpen(e, index.name)}
                      size="small"
                    >
                      <MoreVert />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* 컨텍스트 메뉴 */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>
          <Settings sx={{ mr: 1 }} />
          설정
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Refresh sx={{ mr: 1 }} />
          새로고침
        </MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ color: "error.main" }}>
          <Delete sx={{ mr: 1 }} />
          삭제
        </MenuItem>
      </Menu>
    </Box>
  );
};
