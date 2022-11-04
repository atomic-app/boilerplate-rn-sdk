/**
 * Boilerplate React Native App For Atomic SDK
 */

import React from 'react';
import { SafeAreaView } from 'react-native';
import { Session as AtomicSession } from "@atomic.io/react-native-atomic-sdk";
import { StreamContainer } from "@atomic.io/react-native-atomic-sdk";

const Credentials = {
  containerId: "***REMOVED***",
  apiHost: "***REMOVED***",
  apiKey: "***REMOVED***",
  environmentId: "***REMOVED***",

  requestTokenStr: "***REMOVED***",
}

const InitialiseAtomic = () => {
  AtomicSession.initialise(Credentials.environmentId, Credentials.apiKey);
  AtomicSession.setApiBaseUrl(Credentials.apiHost);
  AtomicSession.setSessionDelegate(async () => {
    return Credentials.requestTokenStr
  })
}

InitialiseAtomic()

const App = () => {
  return (
    <SafeAreaView>
      <StreamContainer
    style={{width: '100%', height: '100%'}}
    containerId={Credentials.containerId}
    configuration={{}}
  />
    </SafeAreaView>
  );
};

export default App;
