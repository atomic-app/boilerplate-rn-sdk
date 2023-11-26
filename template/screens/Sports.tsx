import React from 'react';
import {StreamContainer} from '@atomic.io/react-native-atomic-sdk';

const Sports = () => {
  const ATOMIC_SPORTS_STREAM_CONTAINER_ID = '';

  return (
    <StreamContainer
      style={{width: '100%', height: '100%'}}
      containerId={ATOMIC_SPORTS_STREAM_CONTAINER_ID}
      configuration={{
        customStrings: {
          cardListTitle: 'Sports',
        },
      }}
    />
  );
};

export default Sports;
