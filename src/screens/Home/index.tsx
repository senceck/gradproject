import React, {useState} from 'react';
import {
  View,
  Image,
  Pressable,
  Alert,
  PermissionsAndroid,
  TouchableOpacity,
} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {GLOBAL_THEME, STORAGE_KEYS} from '../../lib/constants';
import {useThemeContext} from '../../lib/hooks/useThemeContext';
import Container from '../../shared/components/Container';
import Icon from '../../shared/components/Icon';
import Label from '../../shared/components/Label';
import {useDeviceConstants} from '../../lib/hooks/useDeviceConstants';
import Button from '../../shared/components/Button';
import AnimatedLottieView from 'lottie-react-native';
import {showOverlay} from '../../lib/helpers/navigation';
import {Screens} from '../../navigation/screens';
import {setDefaultOptions} from '../../navigation';
import AsyncStorage from '@react-native-community/async-storage';
import {setOnboardingRoot} from '../../navigation/roots';
import LOADING_LIGHT from './loading_light.json';
import LOADING_DARK from './loading_dark.json';
import {Navigation} from 'react-native-navigation';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import axios from 'axios';


export interface IResult {
  Class: string;
  Confidence: string;
}

export default function Home() {
  const {bottomSpace, topSpace} = useDeviceConstants();

  const [selectedImage, setSelectedImage] = React.useState(null);
 
  const launchGallary = async () => {
    Navigation.dismissAllOverlays();
    let {didCancel, assets, errorMessage} = await launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
      includeBase64: true,
      selectionLimit: 1,
    });
    setSelectedImage(assets?.[0] ?? null);
  };

  const requestCameraPermission = async () => {
    Navigation.dismissAllOverlays();
    return new Promise(async (resolve, reject) => {
      try {
        const result = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Permission Required',
            message: 'Do you accept for this application to use the camera?',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'Accept',
          },
        );
        if (result === PermissionsAndroid.RESULTS.GRANTED) {
          resolve(result);
        } else {
          resolve(result);
        }
      } catch (e) {
        reject(e);
      }
    });
  };

  const launchCam = async () => {
    try {
      await requestCameraPermission();
      let {didCancel, assets, errorMessage} = await launchCamera({
        mediaType: 'photo',
        quality: 1,
        includeBase64: true,
      });
      setSelectedImage(assets?.[0] ?? null);
    } catch (e) {
      console.log('Could not open camera', e);
    }
  };

  const [message, setMessage] = React.useState<string>();
  const [loadingAniation, setLoadingAnimation] = React.useState(false);

  const prepareFile = () => {
    //DO PREPARE FILE
    // let tamperResult = await MobileModel.execute(model, {
    //   selectedImage,
    //   });

    setMessage('Preparing Image...');
    setLoadingAnimation(true);
    setTimeout(() => {
      uploadFile();
    }, 1250);
  };

  

  const uploadFile = async () => {
    try {
      setMessage('Uploading Image');
      let result = (await axios
        .post('http://34.155.180.7:5000', {
          image: selectedImage?.['base64'],
        })
        .then(response => response.data)) as IResult;
      //console.log('base64', selectedImage?.['base64']);
      setTimeout(() => {
        awaitResults(result);
      }, 1250);
    } catch (e) {
      setMessage(undefined);
      setSelectedImage(null);
      setLoadingAnimation(false);
      Alert.alert('Error', 'Could not process image at this moment');
      console.error('Error', e);
    }
  };
  const awaitResults = (result) => {
    // try {
    //   ...
    //   const image = selectedImage;
    //   const result = await MobileModel.execute(AiModel, {
    //     image,
    //   }) as any;
    //   Alert.alert('Results',result)
    // } catch (e) {
    //   Alert.alert('Error', e);
    //   setSelectedImage(null);
    //   setMessage(null);
    // }
    setMessage('Awaiting Results');
    setTimeout(() => {
      showResults(result);
    }, 1250);
  };

  const showResults = (result) => {
    // Alert.alert('result', JSON.stringify(result));
    setMessage(null);
    setLoadingAnimation(false);
    setSelectedImage(false);
    setTimeout(() => {
      showOverlay({
        componentName: Screens.Results,
        passProps: {
          result
        },
      });
    }, 0);
  };

  const {colors, dynamicColor, changeScheme} = useThemeContext();
  //const {scheme} = useThemeContext();

  return (
    <Container flex type="systemFill">
      <View
        style={{
          position: 'absolute',
          alignItems: 'center',
          //zIndex:-1,
          alignSelf: 'center',
          height: '100%',
          width: '100%',
          //backgroundColor: '#fff'
          padding: widthPercentageToDP(5),
        }}>
        <Image
          style={{
            position: 'absolute',
            bottom: widthPercentageToDP(20),
            height: '100%',
            width: '100%',
            resizeMode: 'center',
            //borderRadius: GLOBAL_THEME.radius.small,
          }}
          source={require('./main.png')}
        />
      </View>

      <View
        style={{
          position: 'absolute',
          paddingTop: topSpace > 0 ? topSpace : widthPercentageToDP(3),
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          alignSelf: 'center',
          paddingHorizontal: GLOBAL_THEME.container,
          flexDirection: 'row',
        }
        
        }>
        <Pressable
          onPress={async () => {
            let theme = (await AsyncStorage.getItem(STORAGE_KEYS.THEME)) as
              | 'dark'
              | 'light';
            if (!!!theme || theme == 'light') {
              await AsyncStorage.setItem(STORAGE_KEYS.THEME, 'dark');
              setDefaultOptions('dark');
              changeScheme('dark');
            } else {
              await AsyncStorage.setItem(STORAGE_KEYS.THEME, 'light');
              setDefaultOptions('light');
              changeScheme('light');
            }
          }}
          style={{
            width: widthPercentageToDP(10),
            height: widthPercentageToDP(10),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {dynamicColor(
            <Icon.Feather
              name="sun"
              color={colors.primary.yellow}
              size={widthPercentageToDP(7.5)}
            />,
            <Icon.Feather
              name="moon"
              color={colors.primary.yellow}
              size={widthPercentageToDP(7.5)}
            />,
          )}
        </Pressable>
        <Pressable
          onPress={() => {
            setOnboardingRoot();
          }}
          style={{
            width: widthPercentageToDP(10),
            height: widthPercentageToDP(10),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon.Feather
            name="menu"
            color={colors.primary.yellow}
            size={widthPercentageToDP(7.5)}
          />
        </Pressable>
      </View>

      <Container
        flex
        // type='secondarySystemFill'
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: GLOBAL_THEME.container,
        }
        
        }>
        <TouchableOpacity
          onPress={() => {
            showOverlay({
              componentName: Screens.Media,
              passProps: {
                launchCamera: launchCam,
                launchGallary: launchGallary,
              },
            });
          }}
          style={{
            // flex:1,
            marginTop: selectedImage ? widthPercentageToDP(5.6 + 12) : 0,
            height: widthPercentageToDP(75),
            width: widthPercentageToDP(90),
            marginBottom: widthPercentageToDP(5),
            borderRadius: GLOBAL_THEME.radius.small,
            borderWidth: 2,
            borderStyle: 'dashed',
            borderColor: dynamicColor(colors.gray.gray2, colors.primary.black),
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            //backgroundColor: loadingAniation ? dynamicColor('white', 'transparent') : 'transparent'
            backgroundColor: 'transparent',
          }}>
          {!loadingAniation && !!!selectedImage && (
            <Icon.Ionicons
              name="image"
              size={widthPercentageToDP(8)}
              color={colors.label.primary}
              
            />
          )}
          {loadingAniation && (
            <AnimatedLottieView
              autoPlay
              style={{
                height: '100%',
                width: '100%',
              }}
              source={dynamicColor(LOADING_DARK, LOADING_LIGHT)}
            />
          )}
          {!loadingAniation && !!selectedImage && (
            <>
              <Image
                style={{
                  height: '100%',
                  width: '100%',
                  borderRadius: GLOBAL_THEME.radius.small,
                }}
                source={{uri: selectedImage?.uri}}
              />
            </>
          )}
        </TouchableOpacity>

        <Label
          type="primary"
          size="body"
          weight="light"
          style={{
            // fontStyle: 'italic',
            marginTop: widthPercentageToDP(2),
          }}>
          {!!message
            ? message
            : selectedImage
            ? 'Ready To Process'
            : 'Please Select An Image'}
        </Label>
      </Container>
      <View
        style={{
          paddingBottom:
            (bottomSpace > 0 ? bottomSpace : widthPercentageToDP(3)) +
            widthPercentageToDP(3),
          paddingHorizontal: GLOBAL_THEME.container,
        }}>
        {selectedImage && (
          <Button
            style={{
              marginBottom: widthPercentageToDP(3),
            }}
            type="secondary"
            onPress={prepareFile}
            title={'Analyze'}
          />
        )}
        <Button
          type="primary"
          onPress={() => {
            showOverlay({
              componentName: Screens.Media,
              passProps: {
                launchCamera: launchCam,
                launchGallary: launchGallary,
              },
            });
          }}
          title={!!selectedImage ? 'Change Image' : 'Select Image'}
        />
      </View>
    </Container>
  );
}

// dark gray back ground hex color #34343c
//light grey text hex color #d2d0d8
