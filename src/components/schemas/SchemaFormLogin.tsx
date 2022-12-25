import * as yup from "yup";

export const schema = yup
    .object({
        email: yup
            .string()
            .required("This is a required field")
            .matches(/.+@.+\..+/i, "Enter correct email! "),
        password: yup.string().required("This is a required field"),
    })
    .required();