import React from 'react';
import {StyleSheet, ViewStyle, StyleProp} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import Button from '../../Button';
import Icon from '../../Icon';
import {useThemeContext} from '../../../../lib/hooks/useThemeContext';

interface Props {
  onPress;
  isFavorite;
  showButtonBackgrounds;
}

function FavoriteButton(props: Props) {
  const {colors, dynamicColor} = useThemeContext();
  return (
    <Button
      onPress={props.onPress}
      type={'link'}
      activeOpacity={1}
      radius={'small'}
      style={[
        styles.button,
        props.showButtonBackgrounds && {
          backgroundColor: dynamicColor(colors.gray.gray6, colors.gray.gray6),
        },
      ]}>
      <Icon.AntDesign
        size={widthPercentageToDP(5.5)}
        color={colors.primary.company}
        name={props.isFavorite ? 'heart' : 'hearto'}
      />
    </Button>
  );
}
const styles = StyleSheet.create({
  button: {
    padding: 0,
    paddingHorizontal: 0,
    paddingVertical: 0,
    height: widthPercentageToDP(10),
    width: widthPercentageToDP(10),
  },
});

export default FavoriteButton;
