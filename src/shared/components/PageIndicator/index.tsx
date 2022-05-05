import React, { useMemo } from 'react';
import {
  View,
  Pressable,
  Text,
  StyleProp,
  ViewStyle,
  StyleSheet,
} from 'react-native';
import Row from '../layout/Row';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { useThemeContext } from '../../../lib/hooks/useThemeContext';

interface Props {
  numberOfPage;
  activePage;
  containerStyle: StyleProp<ViewStyle>;
  onDotPress;
  xAxis;
}

function PageIndicator(props: Props) {
  const { colors } = useThemeContext()
  const array = useMemo(() => new Array(props.numberOfPage).fill(0), [
    props.numberOfPage,
  ]);
  return (
    <Row style={[props.containerStyle]}>
      {array.map((_, index) => (
        <Pressable onPress={() => props.onDotPress(index)}>
          <View
            style={[styles.dot,
            {
              backgroundColor: colors.label.placeholderText
            },
            props.activePage === index && styles.activeDot,
            props.activePage === index && {
              backgroundColor: colors.label.primary
            }
            ]}
          />
        </Pressable>
      ))}
    </Row>
  );
}

const styles = StyleSheet.create({
  dot: {
    borderRadius: 100,
    width: widthPercentageToDP(1.7),
    height: widthPercentageToDP(1.7),
    marginHorizontal: widthPercentageToDP(1),
  },
  activeDot: { backgroundColor: 'white' },
});

export default PageIndicator;
