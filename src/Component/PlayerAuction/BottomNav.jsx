import { Box, Grid, Paper, Typography } from '@mui/material'

const BottomNav = () => {
  const navItems = [
    {
      title: 'HOME',
      subtitle: 'LIVE',
      icon: '35',
      description: 'Secure team management'
    },
    {
      title: 'LIVE AUCTIONS',
      subtitle: 'ABOUT US',
      icon: 'AI',
      description: 'Secure team management'
    },
    {
      title: 'AI-POWERED',
      subtitle: 'RECOMMENDATIONS',
      icon: '©',
      description: 'Secure team management'
    },
    {
      title: 'ABOUT US',
      subtitle: 'ABOUT US',
      icon: '+',
      description: 'Secure team management'
    }
  ]

  return (
    <Box sx={{ py: 8, px: 4 }}>
      <Grid container spacing={4}>
        {navItems.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper
              sx={{
                textAlign: 'center',
                p: 3,
                bgcolor: 'background.paper',
                cursor: 'pointer',
                transition: '0.3s',
                '&:hover': {
                  bgcolor: 'background.paper',
                  transform: 'translateY(-4px)',
                },
              }}
            >
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  bgcolor: 'secondary.main',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 2,
                }}
              >
                <Typography variant="h5" color="white">
                  {item.icon}
                </Typography>
              </Box>
              <Typography variant="h6" color="white" gutterBottom>
                {item.title}
              </Typography>
              <Typography color="secondary" gutterBottom>
                {item.subtitle}
              </Typography>
              <Typography color="text.secondary" variant="body2">
                {item.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default BottomNav