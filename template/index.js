/**
 * @format
 */

import { AppRegistry } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import notifee from 'react-native-notify-kit';
import App from './App';
import { name as appName } from './app.json';

// Handle FCM messages received while the app is in the background or terminated.
// On Android, the system displays the notification automatically if it has a
// 'notification' payload. This handler is primarily for data-only messages.
messaging().setBackgroundMessageHandler(async remoteMessage => {
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

// Required to handle background Notifee events (e.g. notification action presses).
notifee.onBackgroundEvent(async () => {});

AppRegistry.registerComponent(appName, () => App);
