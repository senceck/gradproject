
import * as yup from "yup"

export const jordanPhoneSchema = yup.object().shape({
    phone: yup.string().required("Please enter your phone number").matches(/^7[7-9]{1}[0-9]{7}$/, "Please enter a valid jordanian phone number")
});


export const registerFormSchema = yup.object().shape({
    fullname: yup.string().required("Please enter your full name").min(8, "Please enter your full name").max(255),
    email: yup.string().email("Please enter a valid email address").required("Please enter your email address").min(10, "Please enter your email address").max(255),
    password: yup.string().required("Please enter a password").matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, "Password must consist of 8 characters and atleast one number")
})

export const nameSchema = yup.object().shape({
    name: yup.string().required("Please enter your full name").min(8, "Please enter your full name").max(255),
})

export const emailSchema = yup.object().shape({
    email: yup.string().email("Please enter a valid email address").required("Please enter your email address").min(10, "Please enter your email address").max(255),
})

export const passwordSchema = yup.object().shape({
    password: yup.string().required("Please enter a password").min(8, "Password must atleast be 8 characters long").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/, "Choose a stronger password")
})
