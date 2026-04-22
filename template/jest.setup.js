jest.mock('react-native-notify-kit', () =>
  require('react-native-notify-kit/jest-mock'),
);

jest.mock('@react-native-firebase/messaging', () => () => ({
  getToken: jest.fn().mockResolvedValue('mock-fcm-token'),
  onTokenRefresh: jest.fn(() => jest.fn()),
  onMessage: jest.fn(() => jest.fn()),
  setBackgroundMessageHandler: jest.fn(),
}));

jest.mock('@react-native-firebase/app', () => ({
  initializeApp: jest.fn(),
}));
