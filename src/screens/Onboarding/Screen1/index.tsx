import { View, Text } from 'react-native'
import React from 'react'
import Container from '../../../shared/components/Container'
import { widthPercentageToDP } from 'react-native-responsive-screen'
import Label from '../../../shared/components/Label'
import { useDeviceConstants } from '../../../lib/hooks/useDeviceConstants'
import { GLOBAL_THEME } from '../../../lib/constants'

export default function Screen1() {

    const { bottomSpace } = useDeviceConstants();

    return (
        <Container
            type='systemFill'
            flex
            style={{
                width: widthPercentageToDP(100),
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: GLOBAL_THEME.container
            }}
        >

            <Container
                type='secondarySystemFill'
                style={{
                    borderRadius: GLOBAL_THEME.radius.small,
                    width: widthPercentageToDP(50),
                    height: widthPercentageToDP(50)
                }}>

            </Container>
            <Label
                style={{
                    marginTop: widthPercentageToDP(25)
                }}
                size='title2'
                weight='semibold'
                type='primary'
            >
                Princess Sumaya University
            </Label>
            <Label
                style={{
                    marginTop: widthPercentageToDP(1)
                }}
                size='title2'
                weight='semibold'
                type='primary'
            >
                For Technology
            </Label>

            <Label
                style={{
                    marginTop: widthPercentageToDP(3)
                }}
                size='body'
                type='secondaryLabel'
            >
                Deep Learning Based
            </Label>

            <Label
                style={{
                    // marginBottom: (bottomSpace > 0 ? bottomSpace : widthPercentageToDP(3)) + widthPercentageToDP(5)
                }}
                size='body'
                type='secondaryLabel'
            >
                Image Tampering Detection Application
            </Label>
        </Container>

    )
}