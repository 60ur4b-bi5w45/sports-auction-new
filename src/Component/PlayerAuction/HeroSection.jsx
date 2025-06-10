import { Box, Typography, Button, Paper, Grid } from '@mui/material';

const HeroSection = ({ currentBid }) => {
  return (
    <Box
      sx={{
        p: 4,
        backgroundColor: '#1A1A2E', // Dark Blue Background
        minHeight: '100vh', // Full viewport height
      }}
    >
      <Grid container spacing={4}>
        {/* Left Section */}
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
            <Box
              sx={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                bgcolor: 'secondary.main',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="h4" color="white">
                27
              </Typography>
            </Box>
            <Box
              sx={{
                width: 48,
                height: 48,
                background: 'black',
                borderRadius: '50%',
                opacity: 0.5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="h5" color="white">
                24
              </Typography>
            </Box>
          </Box>

          <Typography variant="h2" color="white" gutterBottom>
            PLAYER AUCTION
          </Typography>
          <Typography variant="h3" color="white" gutterBottom>
            LIVE AUCTIONS
          </Typography>

          <Paper
            sx={{
              mt: 4,
              p: 4,
              bgcolor: '#2E2E4F', // Darker Background for Paper
              backdropFilter: 'blur(16px)',
            }}
          >
            <Typography variant="h5" color="white" gutterBottom>
              PLAYER AUCTION
            </Typography>
            <Typography color="text.secondary" paragraph>
              Experience real-time bidding on top athletes across multiple sports.
              Join live auctions and build your dream team.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button variant="contained" color="primary" size="large">
                GET STARTED
              </Button>
              <Button variant="outlined" color="inherit" size="large">
                HOME
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Right Section */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 4,
              bgcolor: '#2E2E4F',
              backdropFilter: 'blur(16px)',
            }}
          >
            <Typography variant="h3" color="white">
              ${currentBid}
            </Typography>
            <Typography color="secondary">Current Highest Bid</Typography>
          </Paper>

          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={6}>
              <Paper
                sx={{
                  p: 3,
                  bgcolor: '#2E2E4F',
                  backdropFilter: 'blur(16px)',
                }}
              >
                <Typography color="white">Live Auctions</Typography>
                <Typography variant="h4" color="primary">
                  24
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper
                sx={{
                  p: 3,
                  bgcolor: '#2E2E4F',
                  backdropFilter: 'blur(16px)',
                }}
              >
                <Typography color="white">Active Bidders</Typography>
                <Typography variant="h4" color="secondary">
                  1.2k
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HeroSection;
