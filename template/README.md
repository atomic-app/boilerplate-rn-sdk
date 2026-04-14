# React Native Boilerplate App

This is a boilerplate app to get you started with the Atomic SDK for React Native.

The code is based around the [Atomic.io documentation](https://documentation.atomic.io/sdks/react-native) and designed to get you up and running as quickly as possible.

> **Note**: Follow the instructions in the React Native documentation to [set up your environment](https://reactnative.dev/docs/set-up-your-environment) before proceeding.

## Setup

### 1. Add your credentials

Open `App.tsx` and fill in your Atomic configuration values:

```ts
const ATOMIC_API_HOST = '';         // Your Atomic API host URL
const ATOMIC_API_KEY = '';          // Your Atomic API key
const ATOMIC_ENVIRONMENT_ID = '';   // Your Atomic environment ID
const ATOMIC_STREAM_CONTAINER_ID = ''; // Your stream container ID
const ATOMIC_REQUEST_TOKEN_STRING = ''; // A valid JWT for the user
```

These values can be found in the Atomic Workbench under your environment settings.

### 2. Install dependencies

> **Note**: If you created this project using the React Native CLI (`npx @react-native-community/cli init`), dependencies were installed automatically and you can skip this step.

From the root directory of your project:

```
npm install
```

For iOS, also install the CocoaPods dependencies:

```
bundle install
bundle exec pod install --project-directory=ios
```

## Running the App

### iOS

```
npx react-native run-ios
```

### Android

Start an Android emulator or connect a physical device, then:

```
npx react-native run-android
```
