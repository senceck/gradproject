import React from 'react';
import {
  ViewProps,
  View,
  StyleSheet,
  Animated,
  ViewStyle,
  StyleProp,
} from 'react-native';
import { useThemeContext } from '../../../lib/hooks/useThemeContext';

type color =
  | 'systemFill'
  | 'secondarySystemFill'
  | 'tertiarySystemFill'
  | 'quaternarySystemFill';

interface Props extends ViewProps {
  children?;
  shadow?: boolean;
  animatable?: boolean;
  style?: StyleProp<ViewStyle>;
  type?: color;
  flex?;
}

export default function Container(props: Props) {
  let { colors } = useThemeContext();
  const style = [
    props.shadow && styles.shadow,
    props.style,
    props.type ? { backgroundColor: colors.background[props.type] } : {},
    props.flex ? { flex: 1 } : {}
  ];
  if (!!props.animatable) {
    return (
      <Animated.View {...props} style={style}>
        {props.children}
      </Animated.View>
    );
  }
  return (
    <View {...props} style={style}>
      {props.children}
    </View>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: 'black',
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0.09,
    shadowRadius: 5,
  },
});

