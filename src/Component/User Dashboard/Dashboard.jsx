import React from 'react';
import {
  Box,
  Typography,
  Avatar,
  Paper,
  Button,
  Grid,
  Container,
  Card,
  CardContent,
  IconButton,
  useTheme,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Gavel,
  Group,
  EmojiEvents,
  TrendingUp,
  SportsEsports,
} from '@mui/icons-material';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  borderRadius: theme.spacing(2),
  color: 'white',
  border: '1px solid rgba(255, 255, 255, 0.2)',
}));

const StatCard = ({ icon, title, value, color }) => {
  const theme = useTheme();
  
  return (
    <Card 
      sx={{ 
        bgcolor: 'background.paper',
        color: 'text.primary',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: theme.shadows[4],
          transition: 'all 0.3s ease',
        },
      }}
    >
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          <IconButton sx={{ color: color || 'primary.main', bgcolor: 'action.hover', mr: 2 }}>
            {icon}
          </IconButton>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
        </Box>
        <Typography variant="h4" component="div" sx={{ textAlign: 'right' }}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
};

const Dashboard = () => {
  const { userProfile, logout } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  const stats = [
    {
      icon: <Gavel />,
      title: 'Active Auctions',
      value: '5',
      color: theme.palette.primary.main,
    },
    {
      icon: <Group />,
      title: 'Total Players',
      value: '120',
      color: theme.palette.success.main,
    },
    {
      icon: <EmojiEvents />,
      title: 'Tournaments',
      value: '8',
      color: theme.palette.warning.main,
    },
    {
      icon: <TrendingUp />,
      title: 'Total Bids',
      value: '256',
      color: theme.palette.info.main,
    },
    {
      icon: <SportsEsports />,
      title: 'Active Games',
      value: '3',
      color: theme.palette.secondary.main,
    },
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
        backgroundImage: 'url("/assets/background.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        py: 4,
      }}
    >
      <Container>
        <StyledPaper elevation={3}>
          <Grid container spacing={3}>
            {/* User Profile Section */}
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Avatar
                  src={userProfile?.photoURL || '/assets/default-avatar.png'}
                  sx={{
                    width: 120,
                    height: 120,
                    margin: '0 auto',
                    border: '4px solid rgba(255, 255, 255, 0.2)',
                  }}
                />
                <Typography variant="h5" sx={{ mt: 2, fontWeight: 'bold' }}>
                  {userProfile?.displayName || 'User'}
                </Typography>
                <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  {userProfile?.email}
                </Typography>
                <Button
                  variant="outlined"
                  color="inherit"
                  onClick={handleLogout}
                  sx={{ mt: 2 }}
                >
                  Logout
                </Button>
              </Box>
            </Grid>

            {/* Dashboard Content */}
            <Grid item xs={12} md={8}>
              <Typography variant="h4" gutterBottom>
                Welcome to Sports Auction Management
              </Typography>
              <Grid container spacing={2}>
                {stats.map((stat, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <StatCard {...stat} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </StyledPaper>
      </Container>
    </Box>
  );
};

export default Dashboard;