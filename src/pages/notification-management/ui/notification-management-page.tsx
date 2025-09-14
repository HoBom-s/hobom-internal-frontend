import { Box, Tabs, Tab, Typography } from "@mui/material";
import { useState } from "react";
import { Email, NotificationsActive, History } from "@mui/icons-material";
import { SendEmailForm } from "../../../features/send-email";
import { SendPushForm } from "../../../features/send-push";
import { EmailHistoryTable } from "../../../features/view-email-history";
import { PushHistoryTable } from "../../../features/view-push-history";

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
      id={`notification-tabpanel-${index}`}
      aria-labelledby={`notification-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
};

const a11yProps = (index: number) => {
  return {
    id: `notification-tab-${index}`,
    "aria-controls": `notification-tabpanel-${index}`,
  };
};

interface HistoryTabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const HistoryTabPanel = ({
  children,
  value,
  index,
  ...other
}: HistoryTabPanelProps) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`history-subtab-${index}`}
      aria-labelledby={`history-subtab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

const NotificationManagementPage = () => {
  const [mainTabValue, setMainTabValue] = useState(0);
  const [historyTabValue, setHistoryTabValue] = useState(0);

  const handleMainTabChange = (
    _event: React.SyntheticEvent,
    newValue: number
  ) => {
    setMainTabValue(newValue);
  };

  const handleHistoryTabChange = (
    _event: React.SyntheticEvent,
    newValue: number
  ) => {
    setHistoryTabValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          backgroundColor: "background.paper",
          px: 3,
          pt: 3,
          pb: 1,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
          알림 관리
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          이메일과 푸시 알림을 발송하고 내역을 확인할 수 있습니다.
        </Typography>

        <Tabs
          value={mainTabValue}
          onChange={handleMainTabChange}
          aria-label="notification management tabs"
          sx={{
            "& .MuiTab-root": {
              textTransform: "none",
              fontSize: "1rem",
              fontWeight: 500,
              minWidth: 120,
              color: "text.secondary",
              minHeight: 48,
              "&.Mui-selected": {
                color: "secondary.main", // 더 밝은 색상 사용
                fontWeight: 600,
              },
              "& .MuiSvgIcon-root": {
                color: "inherit",
              },
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "secondary.main", // 더 밝은 색상 사용
              height: 3,
            },
          }}
        >
          <Tab
            icon={<Email />}
            label="이메일"
            iconPosition="start"
            {...a11yProps(0)}
          />
          <Tab
            icon={<NotificationsActive />}
            label="푸시"
            iconPosition="start"
            {...a11yProps(1)}
          />
          <Tab
            icon={<History />}
            label="전송 내역"
            iconPosition="start"
            {...a11yProps(2)}
          />
        </Tabs>
      </Box>

      <TabPanel value={mainTabValue} index={0}>
        <Box sx={{ p: 3 }}>
          <SendEmailForm />
        </Box>
      </TabPanel>

      <TabPanel value={mainTabValue} index={1}>
        <Box sx={{ p: 3 }}>
          <SendPushForm />
        </Box>
      </TabPanel>

      <TabPanel value={mainTabValue} index={2}>
        <Box sx={{ p: 3 }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
            <Tabs
              value={historyTabValue}
              onChange={handleHistoryTabChange}
              aria-label="history tabs"
              sx={{
                "& .MuiTab-root": {
                  textTransform: "none",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  minWidth: 100,
                  color: "text.secondary",
                  "&.Mui-selected": {
                    color: "secondary.main", // 더 밝은 색상 사용
                    fontWeight: 600,
                  },
                },
                "& .MuiTabs-indicator": {
                  backgroundColor: "secondary.main", // 더 밝은 색상 사용
                  height: 2,
                },
              }}
            >
              <Tab label="이메일 내역" />
              <Tab label="푸시 내역" />
            </Tabs>
          </Box>

          <HistoryTabPanel value={historyTabValue} index={0}>
            <EmailHistoryTable />
          </HistoryTabPanel>

          <HistoryTabPanel value={historyTabValue} index={1}>
            <PushHistoryTable />
          </HistoryTabPanel>
        </Box>
      </TabPanel>
    </Box>
  );
};

export default NotificationManagementPage;
