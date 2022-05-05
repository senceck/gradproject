import React, { useMemo, useCallback, useEffect } from 'react';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { StyleSheet, StyleProp, ViewStyle, Pressable, Keyboard } from 'react-native';
import Input, { InputProps } from '../Input';
import Icon from '../Icon';
import { useThemeContext } from '../../../lib/hooks/useThemeContext';
import Row from '../layout/Row';
import { GLOBAL_THEME } from '../../../lib/constants';
import { useRef } from 'react';

interface Props extends InputProps {
  value?;
  onChange?;
  inputWrapperStyle?: (styles) => StyleProp<ViewStyle>;
  placeholder?;
  onBlur?;
  onIntervalBlur?;
  onOverlayPress?;
  showOverlay?;
  intervalAutoFocus?;
}

function SearchField(props: Props) {
  const { colors, dynamicColor } = useThemeContext();
  const inputWrapperStyle = useCallback(() => {
    const base = {
      borderRadius: GLOBAL_THEME.radius.small,
      backgroundColor: dynamicColor(colors.gray.gray2, colors.primary.white),
    };
    if (props.inputWrapperStyle) {
      return props.inputWrapperStyle(base);
    }
    return base;
  }, [colors]);
  const renderPrefix = () => (
    <Icon.Ionicons
      name={'ios-search'}
      size={widthPercentageToDP(4.5)}
      color={dynamicColor(colors.gray.gray1, colors.gray.gray1)}
      style={{ marginRight: widthPercentageToDP(4) }}
    />
  );
  const someref = useRef();
  useEffect(() => {
    //@ts-ignore
    // if (someref.current) {
    //   //@ts-ignore
    //   console.log("someref", someref.current.focus())
    //   //@ts-ignore
    //   // someref.current.ref.focus();
    // }
    setTimeout(() => {
      //@ts-ignore
      console.log("someref has focus", !!someref.current.focus)
      if (someref.current && props.intervalAutoFocus) {
        //@ts-ignore
        // someref.current.blur()
        //@ts-ignore
        someref.current.focus()
      }
    }, 1000)
  }, [someref.current])
  return (
    <Row
      style={{
        width: "100%",
        position: "relative"
      }}
    >
      {!!props.showOverlay && (<Pressable
        onPress={props.onOverlayPress}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 200,
        }}
      />)}
      <Input
        // onFocus={props.onFocus}
        _ref={someref}
        onBlur={() => {
          // Keyboard.dismiss();
          //@ts-ignore
          // !!someref.current && someref.current.blur();
          // !!props.onBlur && props.onBlur()
        }}
        prefix={renderPrefix}
        placeholderTextColor={dynamicColor(colors.gray.gray1, colors.gray.gray1)}
        placeholder={props.placeholder}
        value={props.value}
        onChangeText={props.onChange}
        {...props}
        containerStyle={{
          flexGrow: 1,
        }}

        clearButtonMode={'never'}
      // inputWrapperStyle={inputWrapperStyle()}
      />
    </Row>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: heightPercentageToDP(1.5),
    paddingHorizontal: widthPercentageToDP(3.5),
  },
});

export default SearchField;
