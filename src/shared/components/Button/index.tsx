import React, { useMemo } from 'react';
import { Pressable, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { GLOBAL_THEME } from '../../../lib/constants';
import { useThemeContext } from '../../../lib/hooks/useThemeContext';
import Label, { LabelProps } from '../Label';

type ButtonType = 'primary' | 'secondary' | 'selected' | 'light' | 'link';
type ButtonRadiusType = null | undefined | 'small' | 'medium' | 'full';
type OmitLabelProps = Omit<LabelProps, 'children'>;

interface Props {
  title?;
  children?;
  style?: StyleProp<ViewStyle>;
  titleStyle?;
  activeOpacity?;
  type?: ButtonType;
  radius?: ButtonRadiusType;
  onPress?;
  disabled?: boolean;
  border?: boolean;
  labelProps?: OmitLabelProps;
}

function Button(props: Props) {
  const { colors } = useThemeContext();
  const ButtonColor = {
    primary: colors.primary.company,
    secondary: colors.primary.teal,
    selected: colors.primary.blue,
    light: colors.fillColors.tertiarySystemFill,
    link: 'transparent',
    primaryDisabled: colors.gray.gray2,
    lightDisabled: colors.gray.gray2,
  };

  const TextColor = {
    primary: colors.primary.white,
    secondary: colors.primary.white,
    selected: colors.primary.white,
    light: colors.label.primary,
    link: colors.primary.company,
    blueDisabled: 'rgb(77,119,243)',
    lightDisabled: 'white',
  };

  const BorderColor = {
    primary: 'transparent',
    secondary: 'transparent',
    selected: 'transparent',
    light: colors.gray.gray6,
    link: colors.gray.gray6,
    blueDisabled: 'transparent',
    lightDisabled: 'transparent',
  };

  const ButtonRadius = {
    small: GLOBAL_THEME.radius.small,
    medium: GLOBAL_THEME.radius.medium,
    full: GLOBAL_THEME.radius.full,
  };

  const backgroundColor = useMemo(
    () => ButtonColor[props.disabled ? props.type + 'Disabled' : props.type],
    [props.disabled, props.type, colors],
  );

  const borderRadius = useMemo(
    () => (props.radius ? ButtonRadius[props.radius] : 0),
    [props.radius, props.type, colors],
  );
  const textColor = useMemo(
    () => TextColor[props.disabled ? props.type + 'Disabled' : props.type],
    [props.disabled, props.type, colors],
  );

  const borderColor = useMemo(
    () => BorderColor[props.disabled ? props.type + 'Disabled' : props.type],
    [props.disabled, props.type, colors],
  );

  return (
    <Pressable
      disabled={props.disabled}
      onPress={props.onPress && props.onPress}
      style={({ pressed }) => [
        {
          backgroundColor,
          borderRadius,
          borderWidth: props.border ? 1 : 0,
          borderColor: borderColor,
          opacity: pressed ? props.activeOpacity || 0.7 : 1,
        },
        styles.button,
        props.style,
      ]}>
      {props.title ? (
        <Label
          // size={'subhead'}
          weight={'medium'}
          color={textColor}
          style={[props.titleStyle, { textAlignVertical: 'center' }]}
          {...props.labelProps}>
          {props.title}
        </Label>
      ) : (
        props.children
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    // minHeight: heightPercentageToDP(5.6),
    paddingHorizontal: widthPercentageToDP(3),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Button;
