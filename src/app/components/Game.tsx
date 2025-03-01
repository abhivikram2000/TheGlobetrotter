'use client';

import { useState, useEffect } from 'react';
import type { Destination, GameState } from '../lib/types';
import confetti from 'canvas-confetti';
import { 
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Chip,
  CircularProgress,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Fade,
  useTheme
} from '@mui/material';
import {
  ExitToApp,
  EmojiObjects,
  FlightTakeoff,
  CheckCircle,
  Cancel,
  LocationOn,
  Public
} from '@mui/icons-material';

interface GameProps {
  username: string;
  onExit: () => void;
}

export default function Game({ username, onExit }: GameProps) {
  const theme = useTheme();
  const [gameState, setGameState] = useState<GameState>({
    selectedClues: [],
    options: [],
    score: {
      correct: 0,
      incorrect: 0,
    }
  });
  const [loading, setLoading] = useState(true);
  const [answer, setAnswer] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{
    isCorrect: boolean;
    fact: string;
    correctAnswer?: string;
  } | null>(null);
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);

  const loadNewDestination = async () => {
    setLoading(true);
    try {
      // Build the URL with query parameters to exclude current destination
      let url = '/api/destinations/random';
      
      // Add query parameters to exclude current destination if it exists
      if (gameState.currentDestination) {
        const { city, country } = gameState.currentDestination;
        url += `?excludeCity=${encodeURIComponent(city)}&excludeCountry=${encodeURIComponent(country)}`;
      }
      
      const response = await fetch(url);
      const data = await response.json();
      
      // Select 1-2 random clues
      const numClues = Math.floor(Math.random() * 2) + 1;
      const selectedClues = data.clues
        .sort(() => Math.random() - 0.5)
        .slice(0, numClues);

      setGameState(prev => ({
        ...prev,
        currentDestination: data,
        selectedClues,
        options: data.options,
      }));
    } catch (error) {
      console.error('Failed to load destination:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadNewDestination();
  }, []);

  const handleAnswer = (selectedAnswer: string) => {
    if (!gameState.currentDestination) return;

    const correctAnswer = `${gameState.currentDestination.city}, ${gameState.currentDestination.country}`;
    const isCorrect = selectedAnswer === correctAnswer;
    setAnswer(selectedAnswer);

    if (isCorrect) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }

    // Get a random fun fact
    const facts = isCorrect ? 
      gameState.currentDestination.fun_fact : 
      gameState.currentDestination.trivia;
    const randomFact = facts[Math.floor(Math.random() * facts.length)];

    setFeedback({
      isCorrect,
      fact: randomFact,
      // Include the correct answer when the user's answer is wrong
      ...(isCorrect ? {} : { correctAnswer })
    });

    // Update score
    setGameState(prev => ({
      ...prev,
      score: {
        correct: prev.score.correct + (isCorrect ? 1 : 0),
        incorrect: prev.score.incorrect + (isCorrect ? 0 : 1)
      }
    }));
  };

  const handleNextDestination = () => {
    setAnswer(null);
    setFeedback(null);
    loadNewDestination();
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Card elevation={3}>
          <CardContent>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <Typography variant="h5" gutterBottom>
                  Welcome, {username}! 🌍
                </Typography>
                <Box display="flex" gap={1}>
                  <Chip
                    icon={<CheckCircle />}
                    label={`${gameState.score.correct} correct`}
                    color="success"
                    variant="outlined"
                  />
                  <Chip
                    icon={<Cancel />}
                    label={`${gameState.score.incorrect} incorrect`}
                    color="error"
                    variant="outlined"
                  />
                </Box>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  color="inherit"
                  onClick={onExit}
                  startIcon={<ExitToApp />}
                >
                  Exit Game
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <EmojiObjects />
                Your Clues
              </Typography>
              <List>
                {gameState.selectedClues.map((clue, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <LocationOn />
                    </ListItemIcon>
                    <ListItemText primary={clue} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          {!answer ? (
            <Grid container spacing={2}>
              {gameState.options.map((option) => (
                <Grid item xs={12} sm={6} key={option}>
                  <Card 
                    elevation={hoveredOption === option ? 8 : 3}
                    sx={{
                      height: '100%',
                      transition: 'all 0.3s ease',
                      transform: hoveredOption === option ? 'translateY(-8px)' : 'none',
                      cursor: 'pointer',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      border: hoveredOption === option ? `2px solid ${theme.palette.primary.main}` : 'none',
                      '&:hover': {
                        borderColor: theme.palette.primary.main,
                      }
                    }}
                    onMouseEnter={() => setHoveredOption(option)}
                    onMouseLeave={() => setHoveredOption(null)}
                    onClick={() => handleAnswer(option)}
                  >
                    <CardContent sx={{ 
                      p: 0, 
                      height: '100%',
                      '&:last-child': { pb: 0 }
                    }}>
                      <Box 
                        sx={{ 
                          display: 'flex',
                          alignItems: 'center',
                          p: 2,
                          height: '100%',
                          background: hoveredOption === option 
                            ? `linear-gradient(135deg, ${theme.palette.primary.light}20, ${theme.palette.primary.main}10)`
                            : 'none',
                        }}
                      >
                        <Public sx={{ 
                          mr: 2, 
                          color: theme.palette.primary.main,
                          fontSize: '2rem',
                          opacity: hoveredOption === option ? 1 : 0.7,
                          transition: 'all 0.3s ease',
                        }} />
                        <Typography 
                          variant="h6" 
                          sx={{ 
                            fontWeight: hoveredOption === option ? 'bold' : 'normal',
                            transition: 'all 0.2s ease',
                          }}
                        >
                          {option}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Fade in>
              <Box>
                {feedback && (
                  <Card 
                    elevation={3}
                    sx={{ 
                      mb: 2,
                      bgcolor: feedback.isCorrect ? 'success.main' : 'error.main',
                      color: 'white'
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {feedback.isCorrect ? '🎉 Brilliant!' : '💫 Nice try!'}
                      </Typography>
                      {!feedback.isCorrect && feedback.correctAnswer && (
                        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
                          The correct answer was: {feedback.correctAnswer}
                        </Typography>
                      )}
                      <Typography>
                        {feedback.fact}
                      </Typography>
                    </CardContent>
                  </Card>
                )}
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={handleNextDestination}
                  startIcon={<FlightTakeoff />}
                  sx={{
                    py: 1.5,
                    borderRadius: '12px',
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 12px 20px rgba(0, 0, 0, 0.15)',
                    }
                  }}
                >
                  Next Destination
                </Button>
              </Box>
            </Fade>
          )}
        </Grid>
      </Grid>
    </Container>
  );
} 