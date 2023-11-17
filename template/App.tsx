/**
 * Boilerplate React Native App For Atomic SDK
 */

import * as React from 'react';

import {Session as AtomicSession} from '@atomic.io/react-native-atomic-sdk';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from './screens/Home';
import SportsScreen from './screens/Sports';
import WorldScreen from './screens/World';
import NotificationModal from './screens/modals/NotificationModal';
import EmergencyModal from './screens/modals/EmergencyModal';

// Configure the Atomic SDK
const ATOMIC_API_HOST = '';
const ATOMIC_ENVIRONMENT_ID = '';
const ATOMIC_API_KEY = '';
const ATOMIC_REQUEST_TOKEN_STRING = '';

const onAuthTokenRequested = async () => {
  // This function will called by the Atomic SDK to authenticate a user.
  // You would normally get this value from your authentication process.
  // For this example we will just return a hardcoded string.
  return ATOMIC_REQUEST_TOKEN_STRING;
};

AtomicSession.setApiBaseUrl(ATOMIC_API_HOST);
AtomicSession.initialise(ATOMIC_ENVIRONMENT_ID, ATOMIC_API_KEY);
AtomicSession.setSessionDelegate(onAuthTokenRequested);

const Tab = createBottomTabNavigator();
const RootStack = createStackNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Sports" component={SportsScreen} />
      <Tab.Screen name="World" component={WorldScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
      <NavigationContainer>
        <RootStack.Navigator
          screenOptions={{
            headerShown: false,
            presentation: 'modal',
            animationEnabled: false,
          }}>
          <RootStack.Screen
            name="BottomTabNavigatorScreen"
            component={MainTabNavigator}
          />
          <RootStack.Screen
            name="NotificationModal"
            component={NotificationModal}
            options={{animationEnabled: true}}
          />
          <RootStack.Screen
            name="EmergencyModal"
            component={EmergencyModal}
            options={{animationEnabled: true}}
          />
        </RootStack.Navigator>
      </NavigationContainer>
  );
}
