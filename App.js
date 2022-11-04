/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React from 'react';


import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors
} from 'react-native/Libraries/NewAppScreen';

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
  AtomicSession.enableDebugMode(3)
}

InitialiseAtomic()

const Section = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
    <StreamContainer
  style={{width: '100%', height: '100%'}}
  containerId={Credentials.containerId}
  configuration={{}}
/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
