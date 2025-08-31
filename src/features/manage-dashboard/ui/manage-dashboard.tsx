import { Box, Tabs, Tab, Typography } from "@mui/material";
import { useState } from "react";
import { DashboardOverview } from "../../../widgets/dashboard-overview/dashboard-overview";
import { DashboardStats } from "../../../widgets/dashboard-stats/dashboard-stats";
import { KibanaVisualizations } from "../../../widgets/kibana-visualizations/kibana-visualizations";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = ({ children, value, index, ...other }: TabPanelProps) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`dashboard-tabpanel-${index}`}
      aria-labelledby={`dashboard-tab-${index}`}
      style={{
        height: value === index ? "100%" : "auto",
        flexGrow: value === index ? 1 : 0,
        overflow: value === index ? "hidden" : "visible",
      }}
      {...other}
    >
      {value === index && (
        <Box
          sx={{
            height: "100%",
            width: "100%",
            maxWidth: "100%",
            boxSizing: "border-box",
          }}
        >
          {children}
        </Box>
      )}
    </div>
  );
};

const a11yProps = (index: number) => {
  return {
    id: `dashboard-tab-${index}`,
    "aria-controls": `dashboard-tabpanel-${index}`,
  };
};

export const ManageDashboard = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box
      sx={{
        minWidth: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        maxWidth: "100%",
        boxSizing: "border-box",
      }}
    >
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          backgroundColor: "background.paper",
          px: { xs: 2, sm: 3 },
          pt: { xs: 1.5, sm: 2 },
          flexShrink: 0,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            mb: { xs: 1.5, sm: 2 },
            fontSize: { xs: "1.5rem", sm: "2rem", md: "2.125rem" },
          }}
        >
          키바나 대시보드
        </Typography>

        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="kibana dashboard tabs"
          sx={{
            "& .MuiTab-root": {
              textTransform: "none",
              fontSize: { xs: "0.875rem", sm: "1rem" },
              fontWeight: 600,
              minWidth: { xs: 80, sm: 120 },
              color: "text.secondary",
              borderRadius: 1,
              mx: 0.5,
              px: 1.5,
              "&.Mui-selected": {
                color: "primary.contrastText",
                backgroundColor: "primary.main",
              },
              "&:hover": {
                backgroundColor: "grey.700",
              },
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "primary.light",
              height: 3,
              borderRadius: 3,
            },
          }}
        >
          <Tab label="개요" {...a11yProps(0)} />
          <Tab label="통계" {...a11yProps(1)} />
          <Tab label="시각화" {...a11yProps(2)} />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <DashboardOverview />
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Box sx={{ height: "100%", overflow: "auto" }}>
          <DashboardStats />
        </Box>
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <Box sx={{ height: "100%", overflow: "auto" }}>
          <KibanaVisualizations />
        </Box>
      </TabPanel>
    </Box>
  );
};
