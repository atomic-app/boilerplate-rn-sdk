import React from 'react';
import {StreamContainer} from '@atomic.io/react-native-atomic-sdk';

const World = () => {
  const ATOMIC_WORLD_STREAM_CONTAINER_ID = '';

  return (
    <StreamContainer
      style={{width: '100%', height: '100%'}}
      containerId={ATOMIC_WORLD_STREAM_CONTAINER_ID}
      configuration={{
        customStrings: {
          cardListTitle: 'World',
        },
        interfaceStyle: 'dark',
      }}
    />
  );
};

export default World;
