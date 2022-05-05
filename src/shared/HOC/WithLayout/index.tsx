import React from 'react'
import { View, Text } from 'react-native'
import Container from '../../components/Container'
import Label from '../../components/Label'

export default function WithLayout(props: any, C: React.FC) {
    return (
        <Container
            flex={true}
            type="systemFill"
        >
            <Label>
                Hello
            </Label>
            <C {...props} />
        </Container>
    )
}
