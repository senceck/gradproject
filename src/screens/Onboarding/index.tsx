import React from 'react'
import { View, Text, Button, StatusBar, Animated, Dimensions } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import { GLOBAL_THEME } from '../../lib/constants'
import { useDeviceConstants } from '../../lib/hooks/useDeviceConstants'
import { useThemeContext } from '../../lib/hooks/useThemeContext'
import Container from '../../shared/components/Container'
import Icon from '../../shared/components/Icon'
import Label from '../../shared/components/Label'
import PageIndicator from '../../shared/components/PageIndicator'
import Screen1 from './Screen1'
import Screen2 from './Screen2'
import Screen3 from './Screen3'




export default function Onboarding() {
    const { colors } = useThemeContext()
    const { topSpace, bottomSpace } = useDeviceConstants()
    const ONBOARDING_SCREENS = [
        {
            c: <Screen1 />
        },
        {
            c: <Screen2 />
        },
        {
            c: <Screen3 />
        },

    ]

    const [activeIndex, SetActiveIndex] = React.useState<number>(0)
    const handleScroll = (event) => {
        let DeviceWidth = Dimensions.get('window')?.width;
        SetActiveIndex(Math.floor(event.nativeEvent.contentOffset.x / DeviceWidth * 1.01))
        //console.log(event.nativeEvent.contentOffset.x, DeviceWidth)
    }

    // React.useEffect(()=>{
    //     console.log('activeIndex',activeIndex)
    // },[activeIndex])

    return (
        <Container
            flex
            style={{
                justifyContent: "center",
                alignItems: "center",
                position: "relative"
            }}
        >
            <Animated.ScrollView
                onScroll={handleScroll}
                horizontal
                scrollEventThrottle={16}
                bounces={false}
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                style={{
                    flex: 1,
                }}
            >
                {ONBOARDING_SCREENS.map((Screen, i) => {
                    return (
                        <>
                            {Screen.c}
                        </>
                    )
                })}
            </Animated.ScrollView>
            <View style={{
                position: "absolute",
                bottom: (bottomSpace > 0 ? bottomSpace : widthPercentageToDP(3)) + widthPercentageToDP(6),
                justifyContent: "center",
                alignItems: "center",
                width: widthPercentageToDP(100)
            }}>
                <PageIndicator
                    numberOfPage={ONBOARDING_SCREENS.length}
                    activePage={activeIndex}
                    onDotPress={() => { }}
                    xAxis={null}
                    containerStyle={{}}
                />
            </View>
        </Container>
    )
}
