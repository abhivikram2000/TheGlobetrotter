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
  Fade
} from '@mui/material';
import {
  ExitToApp,
  EmojiObjects,
  FlightTakeoff,
  CheckCircle,
  Cancel,
  LocationOn
} from '@mui/icons-material';

interface GameProps {
  username: string;
  onExit: () => void;
}

export default function Game({ username, onExit }: GameProps) {
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
  } | null>(null);

  const loadNewDestination = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/destinations/random');
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
      fact: randomFact
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
                  <Button
                    fullWidth
                    variant="outlined"
                    color="inherit"
                    onClick={() => handleAnswer(option)}
                    sx={{
                      p: 2,
                      textAlign: 'left',
                      justifyContent: 'flex-start',
                      textTransform: 'none',
                      fontSize: '1.1rem'
                    }}
                  >
                    {option}
                  </Button>
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