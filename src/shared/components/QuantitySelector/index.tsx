import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableNativeFeedback, TouchableOpacity, Pressable } from 'react-native'
import { widthPercentageToDP } from 'react-native-responsive-screen'
import { useTheme } from 'styled-components'
import { GLOBAL_THEME } from '../../../lib/constants'
import { useThemeContext } from '../../../lib/hooks/useThemeContext'
import Icon from '../Icon'
import Label from '../Label'
import Row from '../layout/Row'

const MAX_QUANTITY = 10

interface Props {
    onQuantityChange: (quantity) => void;
    stateless?;
    stateful?;
    initial?: any;
    invert?: Boolean;
}

export default function QuantitySelector(props: Props) {
    const [quantity, setQuantity] = useState(props.initial ? props.initial : 1);

    const add = () => {
        if (!!props.stateless) {
            return props.onQuantityChange(1)
        }
        setQuantity(quantity >= MAX_QUANTITY ? quantity : quantity + 1)
    }

    useEffect(() => {
        if (!!props.stateful) {
            props.onQuantityChange(quantity)
        }
    }, [quantity])
    const subtract = () => {
        if (!!props.stateless) {
            return props.onQuantityChange(-1)
        }
        setQuantity(quantity > 1 ? quantity - 1 : quantity)
    }
    const { colors } = useThemeContext();

    const colorGenerator = (type: "add" | "subtract", border = false) => {
        if (type == "add") {
            return quantity != MAX_QUANTITY ? colors.primary.company : colors.gray.gray2
        } else {
            return quantity != 1 ? colors.primary.company : colors.gray.gray2
        }
    }

    return (
        <Row
            style={{
                right: -GLOBAL_THEME.container / 3
            }}
            alignItems="center">
            <TouchableOpacity
                style={styles.pressable}
                onPress={subtract}
                activeOpacity={0.7}
            >
                <View
                    style={[styles.button,
                    {
                        borderColor: colorGenerator("subtract"),
                        backgroundColor: props.invert ? colorGenerator("subtract") : 'transparent',
                    }]}>
                    {quantity && (<Icon.AntDesign
                        name="minus"
                        size={widthPercentageToDP("4")}
                        color={props.invert ? colors.primary.white : colorGenerator("subtract")}
                    />)}
                </View>
            </TouchableOpacity>
            <Label weight="bold" size="title3" type="primary" style={[styles.value]}>
                {quantity}
            </Label>
            <TouchableOpacity
                style={styles.pressable}
                onPress={add}
                activeOpacity={0.7}
            >
                <View
                    style={[styles.button, {
                        borderColor: colorGenerator("add"),
                        backgroundColor: props.invert ? colorGenerator("add") : 'transparent',
                    }]}>
                    <Icon.AntDesign
                        name="plus"
                        size={widthPercentageToDP("4")}
                        color={props.invert ? colors.primary.white : colorGenerator("add")}
                    />
                </View>
            </TouchableOpacity>
        </Row>
    )
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 100,
        height: widthPercentageToDP("6"),
        width: widthPercentageToDP("6"),
        borderWidth: 1.1,
        justifyContent: "center",
        alignItems: "center",
    },
    pressable: {
        padding: GLOBAL_THEME.container / 3,
    },
    value: {
        fontSize: widthPercentageToDP("4.5"),
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        width: GLOBAL_THEME.container * 1.5
    }
})
