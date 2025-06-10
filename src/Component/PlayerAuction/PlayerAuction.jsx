import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
  Chip,
  useTheme,
} from '@mui/material';
import { SportsCricket, SportsSoccer, SportsBasketball } from '@mui/icons-material';

const mockPlayers = [
  {
    id: 1,
    name: 'John Doe',
    sport: 'Cricket',
    basePrice: 1000,
    skills: ['Batsman', 'Right-handed', 'Medium Pace'],
    avatar: 'https://i.pravatar.cc/150?img=1',
    icon: <SportsCricket />,
  },
  {
    id: 2,
    name: 'Jane Smith',
    sport: 'Football',
    basePrice: 1500,
    skills: ['Forward', 'Left Foot', 'Speed'],
    avatar: 'https://i.pravatar.cc/150?img=2',
    icon: <SportsSoccer />,
  },
  {
    id: 3,
    name: 'Mike Johnson',
    sport: 'Basketball',
    basePrice: 2000,
    skills: ['Point Guard', 'Three-pointer', 'Defense'],
    avatar: 'https://i.pravatar.cc/150?img=3',
    icon: <SportsBasketball />,
  },
];

export default function PlayerAuction() {
  const theme = useTheme();
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const [open, setOpen] = useState(false);

  const handleClickOpen = (player) => {
    setSelectedPlayer(player);
    setBidAmount(player.basePrice.toString());
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedPlayer(null);
    setBidAmount('');
  };

  const handleBid = () => {
    // Here you would implement the bid logic
    console.log(`Bid placed for ${selectedPlayer.name}: $${bidAmount}`);
    handleClose();
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ color: 'text.primary' }}>
        Player Auction
      </Typography>

      <Grid container spacing={3}>
        {mockPlayers.map((player) => (
          <Grid item xs={12} sm={6} md={4} key={player.id}>
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
                  <Avatar
                    src={player.avatar}
                    sx={{ width: 60, height: 60, mr: 2 }}
                  />
                  <Box>
                    <Typography variant="h6">{player.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {player.sport}
                    </Typography>
                  </Box>
                </Box>

                <Box mb={2}>
                  {player.skills.map((skill, index) => (
                    <Chip
                      key={index}
                      label={skill}
                      size="small"
                      sx={{ mr: 1, mb: 1 }}
                    />
                  ))}
                </Box>

                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="h6" color="primary">
                    ${player.basePrice}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleClickOpen(player)}
                  >
                    Place Bid
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Place Bid for {selectedPlayer?.name}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Bid Amount"
            type="number"
            fullWidth
            variant="outlined"
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
            InputProps={{
              startAdornment: '$',
              inputProps: { min: selectedPlayer?.basePrice }
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleBid} variant="contained" color="primary">
            Place Bid
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}