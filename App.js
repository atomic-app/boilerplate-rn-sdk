/**
* Boilerplate React Native App For Atomic SDK
*/

import React from 'react';
import { SafeAreaView, Platform } from 'react-native';
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

// Setup Push Notifications
PushNotification.configure({
  // Called when Token is generated (iOS and Android)
  onRegister: function (token) {
    console.log("TOKEN:", token);
    try {
      AtomicSession.registerDeviceForNotifications(token.token);
    } catch {
      console.error("Problem with registering AtomicSession for notifications")
    }
  },

  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    console.log("NOTIFICATION:", notification);

    // On Android we have format the notification and then post it ourselves
    // using the localNotification method when we receive a remote notification
    // checking that it isn't a user interaction event to avoid an infinite loop.
    if (Platform.OS === 'android' && !notification.userInteraction) {
      const newNotification = {
        foreground: notification.foreground,
        userInteraction: false,
        message: notification.data.body,
        title: notification.data.title,
        channelId: 'atomic-notifications'
      }
      PushNotification.localNotification(newNotification);
    }

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

// Required for Android Push notifications
PushNotification.createChannel(
    {
      channelId: "atomic-notifications", // (required)
      channelName: "Atomic", // (required)
    }
  // ,
  //   (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
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
