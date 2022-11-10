# React Native Boilerplate App
This is a boilerplate app to get you started with the Atomic SDK for React Native.

The code is based around the [Atomic.io documentation](https://documentation.atomic.io/sdks/react-native) and designed to get you up and running as quickly as possible, not necessarily as best practice.

The base React Native app is created following the [React Native documentation](https://reactnative.dev/docs/environment-setup) following the instructions for `React Native CLI Quickstart`. 
Follow the instructions there for setting up the development environment and for running the app.

## Quick Start
Install the dependencies and run the Metro bundler
```
npm install
npx react-native start
```
In another terminal window, install the dependencies on iOS
```
cd ios
pod install
cd ..
```
And then run the iOS app
```
npx react-native run-ios
```
To run the Android app
```
npx react-native run-android
```

The app won't load cards of the box, you will need to add your own values to `App.js` in order to communicate with Atomic. 
To find these values:

- Open the [Atomic Workbench](https://workbench.atomic.io/), and navigate to the Configuration area.
- Under the 'SDK' header, your API host is in the 'API Host' section, your API key is in the 'API Keys' section
- Your environment ID is at the top of the page under 'Environment ID'.

You will also need a JWT token for authentication.
See the [authentication documentation](https://documentation.atomic.io/sdks/auth-SDK) for instructions on generating this.

## Runtime Variables
For an example of how to set runtime variables in your code, checkout the `runtime-variables` branch.

## Push Notifications
An example of how to receive and create in app notifications can be found on the `push-notification-support` branch.

Push notifications require a substantial amount of app and organization specific configuration. 
Instructions for this can be found in the documentation, but in short.

For Android.
- Provide a `google-services.json` file in the `android/app/` directory. 
- Enable legacy Firebase Cloud Messaging in your Google Cloud Console and save your server key in the `Configuration -> SDK -> Notifications` section of your Atomic workbench.

For iOS 
- Open the `ios/*.xcworkspace` file to open the iOS project in Xcode
- Modify the bundle-id to be unique
- Set the signing configuration to use your own Apple developer account
- Create an Apple Push Notification certificate for the app
- Export the certificate and add it to your Atomic workbench under Notifications.
