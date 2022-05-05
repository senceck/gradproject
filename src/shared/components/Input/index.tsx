import React, { forwardRef, useState } from 'react';
import styled from 'styled-components/native';
import {
  TextInput,
  TextInputProps,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { useThemeContext } from '../../../lib/hooks/useThemeContext';
import Label from '../Label';
import { GLOBAL_THEME } from '../../../lib/constants';

type InputWrapperOverride = (styles) => StyleProp<ViewStyle>;

export interface InputProps extends TextInputProps {
  // ref?;
  name?;
  onChangeText?: any;
  error?;
  postfix?: React.FC;
  prefix?: React.FC;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  inputWrapperStyle?: StyleProp<ViewStyle> | InputWrapperOverride;
  disabled?;
  style?;
  label?;
  _ref?;
}

//@ts-ignore
const Container = styled.View`
  flex-direction: column;
`;

//@ts-ignore
const InputWrapper = styled.View`
  min-height: 50;
  width: 100%;
  border-radius: ${GLOBAL_THEME.radius.small};
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-width: 1;
  paddingHorizontal: ${widthPercentageToDP("3")}
`;

const Input = (props: InputProps) => {
  const { colors, dynamicColor } = useThemeContext();
  // const [isFocus, setIsFocus] = useState(false);
  const internalChange = (value) => {
    if (!!!props.onChangeText) {
      return
    }

    if (!!props.name) {
      // console.error("WTF", props.name)
      return props.onChangeText!(props.name, value);
    } else {
      return props.onChangeText!(value);
    }
  };

  const renderPostfix = () => {
    return props.postfix ? <props.postfix /> : null;
  };
  const renderPrefix = () => {
    return props.prefix ? <props.prefix /> : null;
  };
  const handleFocus = (e) => {
    props.onFocus && props.onFocus(e);
    // setIsFocus(true);
  };

  const handleBlur = (e) => {
    props.onBlur && props.onBlur(e);
    // setIsFocus(false);
  };

  return (
    <Container style={[props.containerStyle,

    ]}>
      <InputWrapper
        style={[
          props.inputWrapperStyle,
          {
            borderColor: props.error ? colors.primary.red : colors.gray.gray6,
          },
          {
            backgroundColor: !props.disabled ? dynamicColor(colors.gray.gray6, colors.primary.white) :
              dynamicColor("#000", colors.gray.gray6)
          }
        ]}>
        {renderPrefix()}
        <TextInput
          // onFocus={handleFocus}
          onBlur={handleBlur}
          ref={props._ref}
          {...props}
          editable={!props.disabled}
          autoCorrect={false}
          placeholderTextColor={colors.label.placeholderText}
          onChangeText={internalChange}
          clearButtonMode={'while-editing'}
          style={[
            {
              color: dynamicColor(colors.primary.white, colors.label.primary),
            },
            {
              fontSize: widthPercentageToDP('3.6'),
              flexGrow: 1,
              height: 50,
              backgroundColor: 'transparent'
            },
            props.style,
          ]}
        />
        {renderPostfix()}
      </InputWrapper>
      {props.error && (<Label
        type="secondaryLabel"
        color={colors.primary.red}
        weight="regular"
        style={{
          marginTop: widthPercentageToDP("1")
        }}
      >
        {props.error}
      </Label>)}
    </Container>
  );
};

export default Input;
