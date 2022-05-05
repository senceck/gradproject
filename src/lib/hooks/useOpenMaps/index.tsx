import React from "react";
import { createOpenLink } from "react-native-open-maps";
// import { showActionPicker } from "../../../shared/screens/ActionPicker";
import { Platform } from "react-native"
import { showActionPicker } from "../../../screens/Utility/ActionPicker";

function useOpenMaps() {
    const goToMap = (lat, long) => {
        const openMaps = (provider) => {
            const options = {
                ...provider === 'apple' ? {
                    latitude: lat,
                    longitude: long
                } : {},
                query: `${lat} ${long}`,
                provider,
            };
            createOpenLink(options)();
        }
        if (Platform.OS === 'ios') {
            showActionPicker({
                options: [
                    { label: 'Google Maps', value: 'google' },
                    { label: 'Apple Maps', value: 'apple' },
                ],
                callback: async value => {
                    openMaps(value)
                },
            });
        } else {
            openMaps('google')
        }
    }

    return {
        goToMap
    }
}

export default useOpenMaps