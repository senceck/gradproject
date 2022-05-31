import {View, Image} from 'react-native';
import React from 'react';
import Container from '../../../shared/components/Container';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import Label from '../../../shared/components/Label';
import {GLOBAL_THEME} from '../../../lib/constants';

export default function Screen2() {
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
      <View
        style={{
          position: 'absolute',
          zIndex:-1,
          height: '100%',
          width: '100%',

        }}>
        <Image
          style={{
            position: 'absolute',
            height: '100%',
            width: '100%',
            resizeMode: 'center',
          }}
          source={require('./screen2-3.png')}
        />
      </View>
      <Label
        type="secondaryLabel"
        style={{
          marginBottom: widthPercentageToDP(3),
        }}>
        Made by
      </Label>
      <Label
        type="primary"
        size="title3"
        style={{
          marginBottom: widthPercentageToDP(1),
        }}>
        Hellen Marashilian
      </Label>
      <Label
        type="primary"
        size="title3"
        style={{
          marginBottom: widthPercentageToDP(8),
        }}>
        Bashar Abdallah
      </Label>
      <Label
        type="secondaryLabel"
        style={{
          marginBottom: widthPercentageToDP(3),
        }}>
        Supervised by
      </Label>
      <Label
        type="primary"
        size="title3"
        style={{
          marginBottom: widthPercentageToDP(1),
        }}>
        Dr. Heba Alawneh
      </Label>
    </Container>
  );
}
