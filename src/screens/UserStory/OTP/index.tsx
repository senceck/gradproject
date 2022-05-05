import _ from 'lodash'
import React, { useEffect, useState } from 'react'
import { View, Text, Platform, KeyboardAvoidingView, KeyboardAvoidingViewBase, Pressable } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { KeyboardAwareScrollView, KeyboardAwareSectionList } from 'react-native-keyboard-aware-scroll-view'
import { Navigation } from 'react-native-navigation'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import { userApi } from '../../../lib/api/userApi'
import { GLOBAL_THEME } from '../../../lib/constants'
import { push } from '../../../lib/helpers/navigation'
import { useDeviceConstants } from '../../../lib/hooks/useDeviceConstants'
import { useThemeContext } from '../../../lib/hooks/useThemeContext'
import { Screens } from '../../../navigation/screens'
import Button from '../../../shared/components/Button'
import CachedImage from '../../../shared/components/CachedImage'
import Container from '../../../shared/components/Container'
import Input from '../../../shared/components/Input'
import Label from '../../../shared/components/Label'
import Row from '../../../shared/components/layout/Row'
import TopBar from '../../../shared/components/Topbar'
import { showCountryPicker } from '../CountryPicker'
import UserLayout from '../../../shared/components/UserLayout'
import { OTPInput } from './OTPInput'

interface Props {
    componentId;
    international;
    phone;
    code;
    callBack;
}



export default function PhoneNumberModal(props: Props) {
    const { topSpace, bottomSpace } = useDeviceConstants()
    const { colors } = useThemeContext()

    const [error, setError] = useState(null)
    useEffect(() => {
        console.warn("CURRENT CALLBACK STATUS", props.callBack)
    }, [])
    const onFulFill = async (code) => {
        setError(null)
        try {
            await userApi.verifyOTP(props.international, code).then(() => {

                push({
                    rootId: props.componentId,
                    targetName: Screens.NewUserInfo,
                    passProps: {
                        phone: props.phone,
                        code: props.code,
                        international: props.international,
                        callBack: props.callBack
                    }
                })
            }).catch(e => {
                setError("Invalid OTP")
                throw e
            })
        } catch (e) {

        }
    }

    return (
        <UserLayout
            key={props.componentId}
            title="One Time Password"
            description={`Please enter the pin we sent to ${props.international}, you should recieve it shortly.`}
            onNavigationPress={() => {
                Navigation.pop(props.componentId)
            }}
            isBack
        >
            <View
                style={{
                    paddingHorizontal: GLOBAL_THEME.container,
                    marginTop: GLOBAL_THEME.container * 2.5
                }}
            >
                <OTPInput
                    secureTextEntry={false}
                    maxLength={4}
                    clearError={() => setError(null)}
                    onFulfill={onFulFill}
                />
                <Row
                    justifyContent="center"
                    style={{

                    }}>
                    <Label
                        type="secondaryLabel"
                        color={colors.primary.red}
                        weight="regular"
                        style={{
                            marginTop: widthPercentageToDP("5")
                        }}
                    >
                        {error}
                    </Label>
                </Row>
            </View>
        </UserLayout >
    )
}

