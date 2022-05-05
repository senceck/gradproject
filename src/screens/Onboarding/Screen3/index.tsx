import { View, Text } from 'react-native'
import React from 'react'
import Container from '../../../shared/components/Container'
import { widthPercentageToDP } from 'react-native-responsive-screen'
import Label from '../../../shared/components/Label'
import Button from '../../../shared/components/Button'
import { GLOBAL_THEME } from '../../../lib/constants'
import { setMainRoot } from '../../../navigation/roots'

export default function Screen3() {
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
            <Label
                type='primary'
            >
                Whatever
            </Label>

            <Button
                onPress={() => { setMainRoot() }}
                style={{
                    marginTop: widthPercentageToDP(5)
                }}
                type='primary'
                title='Start'
            />
        </Container>
    )
}