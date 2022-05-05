import { View, Text } from 'react-native'
import React, { useRef } from 'react'
import CardPopout from '../../shared/components/CardPopout'
import Label from '../../shared/components/Label'
import Container from '../../shared/components/Container'
import { widthPercentageToDP } from 'react-native-responsive-screen'
import CardBottomSheet from '../../shared/components/CardBottomSheet'
import Icon from '../../shared/components/Icon'

export default function Results() {
    const popUpDriver = useRef<any>(null)
    React.useEffect(() => {
        popUpDriver.current?.show();
    }, [popUpDriver])
    return (
        <CardBottomSheet
            onDismiss={() => {
                popUpDriver.current?.dismiss();
            }}
            dismissOnClickOutside
            transition='Card'
            ref={popUpDriver}
        >
            <Container
                style={{
                    padding: widthPercentageToDP(5),
                    // height:'100%',
                    width: '100%',
                    justifyContent:"center",
                    alignItems:"center"
                }}
            >
                <Label
                    type='primary'
                    size='title3'
                    weight='bold'
                    color='green'
                >
                    Success
                </Label>
            </Container>
        </CardBottomSheet>
    )
}