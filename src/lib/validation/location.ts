import * as yup from "yup"

export const locationSchema = yup.object().shape({
    number: yup.string().required("Please provide information about your building").min(1, "Please provide information about your building").max(255),
})