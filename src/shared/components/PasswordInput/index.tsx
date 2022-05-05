import React, { useState } from 'react';
import Input, { InputProps } from '../Input';
import Icon from '../Icon';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { Pressable } from 'react-native';
import { useThemeContext } from '../../../lib/hooks/useThemeContext';

interface Props extends InputProps { _ref?; defaultVisible?; }




function PasswordInput(props: Props) {
    const [hidden, setHidden] = useState(!!props.defaultVisible ? false : true);
    const toggle = () => setHidden(!hidden);
    const { colors, dynamicColor } = useThemeContext()
    return (
        <Input
            {...props}
            _ref={props._ref}
            textContentType={'password'}
            secureTextEntry={hidden}
            clearButtonMode={'never'}
            postfix={() => (
                <Pressable
                    style={{
                        height: widthPercentageToDP("10"),
                        width: widthPercentageToDP("6"),
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                    onPress={toggle}>
                    {!hidden ? (
                        <Icon.Ionicons
                            size={widthPercentageToDP(5)}
                            name={'ios-eye'}
                            color={dynamicColor(colors.primary.white, colors.label.primary)}
                        />
                    ) : (
                        <Icon.Ionicons
                            size={widthPercentageToDP(5)}
                            name={'ios-eye-off'}
                            color={dynamicColor(colors.primary.white, colors.label.primary)}
                        />
                    )}
                </Pressable>
            )}
        />
    );
}

export default PasswordInput;
