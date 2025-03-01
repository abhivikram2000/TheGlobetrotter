import '@testing-library/jest-dom';

// Mock canvas-confetti
jest.mock('canvas-confetti', () => ({
  __esModule: true,
  default: jest.fn(),
}));

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    };
  },
  usePathname() {
    return '';
  },
}));

// Mock Response
global.Response = class Response {
  constructor(body, init) {
    this.body = body;
    this.status = init?.status || 200;
    this.ok = this.status >= 200 && this.status < 300;
  }

  json() {
    return Promise.resolve(JSON.parse(this.body));
  }
}; 