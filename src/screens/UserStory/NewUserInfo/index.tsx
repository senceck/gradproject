import React, { useRef, useState } from 'react'
import { View, Text, Alert } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { widthPercentageToDP } from 'react-native-responsive-screen'
import { GLOBAL_THEME } from '../../../lib/constants'
import { useThemeContext } from '../../../lib/hooks/useThemeContext'
import Input from '../../../shared/components/Input'
import InputLabel from '../../../shared/components/InputLabel'
import Label from '../../../shared/components/Label'
import PasswordInput from '../../../shared/components/PasswordInput'
import UserLayout from '../../../shared/components/UserLayout'
import Row from '../../../shared/components/layout/Row'
import CustomToast from '../../../shared/components/CustomToast'
import { userApi } from '../../../lib/api/userApi'
import { registerFormSchema } from '../../../lib/validation/user'
import { useFormik } from 'formik'
import useForm from '../../../lib/hooks/useForm'
import { useUser } from '../../../lib/hooks/useUser'
import { capitalize } from 'lodash'
import { useEffect } from 'react'

interface Props {
    componentId
    code;
    international;
    phone;
    callBack;
}

export default function NewUserInfo(props: Props) {
    const { colors, dynamicColor } = useThemeContext()

    const nameInputRef = useRef(null)
    const emailInputRef = useRef(null)
    const passwordRef = useRef(null)
    const [loading, setLoading] = useState(false);

    const { handleSubmit, handleChange, errors, values } = useForm({
        initial: {
            email: "",
            fullname: "",
            password: ""
        },
        onSubmit: () => {
            onRegister()
        },
        validationSchema: registerFormSchema
    })
    const { signup } = useUser()

    useEffect(() => {
        // setTimeout(() => {
        //     if (nameInputRef.current) {
        //         nameInputRef.current.focus()
        //     }
        // }, 500)

    }, [])
    const onRegister = async () => {
        try {
            setLoading(true)
            let user = await signup({
                name: values.fullname.split(' ').map(c => capitalize(c)).join(' '),
                country_code: props.code,
                phone_number: props.phone,
                password: values.password,
                email: values.email,
                companyId: "joolmao"
            }) as any;
            setTimeout(async () => {
                setLoading(false)
                await Navigation.dismissAllModals()
                setTimeout(() => {
                    props.callBack && props.callBack('Signed up succesfully', 'You are now logged in as ' + user.name.split(' ')[0]);
                }, 500)
            }, 1000)
        } catch (e) {
            console.error(e)
            setTimeout(() => {
                Alert.alert("Error", "We are unable to create your profile at this moment, please try again soon")
                setLoading(false)
            }, 700)
        } finally {

        }
    }

    return (
        <>
            {/* <DisabledOverlay isVisible={loading} /> */}
            <UserLayout
                loading={loading}
                key={props.componentId}
                showButton
                buttonTitle="Register"
                onButtonPress={() => {
                    handleSubmit()
                }}
                title="Tell us about yourself"
                description="Enter your name, email address and select a password for future visits"
                onNavigationPress={() => {
                    Navigation.pop(props.componentId)
                }}
                isBack
            >
                <View>
                    <View
                        style={{
                            paddingHorizontal: GLOBAL_THEME.container,
                            marginTop: GLOBAL_THEME.container * 1.7
                        }}
                    >
                        {/* <InputLabel title="Full Name" error={null} /> */}
                        <Input
                            key="FullNameInput"
                            _ref={nameInputRef}
                            placeholder="Full Name"
                            autoFocus={false}
                            value={values.fullname}
                            onChangeText={(v) => handleChange("fullname", v)}
                            error={errors.fullname}
                        // returnKeyType='next'
                        // onSubmitEditing={() => {
                        //     emailInputRef.current && emailInputRef.current.focus()
                        // }}
                        />
                    </View>

                    <View
                        style={{
                            paddingHorizontal: GLOBAL_THEME.container,
                            marginTop: GLOBAL_THEME.container
                        }}
                    >
                        {/* <InputLabel title="Email Address" error={null} /> */}
                        <Input
                            key="EmailInput"
                            _ref={emailInputRef}
                            keyboardType="email-address"
                            placeholder="Email Address"
                            value={values.email}
                            onChangeText={(v) => handleChange("email", v)}
                            error={!errors.fullname && errors.email}
                        // returnKeyType='next'
                        // onSubmitEditing={() => {
                        //     passwordRef.current && passwordRef.current.focus()
                        // }}
                        />
                    </View>
                    <View style={{
                        paddingHorizontal: GLOBAL_THEME.container
                    }}>
                        <View style={{
                            borderBottomWidth: 0.6,
                            width: "100%",
                            borderBottomColor: colors.seperator.primary,
                            marginTop: GLOBAL_THEME.container * 1,
                        }} />
                    </View>

                    <View
                        style={{
                            paddingHorizontal: GLOBAL_THEME.container,
                            marginTop: GLOBAL_THEME.container,
                        }}
                    >
                        <InputLabel title="Choose Password" error={null} />
                        <PasswordInput
                            key="passwordInput"
                            _ref={passwordRef}
                            keyboardType='visible-password'
                            // placeholder="example@mail.com"
                            value={values.password}
                            onChangeText={(v) => handleChange("password", v)}
                            returnKeyType='done'
                            error={!errors.fullname && !errors.email && errors.password}
                            onSubmitEditing={() => {
                            }}
                        />
                    </View>

                    {/* <View
                style={{
                    paddingHorizontal: container.global,
                    marginTop: container.global * 1.5
                }}
            >
                <InputLabel title="Repeat Password" error={null} />
                <PasswordInput
                    keyboardType='visible-password'
                    // placeholder="example@mail.com"
                    value={values.repeat}
                    name="repeat"
                    onChangeText={handleChange}
                />
            </View> */}

                </View>
            </UserLayout>
        </>
    )
}
