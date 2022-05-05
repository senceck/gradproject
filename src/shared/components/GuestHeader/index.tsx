import React from 'react'
import { View, Text } from 'react-native'
import { widthPercentageToDP } from 'react-native-responsive-screen'
import { GLOBAL_THEME } from '../../../lib/constants'
import Label from '../../../shared/components/Label'

interface Props {
    title;
    description
}

export default function GuestHeader(props: Props) {
    return (
        <View
            style={{
                paddingHorizontal: GLOBAL_THEME.container
            }}
        >
            <Label
                type="primary"
                size="title1"
                weight="bold"
            >
                {props.title}
            </Label>
            <Label
                type="secondaryLabel"
                style={{
                    marginTop: widthPercentageToDP("1"),
                    // width: "80%"
                }}
            >
                {props.description}
            </Label>
        </View>
    )
}
