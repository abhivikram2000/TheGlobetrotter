export interface Destination {
  city: string;
  country: string;
  clues: string[];
  fun_fact: string[];
  trivia: string[];
}

export interface User {
  username: string;
  score: {
    correct: number;
    incorrect: number;
  };
}

export interface GameState {
  currentDestination?: Destination;
  selectedClues: string[];
  options: string[];
  score: {
    correct: number;
    incorrect: number;
  };
} 