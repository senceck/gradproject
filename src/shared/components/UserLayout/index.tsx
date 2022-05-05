import React from 'react'
import { View, Text, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import { GLOBAL_THEME } from '../../../lib/constants'
import { pop } from '../../../lib/helpers/navigation'
import { useDeviceConstants } from '../../../lib/hooks/useDeviceConstants'
import { useThemeContext } from '../../../lib/hooks/useThemeContext'
import Button from '../Button'
import Container from '../Container'
import Label from '../Label'
import TopBar from '../Topbar'
import GuestHeader from '../GuestHeader'

interface Props {
    title;
    description;
    children;
    onNavigationPress;
    buttonTitle?;
    onButtonPress?;
    showButton?;
    isBack?;
    loading?;
    buttonColor?;
}

export default function UserLayout(props: Props) {
    const { colors } = useThemeContext()
    const { topSpace, bottomSpace } = useDeviceConstants()
    return (
        <Container
            type="systemFill"
            flex
        >
            <View
                style={{
                    height: heightPercentageToDP(6.5),
                    zIndex: 50,
                    marginBottom: widthPercentageToDP("4")
                }}>
                <TopBar
                    isInModal
                    animatedStyles={{
                        opacity: 0
                    }}
                    onClosePress={() => {
                        props.onNavigationPress()
                    }}
                    isCloseVisible={!props.isBack}
                    isBackVisible={props.isBack}
                    onBackPress={() => {
                        props.onNavigationPress()
                    }}

                />
            </View>
            <KeyboardAvoidingView
                keyboardVerticalOffset={(bottomSpace > 0 ? bottomSpace : GLOBAL_THEME.container) + widthPercentageToDP("1")}
                style={{
                    flex: 1,
                }}
                {...(Platform.OS === 'ios' ? { behavior: 'padding' } : {})}>
                <ScrollView
                    scrollEnabled={false}
                    contentContainerStyle={{
                        flex: 1,
                    }}>
                    <GuestHeader
                        title={props.title}
                        description={props.description}
                    />

                    {props.children}

                </ScrollView>
                {props.showButton && (<View
                    style={{
                        marginBottom: bottomSpace > 0 ? bottomSpace : GLOBAL_THEME.container,
                    }}
                >
                    <Button
                        onPress={props.onButtonPress}
                        radius="small"
                        style={{
                            backgroundColor: props.buttonColor ? props.buttonColor : colors.primary.company,
                            zIndex: 950,
                            marginTop: "auto",
                            height: widthPercentageToDP("12"),
                            marginHorizontal: GLOBAL_THEME.container,
                        }}
                        title={!props.loading ? props.buttonTitle : null}
                        type="primary"
                    >
                        {props.loading && (<ActivityIndicator
                            color={colors.primary.white}
                        />)}
                    </Button>

                </View>)}
            </KeyboardAvoidingView>
        </Container >
    )
}
