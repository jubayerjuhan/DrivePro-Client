import * as yup from "yup";

export const billingInfoSchema = yup
  .object({
    name: yup.string().required("Field Required"),
    address: yup.string().required("Field Required"),
    suburb: yup.string().required("Field Required"),
    postCode: yup.string().required("Field Required"),
    state: yup.string().required("Field Required"),
  })
  .required();

export const pickupInfoSchema = yup
  .object({
    address: yup.string().required("Field Required"),
    suburb: yup.string().required("Field Required"),
    postcode: yup
      .number()
      .required("Field Required")
      .typeError("Post Code Should Be Number"),
    state: yup.string().required("Field Required"),
  })
  .required();
