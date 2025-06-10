import React from 'react';
import { Box, Typography, Button, Container, AppBar, Toolbar } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

// Styled components
const StyledContainer = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
  minHeight: '100vh',
  minWidth:'100vw',
  position: 'relative',
  overflow: 'hidden',
}));

const NavBar = styled(AppBar)(({ theme }) => ({
  background: 'transparent',
  boxShadow: 'none',
  padding: theme.spacing(2, 0),
}));

const MainContent = styled(Box)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(8, 0),
  zIndex: 1,
}));

const ActionCard = styled(Box)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  borderRadius: 20,
  padding: theme.spacing(4),
  maxWidth: 500,
  margin: '0 auto',
  textAlign: 'center',
}));

const FeatureBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-around',
  marginTop: theme.spacing(8),
}));

const FeatureItem = styled(Box)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.1)',
  borderRadius: 16,
  padding: theme.spacing(3),
  textAlign: 'center',
  width: '200px',
  backdropFilter: 'blur(5px)',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
  borderRadius: 25,
  border: 0,
  color: 'white',
  padding: '12px 45px',
  boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
  marginTop: theme.spacing(3),
  '&:hover': {
    background: 'linear-gradient(45deg, #21CBF3 30%, #2196F3 90%)',
  },
}));

const Homepage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/login');
  };

  return (
    <StyledContainer>
      <NavBar position="static">
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
            <img 
              src="https://www.pngmart.com/files/22/Sport-Logo-PNG-Isolated-HD.png" 
              alt="Logo" 
              style={{ height: 40 }} 
            />
            <Typography variant="h6" component="div">
              Player Management
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button color="inherit">Home</Button>
            <Button color="inherit">Tournaments</Button>
            <Button color="inherit">Auctions</Button>
            <Button color="inherit">About</Button>
            <StyledButton variant="contained" onClick={handleGetStarted}>Get Started</StyledButton>
          </Box>
        </Toolbar>
      </NavBar>

      <MainContent>
        <Container>
          <ActionCard>
            <Typography variant="h3" component="h1" sx={{ color: 'white', mb: 3 }}>
              PLAYER AUCTION
            </Typography>
            <Typography variant="body1" sx={{ color: 'white', mb: 4 }}>
              Join live auctions and bid on top players. Experience AI-powered recommendations
              and secure team management.
            </Typography>
            <StyledButton variant="contained" size="large" onClick={handleGetStarted}>
              GET STARTED
            </StyledButton>
          </ActionCard>

          <FeatureBox>
            {[
              {
                icon: '🏠',
                title: 'HOME',
                subtitle: 'LIVE',
                description: 'Secure team management',
              },
              {
                icon: '🎮',
                title: 'LIVE AUCTIONS',
                subtitle: 'AI-CIRCUIT',
                description: 'Real-time bidding experience',
              },
              {
                icon: '🤖',
                title: 'AI-POWERED',
                subtitle: 'RECOMMENDATIONS',
                description: 'Smart player suggestions',
              },
              {
                icon: 'ℹ️',
                title: 'ABOUT US',
                subtitle: 'LEARN MORE',
                description: 'Discover our platform',
              },
            ].map((feature, index) => (
              <FeatureItem key={index}>
                <Typography variant="h2" sx={{ mb: 1 }}>{feature.icon}</Typography>
                <Typography variant="h6" sx={{ color: 'white', mb: 1 }}>
                  {feature.title}
                </Typography>
                <Typography variant="subtitle2" sx={{ color: '#90caf9', mb: 1 }}>
                  {feature.subtitle}
                </Typography>
                <Typography variant="body2" sx={{ color: 'white' }}>
                  {feature.description}
                </Typography>
              </FeatureItem>
            ))}
          </FeatureBox>
        </Container>
      </MainContent>

      {/* Decorative Elements */}
      <Box
        component="img"
        src="https://www.pngmart.com/files/7/Basketball-PNG-Free-Download.png"
        sx={{
          position: 'absolute',
          left: '10%',
          top: '20%',
          width: '100px',
          transform: 'rotate(-15deg)',
        }}
      />
      <Box
        component="img"
        src="https://www.pngmart.com/files/1/Soccer-Ball-PNG-Clipart.png"
        sx={{
          position: 'absolute',
          right: '15%',
          bottom: '20%',
          width: '80px',
        }}
      />
      <Box
        component="img"
        src="https://www.pngmart.com/files/22/Baseball-Player-PNG-Isolated-HD.png"
        sx={{
          position: 'absolute',
          right: '5%',
          top: '15%',
          height: '400px',
        }}
      />
    </StyledContainer>
  );
};

export default Homepage;