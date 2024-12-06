import * as yup from "yup";

export const applyInstructorSchema = yup
  .object({
    firstName: yup.string().required("Field Required"),
    lastName: yup.string().required("Field Required"),
    email: yup
      .string()
      .email("Please Enter a Valid Email")
      .required("Email Is Required"),
    phone: yup
      .number()
      .typeError("Please Enter Number. Ex: 0-9")
      .required("Phone Number Required"),
    address: yup.string().required("Address Is Required"),
    dateOfBirth: yup.string().required("Date Of Birth Is Required"),
    car: yup.string().required("Car Is Required"),
    childrenCheckLicenseExpire: yup
      .string()
      .required("Children Check License Expire Date Is Required"),
    drivingLicenseExpire: yup
      .string()
      .required("Driving License Expire Date Is Required"),
    instructorLicenseExpire: yup
      .string()
      .required("Instructor License Expire Date Is Required"),
    gender: yup.string().required("Gender Is Required"),
    languages: yup
      .array()
      .typeError("Please Enter Languages")
      .required("Language Is Required"),
    avater: yup.mixed().required("Photo Is Required"),
    licensePhotos: yup.mixed().required("License Photo Is Required"),
    serviceSuburbs: yup
      .array()
      .typeError("Please Select Service Suburbs")
      .required("Service Suburb Is Required"),
    transmissionType: yup.string().required("Service Suburbs Is Required"),
  })
  .required();

export const instructorAgreementSchema = yup.object({
  signature: yup.mixed().required("Photo Of Your Signature Is Required"),
  abnNumber: yup.string(),
  bsbNumber: yup.string().required("Please Enter Your BSB Number"),
  accountNumber: yup.string().required("Please Enter Your Bank Account Number"),
});
