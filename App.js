/**
* Boilerplate React Native App For Atomic SDK
*/

import React from 'react';
import { SafeAreaView } from 'react-native';
import { Session as AtomicSession, StreamContainer } from "@atomic.io/react-native-atomic-sdk";

const ATOMIC_API_HOST = '';
const ATOMIC_API_KEY = '';
const ATOMIC_ENVIRONMENT_ID = '';
const ATOMIC_STREAM_CONTAINER_ID = '';
const ATOMIC_REQUEST_TOKEN_STRING = '';

const onAuthTokenRequested = async () => {
  // This function will called by the Atomic SDK to authenticate a user.
  // You would normally get this value from your authentication process.
  // For this example we will just return a hardcoded string.
  return ATOMIC_REQUEST_TOKEN_STRING
};

AtomicSession.initialise(ATOMIC_ENVIRONMENT_ID, ATOMIC_API_KEY);
AtomicSession.setApiBaseUrl(ATOMIC_API_HOST);
AtomicSession.setSessionDelegate(onAuthTokenRequested)

const App = () => {
  return (
    <SafeAreaView>
      <StreamContainer
        style={{ width: '100%', height: '100%' }}
        containerId={ATOMIC_STREAM_CONTAINER_ID}
        configuration={{}}
        runtimeVariablesRequested={async cards => {
          // Resolve your runtime variables here.
          cards.forEach(card => {
            card.runtimeVariables.set('dateShort', new Date().toDateString())
            card.runtimeVariables.set('dateLong', new Date().toString())
            card.runtimeVariables.set('testRuntime', "Variable set from device at run time")
          })

          return Promise.resolve(cards)
        }}
        />
    </SafeAreaView>
  );
};

export default App;
