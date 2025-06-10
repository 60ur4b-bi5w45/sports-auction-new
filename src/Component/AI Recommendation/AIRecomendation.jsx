import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Button,
  Rating,
  Avatar,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { SportsSoccer, Star, Timeline } from '@mui/icons-material';

// স্টাইলড কম্পোনেন্টস
const GlassCard = styled(Box)(({ theme }) => ({
  background: alpha('#1e293b', 0.9),
  borderRadius: 24,
  padding: theme.spacing(3),
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255,255,255,0.1)',
  boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
}));

const PlayerHexagon = styled(Box)(({ theme }) => ({
  width: 200,
  height: 230,
  position: 'relative',
  background: 'linear-gradient(145deg, #3b82f6 0%, #1e40af 100%)',
  clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const PlayerCard = styled(GlassCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(2),
  cursor: 'pointer',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
}));

const Field3D = styled(Box)(({ theme }) => ({
  width: '100%',
  height: 200,
  background: 'linear-gradient(145deg, #3b82f6 0%, #1e40af 100%)',
  borderRadius: 16,
  position: 'relative',
  transform: 'perspective(1000px) rotateX(45deg)',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: '10%',
    left: '10%',
    right: '10%',
    bottom: '10%',
    border: '2px solid rgba(255,255,255,0.3)',
    borderRadius: 8,
  },
}));

const BlueButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #3b82f6 30%, #60a5fa 90%)',
  borderRadius: 20,
  color: 'white',
  padding: '10px 25px',
  boxShadow: '0 3px 15px rgba(59,130,246,0.3)',
}));

const AIRecommendations = () => {
  const players = [
    {
      id: 1,
      name: 'Kade Bastion',
      rating: 4.5,
      score: 150,
      image: '/player1.jpg',
      position: 'Forward',
    },
    {
      id: 2,
      name: 'Abston Bashon',
      rating: 4,
      score: 20,
      image: '/player2.jpg',
      position: 'Midfielder',
    },
    // Add more players...
  ];

  return (
    <Box sx={{ p: 4, background: '#0f172a', minHeight: '100vh' }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" sx={{ color: 'white', fontWeight: 'bold', mb: 1 }}>
          AI-Based Recommendations
        </Typography>
        <Typography variant="subtitle1" sx={{ color: 'gray' }}>
          Suggested performance, bidd, team history
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Left Side - 3D Fields */}
        <Grid item xs={12} md={4}>
          <Box sx={{ position: 'relative' }}>
            <Field3D />
            <Box sx={{ 
              position: 'absolute', 
              bottom: -20, 
              right: -20,
              transform: 'rotate(-30deg)',
            }}>
              <SportsSoccer sx={{ fontSize: 60, color: '#3b82f6' }} />
            </Box>
          </Box>
          
          <PlayerHexagon sx={{ mt: 4 }}>
            <Avatar
              src="/player3.jpg"
              sx={{ width: 120, height: 120 }}
            />
          </PlayerHexagon>
        </Grid>

        {/* Center - Player Cards */}
        <Grid item xs={12} md={4}>
          {players.map((player) => (
            <PlayerCard key={player.id} sx={{ mb: 3 }}>
              <Box sx={{ position: 'relative' }}>
                <Avatar
                  src={player.image}
                  sx={{ width: 100, height: 100 }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    top: -10,
                    right: -10,
                    bgcolor: '#3b82f6',
                    color: 'white',
                    px: 1,
                    py: 0.5,
                    borderRadius: 1,
                  }}
                >
                  AI
                </Box>
              </Box>
              
              <Typography variant="h5" sx={{ color: 'white' }}>
                {player.name}
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Rating value={player.rating} readOnly />
                <Typography variant="h4" sx={{ color: '#3b82f6' }}>
                  {player.score}
                </Typography>
              </Box>

              <BlueButton fullWidth>
                Recommendation
              </BlueButton>
            </PlayerCard>
          ))}
        </Grid>

        {/* Right Side - Stats */}
        <Grid item xs={12} md={4}>
          <GlassCard>
            <Typography variant="h5" sx={{ color: 'white', mb: 3 }}>
              PAI-Based Recommendations
            </Typography>
            
            <Box sx={{ mb: 4 }}>
              <Typography variant="h2" sx={{ color: '#3b82f6' }}>
                60
              </Typography>
              <Typography variant="body2" sx={{ color: 'gray' }}>
                Historical Value history
              </Typography>
            </Box>

            <Typography variant="body1" sx={{ color: 'white', mb: 2 }}>
              Based on past performance, preferences, team matches, and team budget metrics.
            </Typography>

            <BlueButton fullWidth>
              SUGGESTS
            </BlueButton>
          </GlassCard>

          {/* Mini Player Cards */}
          <Grid container spacing={2} sx={{ mt: 3 }}>
            {[1, 2, 3, 4].map((id) => (
              <Grid item xs={6} key={id}>
                <GlassCard>
                  <Avatar sx={{ mb: 1 }} />
                  <Typography variant="body2" sx={{ color: 'white' }}>
                    Player {id}
                  </Typography>
                  <BlueButton size="small" sx={{ mt: 1 }}>
                    Region Stats
                  </BlueButton>
                </GlassCard>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AIRecommendations;