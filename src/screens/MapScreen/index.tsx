import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import { View, Text, ScrollView, Alert, AppState, Pressable } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import { Navigation } from 'react-native-navigation'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import { GLOBAL_THEME, LOCATION_CONSTANTS, MAP_TYPES } from '../../lib/constants'
import { push, showFullScreenModal } from '../../lib/helpers/navigation'
import { useDeviceConstants } from '../../lib/hooks/useDeviceConstants'
import { useThemeContext } from '../../lib/hooks/useThemeContext'
import useUserLocation from '../../lib/hooks/useUserLocation'
import { Screens } from '../../navigation/screens'
import Button from '../../shared/components/Button'
import Icon from '../../shared/components/Icon'
import Row from '../../shared/components/layout/Row'
import TopBar from '../../shared/components/Topbar'
import { GoogleMapsDark, GoogleMapsLight } from './customStyles'

interface Props {
    componentId;
    initial;
    locationEdit?;
    callBack?;
}

export default function MapScreen(props: Props) {
    useEffect(() => {
        return () => {
        }
    }, [])
    const { topSpace, bottomSpace } = useDeviceConstants()
    const { colors, dynamicColor } = useThemeContext();
    const [mapType, setMapType] = useState(MAP_TYPES.STANDARD)
    const LATITUDE = !!props.initial ? props.initial.latitude : 37.78825;
    const LONGITUDE = !!props.initial ? props.initial.longitude : -122.4324;
    const LATITUDE_DELTA = 0.0922;
    const LONGITUDE_DELTA = heightPercentageToDP(100) / widthPercentageToDP(100);

    const { getLocation } = useUserLocation();
    const [userLocation, setUserLocation] = useState(null);
    const fetchUserLocation = async () => {
        try {
            console.log(" XXDEBUG INTERNAL LOSTARTC")
            const location = await getLocation();
            // console.warn(" XXDEBUG INTERNAL LOC", location)
            let tempCoords = {
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: LOCATION_CONSTANTS.DELTA_ZOOM,
                longitudeDelta: LOCATION_CONSTANTS.DELTA_ZOOM,
                zoom: 30
            }
            console.warn(" XXDEBUG INTERNAL animateToCoordinate", mapRef.current.animateToCoordinate)
            //{ center: tempCoords, pitch: 2, heading: 20, altitude: 200, zoom: 40 }, 300
            await mapRef.current.animateToRegion(tempCoords)
            // setUserLocation(location);
        } catch (e) {
            console.log("XXDEBUG ERROR", e)
        }
    }


    const regionNoRender = useRef<any>({
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: 0.003,
        longitudeDelta: 0.003,
    })

    const onSearchSelection = (coords) => {
        mapRef.current.animateToRegion(coords)
    }

    // useEffect(() => {
    //     console.log("NO REGNDER REGION", regionNoRender.current)
    // }, [regionNoRender.current])


    // const onAppStateChange = (state) => {
    //     if (state.match(/inactive|background/)) {
    //         onTouchEnd();
    //     } else {
    //     }
    // }
    // useEffect(() => {
    //     AppState.addEventListener('change', onAppStateChange)
    //     return () => {
    //         AppState.removeEventListener('change', onAppStateChange)
    //     }
    // }, [])


    const mapRef = useRef<any>(null)

    const onRegionChangeComplete = (region) => {
        console.log("REGION CHANGE", region)
        regionNoRender.current = region
        setTimeout(() => {
            console.log("REGION CHANGE NORENDER", regionNoRender.current)
        }, 200)
    }
    // top: heightPercentageToDP(49.9),
    // left: widthPercentageToDP(49)
    return (
        <>
            <View style={{
                flex: 1,
                position: "relative",
            }}>
                <MapView
                    // showsTraffic={true}
                    // paddingAdjustmentBehavior='automatic'
                    mapType={mapType}
                    initialRegion={regionNoRender.current}
                    customMapStyle={dynamicColor(GoogleMapsDark, GoogleMapsLight)}
                    ref={mapRef}
                    provider={PROVIDER_GOOGLE}
                    style={{ left: 0, right: 0, top: 0, bottom: 0, position: 'absolute', flex: 1, elevation: 0, zIndex: 0 }}
                    onRegionChangeComplete={onRegionChangeComplete}
            
                    showsMyLocationButton={false}
                    // onMoveShouldSetResponder={null}
                    showsUserLocation={true}
                >



                </MapView>

                    
      

                <Pressable
                    onPress={() => {
                        setMapType(r => r == MAP_TYPES.STANDARD ? MAP_TYPES.SATELLITE : r == MAP_TYPES.SATELLITE ? MAP_TYPES.STANDARD : MAP_TYPES.STANDARD)
                    }}
                    style={[{
                        width: widthPercentageToDP(9),
                        height: widthPercentageToDP(9),
                        bottom: widthPercentageToDP(19),
                        right: widthPercentageToDP(4),
                        borderRadius: GLOBAL_THEME.radius.small,
                        backgroundColor: dynamicColor(colors.gray.gray6, colors.gray.gray6),
                        position: "absolute",
                        zIndex: 2,
                        elevation: 3,
                        justifyContent: "center",
                        alignItems: "center"
                    }]}>
                    <View>
                        <Icon.MaterialIcons
                            name={mapType == MAP_TYPES.STANDARD ? "satellite" : "map"}
                            size={widthPercentageToDP(4.5)}
                            color={dynamicColor(colors.gray.gray1, colors.gray.gray1)}
                        />
                    </View>
                </Pressable>
                <Pressable
                    onPress={fetchUserLocation}
                    style={[{
                        width: widthPercentageToDP(9),
                        height: widthPercentageToDP(9),
                        bottom: widthPercentageToDP(8),
                        right: widthPercentageToDP(4),
                        borderRadius: GLOBAL_THEME.radius.small,
                        backgroundColor: dynamicColor(colors.gray.gray6, colors.gray.gray6),
                        position: "absolute",
                        zIndex: 2,
                        elevation: 3,
                        justifyContent: "center",
                        alignItems: "center"
                    }]}>
                    <View>
                        <Icon.MaterialIcons
                            name="my-location"
                            size={widthPercentageToDP(4.5)}
                            color={dynamicColor(colors.gray.gray1, colors.gray.gray1)}
                        />
                    </View>
                </Pressable>

            </View>
            <Row style={{
                position: "relative",
                backgroundColor: dynamicColor(colors.gray.gray6, "#f5f5f5"),
                paddingBottom: bottomSpace > 0 ? bottomSpace : widthPercentageToDP(4),
                paddingTop: widthPercentageToDP(4),
                bottom: 0,
                elevation: 2,
                left: 0,
                right: 0,
                paddingHorizontal: GLOBAL_THEME.container,
            }}>
                <Button
                    onPress={() => {
                        // push({
                        //     rootId: props.componentId, targetName: Screens.LocationInformation,
                        //     passProps: {
                        //         geometricPick: regionNoRender.current,
                        //         locationEdit: props.locationEdit,
                        //         callBack: props.callBack
                        //     }
                        // })
                    }}
                    radius="small"
                    type="primary"
                    title="Pick"
                    style={{
                        width: "100%",
                        height: widthPercentageToDP(11.5),
                    }}
                />

            </Row>
            <Row
                justifyContent="space-between"
                style={{
                    position: "absolute",
                    top: topSpace > 0 ? topSpace : widthPercentageToDP(3),
                    // flexGrow: 1,
                    width: "100%",
                    paddingHorizontal: GLOBAL_THEME.container
                }}
            >
                <TopBar
                    isInModal
                    isCloseVisible
                    onClosePress={() => {
                        Navigation.dismissModal(props.componentId)
                    }}
                    onSearchPress={() => {
                        showFullScreenModal({
                            componentName: Screens.PlacesSearch,
                            passProps: {
                                onSearchSelection,
                                mapRegion: regionNoRender.current
                            }
                        })
                    }}
                    isSearchVisible
                    showButtonBackgrounds
                    animatedStyles={{ opacity: 0 }}
                />
            </Row>
        </>
    )
}
