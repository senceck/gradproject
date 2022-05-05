import React, {memo} from 'react';
import styled from 'styled-components/native';
import {ViewProps} from 'react-native';

const CustomRow = styled.View<{
  flexGrow;
  alignItems;
  justifyContent;
  minHeight;
}>`
  flex-direction: row;
  align-items: ${(props) => props.alignItems || 'center'};
  justify-content: ${(props) => props.justifyContent || 'flex-start'};
  ${(props) => (props.minHeight ? 'min-height:' + props.minHeight : '')};
  ${(props) => (props.flexGrow ? 'flex-grow:' + props.flexGrow : '')};
`;

type alignment = 'center' | 'flex-start' | 'flex-end' | 'baseline';
type justification =
  | 'center'
  | 'flex-start'
  | 'flex-end'
  | 'space-around'
  | 'space-between';

interface Props extends ViewProps {
  children: any;
  minHeight?: number;
  alignItems?: alignment;
  justifyContent?: justification;
  flexGrow?: number;
}

const Row = memo((props: Props) => {
  return (
    <CustomRow
      flexGrow={props.flexGrow}
      minHeight={props.minHeight}
      alignItems={props.alignItems}
      justifyContent={props.justifyContent}
      style={[props.style]}>
      {props.children}
    </CustomRow>
  );
});

export default Row;
