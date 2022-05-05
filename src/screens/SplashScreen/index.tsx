import React, { useEffect } from 'react'
import { View, Text, Image } from 'react-native'
import Container from '../../shared/components/Container'
import LottieView from 'lottie-react-native';
import { useThemeContext } from '../../lib/hooks/useThemeContext';
import Label from '../../shared/components/Label';
import { GLOBAL_THEME } from '../../lib/constants';
import { useDeviceConstants } from '../../lib/hooks/useDeviceConstants';
import { widthPercentageToDP } from 'react-native-responsive-screen';

interface Props {
    componentId;
    onFinish?;
}

const buffer = 50;
const MAIN_TIME = 350;
const ANIMATION_TIME = 1200;


export default function SplashScreen(props: Props) {
    const { colors, dynamicColor } = useThemeContext();
    const { bottomSpace } = useDeviceConstants()

    useEffect(() => {
        setTimeout(() => {
            props.onFinish();
        }, ANIMATION_TIME)
    }, [])

    return (
        <Container
            style={{
                flex: 1,
                backgroundColor: dynamicColor("#000", colors.primary.white),
            }}
        >
            <View
                style={{
                    flex: 1,
                    borderTopRightRadius: 5,
                    borderTopLeftRadius: 5,
                    justifyContent: "center",
                    alignItems: "center",
                }}

            >
                <Image
                    style={{
                        height: "100%",
                        width: widthPercentageToDP("50")
                    }}
                    resizeMethod="auto"
                    resizeMode="contain"
                    source={require("./logo.png")}
                />

                <Label
                    style={{
                        textAlign: "center"
                    }}
                    type='primary'>
                    The Forgery Detector
                </Label>
            </View>

            <View
                style={{
                    // borderColor: colors.seperator.primary,
                    // backgroundColor: colors.gray.gray6,
                    // backgroundColor: colors.primary.blue,
                    borderTopRightRadius: 5,
                    borderTopLeftRadius: 5,
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop: GLOBAL_THEME.container,
                    paddingBottom: bottomSpace > 0 ? bottomSpace + widthPercentageToDP(1) : GLOBAL_THEME.container
                }}
            >
                <Label
                    type="primary"
                    weight="semibold"
                    size='headline'
                    style={{
                        textAlign: "center",
                        letterSpacing: widthPercentageToDP("0.18"),
                    }}
                >
                    Gradutation Project
                </Label>
            </View>
        </Container >
    )
}
