import React, {useEffect} from 'react';
import {View, Image} from 'react-native';
import Container from '../../shared/components/Container';
import {useThemeContext} from '../../lib/hooks/useThemeContext';
import Label from '../../shared/components/Label';
import {useDeviceConstants} from '../../lib/hooks/useDeviceConstants';
import {widthPercentageToDP} from 'react-native-responsive-screen';

interface Props {
  componentId;
  onFinish?;
}

const ANIMATION_TIME = 1800;

export default function SplashScreen(props: Props) {

  useEffect(() => {
    setTimeout(() => {
      props.onFinish();
    }, ANIMATION_TIME);
  }, []);

  return (
    <Container
      type="systemFill"
      style={{
        flex: 1,
      }}>
      <View
        style={{
          flex: 1,
          borderTopRightRadius: 5,
          borderTopLeftRadius: 5,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          style={{
            height: '50%',
            width: widthPercentageToDP('50'),
          }}
          resizeMethod="auto"
          resizeMode="contain"
          source={require('./PSUTlogo.png')}
        />
        <Label
          type="primary"
          size='title2'
          weight="semibold"
          style={{
            textAlign: 'center',
            letterSpacing: widthPercentageToDP('0.18'),
            marginBottom: widthPercentageToDP(1),
          }}>
          Gradutation Project
        </Label>
        <Label
        size='headline'
        weight='semibold'
          style={{
            textAlign: 'center',
          }}
          type="primary">
          The Forgery Detector
        </Label>
      </View>
    </Container>
  );
}
