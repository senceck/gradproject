import React, { useEffect, useRef, useState } from 'react'
import { View, Text } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import { push, showModal, showOverlay } from '../../../lib/helpers/navigation'
import { Screens } from '../../../navigation/screens'
import CardBottomSheet from '../../../shared/components/CardBottomSheet'
import Container from '../../../shared/components/Container'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Label from '../../../shared/components/Label'
import Button from '../../../shared/components/Button'
import { GLOBAL_THEME } from '../../../lib/constants'
import { useDeviceConstants } from '../../../lib/hooks/useDeviceConstants'
import { useThemeContext } from '../../../lib/hooks/useThemeContext'
import { useUser } from '../../../lib/hooks/useUser'
import { createMetaData } from '../../../lib/services/Metadata'
import { KeychainService } from '../../../lib/services/Keychain'
import useRecentUser from '../../../lib/hooks/useRecentUser'
import _ from "lodash";
interface Props {
    componentId;
    callBack;
}

export const showGuestPopup = (callBackOnFinish) => {
    showOverlay({ componentName: Screens.GuestPopup, passProps: { callBack: callBackOnFinish } })
}

export default function GuestPopup(props: Props) {
    const { topSpace, bottomSpace } = useDeviceConstants()
    const { colors } = useThemeContext()
    const sheetRef = useRef(null);
    useEffect(() => {
        sheetRef.current && sheetRef.current.show()
    }, [sheetRef])
    const HAS_PREV = null
    const { hasRecent, recentUser } = useRecentUser();


    useEffect(() => {
        // rehydrateUser()


    }, [])
    return (
        <CardBottomSheet
            ref={sheetRef}
            onDismiss={() => {
                Navigation.dismissOverlay(props.componentId)
            }}
            transparent={true}
            dismissOnClickOutside={true}
            transition='Card'
        >
            <Container
                style={{
                    borderTopRightRadius: 10,
                    borderTopLeftRadius: 10,
                    width: widthPercentageToDP("100"),
                    overflow: 'hidden',
                    justifyContent: "center",
                    alignItems: "center",
                    paddingHorizontal: GLOBAL_THEME.container,
                    paddingTop: GLOBAL_THEME.container,
                    paddingBottom: GLOBAL_THEME.container
                }}
                type="systemFill">
                <Label type="primary" size="title2" weight="semibold">
                    Oops! You’re not logged in
                </Label>
                <Label
                    style={{
                        textAlign: "center",
                        width: "60%",
                        paddingTop: widthPercentageToDP("0.5"),
                        paddingBottom: widthPercentageToDP("7")
                    }}
                    type="secondaryLabel"
                    size="caption1"
                    weight="light">
                    With our easy to use system, you can create a profile within seconds.
                </Label>



                {hasRecent && (
                    <>
                        <Button
                            onPress={() => {
                                Navigation.dismissOverlay(props.componentId)
                                setTimeout(() => {
                                    showModal({
                                        componentName: Screens.Password,
                                        passProps: {
                                            international: recentUser.phone,
                                            phone: recentUser.phone_number,
                                            code: recentUser.country_code,
                                            welcomeBack: true,
                                            callBack: props.callBack
                                        }
                                    })
                                }, 150)

                            }}
                            radius="small"
                            style={{
                                width: widthPercentageToDP(100) - GLOBAL_THEME.container * 4,
                                height: widthPercentageToDP("12"),
                            }}
                            type="light"
                            title={`Continue as ${recentUser.name.split(' ').map(e => _.capitalize(e)).join(' ')}`} />


                        <View
                            style={{
                                paddingBottom: widthPercentageToDP("4")
                            }}
                        >
                            <View style={{
                               width: widthPercentageToDP(100) - GLOBAL_THEME.container * 4.2,
                                borderBottomWidth: 1,
                                borderColor: colors.seperator.primary,
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                                <Label
                                    type="secondaryLabel"
                                    size="body"
                                    weight="medium"
                                    style={{
                                        top: widthPercentageToDP("2"),
                                        paddingHorizontal: GLOBAL_THEME.container,
                                        backgroundColor: colors.background.systemFill
                                    }}
                                >
                                    or
                                </Label>
                            </View>

                        </View>
                    </>
                )}
                <Button
                    onPress={() => {
                        Navigation.dismissOverlay(props.componentId)
                        setTimeout(() => {
                            showModal({
                                componentName: Screens.PhoneNumberModal,
                                passProps: {
                                    callBack: props.callBack
                                }
                            })
                        }, 150)
                    }}
                    radius="small"
                    style={{
                        width: widthPercentageToDP(100) - GLOBAL_THEME.container * 4,
                        height: widthPercentageToDP("12"),
                    }}
                    type="light"
                    title="Continue with Phone Number" />

            </Container>
        </CardBottomSheet >

    )
}
