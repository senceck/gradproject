import React, { useEffect, useRef, useState } from 'react'
import { View, Text, Platform, KeyboardAvoidingView, KeyboardAvoidingViewBase, Pressable, Alert } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { KeyboardAwareScrollView, KeyboardAwareSectionList } from 'react-native-keyboard-aware-scroll-view'
import { Navigation } from 'react-native-navigation'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import { container, ERROR_CODES } from '../../../lib/constants'
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
import * as yup from "yup"
import { jordanPhoneSchema } from '../../../lib/validation/user'
import { userApi } from '../../../lib/api/userApi'
// import DisabledOverlay from '../../../shared/components/DisabledOverlay'
import useRecentUser from '../../../lib/hooks/useRecentUser'
interface Props {
    componentId;
    callBack;
    showRecent?;
    showSuccess?;
}



const CountryComp = (props) => {
    const { colors, dynamicColor } = useThemeContext()

    let schema = yup.object().shape({
        name: yup.string(),
        age: yup.number().min(18),
    });

    return (
        <Pressable
            onPress={() => {
                showCountryPicker({ onCountryPick: props.onCountryPick })
            }}
            style={{
                marginRight: widthPercentageToDP("2"),
            }}
        >
            <Row style={{
            }}>
                <CachedImage
                    height={widthPercentageToDP("4")}
                    width={widthPercentageToDP(6.5)}
                    resizeMode="contain"
                    source={{ uri: props.country.flag }}
                />
                <Label
                    weight="medium"
                    style={{
                        marginLeft: widthPercentageToDP("2"),
                        color: dynamicColor(colors.primary.white, colors.label.primary),
                    }}
                >
                    {props.country.code}
                </Label>
            </Row>
        </Pressable>
    )
}


export default function PhoneNumberModal(props: Props) {

    const { colors } = useThemeContext()
    const [errors, setErorrs] = useState({}) as any;


    const onContinue = async () => {
        let international = selectedCountry.code + phoneNumber
        setErorrs({});
        try {
            setLoading(true)
            await jordanPhoneSchema.validate({ phone: phoneNumber }).catch(_errors => {
                console.log(JSON.stringify(_errors.message))
                setErorrs({ phone: _errors.message })
                throw new Error("VALIDATION")
            })
            await userApi.isRegistered(international).then(() => {
                push({
                    targetName: Screens.Password,
                    rootId: props.componentId,
                    passProps: {
                        international,
                        callBack: props.showSuccess,
                    }
                })
            }).catch(async e => {
                const callBack = props.callBack
                console.error("ERRORRRRRR", e)
                if (ERROR_CODES.REDIRECTION == e.status) {
                    await userApi.sendOTP(international).then(() => {
                        push({
                            targetName: Screens.OTP,
                            rootId: props.componentId,
                            passProps: {
                                callBack: props.showSuccess,
                                phone: phoneNumber,
                                code: selectedCountry.code,
                                international,
                            }
                        })
                    }).catch(er => {
                        Alert.alert(er.message)
                    });
                } else {
                    Alert.alert("Could not create an account at this moment")
                }
            })
        } catch (e) {
            setLoading(false)
        } finally {
            setLoading(false)
        }

    }


    const [selectedCountry, setSelectedCountry] = useState({
        code: "+962",
        name: "Jordan",
        flag: "https://i.ibb.co/BNyJT23/flag-400.png"
    })

    const [phoneNumber, setPhoneNumber] = useState("");

    const { hasRecent, recentUser } = useRecentUser()
    useEffect(() => {
        if (phoneNumber && phoneNumber.length == 1) {
            if (phoneNumber[0] == '0') {
                setPhoneNumber(phoneNumber.slice(1, phoneNumber.length))
            }
        }
    }, [phoneNumber])


    const [loading, setLoading] = useState(false);

    // const inputRef = useRef<any>(null);
    // useEffect(() => {
    //     setTimeout(() => {
    //         if (inputRef.current) {
    //             inputRef.current.focus();
    //         }
    //     }, 0)
    // }, [])

    useEffect(() => {
        setTimeout(() => {
            console.log("XX CURRENT CALL BACK PHONE", props.showSuccess)
        }, 500)
    }, [])
    return (
        <>
            {/* <DisabledOverlay isVisible={loading} /> */}
            <UserLayout
                key={props.componentId + "USERLAYOUTCOMP"}
                onButtonPress={() => {
                    onContinue()
                }}
                loading={loading}
                showButton
                buttonTitle="Continue"
                title="Login Or Register"
                description="You will receive a one time password to verify your phone number within a minute."
                onNavigationPress={() => {
                    Navigation.dismissModal(props.componentId)
                }}
            >

                <View
                    style={{
                        paddingHorizontal: container.global,
                        marginTop: container.global * 2
                    }}
                >
                    <Input
                        // _ref={inputRef}
                        placeholder="789788778"
                        prefix={() => <CountryComp
                            onCountryPick={setSelectedCountry}
                            country={selectedCountry}
                        />}
                        autoFocus={true}
                        keyboardType="number-pad"
                        value={phoneNumber}
                        error={errors.phone}
                        onChangeText={setPhoneNumber}
                    />
                </View>

                {props.showRecent && hasRecent && (
                    <Button
                        style={{
                            marginTop: widthPercentageToDP(5)
                        }}
                        type="link"
                        onPress={() => {
                            push({
                                rootId: props.componentId,
                                targetName: Screens.Password,
                                passProps: {
                                    phone: recentUser.phone_number,
                                    code: recentUser.code,
                                    international: recentUser.phone,
                                    callBack: props.showSuccess
                                }
                            })
                        }}
                        title={`Continue as ${recentUser.name}`}>

                    </Button>
                )}
            </UserLayout >
        </>
    )
}

