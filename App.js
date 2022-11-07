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
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function (token) {
    console.log("TOKEN:", token);
    AtomicSession.registerDeviceForNotifications(token.token);
  },

  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    console.log("NOTIFICATION:", notification);

    // process the notification

    // (required) Called when a remote is received or opened, or local notification is opened
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
  onAction: function (notification) {
    console.log("ACTION:", notification.action);
    console.log("NOTIFICATION:", notification);

    // process the action
  },

  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError: function(err) {
    console.error("Failed to register for remote notifications");
    console.error(err.message, err);
  },

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   * - if you are not using remote notification or do not have Firebase installed, use this:
   *     requestPermissions: Platform.OS === 'ios'
   */
  requestPermissions: true,
});

const notifObject = {
    foreground: false, // BOOLEAN: If the notification was received in foreground or not
    userInteraction: false, // BOOLEAN: If the notification was opened by the user from the notification area or not
    message: 'My Notification Message', // STRING: The notification message
    data: {}, // OBJECT: The push data or the defined userInfo in local notifications
};

PushNotification.localNotification(notifObject);

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
