import { useNetInfo } from '@react-native-community/netinfo'
import React from 'react'
import { Image, View } from 'react-native'
import { widthPercentageToDP } from 'react-native-responsive-screen'
import { GLOBAL_THEME } from '../../../lib/constants'
import { useDeviceConstants } from '../../../lib/hooks/useDeviceConstants'
import { initializeApp } from '../../../navigation'
import { setMainRoot, showSplashScreen } from '../../../navigation/roots'
import Button from '../../../shared/components/Button'
import Container from '../../../shared/components/Container'
import Label from '../../../shared/components/Label'

interface Props {
    buttonTitle;
    callback;
    children;
    title;
}

export default function GenericRoot() {
    const { topSpace, bottomSpace } = useDeviceConstants()
    const { isConnected } = useNetInfo()
    return (
        <Container
            type='systemFill'
            flex
            style={{
                paddingBottom: bottomSpace > 0 ? bottomSpace : GLOBAL_THEME.container,
                paddingTop: topSpace + GLOBAL_THEME.container,
                padding: GLOBAL_THEME.container,
                justifyContent: "flex-start",
                alignItems: "center"
            }}>
            <View style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Label
                    type='primary'
                    size='title3'
                    weight='semibold'
                >
                    Error
                </Label>
                <Label
                    type='primary'
                    size='title1'
                    weight='semibold'
                >
                    No Internet Connection
                </Label>
                <Label
                    type='secondaryLabel'
                    size='body'
                    style={{
                        textAlign: "center",
                        marginTop: widthPercentageToDP(2),
                        maxWidth: "80%"
                    }}
                    weight='regular'
                >
                    Oops! It seems that you
                    have encountered an error.
                </Label>
                <View
                    style={{
                        marginTop: widthPercentageToDP(7),
                        width: "100%",
                    }}
                >
                    {/* <Image
                        source={require("../../../assets/images/test.png")}
                        style={{
                            height: widthPercentageToDP(80),
                            width: widthPercentageToDP(94),
                        }}
                        resizeMethod='auto'
                        resizeMode='contain'
                    /> */}
                </View>
            </View>
            <Button
                onPress={async () => {
                    if (isConnected) {
                        showSplashScreen(async () => {
                            await setMainRoot();
                        })
                        await initializeApp();
                    }
                }}
                title='Retry'
                type='light'
                style={{
                    width: "100%",
                    height: widthPercentageToDP(11.7),
                    marginTop: 'auto'
                }}
                radius='small'
            />
        </Container>
    )
}
