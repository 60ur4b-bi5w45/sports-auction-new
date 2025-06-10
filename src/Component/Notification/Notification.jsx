import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Grid,
  Button,
  Slider,
  Paper,
  Fade,
  Tooltip,
  Chip,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import {
  GridView,
  Person,
  Settings,
  FilterList,
  Search,
  SportsBaseball,
  SportsSoccer,
  SportsBasketball,
  Star,
  Timeline,
  Groups,
  EmojiEvents,
  Schedule,
} from '@mui/icons-material';

// Games Data
const games = [
  {
    id: 1,
    name: 'Baseball Pro League',
    type: 'BASEBALL',
    status: 'LIVE',
    image: 'https://images.unsplash.com/photo-1508344928928-7165b67de128?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    price: '$200',
    players: '18/20',
    time: '2:30 PM',
    difficulty: 'PRO',
    stats: {
      teams: 8,
      matches: 24,
      prize: '$5K'
    }
  },
  {
    id: 2,
    name: 'Soccer Champions',
    type: 'SOCCER',
    status: 'UPCOMING',
    image: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    price: '$150',
    players: '20/22',
    time: '4:00 PM',
    difficulty: 'AMATEUR',
    stats: {
      teams: 12,
      matches: 36,
      prize: '$3K'
    }
  },
  {
    id: 3,
    name: 'Basketball Tournament',
    type: 'BASKETBALL',
    status: 'REGISTERING',
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    price: '$180',
    players: '12/15',
    time: '6:30 PM',
    difficulty: 'SEMI-PRO',
    stats: {
      teams: 10,
      matches: 30,
      prize: '$4K'
    }
  },
  {
    id: 4,
    name: 'Baseball League X',
    type: 'BASEBALL',
    status: 'UPCOMING',
    image: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    price: '$250',
    players: '15/20',
    time: '3:00 PM',
    difficulty: 'ELITE',
    stats: {
      teams: 6,
      matches: 18,
      prize: '$8K'
    }
  }
];

// Styled Components
const MainContainer = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #2a3441, #1e2530)',
  minHeight: '100vh',
  width: '100vw',
  padding: theme.spacing(2),
  overflow: 'hidden',
}));

const GameWindow = styled(Paper)(({ theme }) => ({
  background: '#1e2530',
  borderRadius: 24,
  overflow: 'hidden',
  height: 'calc(100vh - 32px)',
  display: 'flex',
  boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
}));

const Sidebar = styled(Box)(({ theme }) => ({
  width: 80,
  background: 'linear-gradient(180deg, #2a3441 0%, #1e2530 100%)',
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  alignItems: 'center',
  boxShadow: '2px 0 8px rgba(0,0,0,0.3)',
}));

const ContentArea = styled(Box)(({ theme }) => ({
  flex: 1,
  background: '#f8fafc',
  padding: theme.spacing(3),
  borderRadius: 24,
  overflow: 'auto',
}));

const Header = styled(Box)(({ theme }) => ({
  background: '#ffffff',
  padding: theme.spacing(2),
  borderRadius: 16,
  marginBottom: theme.spacing(3),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
}));

const GameCard = styled(Paper)(({ theme }) => ({
  background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
  borderRadius: 20,
  padding: theme.spacing(2),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 30px rgba(0,0,0,0.15)',
    transition: 'all 0.3s ease',
    '& .game-image': {
      transform: 'scale(1.1)',
    }
  },
}));

const ActionButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #06b6d4 0%, #0891b2 100%)',
  color: 'white',
  borderRadius: 20,
  padding: '8px 24px',
  boxShadow: '0 4px 12px rgba(6, 182, 212, 0.2)',
  '&:hover': {
    background: 'linear-gradient(45deg, #0891b2 0%, #06b6d4 100%)',
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 16px rgba(6, 182, 212, 0.3)',
    transition: 'all 0.3s ease',
  },
}));

const StatusBadge = styled(Box)(({ status }) => {
  const colors = {
    LIVE: '#10b981',
    UPCOMING: '#f59e0b',
    REGISTERING: '#6366f1'
  };
  return {
    position: 'absolute',
    top: 16,
    right: 16,
    background: alpha(colors[status], 0.1),
    color: colors[status],
    padding: '4px 12px',
    borderRadius: 12,
    fontSize: '0.75rem',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    zIndex: 1,
  };
});

