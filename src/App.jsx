import { CssBaseline } from '@mui/material'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { ThemeProvider } from './contexts/ThemeContext'
import PrivateRoute from './Component/PrivateRoute'
import Sidebar from './Component/Navigation/Sidebar'
import Login from './Component/Login/Login'
import SignUp from './Component/SignUp/SignUp'
import Dashboard from './Component/User Dashboard/Dashboard'
import PlayerAuction from './Component/PlayerAuction/PlayerAuction'
import TournamentManagement from './Component/TournamentManagement/TournamentManagement'
import TeamFormation from './Component/TeamFormation/TeamFormation'
import GameSelection from './Component/GameSelection/GameSelection'
import PlayerProfile from './Component/PlayerProfile/PlayerProfile'
import AuctionDashboard from './Component/Auction Dashboard/AuctionDashboard'
import AIRecommendations from './Component/AI Recommendation/AIRecomendation'
import NotificationDashboard from './Component/Notification/Notification'
import Homepage from './Component/HomePage/Homepage'

function App() {
  return (
    <ThemeProvider>
      <CssBaseline />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            
            {/* Protected Routes with Sidebar */}
            <Route path="/dashboard" element={
              <PrivateRoute>
                <Sidebar>
                  <Dashboard />
                </Sidebar>
              </PrivateRoute>
            } />
            <Route path="/player-auction" element={
              <PrivateRoute>
                <Sidebar>
                  <PlayerAuction />
                </Sidebar>
              </PrivateRoute>
            } />
            <Route path="/tournament-management" element={
              <PrivateRoute>
                <Sidebar>
                  <TournamentManagement />
                </Sidebar>
              </PrivateRoute>
            } />
            <Route path="/team-formation" element={
              <PrivateRoute>
                <Sidebar>
                  <TeamFormation />
                </Sidebar>
              </PrivateRoute>
            } />
            <Route path="/game-selection" element={
              <PrivateRoute>
                <Sidebar>
                  <GameSelection />
                </Sidebar>
              </PrivateRoute>
            } />
            <Route path="/player-profile" element={
              <PrivateRoute>
                <Sidebar>
                  <PlayerProfile />
                </Sidebar>
              </PrivateRoute>
            } />
            <Route path="/auction-dashboard" element={
              <PrivateRoute>
                <Sidebar>
                  <AuctionDashboard />
                </Sidebar>
              </PrivateRoute>
            } />
            <Route path="/ai-recommendations" element={
              <PrivateRoute>
                <Sidebar>
                  <AIRecommendations />
                </Sidebar>
              </PrivateRoute>
            } />
            <Route path="/notifications" element={
              <PrivateRoute>
                <Sidebar>
                  <NotificationDashboard />
                </Sidebar>
              </PrivateRoute>
            } />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App