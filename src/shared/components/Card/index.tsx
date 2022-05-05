import React from 'react';
import styled from 'styled-components/native';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { ViewProps } from 'react-native';
import { useThemeContext } from '../../../lib/hooks/useThemeContext';
import { GLOBAL_THEME } from '../../../lib/constants';
//@ts-ignore
const Frame = styled.View`
  elevation: 1;
  shadow-radius: 5;
  shadow-opacity: 0.1;
  shadow-color: black;
  shadow-offset: 0;
`;
//@ts-ignore
const Container = styled.View`
  flex-direction: column;
  flex-grow: 1;
  border-radius: ${GLOBAL_THEME.radius.medium};
  overflow: hidden;
`;

interface Props extends ViewProps {
  children;
}

function Card(props: Props) {
  const { colors } = useThemeContext();
  return (
    <Frame>
      <Container
        style={[
          props.style,
          { backgroundColor: colors.background.secondarySystemFill },
        ]}>
        {props.children}
      </Container>
    </Frame>
  );
}

export default Card;
