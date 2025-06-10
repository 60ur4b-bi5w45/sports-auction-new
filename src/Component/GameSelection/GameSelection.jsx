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
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
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
  SportsCricket,
  SportsVolleyball,
  SportsHandball,
  SportsRugby,
} from '@mui/icons-material';

// Games Data
const games = [
  {
    id: 1,
    name: 'Cricket',
    icon: <SportsCricket />,
    image: 'https://source.unsplash.com/800x600/?cricket',
    description: 'A bat-and-ball game played between two teams of eleven players.',
    status: 'Active',
    players: 22,
    teams: 4,
  },
  {
    id: 2,
    name: 'Football',
    icon: <SportsSoccer />,
    image: 'https://source.unsplash.com/800x600/?football',
    description: 'A team sport played between two teams of eleven players with a spherical ball.',
    status: 'Active',
    players: 22,
    teams: 4,
  },
  {
    id: 3,
    name: 'Basketball',
    icon: <SportsBasketball />,
    image: 'https://source.unsplash.com/800x600/?basketball',
    description: 'A team sport in which two teams score points by throwing a ball through a hoop.',
    status: 'Upcoming',
    players: 10,
    teams: 2,
  },
  {
    id: 4,
    name: 'Volleyball',
    icon: <SportsVolleyball />,
    image: 'https://source.unsplash.com/800x600/?volleyball',
    description: 'A team sport in which two teams hit a ball back and forth over a net.',
    status: 'Upcoming',
    players: 12,
    teams: 2,
  },
  {
    id: 5,
    name: 'Handball',
    icon: <SportsHandball />,
    image: 'https://source.unsplash.com/800x600/?handball',
    description: 'A team sport where players pass and bounce a ball to throw it into the goal.',
    status: 'Inactive',
    players: 14,
    teams: 2,
  },
  {
    id: 6,
    name: 'Rugby',
    icon: <SportsRugby />,
    image: 'https://source.unsplash.com/800x600/?rugby',
    description: 'A full-contact team sport that originated in England.',
    status: 'Inactive',
    players: 30,
    teams: 2,
  },
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
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    teamName: '',
    playerCount: '',
    preferredPosition: '',
  });

  const handleJoinGame = (game) => {
    setSelectedGame(game);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedGame(null);
    setFormData({
      teamName: '',
      playerCount: '',
      preferredPosition: '',
    });
  };

  const handleSubmit = () => {
    // Here you would implement the join game logic
    console.log('Joining game:', selectedGame.name, 'with data:', formData);
    handleClose();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return '#10b981';
      case 'Upcoming':
        return '#f59e0b';
      case 'Inactive':
        return '#6366f1';
      default:
        return '#06b6d4';
    }
  };

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
                  <Card 
                    sx={{ 
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      bgcolor: 'background.paper',
                      color: 'text.primary',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                        transition: 'all 0.3s ease',
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="140"
                      image={game.image}
                      alt={game.name}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box display="flex" alignItems="center" mb={1}>
                        <Box sx={{ mr: 1 }}>{game.icon}</Box>
                        <Typography variant="h6" component="div">
                          {game.name}
                        </Typography>
                      </Box>
                      <Chip
                        label={game.status}
                        size="small"
                        sx={{
                          bgcolor: getStatusColor(game.status),
                          color: 'white',
                          mb: 1,
                        }}
                      />
                      <Typography variant="body2" color="text.secondary" paragraph>
                        {game.description}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Players: {game.players} • Teams: {game.teams}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        color="primary"
                        onClick={() => handleJoinGame(game)}
                        disabled={game.status === 'Inactive'}
                      >
                        Join Game
                      </Button>
                    </CardActions>
                  </Card>
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

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Join {selectedGame?.name}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Team Name"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.teamName}
            onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Number of Players"
            type="number"
            fullWidth
            variant="outlined"
            value={formData.playerCount}
            onChange={(e) => setFormData({ ...formData, playerCount: e.target.value })}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth variant="outlined">
            <InputLabel>Preferred Position</InputLabel>
            <Select
              value={formData.preferredPosition}
              onChange={(e) => setFormData({ ...formData, preferredPosition: e.target.value })}
              label="Preferred Position"
            >
              <MenuItem value=""><em>None</em></MenuItem>
              <MenuItem value="Forward">Forward</MenuItem>
              <MenuItem value="Midfielder">Midfielder</MenuItem>
              <MenuItem value="Defender">Defender</MenuItem>
              <MenuItem value="Goalkeeper">Goalkeeper</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Join
          </Button>
        </DialogActions>
      </Dialog>
    </MainContainer>
  );
};

export default GameSelection;