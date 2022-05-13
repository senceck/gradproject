import React, { useState } from 'react'
import { View, Text, Image, Platform } from 'react-native'
import { widthPercentageToDP } from 'react-native-responsive-screen'
import { GLOBAL_THEME } from '../../lib/constants'
import { useThemeContext } from '../../lib/hooks/useThemeContext'
import Container from '../../shared/components/Container'
import Icon from '../../shared/components/Icon'
import Label from '../../shared/components/Label'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useDeviceName } from 'react-native-device-info'
import { useDeviceConstants } from '../../lib/hooks/useDeviceConstants'
import Button from '../../shared/components/Button'
import CachedImage from '../../shared/components/CachedImage'
import AnimatedLottieView from 'lottie-react-native'
import animation from "./animation.json";
import { showModal, showOverlay } from '../../lib/helpers/navigation'
import { Screens } from '../../navigation/screens'
import { cloneDeep } from 'lodash'

export default function Home() {

    const { bottomSpace } = useDeviceConstants();

    const [selectedImage, setSelectedImage] = React.useState(null);
    const launchGallary = async () => {
        let { didCancel, assets, errorMessage } = await launchImageLibrary({
            mediaType: "photo",
            quality: 1,
            includeBase64: true,
            selectionLimit: 1,
        })
        setSelectedImage(assets[0])
    }

    const [message, setMessage] = React.useState<string>()
    const [loadingAniation, setLoadingAnimation] = React.useState(false);

    const prepareFile = () => {
        //DO PREPARE FILE
        setMessage('Preparing Image...')
        setLoadingAnimation(true)
        setTimeout(() => {
            uploadFile();
        }, 1500)
    }

    const uploadFile = () => {
        // let _uri = cloneDeep(selectedImage.uri);
        // const uri = Platform.OS === "android" ? _uri : _uri.replace("file://", "");
        // let data = new FormData();
        // data.append("file", {
        //     // @ts-ignore
        //     type: selectedImage.type,
        //     uri: uri,
        // });
        // return request.post("/files/image-upload", data)
        setMessage('Uploading Image')
        setTimeout(() => {
            awaitResults();
        }, 1500)
    }
    const awaitResults = () => {
        setMessage('Awaiting Results')
        setTimeout(() => {
            showResults();
        }, 1500)
    }

    const showResults = () => {
        setMessage(null)
        setLoadingAnimation(false)
        setSelectedImage(false)
        setTimeout(() => {
            showOverlay({ componentName: Screens.Results })
        }, 0)
    }


    const { colors, dynamicColor } = useThemeContext()
    return (
        <Container
            flex
        >

            <Container
                flex
                style={{
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <Container
                    style={{
                        marginTop: selectedImage ? widthPercentageToDP(5.7 + 6) : 0,
                        height: widthPercentageToDP(75),
                        width: widthPercentageToDP(75),
                        marginBottom: widthPercentageToDP(5),
                        borderRadius: GLOBAL_THEME.radius.small,
                        borderWidth: 2,
                        borderStyle: 'dashed',
                        borderColor: colors.seperator.primary,
                        justifyContent: "center",
                        alignItems: "center",
                        overflow: "hidden",
                        backgroundColor: loadingAniation ? dynamicColor('white', 'transparent') : 'transparent'
                    }}
                >
                    {!loadingAniation && !!!selectedImage && (<Icon.Ionicons
                        name='image'
                        size={widthPercentageToDP(8)}
                        color={colors.label.primary}
                    />)}
                    {loadingAniation && (<AnimatedLottieView
                        autoPlay
                        style={{
                            height: "100%",
                            width: "100%"
                        }}
                        source={animation}
                    />)}
                    {!loadingAniation && !!selectedImage && (
                        <>
                            <Image
                                style={{
                                    height: "100%",
                                    width: "100%",
                                    borderRadius: GLOBAL_THEME.radius.small,
                                }}
                                source={{ uri: selectedImage?.uri }}
                            />
                        </>
                    )}
                </Container>

                <Label
                    type='primary'
                    size='body'
                    weight='light'
                    style={{
                        // fontStyle: 'italic',
                        marginTop: widthPercentageToDP(2)
                    }}
                >
                    {!!message ? message : selectedImage ? 'Ready To Process' : 'Please Select An Image'}
                </Label>
            </Container>
            <View
                style={{
                    paddingBottom: (bottomSpace > 0 ? bottomSpace : widthPercentageToDP(3)) + widthPercentageToDP(3),
                    paddingHorizontal: GLOBAL_THEME.container
                }}
            >
                {selectedImage && (<Button
                    style={{
                        marginBottom: widthPercentageToDP(3)
                    }}
                    type='secondary'
                    onPress={prepareFile}
                    title={'Detect Tampering'} />)}
                <Button
                    type='primary'
                    onPress={launchGallary}
                    title={!!selectedImage ? 'Change Image' : 'Select Image'} />
            </View>
        </Container>
    )
}



// dark gray back ground hex color #34343c
//light grey text hex color #d2d0d8
