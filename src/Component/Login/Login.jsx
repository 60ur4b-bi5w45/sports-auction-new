import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup'; // Import yup
import { yupResolver } from '@hookform/resolvers/yup'; // Import yupResolver
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  IconButton,
  InputAdornment,
  CircularProgress,
  Checkbox,
  FormControlLabel,
  Grid,
  Divider
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const rippleEffect = keyframes`
  0% { transform: scale(0); opacity: 0.7; }
  50% { transform: scale(1.5); opacity: 0.3; }
  100% { transform: scale(2.5); opacity: 0; }
`;

const StyledPaper = styled(Paper)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  width: '100%',
  maxWidth: 450,
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  animation: `${fadeIn} 0.6s ease-out`,
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    color: 'white',
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: theme.spacing(1),
    transition: 'all 0.3s ease',
    '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.2)' },
    '&:hover fieldset': { borderColor: theme.palette.primary.main },
    '&.Mui-focused fieldset': { borderColor: theme.palette.primary.main, borderWidth: 2 },
  },
  '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' },
  '& .MuiInputAdornment-root': { color: 'rgba(255, 255, 255, 0.7)' },
}));

const LoginButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`,
  padding: '12px',
  marginTop: theme.spacing(3),
  borderRadius: theme.spacing(1),
  textTransform: 'none',
  fontSize: '1.1rem',
  fontWeight: 600,
  letterSpacing: 1,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(59, 130, 246, 0.3)',
    animation: `${rippleEffect} 1.5s ease-out`,
  },
}));

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login, loginWithGoogle } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');
    try {
      await login(data.email, data.password);
      navigate('/dashboard');
    } catch (error) {
      setError(
        error.code === 'auth/invalid-credential'
          ? 'Invalid email or password'
          : 'An error occurred during sign in'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      await loginWithGoogle();
      navigate('/dashboard');
    } catch (error) {
      setError('Failed to sign in with Google');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      width: '100vw',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
      backgroundImage: 'url("/assets/background.jpg")', // Add your background image
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      p: 3,
    }}>
      <StyledPaper elevation={4}>
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <img 
            src="/assets/logo.png" 
            alt="Logo" 
            style={{ 
              height: 60, 
              marginBottom: 16,
              animation: `${pulse} 2s infinite ease-in-out`
            }} 
          />
          <Typography variant="h4" sx={{ color: 'white', mt: 2, fontWeight: 'bold' }}>
            Login
          </Typography>
        </Box>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {error && (
              <Typography color="error" sx={{ mb: 2, textAlign: 'center' }}>
                {error}
              </Typography>
            )}
            
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <StyledTextField
                  {...field}
                  label="Email"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <span style={{ color: '#1976d2' }}>📧</span>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <StyledTextField
                  {...field}
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <span style={{ color: '#1976d2' }}>🔒</span>
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                          {showPassword ? '🙈' : '👁️'}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <FormControlLabel
                control={<Checkbox sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />}
                label={<Typography sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>Remember me</Typography>}
              />
              <Button sx={{ color: 'primary.main', textTransform: 'none' }}>Forgot Password?</Button>
            </Box>

            <LoginButton type="submit" variant="contained" fullWidth disabled={loading}>
              {loading ? <CircularProgress size={20} /> : 'Login'}
            </LoginButton>
          </Box>
        </form>

        <Box sx={{ mt: 4 }}>
          <Divider sx={{ my: 3, color: 'rgba(255, 255, 255, 0.7)' }}>or continue with</Divider>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Button 
                variant="outlined" 
                fullWidth 
                onClick={handleGoogleSignIn}
                disabled={loading}
                sx={{
                  color: 'white',
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 20px rgba(59, 130, 246, 0.3)',
                    animation: `${rippleEffect} 1.5s ease-out`,
                    borderColor: 'white'
                  }
                }}
              >
                {loading ? <CircularProgress size={20} /> : 'Continue with Google'}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </StyledPaper>
    </Box>
  );
};

export default Login;
