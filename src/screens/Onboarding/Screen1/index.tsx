import { Image} from 'react-native';
import React from 'react';
import Container from '../../../shared/components/Container';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import Label from '../../../shared/components/Label';
import {useDeviceConstants} from '../../../lib/hooks/useDeviceConstants';
import {GLOBAL_THEME} from '../../../lib/constants';
import AnimatedLottieView from 'lottie-react-native';
import IntroDark from './intro_dark.json';
import {useThemeContext} from '../../../lib/hooks/useThemeContext';



export default function Screen1() {
  return (
    <Container
      type="systemFill"
      flex
      style={{
        width: widthPercentageToDP(100),
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: GLOBAL_THEME.container,
      }}>
      <Container
        style={{
          position:'relative',
          borderRadius: GLOBAL_THEME.radius.small,
          width: widthPercentageToDP(75),
          height: widthPercentageToDP(75),
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <Image
          style={{
                position:'absolute',
            height: '30%',
            width: '30%',
            zIndex: 2,
            resizeMode:'contain'
          }}
          source={require('./plain.png')}
        />
        <AnimatedLottieView
          autoPlay
          style={{
            height: '100%',
            width: '100%',
          }}
          source={IntroDark}
        />
        
      </Container>
      <Label
        style={{
          marginTop: widthPercentageToDP(12.5),
        }}
        size="title2"
        weight="semibold"
        type="primary">
        Princess Sumaya University
      </Label>
      <Label
        style={{
          marginTop: widthPercentageToDP(1),
        }}
        size="title2"
        weight="semibold"
        type="primary">
        For Technology
      </Label>

      <Label
        style={{
          marginTop: widthPercentageToDP(3),
        }}
        size="body"
        type="secondaryLabel">
        Deep Learning Based
      </Label>

      <Label
        size="body"
        type="secondaryLabel">
        Image Tampering Detection Application
      </Label>
    </Container>
  );
}
