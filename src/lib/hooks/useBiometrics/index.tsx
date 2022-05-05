import React, { useEffect, useState } from "react";
import BiometricsDriver from 'react-native-fingerprint-scanner';

export default function useBiometrics() {
    const [biometricType, setBiometricType] = useState(null);
    const [hasBiometrics, setHasBiometrics] = useState(null);
    const [isBiometricReady, setIsBiometricReady] = useState(null)
    const updateBiometricInformation = async () => {
        await BiometricsDriver
            .isSensorAvailable()
            .then(biometryType => {
                setBiometricType(biometryType);
                setHasBiometrics(true)
            }).catch(error => {
                setHasBiometrics(false)
            });
        setIsBiometricReady(true)
        BiometricsDriver.release();
    }

    useEffect(() => {
        updateBiometricInformation()
    }, [])

    return {
        updateBiometricInformation,
        biometricType,
        hasBiometrics,
        isBiometricReady
    }
}
