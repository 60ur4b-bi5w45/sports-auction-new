import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Button,
  Avatar,
  IconButton,
  CircularProgress,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import {
  History,
  Timeline,
  SportsSoccer,
  Notifications,
  ArrowUpward,
  Timer,
} from '@mui/icons-material';

// স্টাইলড কম্পোনেন্টস
const GlassCard = styled(Box)(({ theme }) => ({
  background: alpha('#1a2233', 0.85),
  borderRadius: 20,
  padding: theme.spacing(2),
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255,255,255,0.1)',
  boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
}));

const Jersey = styled(Box)(({ bgColor = '#ffffff' }) => ({
  width: '100%',
  height: 140,
  background: `linear-gradient(145deg, ${bgColor} 0%, ${alpha(bgColor, 0.8)} 100%)`,
  borderRadius: 16,
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '5px 5px 15px rgba(0,0,0,0.2)',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '10%',
    left: '25%',
    right: '25%',
    height: '3px',
    background: alpha('#000', 0.1),
    borderRadius: 2,
  },
}));

const BidButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #ff4b6e 30%, #ff758c 90%)',
  borderRadius: 30,
  color: 'white',
  padding: '12px 35px',
  fontSize: '1.2rem',
  fontWeight: 'bold',
  boxShadow: '0 3px 20px rgba(255,75,110,0.4)',
  '&:hover': {
    background: 'linear-gradient(45deg, #ff758c 30%, #ff4b6e 90%)',
  },
}));

const CircularProgressWithLabel = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'inline-flex',
  '& .MuiCircularProgress-root': {
    color: '#3b82f6',
  },
}));

