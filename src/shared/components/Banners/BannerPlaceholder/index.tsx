import React from 'react'
import { View, Text } from 'react-native'
import { widthPercentageToDP } from 'react-native-responsive-screen';
import {
    Placeholder,
    PlaceholderMedia,
    PlaceholderLine,
    Fade
} from "rn-placeholder";
import { GLOBAL_THEME } from '../../../../lib/constants';


interface Props {
    isVisible
}

export default function BannerPlaceHolder(props: Props) {
    return !props.isVisible && (
        <View style={{
            position: "absolute",
            zIndex: 500,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            paddingHorizontal: GLOBAL_THEME.container,
            paddingTop: GLOBAL_THEME.container * 1.5
        }}>
            <Placeholder
                Animation={Fade}
            >
                <PlaceholderLine
                    style={{
                        borderRadius: 10
                    }}
                    height={widthPercentageToDP("36")}
                />
            </Placeholder>
        </View>)
}
