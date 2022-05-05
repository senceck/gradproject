import { View, Text } from 'react-native'
import React from 'react'
import Container from '../../../shared/components/Container'
import { widthPercentageToDP } from 'react-native-responsive-screen'
import Label from '../../../shared/components/Label'
import { GLOBAL_THEME } from '../../../lib/constants'

export default function Screen2() {
    return (
        <Container
            type='systemFill'
            flex
            style={{
                width: widthPercentageToDP(100),
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal:GLOBAL_THEME.container
            }}
        >
            <Label
                type='primary'
            >
                Screen2
            </Label>
        </Container>
    )
}