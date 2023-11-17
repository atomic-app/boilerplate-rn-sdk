# React Native Multiple Containers Demo App

This demo app showcases the implementation of Atomic SDK with multiple containers within the same app. It utilises the popular [React Navigation](https://reactnavigation.org/docs/getting-started/) library.

The app's theme revolves around a news application that integrates four Atomic stream containers:

1. Sports News
2. World News
3. Notifications
4. Emergency Stream

Further information for the Atomic SDK can be found in the [Atomic.io documentation](https://documentation.atomic.io/sdks/react-native).

## Demo Video

For a comprehensive demonstration and insights into key code snippets, watch the demo video [here](https://drive.google.com/file/d/1sLShQ2WKrzTLjeShamGwEJFzSJ5JL0DA/view?usp=sharing).

## Getting Started

To get started, follow these steps:

### Configuration

In `App.tsx`, configure the following four variables for the app to communicate effectively with Atomic:

1. `ATOMIC_API_HOST` 
- Obtain from Atomic Workbench -> Configuration -> SDK -> API host
2. `ATOMIC_API_KEY` 
- Obtain from Atomic Workbench -> Configuration -> SDK -> API keys
3. `ATOMIC_ENVIRONMENT_ID` 
- Obtain from Atomic Workbench -> Configuration -> Top of the page
4. `ATOMIC_REQUEST_TOKEN_STRING` 
- Generate a JWT token for user authentication. Refer to the [authentication documentation](https:/documentation.atomic.io/sdks/auth-SDK) for instructions.

### Stream Containers

Create and acquire the IDs for four stream containers by navigating to: Atomic Workbench -> Configuration -> Stream Containers

Assign the container IDs in the respective files as follows:

1. `ATOMIC_SPORTS_STREAM_CONTAINER_ID` 
- Set in `Home.tsx` & `Sports.tsx`
2. `ATOMIC_WORLD_STREAM_CONTAINER_ID` 
- Set in `Home.tsx` & `World.tsx`
3. `ATOMIC_NOTIFICATION_STREAM_CONTAINER_ID`
- Set in `Home.tsx` & `NotificationModal.tsx`
4. `ATOMIC_EMERGENCY_STREAM_CONTAINER_ID` 
- Set in `Home.tsx` & `EmergencyModal.tsx`


## Running the app

Follow the instructions for `React Native CLI Quickstart` in the [React Native documentation](https://reactnative.dev/docs/environment-setup) to set up your local development environment and run the app.

Install the dependencies and run the Metro bundler

```
npm install
npm start
```

Let Metro Bundler run in its _own_ terminal. In another terminal window, install the dependencies on iOS

```
cd ios
pod install
cd ..
```

And then run the iOS app

```
npm run ios
```

To run the Android app

```
npm run android
```

## Runtime Variables

For an example of how to set runtime variables in your code, checkout the `runtime-variables` branch.

## Push Notifications

An example of how to receive and create in app notifications can be found on the `push-notification-support` branch.

Push notifications require a substantial amount of app and organization specific configuration.

More detailed instructions for setting up [push notifications for Android](https://documentation.atomic.io/sdks/android#notifications) can be found in our Atomic documentation, but the main steps are:

- Provide a `google-services.json` file in the `android/app/` directory.
- Enable legacy Firebase Cloud Messaging in your Google Cloud Console and save your server key in the `Configuration -> SDK -> Notifications` section of your Atomic workbench.

More detailed instructions for setting up [push notifications for iOS](https://documentation.atomic.io/sdks/ios#push-notifications) can be found our Atomic documentation, but the main steps are:

- Open the `ios/*.xcworkspace` file to open the iOS project in Xcode
- Modify the bundle-id to be unique
- Set the signing configuration to use your own Apple developer account
- Create an Apple Push Notification certificate for the app
- Export the certificate and add it to your Atomic workbench under Notifications.
