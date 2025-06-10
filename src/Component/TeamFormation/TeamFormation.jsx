import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  Typography,
  Avatar,
  Button,
  IconButton,
  Grid,
  LinearProgress,
  Tooltip,
  Badge,
  Dialog,
  Slide,
  Chip,
  CircularProgress,
  Container,
  Tab,
  Tabs,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  Scatter,
  ScatterChart,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
} from 'recharts';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import NotificationsIcon from '@mui/icons-material/Notifications';
import TimerIcon from '@mui/icons-material/Timer';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TimelineIcon from '@mui/icons-material/Timeline';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { motion, AnimatePresence } from 'framer-motion';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// স্টাইলড কম্পোনেন্টস
const DarkCard = styled(Card)(({ theme }) => ({
  background: '#1a1f2e',
  color: 'white',
  borderRadius: 24,
  padding: theme.spacing(3),
  height: '100%',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
  },
}));

const PlayerCard = styled(motion.div)(({ theme }) => ({
  background: '#242938',
  borderRadius: 16,
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(1),
  cursor: 'pointer',
  '&:hover': {
    background: '#2a3142',
  },
}));

const SoccerField = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #1a472a 0%, #2a5338 100%)',
  borderRadius: 16,
  height: 400,
  position: 'relative',
  margin: theme.spacing(2, 0),
  border: '2px solid rgba(255,255,255,0.1)',
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    height: '90%',
    border: '2px solid rgba(255,255,255,0.2)',
    borderRadius: 8,
  },

  '&::after': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    height: '50%',
    border: '2px solid rgba(255,255,255,0.15)',
    borderRadius: 100,
  },
}));

const StatCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(135deg, #1a1f2e 0%, #2a3142 100%)',
  color: 'white',
  borderRadius: 16,
  padding: theme.spacing(2),
  height: '100%',
}));

