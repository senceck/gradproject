import React from "react";
import DeviceInfo from 'react-native-device-info';
import { Platform } from "react-native"
import { ifArabic } from "../../helpers/locale";
interface Metadata {

}

const metadataMapper = async (values) => {
    return {
        operating_system: {
            name: values[2],
            version: values[3]
        },
        device: {
            brand: values[4],
            model: values[0],
            unique_id: values[5],
            safe_area: values[7],
            is_tablet: values[6],
            type: DeviceInfo.getDeviceType(),
        },
        application: {
            version: `${values[1]}`,
            version_b: await DeviceInfo.getReadableVersion(),
            language: `${ifArabic("arabic", "english")}`,
            bundle_id: values[8],
            font_scale: values[9],
        }
    };
}

export const createMetaData = () => {
    return Promise.all([
        DeviceInfo.getModel(),
        DeviceInfo.getVersion(),
        DeviceInfo.getSystemName(),
        DeviceInfo.getSystemVersion(),
        DeviceInfo.getBrand(),
        DeviceInfo.getUniqueId(),
        DeviceInfo.isTablet(),
        DeviceInfo.hasNotch(),
        DeviceInfo.getBundleId(),
        DeviceInfo.getFontScale(),

    ]).then(values => {
        return metadataMapper(values)
    });
}


export const compareMetaData = () => {

}