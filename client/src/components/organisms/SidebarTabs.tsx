import React, { useState } from 'react';
import {
  Box,
  Tabs,
  Tab,
  Skeleton,
} from '@mui/material';
import OasisTab from './OasisTab';
import DischargeReportTab from './DischargeReportTab';
import IntakeTab from './IntakeTab';
import NotesPanel from '../molecules/NotesPanel';
import ICD10Tab from '../molecules/ICD10Tab';

const tabs = [
  { label: 'Notes', key: 'notes' },
  { label: 'ICD-10 Codes', key: 'icd10' },
  { label: 'OASIS', key: 'oasis' },
  { label: 'Discharge Report', key: 'discharge' },
  { label: 'Intake', key: 'intake' },
];

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`sidebar-tabpanel-${index}`}
      aria-labelledby={`sidebar-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ height: '100%', overflow: 'auto' }}>
          {children}
        </Box>
      )}
    </div>
  );
};

const SidebarTabs: React.FC<{ loading: boolean }> = ({ loading }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 500,
              minWidth: 100,
            }
          }}
        >
          {tabs.map((tab) => (
            <Tab key={tab.key} label={tab.label} />
          ))}
        </Tabs>
      </Box>

      <Box sx={{ flex: 1, overflow: 'hidden' }}>
        {loading ? (
          <Box sx={{ p: 2 }}>
            <Skeleton variant="rectangular" height={32} sx={{ mb: 2 }} />
            <Skeleton variant="rectangular" height={24} sx={{ mb: 1.5 }} />
            <Skeleton variant="rectangular" height={24} sx={{ mb: 1.5 }} />
            <Skeleton variant="rectangular" height={24} sx={{ mb: 1.5 }} />
          </Box>
        ) : (
          <>
            <TabPanel value={activeTab} index={0}>
              <NotesPanel patientId="123" />
            </TabPanel>
            <TabPanel value={activeTab} index={1}>
              <ICD10Tab />
            </TabPanel>
            <TabPanel value={activeTab} index={2}>
              <OasisTab />
            </TabPanel>
            <TabPanel value={activeTab} index={3}>
              <DischargeReportTab />
            </TabPanel>
            <TabPanel value={activeTab} index={4}>
              <IntakeTab />
            </TabPanel>
          </>
        )}
      </Box>
    </Box>
  );
};

export default SidebarTabs; 