import {View, Text, Image} from 'react-native';
import React from 'react';
import Container from '../../../shared/components/Container';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import Label from '../../../shared/components/Label';
import Button from '../../../shared/components/Button';
import {GLOBAL_THEME, STORAGE_KEYS} from '../../../lib/constants';
import {setMainRoot} from '../../../navigation/roots';
import {useDeviceConstants} from '../../../lib/hooks/useDeviceConstants';
import {COLOR_MODE} from '../../../lib/constants';
import AsyncStorage from '@react-native-community/async-storage';

export default function Screen3() {
  const {bottomSpace} = useDeviceConstants();

  return (
    <Container
      type="systemFill"
      flex
      style={{
        width: widthPercentageToDP(100),
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingHorizontal: GLOBAL_THEME.container,
        paddingBottom:
          (bottomSpace > 0 ? bottomSpace : widthPercentageToDP(3)) +
          widthPercentageToDP(15),
      }}>
        <View
        style={{
          position: 'absolute',
          alignItems: 'center',
          //zIndex:-1,
          //alignSelf: 'center',
          height: '100%',
          width: '100%',
          //backgroundColor: '#fff',
          
          //padding: widthPercentageToDP(5),
        }}>
        <Image
          style={{
            position: 'absolute',
            bottom: widthPercentageToDP(7),
            //right: widthPercentageToDP(25),
            height: '100%',
            width: '100%',
            resizeMode: 'contain',
            //borderRadius: GLOBAL_THEME.radius.small,
          }}
          source={require('./screen3.png')}
        />
      </View>
      <Label size="body" type="secondaryLabel">
        Submitted in partial fulfilment
      </Label>
      <Label size="body" type="secondaryLabel">
        of the requirments for the degree of
      </Label>
      <Label size="body" type="secondaryLabel">
        computer engineering
      </Label>

      <Label
        size="body"
        type="secondaryLabel"
        style={{
          marginTop: widthPercentageToDP(15),
        }}>
        This project uses convolutional
      </Label>
      <Label size="body" type="secondaryLabel">
        neural networks and error level
      </Label>
      <Label size="body" type="secondaryLabel" >
        analysis to detect image tampering
      </Label>

      <Button
        onPress={async () => {
          try {
            await AsyncStorage.setItem(STORAGE_KEYS.ONBOARDING, 'true');
          } catch (e) {
            console.log(e);
            //Could not set item in async storage
          }
          setMainRoot();
        }}
        style={{
          marginTop: widthPercentageToDP(42),
        }}
        type="primary"
        title="Start"
      />
    </Container>
  );
}

