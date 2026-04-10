/**
 * Boilerplate React Native App For Atomic SDK
 */

import React from 'react';
import { Platform, SafeAreaView } from 'react-native';
import {
  Session as AtomicSession,
  StreamContainer,
} from '@atomic.io/react-native-atomic-sdk';
import messaging from '@react-native-firebase/messaging';
import notifee, {
  AndroidImportance,
  AuthorizationStatus,
} from 'react-native-notify-kit';

const ATOMIC_API_HOST = '';
const ATOMIC_API_KEY = '';
const ATOMIC_ENVIRONMENT_ID = '';
const ATOMIC_STREAM_CONTAINER_ID = '';
const ATOMIC_REQUEST_TOKEN_STRING = '';

// On iOS, let Firebase Messaging handle remote notification tap events
// (onNotificationOpenedApp / getInitialNotification) rather than Notifee.
notifee.setNotificationConfig({ ios: { handleRemoteNotifications: false } });

// Create the Android notification channel (required for Android 8+).
// The channel ID must be entered in the Atomic Workbench when configuring
// Android push notifications.
notifee.createChannel({
  id: 'atomic-notifications',
  name: 'Atomic',
  importance: AndroidImportance.HIGH,
});

const onAuthTokenRequested = async () => {
  // This function will be called by the Atomic SDK to authenticate a user.
  // You would normally get this value from your authentication process.
  // For this example we will just return a hardcoded string.
  let authToken = ATOMIC_REQUEST_TOKEN_STRING;

  // Once we have successfully received a JWT token, we may be ready to register
  // our device and container with Atomic for notifications. These calls are
  // authenticated, so they won't succeed if called before we've got a JWT token.
  if (authToken) {
    registerForNotificationsIfReadyAndRequired({ receivedJWT: true });
  }
  return authToken;
};

AtomicSession.enableDebugMode(3);
AtomicSession.initialise(ATOMIC_ENVIRONMENT_ID, ATOMIC_API_KEY);
AtomicSession.setApiBaseUrl(ATOMIC_API_HOST);
AtomicSession.setSessionDelegate(onAuthTokenRequested);

// Request notification permission, then fetch the FCM registration token.
notifee.requestPermission().then(async settings => {
  const granted =
    settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED;
  registerForNotificationsIfReadyAndRequired({ permissionsGranted: granted });

  if (granted) {
    try {
      // iOS requires explicit registration for remote messages before getToken().
      // This will fail gracefully if GoogleService-Info.plist is not present.
      if (Platform.OS === 'ios') {
        await messaging().registerDeviceForRemoteMessages();
      }
      const token = await messaging().getToken();
      registerForNotificationsIfReadyAndRequired({ devicePushToken: token });
    } catch (e) {
      console.warn(
        'Failed to get FCM token — push notifications will not work.',
        e,
      );
    }
  }
});

// Called when the FCM token is rotated — re-register the new token with Atomic.
messaging().onTokenRefresh(token => {
  hasRegisteredForNotifications = false;
  registerForNotificationsIfReadyAndRequired({ devicePushToken: token });
});

// Handle FCM messages received while the app is in the foreground.
messaging().onMessage(async remoteMessage => {
  AtomicSession.trackPushNotificationReceived(remoteMessage.data ?? {});

  await notifee.displayNotification({
    title: remoteMessage.notification?.title,
    body: remoteMessage.notification?.body,
    data: remoteMessage.data,
    android: {
      channelId: 'atomic-notifications',
      pressAction: { id: 'default' },
    },
  });
});

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
    hasRegisteredForNotifications = true;
  }
}

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
