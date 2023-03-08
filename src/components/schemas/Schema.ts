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

export const schemaWorker = yup
  .object({
      timer: yup.number().required("This is a required field"),
      account: yup.number().required("This is a required field"),
      title:yup.string().required("This is a required field"),
      sorting : yup.string().required("This is a required field"),
  })
  .required();







