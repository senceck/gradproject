import React, { useMemo } from 'react';
import Row from "../layout/Row"
import { Picker } from '@react-native-community/picker';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import styled from 'styled-components/native';
import { Platform, StyleSheet } from 'react-native';
import { useThemeContext } from '../../../lib/hooks/useThemeContext';


//@ts-ignore
const PickerContainer = styled.View<{ index }>`
  flex: 1;
  border-color: ${Platform.select({
  ios: 'white',
  android: 'rgba(0,0,0,0.08)',
})};
  margin-right: ${(props) =>
    Platform.select({
      ios: 0,
      android: props.index === 0 ? widthPercentageToDP(5) : 0,
    })};
  border-bottom-width: ${Platform.select({
      ios: 0,
      android: 1,
    })};
`;

interface Props {
  data: Array<Array<any>>;
  selected: Array<any>;
  onChangeValue;
  style?;
}

const RenderPicker = (props) => {
  const { colors } = useThemeContext()
  const onValueChange = (value) => props.onValueChange(props.index, value);
  if (Platform.OS === 'android') {
    return (
      <Picker
        loop={true}
        {...props} onValueChange={onValueChange}>
        {props.items.map((item, i) => (
          <Picker.Item key={i} label={item.label} value={item.value} />
        ))}
      </Picker>
    );
  }
  return (
    <Picker {...props} style={{ backgroundColor: 'transparent' }} onValueChange={onValueChange}>
      {props.items.map((item, i) => (
        <Picker.Item color={colors.label.primary} key={i} label={item.label} value={item.value} />
      ))}
    </Picker>
  );
};

const MultiPicker = React.memo((props: Props) => {
  const items = useMemo(() => props.data, [props.data]);
  return (
    <Row>
      {items.map((picker, index) => (
        <PickerContainer key={index} index={index}>
          <RenderPicker
            infinite={true}
            index={index}
            selectedValue={props.selected[index]}
            style={styles.picker}
            itemStyle={styles.itemStyle}
            items={picker}
            onValueChange={props.onChangeValue}
          />
        </PickerContainer>
      ))}
    </Row>
  );
});

const styles = StyleSheet.create({
  itemStyle: {
    fontSize: widthPercentageToDP('3.7'),
    textAlign: 'center',
    justifyContent: 'center',
  },
  picker: {
    flex: 1,
    textAlign: 'center',
    backgroundColor: 'white',
  },
});
export default MultiPicker;
