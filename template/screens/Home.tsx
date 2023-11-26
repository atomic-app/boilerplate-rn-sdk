import {
  HorizontalContainerView,
  SingleCardView,
  Session as AtomicSession,
} from '@atomic.io/react-native-atomic-sdk';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  Platform,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Home = ({navigation}: {navigation: any}) => {
  const ATOMIC_SPORTS_STREAM_CONTAINER_ID = '';
  const ATOMIC_WORLD_STREAM_CONTAINER_ID = '';
  const ATOMIC_NOTIFICATION_STREAM_CONTAINER_ID = '';
  const ATOMIC_EMERGENCY_STREAM_CONTAINER_ID = '';

  const [notificationCount, setNotificationCount] = useState(0);
  const [emergencyCount, setEmergencyCount] = useState(0);

  const notificationToken = AtomicSession.observeCardCountForStreamContainer(
    ATOMIC_NOTIFICATION_STREAM_CONTAINER_ID,
    5,
    cardCount => {
      setNotificationCount(cardCount);
    },
  );

  const emergencyToken = AtomicSession.observeCardCountForStreamContainer(
    ATOMIC_EMERGENCY_STREAM_CONTAINER_ID,
    5,
    cardCount => {
      setEmergencyCount(cardCount);
    },
  );

  useEffect(() => {
    if (emergencyCount > 0) {
      navigation.navigate('EmergencyModal');
    } else {
      navigation.navigate('BottomTabNavigatorScreen');
    }
  }, [emergencyCount]);

  const insets = useSafeAreaInsets();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    headerContainer: {
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      flexDirection: 'row',
      marginTop: insets.top,
      padding: 15,
    },
    headerText: {
      textAlign: 'center',
      fontSize: 24,
      fontWeight: 'bold',
      color: 'black',
    },
    notificationBell: {
      width: 25,
      height: 25,
    },
    notificationBadge: {
      position: 'absolute',
      top: -5,
      right: -4,
      backgroundColor: 'red',
      borderRadius: 50,
      width: 16,
      height: 16,
      justifyContent: 'center',
      alignItems: 'center',
    },
    notificationText: {
      color: 'white',
      fontSize: 12,
    },
    contentContainer: {
      flex: 1,
      backgroundColor: '#F2F2F2',
    },
    sectionHeader: {
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 5,
      fontSize: 28,
      fontWeight: 'bold',
      color: 'black',
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>NewsHub</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('NotificationModal')}>
          <View style={{position: 'relative'}}>
            <Image
              source={require('../assets/notificationBellIcon.png')}
              style={styles.notificationBell}
            />
            {notificationCount > 0 && (
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationText}>{notificationCount}</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.sectionHeader}>World</Text>
        <SingleCardView
          style={{width: '100%'}}
          containerId={ATOMIC_WORLD_STREAM_CONTAINER_ID}
          configuration={{automaticallyLoadNextCard: true}}
        />
        {Platform.OS === 'ios' && (
          <HorizontalContainerView
            style={{width: '100%'}}
            containerId={ATOMIC_SPORTS_STREAM_CONTAINER_ID}
            configuration={{
              cardWidth: 350,
              customStrings: {
                cardListTitle: 'Sports',
              },
            }}
          />
        )}
      </View>
    </View>
  );
};

export default Home;
