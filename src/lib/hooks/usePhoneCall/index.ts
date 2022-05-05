import { Linking, Alert, Platform } from 'react-native';
import { ifArabic } from '../../helpers/locale';


export default function () {
    const call = phone => {
        // console.log('callNumber ----> ', phone);
        let phoneNumber = phone;
        if (Platform.OS !== 'android') {
            phoneNumber = `telprompt:${phone}`;
        }
        else {
            phoneNumber = `tel:${phone}`;
        }
        Linking.canOpenURL(phoneNumber)
            .then(supported => {
                if (!supported) {
                    Alert.alert(ifArabic("خطأ", "Error"), ifArabic("خاصية الاتصال غير متوفرة حالياً", "Phone call feature currently unavaiable"));
                } else {
                    return Linking.openURL(phoneNumber);
                }
            })
            .catch(err => {
                console.log(err)
                Alert.alert(err)
            });
    }
    return { call }
};