import React, { useEffect, useRef, useState } from 'react'
import { View, Text } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import { push, showModal, showOverlay } from '../../../lib/helpers/navigation'
import { Screens } from '../../../navigation/screens'
import CardBottomSheet from '../../../shared/components/CardBottomSheet'
import Container from '../../../shared/components/Container'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Label from '../../../shared/components/Label'
import Button from '../../../shared/components/Button'
import { GLOBAL_THEME } from '../../../lib/constants'
import { useDeviceConstants } from '../../../lib/hooks/useDeviceConstants'
import { useThemeContext } from '../../../lib/hooks/useThemeContext'
import MultiPicker from '../../../shared/components/MultiPicker'
interface Props {
    componentId;
    onCountryPick;
}

interface CountryPickerProps {
    onCountryPick: () => any
}

export const showCountryPicker = ({ onCountryPick }: CountryPickerProps) => {
    showOverlay({ componentName: Screens.CountryPicker, passProps: { ...onCountryPick } })
}

const countries = [{
    name: "Jordan",
    code: "+962",
    flag: "https://i.ibb.co/BNyJT23/flag-400.png",
    meta: {}
},
{
    name: "UAE",
    code: "+922",
    flag: "https://i.ibb.co/3zd6Cgg/united-arab-emirates-flag-png-large.jpg",
    meta: {}
},
{
    name: "Saudi Arabia",
    code: "+912",
    flag: "https://i.ibb.co/3zd6Cgg/united-arab-emirates-flag-png-large.jpg",
    meta: {}
},
{
    name: "Iraq",
    code: "+973",
    flag: "https://i.ibb.co/3zd6Cgg/united-arab-emirates-flag-png-large.jpg",
    meta: {}
},
{
    name: "Syria",
    code: "+292",
    flag: "https://i.ibb.co/3zd6Cgg/united-arab-emirates-flag-png-large.jpg",
    meta: {}
}
]

export default function CountryPicker(props: Props) {
    const { topSpace, bottomSpace } = useDeviceConstants()
    const { colors } = useThemeContext()
    const sheetRef = useRef(null);
    useEffect(() => {
        sheetRef.current && sheetRef.current.show()
    }, [sheetRef])

    const [selected, setSelected] = useState(['+962'])

    return (
        <CardBottomSheet
            ref={sheetRef}
            onDismiss={() => {
                Navigation.dismissOverlay(props.componentId)
            }}
            transparent={true}
            dismissOnClickOutside={true}
            transition='BottomSheet'
        >
            <Container
                style={{
                    borderTopRightRadius: 10,
                    borderTopLeftRadius: 10,
                    width: widthPercentageToDP("100"),
                    overflow: 'hidden',
                    justifyContent: "center",
                    alignItems: "center",
                    paddingHorizontal: GLOBAL_THEME.container,
                    // paddingTop: container.global,
                    paddingBottom: bottomSpace && bottomSpace > 0 ? bottomSpace : GLOBAL_THEME.container
                }}
                type="systemFill">


                <MultiPicker
                    onChangeValue={(o, v) => setSelected([v])}
                    data={[[...countries.map(c => ({ label: c.name, value: c.code, ...c }))]]}
                    selected={selected}
                />
                <Button
                    onPress={() => {
                        let country = countries.find(a => a.code == selected[0])
                        props.onCountryPick && props.onCountryPick(country)
                        sheetRef.current && sheetRef.current.dismiss()
                        setTimeout(() => {
                            Navigation.dismissModal(props.componentId)
                        }, 150)
                    }}
                    title="Select"
                    type="primary"
                    radius="small"
                    style={{
                        width: "100%",
                        height: widthPercentageToDP("12")
                    }}
                >

                </Button>

            </Container>
        </CardBottomSheet >

    )
}
