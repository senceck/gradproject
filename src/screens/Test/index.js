import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import React, { useEffect, useRef, useState, } from 'react'
import { Pressable, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

//@ts-ignore
window.navigator.userAgent = 'react-native';
import socket, { io } from 'socket.io-client'
import { STAGING_API } from '../../lib/api';
import { GLOBAL_THEME, STORAGE_KEYS } from '../../lib/constants';
import { useUser } from '../../lib/hooks/useUser';
import { getSessionToken } from '../../lib/services/AsyncStorage';
import Button from '../../shared/components/Button';
import Icon from '../../shared/components/Icon';
import Label from '../../shared/components/Label';
import Row from '../../shared/components/layout/Row';


export default function Test() {

    const link = 'https://mysterious-sierra-35904.herokuapp.com'
    const socket = useRef();
    const [dataStream, setDataStream] = useState("");
    const [connected, setConnected] = useState(false);
    const { token, user } = useUser()
    const inializeConnection = async () => {
        const token = await AsyncStorage.getItem(STORAGE_KEYS.SESSION_TOKEN)
        try {
            let instance = await io(link, {
                // forceNew: true,
                // path:"websocket-order",
                // transports: ['websocket'],
                extraHeaders: {
                    'COMPID': "joolmao",
                },
                auth: {
                    jwt: token,
                    _id: "6114f6ae03abeb00166b0857"
                }
            }).on('connect', e => {
                console.log("XXIO 00000", e)
            }).on('order', (e) => {
                setDataStream(JSON.stringify(e))
                console.log("XXIOmessage", JSON.stringify(e))
            })

            socket.current = instance
            setConnected(true)
            console.log("XXIOCONNECT", instance)
        } catch (e) {
            console.log("XXIOCONNECT", e)
        }
    }
    const closeInstance = () => {
        socket.current.disconnect();
        setConnected(false)
        setDataStream('')
    }
    useEffect(() => {


        return () => {
            // closeInstance();
        }
    }, [])


    return (
        <View style={{
            paddingTop: widthPercentageToDP(11.7)
        }}>
            <Row
                style={{
                    paddingHorizontal: widthPercentageToDP(4)
                }}
                alignItems='flex-start' justifyContent='space-between'>
                <View>
                    <Label style={{

                        fontSize: widthPercentageToDP(9),

                    }}>
                        SOCKET.IO
                    </Label>
                    <Label
                        size="caption1"
                        style={{
                            marginBottom: widthPercentageToDP("4"),
                        }}>
                        {link}
                    </Label>
                </View>
                <Icon.FontAwesome
                    name="server"
                    size={widthPercentageToDP(8)}
                    color={connected ? 'green' : 'red'}
                />
            </Row>
            <View
                style={{
                    paddingHorizontal: GLOBAL_THEME.container,
                }}
            >
                <Pressable
                    style={{
                        padding: widthPercentageToDP("5"),
                        backgroundColor: "green",
                        borderRadius: 10,
                        marginBottom: widthPercentageToDP("4"),
                    }}
                    onPress={() => {
                        inializeConnection();
                    }}
                >
                    <Label style={{
                        fontSize: widthPercentageToDP(9),
                        color: "white"
                    }}>
                        CONNECT
                    </Label>
                </Pressable>

                <Pressable
                    style={{
                        padding: widthPercentageToDP("5"),
                        backgroundColor: "red",
                        borderRadius: 10,
                    }}
                    onPress={() => {
                        closeInstance();
                    }}
                >
                    <Label
                        style={{
                            fontSize: widthPercentageToDP(9),
                            color: "white"
                        }}
                    >
                        DISCONNECT
                    </Label>
                </Pressable>

                <ScrollView style={{
                    height: heightPercentageToDP("50"),
                    width: "100%",
                    marginTop: widthPercentageToDP(4),
                    backgroundColor: "rgb(222,222,222)",
                    padding: widthPercentageToDP(2),
                    fontFamily: "code"
                }}>
                    <Label>
                        Data Stream:
                    </Label>
                    <Label>
                        {dataStream}
                    </Label>
                </ScrollView>
            </View>

        </View>
    )
}