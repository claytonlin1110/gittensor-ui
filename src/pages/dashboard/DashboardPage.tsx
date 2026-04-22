import React, { useState } from 'react';
import { Box, useMediaQuery } from '@mui/material';
import { Page } from '../../components/layout';
import { SEO } from '../../components';
import theme from '../../theme';
import { type TrendTimeRange } from './dashboardData';
import useDashboardData from './useDashboardData';
import ActiveNetwork from './views/ActiveNetwork';
import DashboardFeaturedWork from './views/DashboardFeaturedWork';
import DashboardTopContributors from './views/DashboardTopContributors';
import LiveSidebar from './views/LiveSidebar';

const DashboardFeaturePage: React.FC = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('xl'));
  const showSidebarRight = useMediaQuery(theme.breakpoints.up('xl'));

  const [range, setRange] = useState<TrendTimeRange>('35d');
  const {
    kpis,
    overview,
    trendLabels,
    trendSeries,
    featuredWork,
    featuredContributors,
    featuredDiscoveryContributors,
    isLoading,
  } = useDashboardData(range);

  const sidebarWidth =
    isMobile || isTablet ? '100%' : isLargeScreen ? '340px' : '300px';

  return (
    <Page title="Dashboard">
      <SEO
        title="Dashboard"
        description="View real-time statistics, commit trends, and network performance for Gittensor."
      />
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: { xs: 1.5, sm: 1.75, md: 2 },
          py: { xs: 1.25, sm: 1.5, md: 1.75, lg: 2 },
          px: { xs: 2, sm: 2, md: 2.5, lg: 3 },
        }}
      >
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: showSidebarRight ? 'row' : 'column',
            gap: { xs: 1.5, sm: 1.5, md: 1.75, lg: 2 },
            // Let the page scroll on wide layouts so content below the fold
            // (e.g. OSS & bounties) stays reachable. Nested overflow + charts
            // often traps wheel scrolling on desktop.
            alignItems: 'flex-start',
          }}
        >
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: { xs: 1.35, sm: 1.15, md: 1.25 },
              minWidth: 0,
              pr: showSidebarRight ? 0.75 : 0,
              width: showSidebarRight ? undefined : '100%',
            }}
          >
            <ActiveNetwork
              range={range}
              trendLabels={trendLabels}
              trendSeries={trendSeries}
              sections={overview}
              kpis={kpis}
              isLoading={isLoading}
              onRangeChange={setRange}
            />

            <DashboardFeaturedWork
              featuredWork={featuredWork}
              isLoading={isLoading}
            />

            <DashboardTopContributors
              contributors={featuredContributors}
              isLoading={isLoading}
            />

            <DashboardTopContributors
              title="Featured Discoverers"
              contributors={featuredDiscoveryContributors}
              isLoading={isLoading}
            />
          </Box>

          <LiveSidebar
            showSidebarRight={showSidebarRight}
            sidebarWidth={sidebarWidth}
          />
        </Box>
      </Box>
    </Page>
  );
};

export default DashboardFeaturePage;
