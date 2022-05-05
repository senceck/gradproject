import React, { useState, useImperativeHandle, forwardRef, useMemo } from 'react';
import {
  Modal,
  View,
  Animated,
  StyleSheet,
  ViewStyle,
  StyleProp,
  Dimensions,
  Pressable,
} from 'react-native';


interface Props {
  children?;
  transparent?: Boolean;
  dismissOnClickOutside?: Boolean;
  style?: StyleProp<ViewStyle>;
  onDismiss;
}

interface CardBottomSheetRef {
  dismiss;
  flex?
  show;
}

const Menu = forwardRef<CardBottomSheetRef, Props>((props, ref) => {
  const [opacity] = useState(new Animated.Value(0));
  const [isVisible, setIsVisible] = useState(false);

  const animateOut = () => {
    return new Promise((resolve) => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 400,
        useNativeDriver: false,
      }).start(resolve);
    });
  };

  const animateIn = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 450,
      useNativeDriver: false,
    }).start();
  };
  const show = () => {
    setIsVisible(true);
    animateIn();
  };

  const dismiss = async () => {
    await animateOut();
    setIsVisible(false);
    props.onDismiss && props.onDismiss();
  };
  useImperativeHandle(ref, () => ({
    dismiss,
    show,
  }));
  const transition = useMemo(() => {
    return [
      styles.bottomSheet,
      props.transparent && styles.transparent,
      {
        left: opacity.interpolate({
          inputRange: [0, 1],
          outputRange: [-Dimensions.get('screen').width, 0],
        }),
      },
    ];
  }, []);

  return (
    <Modal transparent={true} animationType={'none'} visible={isVisible}>
      <View style={styles.frame}>
        <Animated.View
          style={[
            styles.container,
            {
              opacity,
            },
          ]}>
          <Pressable
            style={{
              backgroundColor: 'transparent',
              height: '100%',
              width: '100%',
              position: 'absolute',
            }}
            onPress={props.dismissOnClickOutside && dismiss}>
            <></>
          </Pressable>
        </Animated.View>

        <Animated.View
          style={[
            styles.content,
            props.style,
            {
              opacity: opacity.interpolate({
                inputRange: [0, 0.5],
                outputRange: [0, 1],
              }),
            },
            ...transition,
          ]}>
          {props.children}
        </Animated.View>
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  frame: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  content: {
    backgroundColor: 'white',
    alignItems: 'center',
    zIndex: 100000,
    flex: 1,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  bottomSheet: {
    maxWidth: Dimensions.get('screen').width - 80,
    width: '73.5%',
    position: 'absolute',
  },
  transparent: {
    backgroundColor: 'transparent',
  },
});

export default Menu;
