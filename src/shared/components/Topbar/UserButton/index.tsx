import React from 'react';
import { StyleSheet } from 'react-native';
import Button from '../../Button';
import Icon from '../../Icon';
import { useThemeContext } from '../../../../lib/hooks/useThemeContext';
import { widthPercentageToDP } from 'react-native-responsive-screen';

interface Props {
  onPress;
  showButtonBackgrounds;
}

function UserButton(props: Props) {
  const { colors, dynamicColor } = useThemeContext();
  return (
    <Button
      onPress={props.onPress}
      type={'link'}
      activeOpacity={1}
      radius={'small'}
      style={[
        props.showButtonBackgrounds && {
          backgroundColor: dynamicColor(colors.gray.gray6, colors.gray.gray6),
        },
        styles.button,
      ]}>
      <Icon.AntDesign
        size={widthPercentageToDP(5.5)}
        color={dynamicColor(colors.primary.white, colors.primary.black)}
        name={'user'}
      />
    </Button>
  );
}

const styles = StyleSheet.create({
  button: {
    height: widthPercentageToDP(10),
    width: widthPercentageToDP(10),
    padding: 0,
    paddingHorizontal: 0,
    paddingVertical: 0,
    marginRight: widthPercentageToDP(4),
  },
});

export default UserButton;
