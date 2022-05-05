
import React, { useState } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
// import Animated, {
//     useAnimatedStyle,
//     useDerivedValue,
//     withTiming,
//     interpolate,
//     Extrapolate,
// } from 'react-native-reanimated';

type Props = {
    children;
    onPress(): void;
    scaleTo?: number;
    disabled?: boolean;
};

const TimingConfig = { duration: 100 };

export const TouchableScale = ({ onPress, children, scaleTo = 0.97, disabled = false }: Props) => {
    const [pressed, setPressed] = useState(false);


    return (
        <TouchableWithoutFeedback
            onPressIn={() => {
                setPressed(true)
            }}
            onPressOut={() => {
                setPressed(false)
            }}
            onPress={onPress}
            disabled={disabled}>
            <View
                // transition={{
                //     type: 'timing',
                //     duration: 100,
                // }}
                // animate={{
                //     scale: !pressed ? 1 : scaleTo,
                // }}
                style={{}}>{children}</View>
        </TouchableWithoutFeedback>
    );
};