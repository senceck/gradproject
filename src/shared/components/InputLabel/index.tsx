import React from 'react';
import { View, Text, StyleProp, TextStyle } from 'react-native';
import styled from 'styled-components/native';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import Label from '../Label';

interface Props {
  error;
  title;
  style?
  textStyle?
}



function InputLabel(props: Props) {
  return (
      <Label
        type="secondaryLabel"
        weight="medium"
        style={[
          {
            paddingBottom:widthPercentageToDP("1.1")
          },
          props.textStyle,
        ]}>
        {props.title}
      </Label>
  );
}

export default InputLabel;
