import React from 'react';
import {
  Avatar,
  Box,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { getGithubAvatarSrc } from '../../../utils';
import { type DashboardFeaturedWork } from '../dashboardData';

interface DashboardFeaturedWorkProps {
  featuredWork: DashboardFeaturedWork;
  isLoading?: boolean;
}

const formatScore = (value: number) =>
  value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const getInitials = (name: string) =>
  name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

const getRepoOwner = (repository: string) => repository.split('/')[0] ?? '';
const getRepoName = (repository: string) =>
  repository.split('/').pop() ?? repository;

const DashboardFeaturedWork: React.FC<DashboardFeaturedWorkProps> = ({
  featuredWork,
  isLoading = false,
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const mono = theme.typography.fontFamily;
  const hasWork = featuredWork.prs.length > 0 || featuredWork.issues.length > 0;

  return (
    <Box
      sx={{
        width: '100%',
        borderRadius: 3,
        border: `1px solid ${theme.palette.border.light}`,
        backgroundColor: 'transparent',
      }}
    >
      <Box
        sx={{
          px: { xs: 1.5, sm: 2 },
          py: { xs: 1.35, sm: 1.5 },
          borderBottom: `1px solid ${theme.palette.border.light}`,
        }}
      >
        <Typography
          sx={{
            fontFamily: mono,
            fontSize: { xs: '1.05rem', sm: '1.12rem' },
            fontWeight: 800,
            letterSpacing: '-0.02em',
            color: theme.palette.text.primary,
          }}
        >
          Featured Work
        </Typography>
        <Typography
          sx={{
            mt: 0.4,
            fontFamily: mono,
            fontSize: '0.74rem',
            fontWeight: 500,
            lineHeight: 1.45,
            color: alpha(theme.palette.text.primary, 0.62),
          }}
        >
          Up to 3 merged PRs and up to 3 issues, one per repository.
        </Typography>
      </Box>

      <Box sx={{ p: { xs: 1.5, sm: 2 } }}>
        {isLoading ? (
          <Box
            sx={{
              minHeight: 140,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CircularProgress size={28} />
          </Box>
        ) : !hasWork ? (
          <Typography
            sx={{
              color: 'text.secondary',
              fontFamily: mono,
              fontSize: '0.8rem',
            }}
          >
            Nothing to highlight for this period yet.
          </Typography>
        ) : (
          <Stack spacing={1.35}>
            <Stack spacing={1.1}>
              <Typography
                sx={{
                  fontFamily: mono,
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  letterSpacing: '0.02em',
                  color: alpha(theme.palette.text.primary, 0.72),
                }}
              >
                Top PRs (up to 3)
              </Typography>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: '1fr',
                    md: 'repeat(2, minmax(0, 1fr))',
                    xl: 'repeat(3, minmax(0, 1fr))',
                  },
                  gap: 1,
                }}
              >
                {featuredWork.prs.map((pr) => {
                  const repoOwner = getRepoOwner(pr.repository);
                  const repoName = getRepoName(pr.repository);
                  const prTitle =
                    pr.title?.trim() ||
                    `${repoName} PR #${pr.pullRequestNumber}`;
                  return (
                    <Box
                      key={pr.repository}
                      component="button"
                      type="button"
                      onClick={() =>
                        navigate(
                          `/miners/pr?repo=${encodeURIComponent(pr.repository)}&number=${pr.pullRequestNumber}`,
                        )
                      }
                      sx={{
                        width: '100%',
                        textAlign: 'left',
                        border: `1px solid ${theme.palette.border.light}`,
                        borderRadius: 2.2,
                        backgroundColor: 'transparent',
                        p: 1.15,
                        cursor: 'pointer',
                        transition:
                          'background-color 0.15s ease, box-shadow 0.15s ease',
                        '&:hover': {
                          backgroundColor: theme.palette.surface.subtle,
                          boxShadow: `0 0 0 1px ${alpha(theme.palette.border.light, 0.2)}`,
                        },
                      }}
                    >
                      <Stack spacing={0.8}>
                        <Stack
                          direction="row"
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <Box />
                          <Typography
                            sx={{
                              fontFamily: mono,
                              fontSize: '0.84rem',
                              fontWeight: 700,
                              color: alpha(theme.palette.text.primary, 0.88),
                            }}
                          >
                            #{pr.pullRequestNumber}
                          </Typography>
                        </Stack>
                        <Stack
                          direction="row"
                          spacing={0.7}
                          alignItems="center"
                          sx={{ minWidth: 0 }}
                        >
                          <Avatar
                            src={getGithubAvatarSrc(repoOwner)}
                            alt={repoOwner || pr.repository}
                            sx={{
                              width: 24,
                              height: 24,
                              fontSize: '0.68rem',
                              fontFamily: mono,
                              bgcolor: theme.palette.surface.light,
                              border: `1px solid ${theme.palette.border.light}`,
                            }}
                          >
                            {getInitials(repoName)}
                          </Avatar>
                          <Typography
                            sx={{
                              fontFamily: mono,
                              fontSize: '0.74rem',
                              fontWeight: 700,
                              color: alpha(theme.palette.text.primary, 0.82),
                              minWidth: 0,
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            {pr.repository}
                          </Typography>
                        </Stack>
                        <Typography
                          sx={{
                            fontFamily: mono,
                            fontSize: { xs: '1.02rem', md: '1.06rem' },
                            fontWeight: 700,
                            color: theme.palette.text.primary,
                            lineHeight: 1.33,
                            minHeight: '2.66em',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          }}
                        >
                          {prTitle}
                        </Typography>
                        <Stack
                          direction="row"
                          spacing={0.6}
                          alignItems="center"
                          sx={{ minWidth: 0 }}
                        >
                          <Avatar
                            src={getGithubAvatarSrc(pr.author)}
                            alt={pr.author}
                            sx={{
                              width: 22,
                              height: 22,
                              fontSize: '0.64rem',
                              fontFamily: mono,
                              bgcolor: theme.palette.surface.light,
                              border: `1px solid ${theme.palette.border.light}`,
                            }}
                          >
                            {getInitials(pr.author)}
                          </Avatar>
                          <Typography
                            sx={{
                              fontFamily: mono,
                              fontSize: '0.71rem',
                              fontWeight: 600,
                              color: alpha(theme.palette.text.primary, 0.72),
                              minWidth: 0,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            by {pr.author}
                          </Typography>
                        </Stack>
                        <Box
                          sx={{
                            pt: 0.72,
                            borderTop: `1px solid ${alpha(theme.palette.border.light, 0.75)}`,
                          }}
                        >
                          <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                          >
                            <Stack
                              direction="row"
                              spacing={0.75}
                              alignItems="center"
                            >
                              <Box
                                sx={{
                                  px: 0.55,
                                  py: 0.18,
                                  borderRadius: 1,
                                  border: `1px solid ${theme.palette.border.light}`,
                                  backgroundColor: theme.palette.surface.subtle,
                                }}
                              >
                                <Typography
                                  sx={{
                                    fontFamily: mono,
                                    fontSize: '0.62rem',
                                    fontWeight: 700,
                                    color: alpha(
                                      theme.palette.text.primary,
                                      0.72,
                                    ),
                                  }}
                                >
                                  Merged
                                </Typography>
                              </Box>
                              <Typography
                                sx={{
                                  fontFamily: mono,
                                  fontSize: '0.7rem',
                                  fontWeight: 700,
                                }}
                              >
                                <Box
                                  component="span"
                                  sx={{
                                    color: alpha(
                                      theme.palette.diff.additions,
                                      0.9,
                                    ),
                                  }}
                                >
                                  +{pr.additions.toLocaleString()}
                                </Box>
                                <Box
                                  component="span"
                                  sx={{
                                    color: alpha(
                                      theme.palette.text.primary,
                                      0.6,
                                    ),
                                  }}
                                >
                                  {' '}
                                  /{' '}
                                </Box>
                                <Box
                                  component="span"
                                  sx={{
                                    color: alpha(
                                      theme.palette.diff.deletions,
                                      0.92,
                                    ),
                                  }}
                                >
                                  -{pr.deletions.toLocaleString()}
                                </Box>
                              </Typography>
                            </Stack>
                            <Typography
                              sx={{
                                fontFamily: mono,
                                fontSize: '0.7rem',
                                fontWeight: 700,
                                color: alpha(theme.palette.text.primary, 0.68),
                              }}
                            >
                              Score {formatScore(pr.score)}
                            </Typography>
                          </Stack>
                        </Box>
                      </Stack>
                    </Box>
                  );
                })}
              </Box>
            </Stack>

            <Stack spacing={1.1}>
              <Typography
                sx={{
                  fontFamily: mono,
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  letterSpacing: '0.02em',
                  color: alpha(theme.palette.text.primary, 0.72),
                }}
              >
                Issues (up to 3)
              </Typography>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: '1fr',
                    md: 'repeat(2, minmax(0, 1fr))',
                    xl: 'repeat(3, minmax(0, 1fr))',
                  },
                  gap: 1,
                }}
              >
                {featuredWork.issues.map((issue) => {
                  const repoOwner = getRepoOwner(issue.repositoryFullName);
                  const repoName = getRepoName(issue.repositoryFullName);
                  const issueTitle =
                    issue.title?.trim() ||
                    `${repoName} Issue #${issue.issueNumber}`;
                  return (
                    <Box
                      key={issue.repositoryFullName}
                      component="button"
                      type="button"
                      onClick={() =>
                        navigate(`/bounties/details?id=${issue.id}`)
                      }
                      sx={{
                        width: '100%',
                        textAlign: 'left',
                        border: `1px solid ${theme.palette.border.light}`,
                        borderRadius: 2.2,
                        backgroundColor: 'transparent',
                        p: 1.15,
                        cursor: 'pointer',
                        transition:
                          'background-color 0.15s ease, box-shadow 0.15s ease',
                        '&:hover': {
                          backgroundColor: theme.palette.surface.subtle,
                          boxShadow: `0 0 0 1px ${alpha(theme.palette.border.light, 0.2)}`,
                        },
                      }}
                    >
                      <Stack spacing={0.8}>
                        <Stack
                          direction="row"
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <Box />
                          <Typography
                            sx={{
                              fontFamily: mono,
                              fontSize: '0.84rem',
                              fontWeight: 700,
                              color: alpha(theme.palette.text.primary, 0.88),
                            }}
                          >
                            #{issue.issueNumber}
                          </Typography>
                        </Stack>
                        <Stack
                          direction="row"
                          spacing={0.7}
                          alignItems="center"
                          sx={{ minWidth: 0 }}
                        >
                          <Avatar
                            src={getGithubAvatarSrc(repoOwner)}
                            alt={repoOwner || issue.repositoryFullName}
                            sx={{
                              width: 24,
                              height: 24,
                              fontSize: '0.68rem',
                              fontFamily: mono,
                              bgcolor: theme.palette.surface.light,
                              border: `1px solid ${theme.palette.border.light}`,
                            }}
                          >
                            {getInitials(repoName)}
                          </Avatar>
                          <Typography
                            sx={{
                              fontFamily: mono,
                              fontSize: '0.74rem',
                              fontWeight: 700,
                              color: alpha(theme.palette.text.primary, 0.82),
                              minWidth: 0,
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            {issue.repositoryFullName}
                          </Typography>
                        </Stack>
                        <Typography
                          sx={{
                            fontFamily: mono,
                            fontSize: { xs: '1.02rem', md: '1.06rem' },
                            fontWeight: 700,
                            color: theme.palette.text.primary,
                            lineHeight: 1.33,
                            minHeight: '2.66em',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          }}
                        >
                          {issueTitle}
                        </Typography>
                        <Box
                          sx={{
                            pt: 0.72,
                            borderTop: `1px solid ${alpha(theme.palette.border.light, 0.75)}`,
                          }}
                        >
                          <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                          >
                            <Typography
                              sx={{
                                fontFamily: mono,
                                fontSize: '0.62rem',
                                fontWeight: 700,
                                color: alpha(theme.palette.text.primary, 0.72),
                                letterSpacing: '0.03em',
                              }}
                            >
                              {issue.status === 'completed'
                                ? 'Completed'
                                : 'Open'}
                            </Typography>
                          </Stack>
                        </Box>
                      </Stack>
                    </Box>
                  );
                })}
              </Box>
            </Stack>
          </Stack>
        )}
      </Box>
    </Box>
  );
};

export default DashboardFeaturedWork;
