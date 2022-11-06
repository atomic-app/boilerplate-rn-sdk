/**
* Boilerplate React Native App For Atomic SDK
*/

import React from 'react';
import { SafeAreaView } from 'react-native';
import { Session as AtomicSession, StreamContainer } from "@atomic.io/react-native-atomic-sdk";

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
