import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { widthPercentageToDP } from 'react-native-responsive-screen'
import { GLOBAL_THEME } from '../../../lib/constants';
import Icon from '../../../shared/components/Icon';
import Label from '../../../shared/components/Label';
import Row from '../../../shared/components/layout/Row';
import ToggleSwitch from 'toggle-switch-react-native'
import { useThemeContext } from '../../../lib/hooks/useThemeContext';


interface Props {
    type: 'navigation' | 'toggle'
    title: String;
    icon;
    onPress?;
    toggle?;
    onToggle?;
    caption?;
    toggleDisabled?;
    color?;
    backgroundColor?;
    noShadow?;
    disabled?: boolean;
}

export default function ActionCard(props: Props) {
    const { colors, dynamicColor } = useThemeContext();
    return (
        <Pressable
            style={({ pressed }) => [
                !!props.noShadow ? {} : styles.shadow,
                styles.card,
                {
                    backgroundColor: !!props.backgroundColor ? props.backgroundColor : dynamicColor(colors.gray.gray6, colors.gray.gray5),
                    marginBottom: widthPercentageToDP("3"),
                    opacity: !props.disabled ? pressed ? 0.7 : 1 : 1
                }]}
            onPress={props.onPress}
        >
            <Row alignItems="center">
                <Icon.Custom
                    name={props.icon}
                    size={widthPercentageToDP("4.5")}
                    color={props.color ? props.color : dynamicColor(colors.primary.white, colors.primary.black)}
                />
                <Label
                    color={props.color}
                    type="primary"
                    weight="semibold"
                    style={styles.title}
                >
                    {props.title}
                </Label>
            </Row>


            {props.type == 'navigation' ? (
                <Row>
                    {props.caption && (<Label
                        type="secondaryLabel"
                        weight="light"
                        size="caption2"
                        style={{
                            paddingRight: widthPercentageToDP("2")
                        }}
                    >
                        {props.caption}
                    </Label>)}
                    <Icon.Ionicons
                        name="chevron-forward-sharp"
                        size={widthPercentageToDP("4")}
                        color={props.color ? props.color : colors.label.secondaryLabel}
                    />
                </Row>
            ) : (
                <Row>
                    <ToggleSwitch
                        isOn={props.toggle}
                        onColor={colors.primary.company}
                        offColor={colors.gray.gray3}
                        size="medium"
                        // animationSpeed
                        disabled={props.toggleDisabled}
                        onToggle={props.onToggle}
                    />
                </Row>
            )}
        </Pressable>
    )
}


const styles = StyleSheet.create({
    card: {
        padding: widthPercentageToDP("4"),
        borderRadius: GLOBAL_THEME.radius.small,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    shadow: {
        shadowColor: "black",
        shadowOffset: {
            height: 1,
            width: 0,
        },
        shadowRadius: 3,
        shadowOpacity: 0.1,
    },
    title: {
        paddingLeft: widthPercentageToDP("3.3")
    }
})