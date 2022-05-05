import React from 'react'
import { View, Text, StyleSheet, Platform, Linking, TouchableOpacity, Image } from 'react-native'
import deviceInfoModule from 'react-native-device-info'
import { Navigation } from 'react-native-navigation'
import { widthPercentageToDP } from 'react-native-responsive-screen'
import { assets } from '../../assets'
import { GLOBAL_THEME } from '../../lib/constants'
import { showOverlay } from '../../lib/helpers/navigation'
import { useDeviceConstants } from '../../lib/hooks/useDeviceConstants'
import { useThemeContext } from '../../lib/hooks/useThemeContext'
import { Screens } from '../../navigation/screens'
import Container from '../../shared/components/Container'
import Label from '../../shared/components/Label'
import TopBar from '../../shared/components/Topbar'
import ActionCard from './ActionCard'


interface Props {
    componentId;
}

export default function Development(props: Props) {
    const { colors, dynamicColor } = useThemeContext();
    const { topSpace, topBarHeight } = useDeviceConstants();
    return (
        <Container
            type="systemFill"
            style={{
                flex: 1,

            }}>
            <View style={{
                height: topBarHeight + 4 + topSpace,
                paddingTop: widthPercentageToDP("13.7") + topSpace,
                // paddingTop: widthPercentageToDP("15.7")
            }}>
                <TopBar
                    isBackVisible
                    animatedStyles={{
                        opacity: 0,
                    }}
                    rightBlock
                    title="Development"
                    onBackPress={() => Navigation.pop(props.componentId)}
                />
            </View>
            <View style={{
                paddingHorizontal: GLOBAL_THEME.container
            }}>
                <ActionCard
                    key="termsAction"
                    type='navigation'
                    title="Terms and Conditions"
                    icon={assets.profile.icons.terms}
                    onPress={() => {
                        showOverlay({
                            componentName: Screens.Legal, passProps: {
                                data: [],
                                title: "Terms and Conditions"
                            }
                        })
                    }}
                />
                <ActionCard
                    key="privacyAction"
                    type='navigation'
                    title="Privacy Policy"
                    icon={assets.profile.icons.privacy}
                    onPress={() => {
                        showOverlay({
                            componentName: Screens.Legal, passProps: {
                                data: [],
                                title: "Privacy Policy"
                            }
                        })
                    }}
                />
            </View>
            <View style={styles.logoContainer}>
                <Image
                    source={require("../../assets/images/vuedale.png")}
                    style={styles.logo}
                />
                <Label
                    style={{
                        marginTop: widthPercentageToDP("0")
                    }}
                    type="primary"
                    size="title3"
                    weight="medium"
                >
                    Developed By Vuedale
                </Label>
                <TouchableOpacity
                    style={{
                        width: widthPercentageToDP("92"),
                        marginTop: widthPercentageToDP("0.5"),
                    }}
                    onPress={() => Linking.openURL("https://www.vuedale.com")}>
                    <Label type="secondaryLabel"
                        weight="regular"
                        style={{
                            textAlign: "center"
                        }}>
                        www.vuedale.com
                    </Label>
                </TouchableOpacity>
                <Label
                    style={{
                        marginTop: widthPercentageToDP("4")
                    }}
                    type="secondaryLabel"
                    size="caption1"
                    weight="light"
                >
                    {deviceInfoModule.getVersion()} ({deviceInfoModule.getBuildNumber()})
                </Label>

            </View >
        </Container >
    )
}


const styles = StyleSheet.create({
    logoContainer: {
        flex: 1,
        // justifyContent: "center",
        paddingTop: widthPercentageToDP(25),
        alignItems: "center"
    },
    logo: {
        height: widthPercentageToDP("25"),
        width: widthPercentageToDP("25")
    }
})