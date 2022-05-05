import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { Animated, StyleSheet, ViewStyle } from 'react-native';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import { useThemeContext } from '../../../lib/hooks/useThemeContext';
import styled from 'styled-components/native';
import { GLOBAL_THEME } from '../../../lib/constants';

const Frame = styled.View`
  height: ${heightPercentageToDP(100)};
  width: ${widthPercentageToDP(100)};
  align-items: center;
  justify-content: center;
`;

interface Props {
  children?;
  style?: ViewStyle;
}

const CardPopout = forwardRef((props: Props, ref) => {
  const { colors } = useThemeContext();
  const [opacity] = useState(new Animated.Value(0));

  const animateOut = async () => {
    return new Promise((resolve) => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => resolve(null));
    });
  };

  const animateIn = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  useImperativeHandle(ref, () => ({
    animateOut,
  }));

  useEffect(() => {
    animateIn();
  }, []);

  return (
    <Frame>
      <Animated.View
        style={[
          styles.container,
          {
            opacity,
          },
        ]}
      />
      <Animated.View
        style={[
          styles.card,
          props.style,
          {
            backgroundColor: colors.background.systemFill,
            opacity: opacity.interpolate({
              inputRange: [0, 0.1, 0.5],
              outputRange: [0, 0, 1],
            }),
          },
        ]}>
        {props.children}
      </Animated.View>
    </Frame>
  );
});

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  card: {
    width: widthPercentageToDP(90),
    zIndex: 10,
    borderRadius: GLOBAL_THEME.radius.medium,
    alignItems: 'center',
    overflow: 'hidden',
    justifyContent: 'center',
  },
});

export default CardPopout;
