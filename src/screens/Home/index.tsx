import React from 'react'
import { View, Text, Button } from 'react-native'
import { widthPercentageToDP } from 'react-native-responsive-screen'
import { GLOBAL_THEME } from '../../lib/constants'
import { useThemeContext } from '../../lib/hooks/useThemeContext'
import Container from '../../shared/components/Container'
import Icon from '../../shared/components/Icon'
import Label from '../../shared/components/Label'

export default function Home() {
    const { colors } = useThemeContext()
    return (
        <Container
            flex
            style={{
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <Container
                style={{
                    backgroundColor: colors.gray.gray6,
                    height: widthPercentageToDP(50),
                    width: widthPercentageToDP(50),
                    marginBottom: widthPercentageToDP(5),
                    borderRadius: GLOBAL_THEME.radius.small
                }}
            />
            <Label
                size="title2"
                weight='bold'
                type='primary'>
                Hellen Marashilian
            </Label>
            <Label
                type='primary'>
                The Forgery Detector
            </Label>

            <Button title='Upload Image'>

            </Button>
        </Container>
    )
}
