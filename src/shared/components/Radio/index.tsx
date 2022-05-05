import React from 'react';
import styled from 'styled-components/native';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { useThemeContext } from '../../../lib/hooks/useThemeContext';
import { GLOBAL_THEME } from '../../../lib/constants';
//@ts-ignore
const Container = styled.View`
  height: ${widthPercentageToDP(6)};
  width: ${widthPercentageToDP(6)};
  padding-horizontal: ${widthPercentageToDP(1)};
  padding-vertical: ${widthPercentageToDP(1)};
  border-radius: ${GLOBAL_THEME.radius.full};
  overflow: hidden;
`;
//@ts-ignore
const Fill = styled.View`
  height: 100%;
  width: 100%;
  border-radius: ${GLOBAL_THEME.radius.full};
`;

interface Props {
  isFilled;
}

function Radio(props: Props) {
  const { colors, dynamicColor } = useThemeContext();
  return (
    <Container
      style={{
        borderColor: colors.seperator.primary,
        borderWidth: 1,
        backgroundColor: dynamicColor(colors.gray.gray4, colors.primary.white),
      }}>
      {props.isFilled && (
        <Fill
          style={{
            backgroundColor: colors.primary.company,
          }}
        />
      )}
    </Container>
  );
}

export default Radio;
