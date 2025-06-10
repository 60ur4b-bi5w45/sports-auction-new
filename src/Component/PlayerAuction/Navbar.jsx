import { AppBar, Toolbar, Button, Box, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar>
        <Box display="flex" alignItems="center" gap={2}>
          <img src="/logo.svg" alt="Logo" style={{ height: 32 }} />
          <Typography variant="h6" component={Link} to="/" sx={{ 
            color: 'white',
            textDecoration: 'none'
          }}>
            Player Auction
          </Typography>
        </Box>

        <Box sx={{ mx: 'auto' }}>
          {['Home', 'Tournaments', 'Auctions', 'Archive'].map((item) => (
            <Button
              key={item}
              component={Link}
              to={`/${item.toLowerCase()}`}
              sx={{ color: 'white', mx: 1 }}
            >
              {item}
            </Button>
          ))}
        </Box>

        <Box>
          <Button variant="contained" color="inherit" sx={{ mr: 1 }}>
            Feature
          </Button>
          <Button variant="contained" color="inherit" sx={{ mr: 1 }}>
            Get Started
          </Button>
          <Button variant="contained" color="primary">
            Get Started
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar