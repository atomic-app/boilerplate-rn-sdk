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

The template's `App.tsx` automatically handles device and stream container registration with Atomic once permissions are granted and a valid JWT is available.

### Android

More detailed instructions for setting up [push notifications for Android](https://documentation.atomic.io/sdks/android#push-notifications) can be found in our Atomic documentation, but the minimum steps are:

1. Create a Firebase project and register your Android app with the package name you intend to use.
2. Download `google-services.json` from the Firebase console and place it at `android/app/google-services.json`.
3. Update `applicationId` in `android/app/build.gradle` to match your Firebase project package name.
4. Add your FCM service account private key (JSON) to the Atomic Workbench under **Configuration > Notifications** to create a Notification Platform.

### iOS

More detailed instructions for setting up [push notifications for iOS](https://documentation.atomic.io/sdks/ios#push-notifications) can be found in our Atomic documentation, but the minimum steps are:

1. Create a Firebase project and register your iOS app with the bundle ID you intend to use.
2. Download `GoogleService-Info.plist` from the Firebase console. In Xcode, right-click the `BoilerplateRNSDK` group and select **Add Files to "BoilerplateRNSDK"**, then select the plist — ensure it is added to the app target.
3. Open the `ios/*.xcworkspace` file in Xcode. Under **Signing & Capabilities**, set your **Team** and update the **Bundle Identifier** to match your Firebase project.
4. Create an APNs authentication key (`.p8`) in the [Apple Developer portal](https://developer.apple.com) under **Certificates, Identifiers & Profiles > Keys**, with the Apple Push Notifications service (APNs) capability enabled.
5. Upload the APNs key to the Firebase console under **Project Settings > Cloud Messaging > Apple app configuration**.
6. Upload the APNs key to the Atomic Workbench under **Configuration > Notifications**.

> **Note on `aps-environment`:** The entitlements file is set to `development` by default, which is correct for debug builds run from Xcode. If you are building for release or TestFlight, change the value to `production` in `ios/BoilerplateRNSDK/BoilerplateRNSDK.entitlements`.
