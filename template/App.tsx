/**
 * Boilerplate React Native App For Atomic SDK
 */

import React from 'react';
import {SafeAreaView, Platform} from 'react-native';
import {
  Session as AtomicSession,
  StreamContainer,
} from '@atomic.io/react-native-atomic-sdk';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';
import {requestNotifications} from 'react-native-permissions';

const ATOMIC_API_HOST = '';
const ATOMIC_API_KEY = '';
const ATOMIC_ENVIRONMENT_ID = '';
const ATOMIC_STREAM_CONTAINER_ID = '';
const ATOMIC_REQUEST_TOKEN_STRING = '';

// Request permission for notification using 'react-native-permissions' library.
requestNotifications(['alert', 'sound']).then(({status}) => {
  registerForNotificationsIfReadyAndRequired({
    permissionsGranted: status === 'granted',
  });
});

const onAuthTokenRequested = async () => {
  // This function will called by the Atomic SDK to authenticate a user.
  // You would normally get this value from your authentication process.
  // For this example we will just return a hardcoded string.
  let authToken = ATOMIC_REQUEST_TOKEN_STRING;

  // Once we have succesfully received a JWT token, we may be ready to register our device and container with Atomic for notifications
  // These calls are authenticated, so they won't succeed if called before we've got a JWT token.
  if (authToken) {
    registerForNotificationsIfReadyAndRequired({receivedJWT: true});
  }
  return authToken;
};

AtomicSession.enableDebugMode(3);
AtomicSession.initialise(ATOMIC_ENVIRONMENT_ID, ATOMIC_API_KEY);
AtomicSession.setApiBaseUrl(ATOMIC_API_HOST);
AtomicSession.setSessionDelegate(onAuthTokenRequested);

// Setup Push Notifications
PushNotification.configure({
  // Called when Token is generated (iOS and Android)
  onRegister: function (token) {
    // Once this function is called, we may be ready to register the with atomic for notications
    registerForNotificationsIfReadyAndRequired({devicePushToken: token.token});
  },

  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification);

    // On Android we have format the notification and then post it ourselves
    // using the localNotification method when we receive a remote notification
    // checking that it isn't a user interaction event to avoid an infinite loop.
    if (Platform.OS === 'android' && !notification.userInteraction) {
      const newNotification = {
        foreground: notification.foreground,
        userInteraction: false,
        message: notification.data.body,
        title: notification.data.title,
        channelId: 'atomic-notifications',
      };
      PushNotification.localNotification(newNotification);
    }

    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  // (optional) Called when the user fails to register for remote notifications.
  // Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError: function (err) {
    console.error('Failed to register for remote notifications');
    console.error(err.message, err);
  },

  // Handled by react-native-permissions library
  requestPermissions: false,
});

// Required for Android Push notifications
PushNotification.createChannel(
  {
    // This ID must be entered in the Workbench when you configure Notifications for the Android Platform.
    channelId: 'atomic-notifications', // (required)
    channelName: 'Atomic', // (required)
  },
  created => {
    console.log(`Channel created: ${created}`);
  },
);

let cachedDevicePushToken: string | null = null;
let devicePushNotificationPermissionsGranted = false;
let hasReceivedFirstJWT = false;
let hasRegisteredForNotifications = false;

function registerForNotificationsIfReadyAndRequired(props: {
  devicePushToken?: string;
  receivedJWT?: boolean;
  permissionsGranted?: boolean;
}) {
  if (props.devicePushToken) {
    cachedDevicePushToken = props.devicePushToken;
  }
  if (props.receivedJWT) {
    hasReceivedFirstJWT = props.receivedJWT;
  }
  if (props.permissionsGranted) {
    devicePushNotificationPermissionsGranted = props.permissionsGranted;
  }

  if (
    cachedDevicePushToken &&
    hasReceivedFirstJWT &&
    devicePushNotificationPermissionsGranted &&
    !hasRegisteredForNotifications
  ) {
    AtomicSession.registerDeviceForNotifications(cachedDevicePushToken);

    AtomicSession.registerStreamContainersForNotifications(
      [ATOMIC_STREAM_CONTAINER_ID],
      true,
    );
  }
}

const App = () => {
  return (
    <SafeAreaView>
      <StreamContainer
        style={{width: '100%', height: '100%'}}
        containerId={ATOMIC_STREAM_CONTAINER_ID}
        configuration={{}}
      />
    </SafeAreaView>
  );
};

export default App;