const TeamFormation = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [auctionTime, setAuctionTime] = useState(300);
  const [isAuctionActive, setIsAuctionActive] = useState(false);
  const [currentBid, setCurrentBid] = useState(0);
  const [formations, setFormations] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [performanceData, setPerformanceData] = useState([]);
  const [marketValue, setMarketValue] = useState([]);
  const [teamComparison, setTeamComparison] = useState([]);
  const [playerDistribution, setPlayerDistribution] = useState([]);

  // মক ডাটা জেনারেশন
  useEffect(() => {
    generateMockData();
  }, []);

  const generateMockData = () => {
    // পারফরম্যান্স ডাটা
    const performance = Array.from({ length: 12 }, (_, i) => ({
      month: `Month ${i + 1}`,
      wins: Math.floor(Math.random() * 5),
      losses: Math.floor(Math.random() * 3),
      draws: Math.floor(Math.random() * 2),
    }));

    // মার্কেট ভ্যালু
    const market = Array.from({ length: 24 }, (_, i) => ({
      day: i + 1,
      value: 50 + Math.random() * 30,
      prediction: 55 + Math.random() * 25,
    }));

    // টিম কম্পারিজন
    const comparison = [
      { attribute: 'Attack', A: 120, B: 110 },
      { attribute: 'Defense', A: 98, B: 130 },
      { attribute: 'Speed', A: 86, B: 130 },
      { attribute: 'Technique', A: 99, B: 100 },
      { attribute: 'Teamwork', A: 85, B: 90 },
    ];

    // প্লেয়ার ডিস্ট্রিবিউশন
    const distribution = [
      { name: 'Forwards', value: 25 },
      { name: 'Midfielders', value: 35 },
      { name: 'Defenders', value: 30 },
      { name: 'Goalkeepers', value: 10 },
    ];

    setPerformanceData(performance);
    setMarketValue(market);
    setTeamComparison(comparison);
    setPlayerDistribution(distribution);
  };

  // মক প্লেয়ার ডাটা
  const players = [
    {
      id: 1,
      name: 'Dominno',
      rating: '27.19',
      price: '29.50',
      stats: {
        pace: 88,
        shooting: 92,
        passing: 85,
        dribbling: 90,
        defending: 75,
        physical: 82,
      },
    },
    // Add more players...
  ];

  const handlePlayerSelect = (player) => {
    setSelectedPlayer(player);
    addNotification(`Selected ${player.name}`);
  };

  const handleBid = (playerId, amount) => {
    setCurrentBid(amount);
    addNotification(`New bid: $${amount}M for Player #${playerId}`);
  };

  const addNotification = (message) => {
    const newNotification = {
      id: Date.now(),
      message,
    };
    setNotifications(prev => [newNotification, ...prev].slice(0, 5));
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(formations);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setFormations(items);
  };

  return (
    <Container maxWidth={false} sx={{ bgcolor: '#f0f2f5', minHeight: '100vh', py: 3 }}>
      {/* হেডার */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box display="flex" alignItems="center" gap={2}>
          <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
            <IconButton sx={{ bgcolor: '#06b6d4' }}>
              <SportsSoccerIcon sx={{ color: 'white' }} />
            </IconButton>
          </motion.div>
          <Typography variant="h5">Team Formation & Auction Dashboard</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={2}>
          {isAuctionActive && (
            <Chip
              icon={<TimerIcon />}
              label={`${Math.floor(auctionTime / 60)}:${(auctionTime % 60)
                .toString()
                .padStart(2, '0')}`}
              color="primary"
            />
          )}
          <Badge badgeContent={notifications.length} color="error">
            <IconButton>
              <NotificationsIcon />
            </IconButton>
          </Badge>
        </Box>
      </Box>

      {/* ট্যাবস */}
      <Tabs
        value={selectedTab}
        onChange={(e, newValue) => setSelectedTab(newValue)}
        sx={{ mb: 3 }}
      >
        <Tab label="Team Formation" />
        <Tab label="Auction" />
        <Tab label="Analytics" />
      </Tabs>

      {/* কনটেন্ট */}
      <Box sx={{ mt: 3 }}>
        {selectedTab === 0 && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <DarkCard>
                <Typography variant="h6" gutterBottom>
                  Team Formation
                </Typography>
                <SoccerField>
                  <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="players">
                      {(provided) => (
                        <Box
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          sx={{ height: '100%' }}
                        >
                          {formations.map((player, index) => (
                            <Draggable
                              key={player.id}
                              draggableId={player.id.toString()}
                              index={index}
                            >
                              {(provided) => (
                                <Box
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <Avatar
                                    src={player.image}
                                    sx={{
                                      width: 40,
                                      height: 40,
                                      position: 'absolute',
                                      cursor: 'move',
                                    }}
                                  />
                                </Box>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </Box>
                      )}
                    </Droppable>
                  </DragDropContext>
                </SoccerField>
              </DarkCard>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <DarkCard>
                <Typography variant="h6" gutterBottom>
                  Player Stats
                </Typography>
                {selectedPlayer && (
                  <Box>
                    {Object.entries(selectedPlayer.stats).map(([stat, value]) => (
                      <Box key={stat} sx={{ mb: 2 }}>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          {stat.toUpperCase()}
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={value}
                          sx={{
                            height: 8,
                            borderRadius: 4,
                            bgcolor: 'rgba(255,255,255,0.1)',
                            '& .MuiLinearProgress-bar': {
                              bgcolor: '#06b6d4',
                            },
                          }}
                        />
                      </Box>
                    ))}
                  </Box>
                )}
              </DarkCard>
            </Grid>
          </Grid>
        )}

        {selectedTab === 1 && (
          <Grid container spacing={3}>
            {/* Auction content */}
            <Grid item xs={12}>
              <DarkCard>
                <Typography variant="h6" gutterBottom>
                  Active Auctions
                </Typography>
                <Grid container spacing={2}>
                  {players.map((player) => (
                    <Grid item xs={12} sm={6} md={3} key={player.id}>
                      <PlayerCard
                        onClick={() => handlePlayerSelect(player)}
                        whileHover={{ scale: 1.02 }}
                      >
                        <Avatar sx={{ width: 80, height: 80 }} />
                        <Typography variant="h6">{player.name}</Typography>
                        <Typography color="primary" variant="h5">
                          ${player.price}M
                        </Typography>
                        <Button
                          variant="contained"
                          fullWidth
                          onClick={() => handleBid(player.id, parseFloat(player.price) + 0.5)}
                          sx={{ mt: 2 }}
                        >
                          Place Bid
                        </Button>
                      </PlayerCard>
                    </Grid>
                  ))}
                </Grid>
              </DarkCard>
            </Grid>
          </Grid>
        )}

        {selectedTab === 2 && (
          <Grid container spacing={3}>
            {/* Analytics content */}
            <Grid item xs={12} md={6}>
              <StatCard>
                <Typography variant="h6" gutterBottom>
                  Performance Trend
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <RechartsTooltip />
                    <Area
                      type="monotone"
                      dataKey="wins"
                      stackId="1"
                      stroke="#06b6d4"
                      fill="#06b6d4"
                    />
                    <Area
                      type="monotone"
                      dataKey="draws"
                      stackId="1"
                      stroke="#8b5cf6"
                      fill="#8b5cf6"
                    />
                    <Area
                      type="monotone"
                      dataKey="losses"
                      stackId="1"
                      stroke="#ef4444"
                      fill="#ef4444"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </StatCard>
            </Grid>

            <Grid item xs={12} md={6}>
              <StatCard>
                <Typography variant="h6" gutterBottom>
                  Market Value Prediction
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={marketValue}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <RechartsTooltip />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#06b6d4"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="prediction"
                      stroke="#8b5cf6"
                      strokeDasharray="5 5"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </StatCard>
            </Grid>

            <Grid item xs={12} md={6}>
              <StatCard>
                <Typography variant="h6" gutterBottom>
                  Team Comparison
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={teamComparison}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="attribute" />
                    <Radar
                      name="Team A"
                      dataKey="A"
                      stroke="#06b6d4"
                      fill="#06b6d4"
                      fillOpacity={0.6}
                    />
                    <Radar
                      name="Team B"
                      dataKey="B"
                      stroke="#8b5cf6"
                      fill="#8b5cf6"
                      fillOpacity={0.6}
                    />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </StatCard>
            </Grid>

            <Grid item xs={12} md={6}>
              <StatCard>
                <Typography variant="h6" gutterBottom>
                  Squad Distribution
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={playerDistribution}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {playerDistribution.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={[
                            '#06b6d4',
                            '#8b5cf6',
                            '#4CAF50',
                            '#FFC107',
                          ][index % 4]}
                        />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </StatCard>
            </Grid>
          </Grid>
        )}
      </Box>

      {/* Notifications */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          maxWidth: 300,
          zIndex: 1000,
        }}
      >
        <AnimatePresence>
          {notifications.map((notification) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.3 }}
            >
              <Card sx={{ mb: 1, p: 2, bgcolor: '#1a1f2e', color: 'white' }}>
                <Typography variant="body2">{notification.message}</Typography>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </Box>
    </Container>
  );
};

export default TeamFormation;