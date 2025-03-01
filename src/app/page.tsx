'use client';

import { useState } from 'react';
import Game from './components/Game';
import SharePopup from './components/SharePopup';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  useTheme
} from '@mui/material';
import {
  FlightTakeoff,
  EmojiEvents,
  School,
  Public,
  Stars
} from '@mui/icons-material';

export default function Home() {
  const [username, setUsername] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const theme = useTheme();

  const handleStartGame = () => {
    setIsPlaying(true);
  };

  const handleExitGame = () => {
    setIsPlaying(false);
    setShowShare(true);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
        position: 'relative',
        color: 'white',
        pt: 4,
        pb: 8
      }}
    >
      <Container maxWidth="lg">
        <Box textAlign="center" mb={6}>
          <Typography variant="h2" component="h1" gutterBottom fontWeight="bold">
            The Globetrotter Challenge
          </Typography>
          <Typography variant="h5" color="white" sx={{ opacity: 0.9 }}>
            Test your knowledge of famous destinations around the world! 🌍
          </Typography>
        </Box>

        {!isPlaying ? (
          <Box maxWidth="md" mx="auto">
            <Card elevation={3}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <span>👋</span>
                  Welcome Traveler!
                </Typography>
                <Box mt={4}>
                  <TextField
                    fullWidth
                    label="Choose your traveler name"
                    variant="outlined"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    sx={{ mb: 3 }}
                  />
                  <Button
                    fullWidth
                    size="large"
                    variant="contained"
                    color="primary"
                    disabled={!username.trim()}
                    onClick={handleStartGame}
                    startIcon={<FlightTakeoff />}
                  >
                    Start Your Journey
                  </Button>
                </Box>
              </CardContent>
            </Card>

            <Grid container spacing={3} mt={4}>
              <Grid item xs={12} sm={6}>
                <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
                  <Box display="flex" alignItems="center" gap={2} mb={2}>
                    <Public color="primary" fontSize="large" />
                    <Typography variant="h6">Test Your Knowledge</Typography>
                  </Box>
                  <Typography color="text.secondary">
                    Solve cryptic clues about famous destinations
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
                  <Box display="flex" alignItems="center" gap={2} mb={2}>
                    <EmojiEvents color="primary" fontSize="large" />
                    <Typography variant="h6">Compete</Typography>
                  </Box>
                  <Typography color="text.secondary">
                    Challenge friends to beat your score
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
                  <Box display="flex" alignItems="center" gap={2} mb={2}>
                    <School color="primary" fontSize="large" />
                    <Typography variant="h6">Learn</Typography>
                  </Box>
                  <Typography color="text.secondary">
                    Discover fascinating facts about each place
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
                  <Box display="flex" alignItems="center" gap={2} mb={2}>
                    <Stars color="primary" fontSize="large" />
                    <Typography variant="h6">Have Fun</Typography>
                  </Box>
                  <Typography color="text.secondary">
                    Enjoy an engaging and interactive experience
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        ) : (
          <Game 
            username={username} 
            onExit={handleExitGame}
          />
        )}
      </Container>

      {showShare && (
        <SharePopup
          user={{ username, score }}
          onClose={() => setShowShare(false)}
        />
      )}
    </Box>
  );
}
