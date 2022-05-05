import React from 'react'
import { View, Text } from 'react-native'
import { useDeviceName } from 'react-native-device-info'
import { widthPercentageToDP } from 'react-native-responsive-screen'
import { GLOBAL_THEME } from '../../../lib/constants'
import { useDeviceConstants } from '../../../lib/hooks/useDeviceConstants'
import { useThemeContext } from '../../../lib/hooks/useThemeContext'
import Label from '../Label'
import Row from '../layout/Row'

export default function CustomToast(props) {
    const { colors, dynamicColor } = useThemeContext()
    const { topSpace } = useDeviceConstants()
    const data = JSON.parse(props.message)
    return (
        <Row style={{
            zIndex: 950,
            marginTop: widthPercentageToDP(-2),
            height: topSpace > 0 ? widthPercentageToDP("13") + topSpace : widthPercentageToDP("16"),
            paddingHorizontal: GLOBAL_THEME.container,
            paddingTop: topSpace > 0 ? topSpace : GLOBAL_THEME.container,
            paddingBottom: GLOBAL_THEME.container / 1.5,
            width: '100%', backgroundColor: dynamicColor(colors.gray.gray6, colors.background.tertiarySystemFill)
        }}>
            <View style={{
                height: "100%",
                backgroundColor: colors.primary.company,
                width: widthPercentageToDP("2"),
                marginRight: widthPercentageToDP("2"),
                borderTopLeftRadius: 5,
                borderBottomLeftRadius: 5,
            }}>
            </View>
            <View>
                <Label
                    type="primary"
                    color={dynamicColor(colors.primary.white, colors.label.primary)}
                    weight="bold"
                    size='headline'
                    style={{

                    }}
                >
                    {data.title}
                </Label>
                <Label
                    type="secondaryLabel"
                    weight="medium"
                    color={dynamicColor(colors.primary.white, colors.label.primary)}
                    size='caption1'
                    style={{
                    }}
                >
                    {data.message}
                </Label>
            </View>
            {/* <Text>{props.guid}</Text> */}
        </Row>
    )
}


