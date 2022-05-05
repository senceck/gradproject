import React, {memo} from 'react';
import styled from 'styled-components/native';
import {ViewProps} from 'react-native';

const CustomCol = styled.View<{
  flexGrow?: number;
  justifyContent?: string;
  alignItems?: string;
}>`
  flex-direction: column;
  ${props => (props.flexGrow ? 'flex-grow: ' + props.flexGrow : '')};
  ${props => (props.alignItems ? 'align-items: ' + props.alignItems : '')};
  ${props =>
    props.justifyContent ? 'justify-content: ' + props.justifyContent : ''};
`;

interface Props extends ViewProps {
  children;
  flexGrow?: number;
  justifyContent?: string;
  alignItems?: string;
}

const Col = memo((props: Props) => {
  return (
    <CustomCol
      flexGrow={props.flexGrow}
      justifyContent={props.justifyContent}
      alignItems={props.alignItems}
      style={[props.style]}>
      {props.children}
    </CustomCol>
  );
});

export default Col;
