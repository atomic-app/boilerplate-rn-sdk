/**
* Boilerplate React Native App For Atomic SDK
*/

import React from 'react';
import { SafeAreaView } from 'react-native';
import { Session as AtomicSession, StreamContainer } from "@atomic.io/react-native-atomic-sdk";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";

const ATOMIC_API_HOST = "***REMOVED***";
const ATOMIC_API_KEY = "***REMOVED***";
const ATOMIC_ENVIRONMENT_ID = "***REMOVED***";
const ATOMIC_STREAM_CONTAINER_ID = "***REMOVED***";
const ATOMIC_REQUEST_TOKEN_STRING = "***REMOVED***"

const onAuthTokenRequested = async () => {
  // This function will called by the Atomic SDK to authenticate a user.
  // You would normally get this value from your authentication process.
  // For this example we will just return a hardcoded string.
  return ATOMIC_REQUEST_TOKEN_STRING
};

AtomicSession.initialise(ATOMIC_ENVIRONMENT_ID, ATOMIC_API_KEY);
AtomicSession.setApiBaseUrl(ATOMIC_API_HOST);
AtomicSession.setSessionDelegate(onAuthTokenRequested)
AtomicSession.enableDebugMode(3)

// PUSH NOTIFICATIONS
PushNotification.configure({
  // Called when Token is generated (iOS and Android)
  onRegister: function (token) {
    console.log("TOKEN:", token);
    try {
      console.log("Registering device for notifications")
      AtomicSession.registerDeviceForNotifications(token.token);
    } catch {
      console.error("Problem with registering AtomicSession for notifications")
    }
  },

  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    console.log("NOTIFICATION:", notification);
    // (required) Called when a remote is received or opened, or local notification is opened
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  // (optional) Called when the user fails to register for remote notifications.
  // Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError: function(err) {
    console.error("Failed to register for remote notifications");
    console.error(err.message, err);
  },
});

AtomicSession.registerStreamContainersForNotifications(
  [ATOMIC_STREAM_CONTAINER_ID],
  true
);

const App = () => {
  return (
    <SafeAreaView>
      <StreamContainer
        style={{ width: '100%', height: '100%' }}
        containerId={ATOMIC_STREAM_CONTAINER_ID}
        configuration={{}}
        />
    </SafeAreaView>
  );
};

export default App;