const GameSelection = () => {
  const [selectedGame, setSelectedGame] = useState(null);
  const [sliderValue, setSliderValue] = useState([20, 40]);

  return (
    <MainContainer>
      <GameWindow>
        <Sidebar>
          <IconButton sx={{ 
            color: '#06b6d4', 
            bgcolor: alpha('#06b6d4', 0.1),
            '&:hover': { 
              color: '#0891b2',
              bgcolor: alpha('#06b6d4', 0.2),
            } 
          }}>
            <GridView />
          </IconButton>
          {[
            { icon: <SportsBaseball />, tooltip: 'Baseball' },
            { icon: <SportsSoccer />, tooltip: 'Soccer' },
            { icon: <SportsBasketball />, tooltip: 'Basketball' },
            { icon: <Groups />, tooltip: 'Teams' },
            { icon: <FilterList />, tooltip: 'Filters' },
            { icon: <Settings />, tooltip: 'Settings' },
          ].map((item, index) => (
            <Tooltip key={index} title={item.tooltip} placement="right">
              <IconButton sx={{ 
                color: '#fff',
                '&:hover': { 
                  color: '#06b6d4',
                  bgcolor: alpha('#fff', 0.1),
                } 
              }}>
                {item.icon}
              </IconButton>
            </Tooltip>
          ))}
        </Sidebar>

        <ContentArea>
          <Header>
            <Typography variant="h5" fontWeight="bold" color="primary">
              GAME SELECTION
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Box sx={{
                bgcolor: alpha('#06b6d4', 0.1),
                borderRadius: 2,
                px: 2,
                py: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}>
                <Typography color="primary">PRICE RANGE</Typography>
                <Slider
                  value={sliderValue}
                  onChange={(e, newValue) => setSliderValue(newValue)}
                  sx={{
                    width: 100,
                    color: '#06b6d4',
                    '& .MuiSlider-thumb': {
                      backgroundColor: '#fff',
                      border: '2px solid #06b6d4',
                    },
                  }}
                />
              </Box>
              <ActionButton startIcon={<Star />}>JOIN</ActionButton>
              <ActionButton startIcon={<Timeline />}>STATS</ActionButton>
            </Box>
          </Header>

          <Grid container spacing={3}>
            {games.map((game) => (
              <Grid item xs={12} sm={6} md={3} key={game.id}>
                <Fade in={true} timeout={500}>
                  <GameCard>
                    <StatusBadge status={game.status}>
                      <Box sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        bgcolor: game.status === 'LIVE' ? '#10b981' : 
                                game.status === 'UPCOMING' ? '#f59e0b' : '#6366f1'
                      }} />
                      {game.status}
                    </StatusBadge>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Box>
                        <Typography variant="h6" fontWeight="bold">
                          {game.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {game.type} • {game.difficulty}
                        </Typography>
                      </Box>
                      <Chip
                        icon={<Schedule sx={{ fontSize: 16 }} />}
                        label={game.time}
                        sx={{
                          bgcolor: alpha('#06b6d4', 0.1),
                          color: '#06b6d4',
                          fontWeight: 'bold'
                        }}
                      />
                    </Box>

                    <Box className="game-image" sx={{
                      position: 'relative',
                      width: '100%',
                      height: 200,
                      borderRadius: 3,
                      overflow: 'hidden',
                      mb: 2,
                      '& img': {
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'all 0.3s ease'
                      }
                    }}>
                      <img src={game.image} alt={game.name} />
                      <Box sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                        color: 'white',
                        padding: 2,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <Typography variant="h5" fontWeight="bold">
                          {game.price}
                        </Typography>
                        <Typography variant="body2">
                          {game.players} Players
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ mt: 'auto' }}>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        Tournament Info
                      </Typography>
                      <Grid container spacing={1}>
                        {Object.entries(game.stats).map(([key, value]) => (
                          <Grid item xs={4} key={key}>
                            <Box sx={{
                              bgcolor: alpha('#06b6d4', 0.1),
                              p: 1,
                              borderRadius: 2,
                              textAlign: 'center'
                            }}>
                              <Typography variant="h6" color="primary" fontWeight="bold">
                                {value}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {key.toUpperCase()}
                              </Typography>
                            </Box>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  </GameCard>
                </Fade>
              </Grid>
            ))}
          </Grid>

          <Box sx={{
            mt: 3,
            display: 'flex',
            justifyContent: 'center',
            gap: 2,
            padding: 2,
            borderTop: `1px solid ${alpha('#000', 0.1)}`,
          }}>
            <ActionButton startIcon={<FilterList />}>FILTER</ActionButton>
            <ActionButton startIcon={<Star />}>JOIN GAME</ActionButton>
            <ActionButton startIcon={<EmojiEvents />}>TOURNAMENTS</ActionButton>
          </Box>
        </ContentArea>
      </GameWindow>
    </MainContainer>
  );
};

export default GameSelection;