import React, { useEffect, useRef, useState } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import CardBottomSheet from '../../../shared/components/CardBottomSheet'
import Container from '../../../shared/components/Container'
import Label from '../../../shared/components/Label'
import Button from '../../../shared/components/Button'
import { GLOBAL_THEME } from '../../../lib/constants'
import { useDeviceConstants } from '../../../lib/hooks/useDeviceConstants'
import { useThemeContext } from '../../../lib/hooks/useThemeContext'
import { useUser } from '../../../lib/hooks/useUser'
import Input from '../../../shared/components/Input'
import { showOverlay } from '../../../lib/helpers/navigation'
import { Screens } from '../../../navigation/screens'
interface Props {
    componentId;
    callback;
    options;
}

interface Option {
    label;
    value;
}

interface IShowActionPicker {
    options: Array<Option>
    callback
}

export const showActionPicker = ({ options, callback }: IShowActionPicker) => {
    showOverlay({
        componentName: Screens.ActionPicker,
        passProps: {
            callback: callback,
            options: options,
        }
    })
}


export default function ActionPicker(props: Props) {

    const { topSpace, bottomSpace } = useDeviceConstants()
    const { colors, dynamicColor } = useThemeContext()
    const sheetRef = useRef(null);
    useEffect(() => {
        sheetRef.current && sheetRef.current.show()
    }, [sheetRef])

    return (
        <CardBottomSheet
            ref={sheetRef}
            onDismiss={() => {
                Navigation.dismissOverlay(props.componentId)
            }}
            transparent={true}
            dismissOnClickOutside={true}
            transition='Card'
        >
            <Container
                style={{
                    borderTopRightRadius: 10,
                    backgroundColor: dynamicColor(colors.gray.gray6, colors.gray.gray5),
                    borderTopLeftRadius: 10,
                    width: widthPercentageToDP("100"),
                    overflow: 'hidden',
                    justifyContent: "center",
                    alignItems: "center",
                    paddingHorizontal: GLOBAL_THEME.container,
                    paddingVertical: GLOBAL_THEME.container / 2,
                    // paddingTop: container.global,
                    // paddingBottom: bottomSpace && bottomSpace > 0 ? bottomSpace : GLOBAL_THEME.container
                }}
            >
                {props.options && props.options.length > 0 && props.options.map(option => {
                    return (
                        <Button
                            onPress={() => {
                                props.callback(option.value)
                                sheetRef.current.dismiss()
                            }}
                            type='light'
                            radius='small'
                            style={{
                                width: widthPercentageToDP(100) - GLOBAL_THEME.container * 4,
                                height: widthPercentageToDP(11.7),
                                marginVertical: widthPercentageToDP(2),
                                marginHorizontal: GLOBAL_THEME.container
                            }}
                            title={option.label}
                        />
                    )
                })}
            </Container>
        </CardBottomSheet >

    )
}
