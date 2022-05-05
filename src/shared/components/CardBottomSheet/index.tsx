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

type TransitionType = 'BottomSheet' | 'Card';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { GLOBAL_THEME } from '../../../lib/constants';
interface Props {
  children?;
  transparent?: Boolean;
  dismissOnClickOutside?: Boolean;
  style?: StyleProp<ViewStyle>;
  transition: TransitionType;
  onDismiss;
}

interface CardBottomSheetRef {
  dismiss;
  show;
}

const CardBottomSheet = forwardRef<CardBottomSheetRef, Props>((props, ref) => {
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
      duration: 400,
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
    if (props.transition === 'BottomSheet') {
      return [
        styles.bottomSheet,
        props.transparent && styles.transparent,
        {
          bottom: opacity.interpolate({
            inputRange: [0, 1],
            outputRange: [-Dimensions.get('screen').height, 0],
          }),
        },
      ];
    } else {
      return [styles.card];
    }
  }, [props.transition]);

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
    overflow: 'hidden',
    justifyContent: 'center',
  },
  bottomSheet: {
    maxHeight: Dimensions.get('screen').height - 90,
    width: '100%',
    position: 'absolute',
  },
  card: {
    maxHeight: Dimensions.get('screen').height - 100,
    borderRadius: GLOBAL_THEME.radius.medium,
    width: '90%',
  },
  transparent: {
    backgroundColor: 'transparent',
  },
});

export default CardBottomSheet;
