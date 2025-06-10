import React from 'react';
import {
  Box,
  Card,
  Typography,
  Grid,
  Button,
  Avatar,
  IconButton,
  List,
  ListItem,
  Switch,
  Container,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import SettingsIcon from '@mui/icons-material/Settings';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import { PieChart, Pie, Cell } from 'recharts';

// কাস্টম স্টাইলড কম্পোনেন্টস
const LogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  '& .logo': {
    background: '#1e3a8a',
    padding: theme.spacing(1),
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
}));

const StyledCard = styled(Card)(({ theme }) => ({
  background: '#1f2937',
  color: 'white',
  borderRadius: 16,
  padding: theme.spacing(2),
  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
}));

const ScheduleCard = styled(Card)(({ theme }) => ({
  background: 'white',
  borderRadius: 12,
  padding: theme.spacing(2),
  textAlign: 'center',
  position: 'relative',
  overflow: 'visible',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: 'linear-gradient(90deg, #06b6d4, #0ea5e9)',
  }
}));

const PlayerCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: 'center',
  background: '#ffffff',
  borderRadius: 12,
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  '& .MuiAvatar-root': {
    background: 'linear-gradient(135deg, #06b6d4, #0ea5e9)',
    margin: '0 auto',
    width: 60,
    height: 60,
  }
}));

const TournamentManagement = () => {
  const scheduleCards = [
    { title: 'Create', value: '2.0', subtitle: 'Player Management', color: '#06b6d4' },
    { title: 'Setting', value: '2.0', subtitle: 'Rules', color: '#06b6d4' },
    { title: 'Testing', value: '2:10', subtitle: 'Team Budget', color: '#06b6d4' },
    { title: 'Team', value: '15.10', subtitle: 'Budget Caps', color: '#f87171' },
    { title: 'Team', value: '9:30', subtitle: 'Matches', color: '#06b6d4' },
  ];

  return (
    <Container maxWidth="xl" sx={{ bgcolor: '#f3f4f6', minHeight: '100vh', py: 3 }}>
      {/* লোগো সেকশন */}
      <Box sx={{ mb: 4 }}>
        <LogoContainer>
          <Box className="logo">
            <SportsSoccerIcon sx={{ fontSize: 40, color: 'white' }} />
          </Box>
          <Typography variant="h4" fontWeight="bold" color="#1e3a8a">
            AUCTIONT
          </Typography>
        </LogoContainer>
      </Box>

      {/* মেইন কন্টেন্ট */}
      <Box sx={{ mb: 4 }}>
        {/* টুর্নামেন্ট ম্যানেজমেন্ট হেডার */}
        <StyledCard sx={{ mb: 3 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box display="flex" alignItems="center" gap={2}>
              <Box className="logo" sx={{ bgcolor: '#06b6d4', borderRadius: '50%', p: 1 }}>
                <SportsSoccerIcon sx={{ fontSize: 32, color: 'white' }} />
              </Box>
              <Typography variant="h5" fontWeight="bold">
                TOURNAMENT MANAGEMENT
              </Typography>
            </Box>
            <Box>
              <IconButton sx={{ color: 'white' }}>
                <SettingsIcon />
              </IconButton>
              <IconButton sx={{ color: '#f87171' }}>
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
        </StyledCard>

        {/* স্কেজুল কার্ডস */}
        <Grid container spacing={2} sx={{ mb: 4 }}>
          {scheduleCards.map((card, index) => (
            <Grid item xs={12} sm={6} md={2.4} key={index}>
              <ScheduleCard>
                <Typography variant="h6" fontWeight="bold">
                  {card.title}
                </Typography>
                <Typography variant="h4" sx={{ color: card.color, my: 1 }}>
                  {card.value}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {card.subtitle}
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: card.color,
                    '&:hover': { bgcolor: card.color },
                    borderRadius: '8px',
                  }}
                  fullWidth
                >
                  {index === 4 ? 'SETTLE' : 'RULE'}
                </Button>
              </ScheduleCard>
            </Grid>
          ))}
        </Grid>

        {/* প্লেয়ার কার্ডস */}
        <Grid container spacing={2}>
          {[...Array(6)].map((_, index) => (
            <Grid item xs={6} sm={4} md={2} key={index}>
              <PlayerCard>
                <Avatar />
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    mt: 1,
                    bgcolor: index > 2 ? '#f87171' : '#06b6d4',
                    '&:hover': {
                      bgcolor: index > 2 ? '#ef4444' : '#0891b2',
                    },
                  }}
                  fullWidth
                >
                  {`${(index + 1) * 1000}`}
                </Button>
              </PlayerCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default TournamentManagement;