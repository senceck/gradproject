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

function SearchButton(props: Props) {
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
            <Icon.Ionicons
                name={'ios-search'}
                size={widthPercentageToDP(4.5)}
                color={dynamicColor(colors.gray.gray1, colors.gray.gray1)}
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
        // marginRight: widthPercentageToDP(4),
    },
});

export default SearchButton;
