# React Native Boilerplate App

This is a boilerplate app to get you started with the Atomic SDK for React Native.

The code is based around the [Atomic.io documentation](https://documentation.atomic.io/sdks/react-native) and designed to get you up and running as quickly as possible.

> **Note**: Follow the instructions in the React Native documentation to [set up your environment](https://reactnative.dev/docs/set-up-your-environment) before proceeding.

## Setup

### 1. Add your credentials

Open `App.tsx` and fill in your Atomic configuration values:

```ts
const ATOMIC_API_HOST = ''; // Your Atomic API host URL
const ATOMIC_API_KEY = ''; // Your Atomic API key
const ATOMIC_ENVIRONMENT_ID = ''; // Your Atomic environment ID
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

## Push Notifications

Push notifications require app and organization specific configuration. Full instructions are available in the Atomic documentation.

### Android

More detailed instructions for setting up [push notifications for Android](https://documentation.atomic.io/sdks/android#push-notifications) can be found in our Atomic documentation, but the minimum steps are:

1. Set up Firebase Cloud Messaging (FCM) for your Android app by following the [Firebase Cloud Messaging guide](https://firebase.google.com/docs/cloud-messaging/android/client). This will include adding a `google-services.json` file to the `android/app/` directory.
2. Add your FCM Service account private key (JSON) file to the Atomic Workbench under **Configuration > Notifications** to create a Notification Platform.
3. Register the device's push token with Atomic by calling `AACSDK.registerDeviceForNotifications(token)` when the token is received from Firebase.
4. Register the stream containers that should receive push notifications by calling `AACSDK.registerStreamContainersForNotifications(streamContainerIds)`.

### iOS

More detailed instructions for setting up [push notifications for iOS](https://documentation.atomic.io/sdks/ios#push-notifications) can be found in our Atomic documentation, but the minimum steps are:

1. Open the `ios/*.xcworkspace` file in Xcode.
2. Modify the bundle ID to be unique and set the signing configuration to use your Apple developer account.
3. Create an Apple Push Notification certificate for the app and export it.
4. Add the exported certificate to your Atomic Workbench under **Configuration > Notifications**.
