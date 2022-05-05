import React from 'react'
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { View, Text, Alert, Keyboard, Pressable } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Navigation } from 'react-native-navigation';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { useDeviceConstants } from '../../lib/hooks/useDeviceConstants';
import { useThemeContext } from '../../lib/hooks/useThemeContext';
import { GooglePlacesService } from '../../lib/services/GoogleServices';
import _ from "lodash";
import { GLOBAL_THEME } from '../../lib/constants';
import SearchField from '../../shared/components/SearchField';
import Icon from '../../shared/components/Icon';
import Label from '../../shared/components/Label';

interface Props {
    componentId;
    mapRegion;
    onSearchSelection;
}

export default function PlacesSearch(props: Props) {
    const { colors, dynamicColor } = useThemeContext();
    const { topSpace, bottomSpace } = useDeviceConstants();
    const [query, setQuery] = useState('')
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState([])

    const autocomplete = useRef(_.throttle(async ({ query }) => {
        if (query == '') {
            return
        }
        try {
            let location;
            if (props.mapRegion) {
                location = [props.mapRegion.latitude, props.mapRegion.longitude]
            }
            setLoading(true)
            let results = await GooglePlacesService.autoComplete(query, location)
            setResults(results);
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }, 1000, { trailing: true, leading: false }))

    useEffect(() => {
        autocomplete.current({ query })
    }, [query])

    const onPlaceSelection = async (item) => {
        //"geometry": {"location": {"lat": 32.0128249, "lng": 35.86961220000001},
        try {
            setLoading(true)
            let place = await GooglePlacesService.getPlace(item.place_id)
            Navigation.dismissModal(props.componentId)
            setTimeout(() => {
                props.onSearchSelection({ latitude: place.geometry.location.lat, longitude: place.geometry.location.lng })
            }, 200)
            console.log("PLACE", place)
        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false)
        }
    }



    useEffect(() => { console.log("RESULTS", results[0]) }, results)

    // const searchRef = useRef(null);
    // useEffect(() => {
    //     setTimeout(() => {
    //         console.log("searchRef",searchRef.current)
    //         // searchRef.current.focus()
    //     }, 1000)

    // }, [searchRef.current])
    useEffect(() => {
    }, [])
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: colors.background.systemFill
            }}>
            <View
                style={{
                    paddingTop: widthPercentageToDP(4) + topSpace,
                    width: "100%",
                    paddingHorizontal: GLOBAL_THEME.container,
                }}
            >
                <SearchField
                    autoFocus
                    key="Wooww"
                    intervalAutoFocus
                    value={query}
                    onChangeText={setQuery}
                    onBlur={() => {
                        setTimeout(() => {
                            Navigation.dismissModal(props.componentId)
                        }, 100)
                    }}
                    returnKeyType='done'
                    placeholder="Search for a place"
                />
            </View>
            <View style={{
                flex: 1
            }}>
                {!!!results || results.length == 0 && (
                    <View style={{
                        paddingTop: GLOBAL_THEME.container,
                        paddingHorizontal: GLOBAL_THEME.container,
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <Icon.Entypo
                            style={{
                                marginTop: widthPercentageToDP("3")
                            }}
                            name="address"
                            size={widthPercentageToDP("12")}
                            color={colors.label.secondaryLabel}
                        />
                        <Label type="secondaryLabel" size="caption1" weight="light"
                            style={{
                                textAlign: "center",
                                marginTop: widthPercentageToDP(2)
                            }}
                        >
                            {query == '' ? "Start Searching by typing any place, street or address" : "There are no matches to your query"}
                        </Label>
                    </View>
                )}
                {results.map(result => {
                    return (
                        <Pressable
                            onPress={() => onPlaceSelection(result)}
                            style={{
                                borderBottomWidth: 0.6,
                                borderBottomColor: colors.seperator.primary,
                                paddingRight: GLOBAL_THEME.container,
                                marginLeft: GLOBAL_THEME.container,
                                paddingVertical: GLOBAL_THEME.container,
                            }}>
                            <Label
                                style={{}}
                                weight="regular"
                                type="primary">
                                {result.structured_formatting.main_text}
                            </Label>
                            <Label
                                style={{
                                }}
                                size="caption2"
                                type="secondaryLabel">
                                {result.structured_formatting.secondary_text}
                            </Label>
                        </Pressable>
                    )
                })}
            </View>
        </View>
    )
}