const AuctionDashboard = () => {
  const [currentBid, setCurrentBid] = useState(30);
  const [timeLeft, setTimeLeft] = useState(33.80);
  
  const jerseys = [
    { number: '21', color: '#1e40af', status: 'active' },
    { number: '23', color: '#ffffff', status: 'pending' },
    { number: '17', color: '#3b82f6', status: 'active' },
    { number: '8', color: '#ef4444', status: 'sold' },
    { number: '29', color: '#6b7280', status: 'active' },
    { number: '1', color: '#ef4444', status: 'pending' },
  ];

  const playerStats = [
    { label: 'Goals', value: '5.0.2.90' },
    { label: 'Assists', value: '3.10' },
    { label: 'Rating', value: '$10.9.90' },
  ];

  return (
    <Box sx={{ p: 3, background: '#0f172a', minHeight: '100vh' }}>
      <Grid container spacing={3}>
        {/* Header */}
        <Grid item xs={12}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            mb: 4 
          }}>
            <Typography 
              variant="h4" 
              sx={{ 
                color: 'white',
                fontWeight: 'bold',
                letterSpacing: 1,
              }}
            >
              AUCTION DASHBOARD
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <IconButton sx={{ 
                color: '#ff4b6e',
                bgcolor: alpha('#ff4b6e', 0.1),
              }}>
                <Notifications />
              </IconButton>
              <IconButton sx={{ 
                color: '#3b82f6',
                bgcolor: alpha('#3b82f6', 0.1),
              }}>
                <Timeline />
              </IconButton>
              <BidButton>
                BID
              </BidButton>
            </Box>
          </Box>
        </Grid>

        {/* Jersey Grid */}
        <Grid item xs={12} md={3}>
          <Grid container spacing={2}>
            {jerseys.map((jersey, index) => (
              <Grid item xs={6} key={index}>
                <Jersey bgColor={jersey.color}>
                  <Typography
                    variant="h3"
                    sx={{
                      color: jersey.color === '#ffffff' ? '#1a2233' : 'white',
                      fontWeight: 'bold',
                      textShadow: jersey.color === '#ffffff' ? 'none' : '2px 2px 4px rgba(0,0,0,0.2)',
                    }}
                  >
                    {jersey.number}
                  </Typography>
                  {jersey.status === 'active' && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        bgcolor: '#10b981',
                      }}
                    />
                  )}
                </Jersey>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Center Content */}
        <Grid item xs={12} md={6}>
          <GlassCard sx={{ mb: 3 }}>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 3,
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar
                  src="/player-image.jpg"
                  sx={{ 
                    width: 60, 
                    height: 60,
                    border: '3px solid #3b82f6',
                    mr: 2,
                  }}
                />
                <Box>
                  <Typography variant="h6" color="white">
                    PLAYER AUCTION STATUS
                  </Typography>
                  <Typography
                    variant="h3"
                    sx={{ color: '#3b82f6', fontWeight: 'bold' }}
                  >
                    2.30
                  </Typography>
                </Box>
              </Box>
              <CircularProgressWithLabel>
                <CircularProgress variant="determinate" value={75} size={60} />
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography variant="caption" sx={{ color: 'white' }}>
                    75%
                  </Typography>
                </Box>
              </CircularProgressWithLabel>
            </Box>

            <Grid container spacing={2}>
              {playerStats.map((stat, index) => (
                <Grid item xs={4} key={index}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography
                      variant="h5"
                      sx={{ color: '#3b82f6', fontWeight: 'bold' }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="gray">
                      {stat.label}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </GlassCard>

          {/* Timer and Available Pool */}
          <GlassCard sx={{ mb: 3 }}>
            <Box sx={{ 
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <Box>
                <Typography variant="h6" color="white">
                  AVAILABLE PLAYER POOL
                </Typography>
                <Typography
                  variant="h2"
                  sx={{ color: '#ff4b6e', fontWeight: 'bold' }}
                >
                  {timeLeft}
                </Typography>
              </Box>
              <Timer sx={{ fontSize: 40, color: '#ff4b6e' }} />
            </Box>
          </GlassCard>

          {/* Soccer Field Visualization */}
          <GlassCard
            sx={{
              height: 200,
              background: 'linear-gradient(145deg, #28a745 0%, #20c997 100%)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Field Markings */}
            <Box
              sx={{
                position: 'absolute',
                top: '10%',
                left: '10%',
                right: '10%',
                bottom: '10%',
                border: '2px solid rgba(255,255,255,0.3)',
                borderRadius: 8,
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: '50%',
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: 'rgba(255,255,255,0.3)',
                },
              }}
            />
            <SportsSoccer
              sx={{
                position: 'absolute',
                bottom: 10,
                right: 10,
                color: 'rgba(255,255,255,0.3)',
                fontSize: 40,
              }}
            />
          </GlassCard>
        </Grid>

        {/* Right Column - Bid Section */}
        <Grid item xs={12} md={3}>
          <GlassCard>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Typography
                variant="h1"
                sx={{
                  color: 'white',
                  fontWeight: 'bold',
                  textShadow: '0 0 20px rgba(59,130,246,0.5)',
                }}
              >
                {currentBid}
              </Typography>
              <Typography variant="body2" color="gray">
                CURRENT BID
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              <Button
                fullWidth
                variant="outlined"
                color="primary"
                startIcon={<History />}
              >
                HISTORY
              </Button>
              <BidButton fullWidth>
                BID NOW
              </BidButton>
            </Box>

            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" color="white" gutterBottom>
                TEAM BUDGET
              </Typography>
              <Typography
                variant="h3"
                sx={{ color: '#3b82f6', fontWeight: 'bold' }}
              >
                3.10
              </Typography>
              <Box
                sx={{
                  mt: 2,
                  height: 4,
                  bgcolor: alpha('#3b82f6', 0.2),
                  borderRadius: 2,
                  overflow: 'hidden',
                }}
              >
                <Box
                  sx={{
                    width: '60%',
                    height: '100%',
                    bgcolor: '#3b82f6',
                    borderRadius: 2,
                  }}
                />
              </Box>
            </Box>
          </GlassCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AuctionDashboard;