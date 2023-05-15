import React, { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';

const Progressbar = () => {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 100,
      duration: 20000, // 20 seconds
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const width = progress.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  });

  return (
    <View style={{ height: 10, backgroundColor: 'white' }}>
      <Animated.View style={{ height: '100%', width: 20, backgroundColor: 'white' }} />
    </View>
  );
};

export default Progressbar;
