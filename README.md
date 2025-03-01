# The Globetrotter

A fun geography quiz game that tests your knowledge of world destinations. Guess the city based on clues and learn interesting facts about places around the world!

## Features

- Interactive geography quiz game
- Random destination selection from a curated database
- Multiple-choice answers
- Score tracking
- Fun facts and trivia about each destination
- Responsive design with light/dark mode support
- Shareable results with clipboard integration
- Custom favicon and PWA support

## Technology Stack

- **Frontend**: 
  - [Next.js 14](https://nextjs.org/) with App Router
  - [React 18](https://reactjs.org/)
  - [TypeScript](https://www.typescriptlang.org/)
  - [Material UI](https://mui.com/) for UI components
  - [Emotion](https://emotion.sh/) for styled components
  - [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti) for celebration effects

- **Testing**:
  - [Jest](https://jestjs.io/) for unit and integration testing
  - [Testing Library](https://testing-library.com/) for React component testing
  - [User Event](https://testing-library.com/docs/user-event/intro/) for simulating user interactions

- **Development Tools**:
  - [ESLint](https://eslint.org/) for code linting
  - [Tailwind CSS](https://tailwindcss.com/) for utility-first CSS
  - [TypeScript](https://www.typescriptlang.org/) for type safety

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/abhivikram2000/TheGlobetrotter.git
   cd TheGlobetrotter
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Testing

Run the test suite:

```bash
npm test
# or
yarn test
```

Run tests in watch mode during development:

```bash
npm run test:watch
# or
yarn test:watch
```

## Project Structure

```
src/
├── app/                  # Next.js App Router
│   ├── api/              # API routes
│   │   └── destinations/ # Destinations API
│   ├── components/       # React components
│   │   └── __tests__/    # Component tests
│   ├── contexts/         # React contexts
│   ├── data/             # Static data
│   ├── lib/              # Utility functions
│   ├── theme/            # Theme configuration
│   ├── __tests__/        # App-level tests
│   ├── page.tsx          # Home page
│   ├── layout.tsx        # Root layout
│   └── ClientLayout.tsx  # Client-side layout wrapper
├── types/                # Global TypeScript type definitions
└── public/               # Static assets
    ├── icons/            # Favicon and app icons
    │   ├── android-chrome-192x192.png
    │   ├── android-chrome-512x512.png
    │   ├── apple-touch-icon.png
    │   ├── favicon-16x16.png
    │   └── favicon-32x32.png
    ├── favicon.ico       # Main favicon
    ├── globe-favicon.svg # SVG version of favicon
    ├── site.webmanifest  # PWA manifest file
    └── other assets      # Additional static files
```

## API Routes

- `GET /api/destinations/random` - Returns a random destination with multiple-choice options

## Deployment

The application can be deployed on [Vercel](https://vercel.com/) or any other platform that supports Next.js.

```bash
npm run build
# or
yarn build
```

## Design Decisions

- **Next.js App Router**: Used for its file-based routing system and built-in API routes
- **Material UI**: Chosen for its comprehensive component library and theming capabilities
- **TypeScript**: Implemented for type safety and better developer experience
- **Jest & Testing Library**: Selected for testing to ensure code reliability
- **Static Data**: Destinations are stored in a JSON file for simplicity, but could be migrated to a database in the future
- **PWA Support**: Added web manifest and various icon sizes for better mobile experience
- **Share Functionality**: Implemented with Web Share API and clipboard fallback for cross-browser compatibility

## Technical Challenges & Solutions

- **Clipboard API**: Implemented a robust clipboard solution with fallbacks for older browsers
- **Testing Randomness**: Used Math.random mocking in tests to ensure consistent clue selection
- **Responsive Design**: Utilized Material UI's responsive components and theme breakpoints
- **Theme Switching**: Implemented context-based theme switching with persistent user preferences
- **PWA Configuration**: Created proper favicon set and web manifest for installable experience

## Future Enhancements

- User authentication and profiles
- Leaderboards
- More quiz categories
- Enhanced PWA features
- Multiplayer mode
- Offline support

## License

This project is licensed under the MIT License - see the LICENSE file for details.
