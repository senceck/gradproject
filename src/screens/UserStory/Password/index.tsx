import React, { useEffect, useRef, useState } from 'react'
import { View, Text } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { GLOBAL_THEME } from '../../../lib/constants'
import { pop } from '../../../lib/helpers/navigation'
import useBiometrics from '../../../lib/hooks/useBiometrics'
import useRecentUser from '../../../lib/hooks/useRecentUser'
import { useUser } from '../../../lib/hooks/useUser'
import BiometricsButton from '../../../shared/components/BiometricsButton'
import CustomToast from '../../../shared/components/CustomToast'
// import DisabledOverlay from '../../../shared/components/DisabledOverlay'
import Row from '../../../shared/components/layout/Row'
import PasswordInput from '../../../shared/components/PasswordInput'
import { validateUserUsingBiometrics } from '../../Biometrics'
import UserLayout from '../../../shared/components/UserLayout'

interface Props {
    componentId;
    international;
    code;
    phone;
    welcomeBack?
    callBack?;
}


export default function Password(props: Props) {
    const [password, setPassowrd] = useState('')
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setTimeout(() => {
            console.warn("PASSWORD CALLBACK STATUS", props.callBack)
        }, 500)
    }, [])
    const { login } = useUser();
    const onLogin = async (securePassword = null) => {
        setError(null)
        if (!securePassword) {
            if ((!password || password.length == 0)) {
                return setError("Please enter your password")
            }
        }
        try {
            setLoading(true)
            let user = await login({
                phone: props.international,
                password: securePassword ? securePassword : password
            }) as any;
            setTimeout(async () => {
                setLoading(false);
                await Navigation.dismissAllModals();
                setTimeout(() => {
                    props.callBack && props.callBack('Logged in succesfully', 'You are now logged in as ' + user.name.split(' ')[0]);
                }, 500)
            }, 1000)
        } catch (e) {
            setError(e.message)
            setTimeout(() => {
                setLoading(false)
            }, 500)
        }
    }

    const { hasBiometrics, biometricType } = useBiometrics()
    const { hasRecent, recentUser, getKeychainUserPassword } = useRecentUser();
    const isEligibleForSecureEntry = () => {
        console.warn("ELIGABLITY", props.international, recentUser.phone)
        return hasBiometrics && hasRecent && props.international == recentUser.phone
    }
    const updatePasswordDaemon = (securePassword) => {
        setPassowrd(securePassword)
    }
    const onBiometricTrigger = () => {
        setError(null)
        validateUserUsingBiometrics({
            onSuccess: async () => {
                let securePassword = getKeychainUserPassword()
                updatePasswordDaemon(securePassword)
                if (securePassword) {
                    setTimeout(() => {
                        setLoading(true);
                        onLogin(securePassword);
                    }, 400)
                }
            },
            onFailure: () => {
                setError('Failed to verify using biometrics')
            }
        });
    }
    useEffect(() => {
        if (isEligibleForSecureEntry()) {
            setTimeout(() => {
                onBiometricTrigger()
            }, 1000)
        }
    }, [hasRecent, hasBiometrics])

    const inputRef = useRef<any>(null)
    useEffect(() => {

    }, [])
    return (
        <>
            {/* <DisabledOverlay isVisible={loading} /> */}
            <UserLayout
                loading={loading}
                key={props.componentId}
                showButton
                buttonTitle="Login"
                onButtonPress={() => {
                    onLogin()
                }}
                title="Enter your password"
                description="You're one step away from signing in. If you forgot your password you can always reset it"
                onNavigationPress={() => {
                    props.welcomeBack ? Navigation.dismissModal(props.componentId) : pop(props.componentId)
                }}
                isBack={!props.welcomeBack}
            >
                <Row
                    alignItems="flex-start"
                    style={{
                        paddingHorizontal: GLOBAL_THEME.container,
                        marginTop: GLOBAL_THEME.container * 2
                    }}
                >
                    <PasswordInput
                        _ref={inputRef}
                        key="passwordInput"
                        keyboardType='visible-password'
                        containerStyle={{
                            flexGrow: 1,
                            paddingRight: hasBiometrics ? GLOBAL_THEME.container / 2 : 0
                        }}
                        autoFocus={false}
                        placeholder='Password'
                        value={password}
                        onChangeText={setPassowrd}
                        returnKeyType='done'
                        onSubmitEditing={() => {
                        }}
                        error={error}
                    />
                    {isEligibleForSecureEntry() && (<BiometricsButton
                        type={biometricType}
                        onPress={onBiometricTrigger}
                    />)}
                </Row>

            </UserLayout>
        </>
    )
}
