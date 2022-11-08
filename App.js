/**
* Boilerplate React Native App For Atomic SDK
*/

import React from 'react';
import { SafeAreaView } from 'react-native';
import { Session as AtomicSession, StreamContainer } from "@atomic.io/react-native-atomic-sdk";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification, { Importance } from "react-native-push-notification";

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


    // (required) Called when a remote is received or opened, or local notification is opened
    //

    if (!notification.userInteraction) {
      const newNotification = {
        foreground: notification.foreground,
        userInteraction: false,
        message: notification.data.body,
        title: notification.data.title,
        channelId: 'atomic-notifications'
      }

      // console.warn(newNotification)

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

PushNotification.createChannel(
    {
      channelId: "atomic-notifications", // (required)
      channelName: "Atomic", // (required)
      channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
      playSound: false, // (optional) default: true
      soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
      importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
    },
    (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
  );

const notifObject = {
    foreground: false, // BOOLEAN: If the notification was received in foreground or not
    userInteraction: false, // BOOLEAN: If the notification was opened by the user from the notification area or not
    message: 'My Notification Message', // STRING: The notification message
    data: {}, // OBJECT: The push data or the defined userInfo in local notifications
    channelId: 'atomic-notifications'
}

PushNotification.localNotification(notifObject)

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
