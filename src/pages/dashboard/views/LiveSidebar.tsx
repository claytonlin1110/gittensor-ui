import React from 'react';
import { Box } from '@mui/material';
import LiveCommitLog from './LiveCommitLog';

/** Matches dashboard / shell assumptions for viewport chrome (e.g. app bar). */
const VIEWPORT_CHROME_PX = 64;

interface LiveSidebarProps {
  showSidebarRight: boolean;
  sidebarWidth: string;
}

const LiveSidebar: React.FC<LiveSidebarProps> = ({
  showSidebarRight,
  sidebarWidth,
}) => {
  return (
    <Box
      sx={{
        width: showSidebarRight ? sidebarWidth : '100%',
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        ...(showSidebarRight
          ? {
              position: 'sticky',
              top: VIEWPORT_CHROME_PX,
              alignSelf: 'flex-start',
              height: `calc(100vh - ${VIEWPORT_CHROME_PX}px)`,
              maxHeight: `calc(100vh - ${VIEWPORT_CHROME_PX}px)`,
            }
          : {
              height: '700px',
              maxHeight: '700px',
            }),
      }}
    >
      <LiveCommitLog />
    </Box>
  );
};

export default LiveSidebar;
