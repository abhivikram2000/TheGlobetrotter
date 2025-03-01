import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Game from '../Game';
import confetti from 'canvas-confetti';

// Mock modules
jest.mock('canvas-confetti');

// Mock fetch
global.fetch = jest.fn();

// Mock Math.random to ensure consistent clue selection
const originalMathRandom = Math.random;

const mockDestination = {
  city: 'Paris',
  country: 'France',
  clues: [
    'This city is known for its iconic iron tower',
    'It is often called the City of Light',
  ],
  fun_fact: ['The Eiffel Tower was originally meant to be temporary'],
  trivia: ['This city has over 400 parks and gardens'],
  options: [
    'Paris, France',
    'London, UK',
    'Rome, Italy',
    'Berlin, Germany',
  ],
};

describe('Game Component', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockReset();
    (confetti as unknown as jest.Mock).mockReset();
    // Mock Math.random to always return 1, which will select all clues
    Math.random = jest.fn().mockReturnValue(0.9);
  });

  afterEach(() => {
    // Restore original Math.random
    Math.random = originalMathRandom;
  });

  it('renders loading state initially', () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() => 
      new Promise(() => {})
    );

    render(<Game username="TestUser" onExit={() => {}} />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('displays username and score', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockDestination),
      })
    );

    render(<Game username="TestUser" onExit={() => {}} />);
    
    await waitFor(() => {
      expect(screen.getByText(/Welcome, TestUser!/)).toBeInTheDocument();
      expect(screen.getByText('0 correct')).toBeInTheDocument();
      expect(screen.getByText('0 incorrect')).toBeInTheDocument();
    });
  });

  it('shows clues from the destination', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockDestination),
      })
    );

    render(<Game username="TestUser" onExit={() => {}} />);
    
    // Wait for the component to load and display clues
    await waitFor(() => {
      expect(screen.queryByText(/Your Clues/)).toBeInTheDocument();
    });

    // Check for the presence of at least one of the clues
    const clueElement = screen.getByText('This city is known for its iconic iron tower');
    expect(clueElement).toBeInTheDocument();
  });

  it('handles correct answer selection', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockDestination),
      })
    );

    render(<Game username="TestUser" onExit={() => {}} />);
    
    await waitFor(() => {
      expect(screen.getByText('Paris, France')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Paris, France'));

    await waitFor(() => {
      expect(screen.getByText(/Brilliant!/)).toBeInTheDocument();
      expect(confetti).toHaveBeenCalled();
    });
  });

  it('handles incorrect answer selection', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockDestination),
      })
    );

    render(<Game username="TestUser" onExit={() => {}} />);
    
    await waitFor(() => {
      expect(screen.getByText('London, UK')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('London, UK'));

    await waitFor(() => {
      expect(screen.getByText(/Nice try!/)).toBeInTheDocument();
      expect(confetti).not.toHaveBeenCalled();
    });
  });

  it('loads new destination when clicking next', async () => {
    (global.fetch as jest.Mock)
      .mockImplementationOnce(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockDestination),
        })
      )
      .mockImplementationOnce(() =>
        Promise.resolve({
          json: () => Promise.resolve({
            ...mockDestination,
            city: 'Rome',
            country: 'Italy',
          }),
        })
      );

    render(<Game username="TestUser" onExit={() => {}} />);
    
    await waitFor(() => {
      expect(screen.getByText('Paris, France')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Paris, France'));
    
    await waitFor(() => {
      expect(screen.getByText('Next Destination')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Next Destination'));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(2);
    });
  });
}); 