import React, { useRef } from "react";
import Container from '../../shared/components/Container'
import { widthPercentageToDP } from 'react-native-responsive-screen'
import CardBottomSheet from '../../shared/components/CardBottomSheet'
import { Navigation } from 'react-native-navigation'
import { useThemeContext } from '../../lib/hooks/useThemeContext'
import { Pressable } from "react-native";
import Icon from "../../shared/components/Icon";

 interface Props {
    launchCamera;
    launchGallary;
 }

export default function Media(props:Props){

    const {colors, dynamicColor} = useThemeContext();

    const popUpDriver = useRef<any>(null)

    

    React.useEffect(() => {
        popUpDriver.current?.show();
    }, [popUpDriver])
    return (
        <CardBottomSheet
            onDismiss={() => {
                popUpDriver.current?.dismiss();
                Navigation.dismissAllOverlays();
            }}
            dismissOnClickOutside
            transition='Card'
            ref={popUpDriver}
        >
            <Container
                style={{
                    padding: widthPercentageToDP(5),
                    height:widthPercentageToDP(40),
                    width: '100%',
                    justifyContent:"center",
                    alignItems:"center",
                    backgroundColor: dynamicColor( colors.primary.white ,colors.primary.black ),
                    flexDirection: 'row',
                }}
            >
               <Pressable
               style={{
                width:widthPercentageToDP(15),
                height:widthPercentageToDP(15),
                justifyContent:"center",
                alignItems:"center",
                backgroundColor: dynamicColor( colors.primary.black ,colors.primary.white ),
                borderRadius: 30,
                marginHorizontal: widthPercentageToDP(8),
               }}
               onPress={()=>props.launchGallary()}
               
               >
                   <Icon.MaterialIcons 
                    name='perm-media'
                    color={colors.primary.yellow}
                    size={widthPercentageToDP(7)}
                    />
               </Pressable>
               <Pressable
               style={{
                width:widthPercentageToDP(15),
                height:widthPercentageToDP(15),
                justifyContent:"center",
                alignItems:"center",
                backgroundColor: dynamicColor( colors.primary.black ,colors.primary.white ),
                borderRadius: 30,
                marginHorizontal: widthPercentageToDP(8),
               }}
               onPress={()=>props.launchCamera()}
               >
                   <Icon.FontAwesome 
                    name='camera'
                    color={colors.primary.yellow}
                    size={widthPercentageToDP(6)}
                    />
               </Pressable>
               
            </Container>
        </CardBottomSheet>
    )

}



