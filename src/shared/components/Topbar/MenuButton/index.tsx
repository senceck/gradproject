import React from 'react';
import { StyleSheet, Image } from 'react-native';
import Button from '../../Button';
import Icon from '../../Icon';
import { useThemeContext } from '../../../../lib/hooks/useThemeContext';
import { assets } from '../../../../assets';
import { widthPercentageToDP, heightPercentageToDP } from "react-native-responsive-screen"
interface Props {
    onPress;
    showButtonBackgrounds;
}

function MenuButton(props: Props) {
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
            {dynamicColor(
                <Image source={assets.topBar.icons.menu.white}
                    style={{
                        height: widthPercentageToDP(5),
                        width: widthPercentageToDP(6)
                    }}
                    resizeMode="contain"
                />,
                <Image
                    style={{
                        height: widthPercentageToDP(5),
                        width: widthPercentageToDP(6)
                    }}
                    resizeMode="contain"
                    source={assets.topBar.icons.menu.black} />
            )}
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
        // marginRight: widthPercentageToDP(4),
    },
});

export default MenuButton;
