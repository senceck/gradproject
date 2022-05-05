import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import BiometricsDriver from 'react-native-fingerprint-scanner';
import { Navigation } from 'react-native-navigation';
import { showOverlay } from '../../lib/helpers/navigation';
import useBiometrics from '../../lib/hooks/useBiometrics';
import { useThemeContext } from '../../lib/hooks/useThemeContext';
import { Screens } from '../../navigation/screens';
interface Props {
    componentId;
    onSuccess: Function;
    onFailure: Function;
}



export const validateUserUsingBiometrics = ({ onSuccess, onFailure }) => {
    showOverlay({ componentName: Screens.Biometrics, passProps: { onSuccess, onFailure } })
}

export default function Biometrics(props: Props) {
    const { colors, dynamicColor } = useThemeContext();
    const [animated, setAnimated] = useState(true)
    const { hasBiometrics, biometricType } = useBiometrics();
    const handleDismiss = (callBack) => {
        setAnimated(false)
        // setTimeout(() => {
            callBack()
        // }, 1000)
        setTimeout(() => {
            Navigation.dismissOverlay(props.componentId);
        }, 1500)
    }

    const showNativeBioAuth = async () => {
        await BiometricsDriver
            .authenticate({})
            .then(() => {
                handleDismiss(props.onSuccess);
            })
            .catch((error) => {
                console.error("ERROR", error)
                handleDismiss(props.onFailure);
            });
    }

    useEffect(() => {
        showNativeBioAuth();
    }, [])

    useEffect(() => {
        console.warn("BIOMETRICS", hasBiometrics, biometricType)
    }, [hasBiometrics, biometricType])

    return (
        <View
            style={{
                backgroundColor: colors.background.systemFill,
                flex: 1
            }}
            // transition={{
            //     duration: 800,
            //     type: "timing"
            // }}
            // from={{
            //     opacity: 0.2
            // }}
            // animate={{ opacity: animated ? 0.7 : 0 }}
            
            >

        </View>
    )
}
