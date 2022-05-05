import { get } from 'lodash';

import React from 'react'
import { View, Text, Pressable, Image } from 'react-native'
import { widthPercentageToDP } from 'react-native-responsive-screen'
import { BIOMETRIC_TYPE, GLOBAL_THEME } from '../../../lib/constants';
import { useThemeContext } from '../../../lib/hooks/useThemeContext'

interface Props {
    type;
    onPress;
}



export default function BiometricsButton(props: Props) {

    const BiometricIcons = {
        [BIOMETRIC_TYPE.FACE_ID]: {
            dark: require("../../../assets/images/biometrics/faceId/darkmode.png"),
            light: require("../../../assets/images/biometrics/faceId/lightmode.png"),
        },
        [BIOMETRIC_TYPE.FINGERPRINT]: {
            dark: require("../../../assets/images/biometrics/touchId/darkmode.png"),
            light: require("../../../assets/images/biometrics/touchId/lightmode.png"),
        }
    }

    const { colors, dynamicColor } = useThemeContext();
    return (
        <Pressable
            onPress={props.onPress}
            style={{
                minHeight: widthPercentageToDP("12.1"),
                minWidth: widthPercentageToDP("12.1"),
                borderRadius: GLOBAL_THEME.radius.small,
                backgroundColor: dynamicColor(colors.primary.black, colors.primary.white),
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <Image
                style={{
                    height: widthPercentageToDP("10"),
                    width: widthPercentageToDP("10"),
                }}
                source={get(BiometricIcons, `${props.type}.${dynamicColor("dark", "light")}`, require("../../../assets/images/biometrics/touchId/lightmode.png"))} />

        </Pressable >
    )
}
