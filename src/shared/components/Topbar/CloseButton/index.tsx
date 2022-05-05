import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import Button from '../../Button';
import Icon from '../../Icon';
import { useThemeContext } from '../../../../lib/hooks/useThemeContext';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import Label from '../../Label';

interface Props {
  onPress;
  showButtonBackgrounds;
}

function CloseButton(props: Props) {
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

      {true ? (
        <Icon.Ionicons
          size={widthPercentageToDP(5.5)}
          color={dynamicColor(colors.gray.gray1, colors.primary.black)}
          name={'ios-close-outline'}
        />
      ) : (
        <Label style={{
          color: colors.primary.company
        }}>
          Cancel
        </Label>
      )}

    </Button>
  );
}

const styles = StyleSheet.create({
  button: {
    height: widthPercentageToDP(10),
    width: widthPercentageToDP(10),
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
});

export default CloseButton;
