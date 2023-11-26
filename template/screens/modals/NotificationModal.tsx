import {Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import React from 'react';
import {
  CustomHeader,
  StreamContainer,
} from '@atomic.io/react-native-atomic-sdk';

const NotificationModal = ({navigation}: {navigation: any}) => {
  const ATOMIC_NOTIFICATION_STREAM_CONTAINER_ID = '';

  return (
    <StreamContainer
      style={styles.container}
      containerId={ATOMIC_NOTIFICATION_STREAM_CONTAINER_ID}
      configuration={{
        customStrings: {
          cardListTitle: 'Notifications',
        },
        enabledUiElements: {
          cardListHeader: false,
        },
      }}>
      <CustomHeader style={styles.header}>
        <Text style={styles.headerText}>Notifications</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/downArrow.png')}
            style={styles.arrowIcon}
          />
        </TouchableOpacity>
      </CustomHeader>
    </StreamContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 20,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  arrowIcon: {
    width: 20,
    height: 20,
  },
});

export default NotificationModal;
