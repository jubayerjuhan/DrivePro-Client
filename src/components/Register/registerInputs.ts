export const licenseStatusOptions = [
  "I Don't Have A Learner Liscense",
  "I Have a Learner Card",
  "Yes, I Have License",
];

export const genders = ["Male", "Female"];
export const transmission = ["Auto", "Manual"];

export const registerFields = [
  {
    name: "firstName",
    label: "First Name",
    placeholder: "First Name",
    type: "text",
  },
  {
    name: "lastName",
    label: "Last Name",
    placeholder: "Last Name",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter Email",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter Password",
    type: "password",
  },
  {
    name: "phone",
    label: "Phone",
    placeholder: "Phone Number",
    type: "tel",
  },
  {
    name: "licenseStatus",
    label: "Liscense Status",
    placeholder: "Licence Status",
    type: "select",
    options: licenseStatusOptions,
  },
  {
    name: "dateOfBirth",
    label: "Date Of Birth",
    placeholder: "Date Of Birth",
    type: "date",
  },
];
export const instructorInput = [
  {
    name: "firstName",
    label: "First Name",
    placeholder: "First Name",
    type: "text",
  },
  {
    name: "lastName",
    label: "Last Name",
    placeholder: "Last Name",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter Email",
    type: "email",
  },
  {
    name: "phone",
    label: "Phone",
    placeholder: "Phone Number",
    type: "tel",
  },
  {
    name: "gender",
    label: "Gender",
    placeholder: "Gender",
    type: "select",
    options: genders,
  },
  {
    name: "credit",
    label: "Withdraw Available Credit",
    placeholder: "Withdraw Available Credit",
    type: "text",
  },
  {
    name: "transmissionType",
    label: "Transmission Type",
    placeholder: "Transmission Type",
    type: "select",
    options: transmission,
  },
  {
    name: "drivingLicenseExpire",
    label: "Driving License Expire",
    placeholder: "Driving License Expire",
    type: "date",
  },
  {
    name: "instructorLicenseExpire",
    label: "Instructor License Expire",
    placeholder: "Instructor License Expire",
    type: "date",
  },
  {
    name: "childrenCheckLicenseExpire",
    label: "Children Check License Expire",
    placeholder: "Children Check License Expire",
    type: "date",
  },
  {
    name: "carNumber",
    label: "Car Number Plate",
    placeholder: "Car Number Plate",
    type: "text",
  },
  {
    name: "suburbs",
    label: "Suburbs",
    placeholder: "Suburbs",
    type: "autocomplete",
  },
  {
    name: "hasGst",
    label: "Does Instructor Has GST?",
    placeholder: "Does Instructor Has GST?",
    type: "radio",
  },
  {
    name: "bankAccountNumber",
    label: "Bank Account Number",
    placeholder: "Bank Account Number",
    type: "number",
  },
  {
    name: "bsbNumber",
    label: "BSB Number",
    placeholder: "BSB Number",
    type: "number",
  },
  {
    name: "abnNumber",
    label: "ABN Number",
    placeholder: "ABN Number",
    type: "number",
  },
  {
    name: "invoiceAddress",
    label: "Invoice Address",
    placeholder: "Invoice Address",
    type: "string",
  },
];

export const bookingsField = [
  {
    name: "status",
    label: "Booking Status",
    placeholder: "Booking Status",
    type: "select",
    options: ["Pending", "Approved", "Ended"],
  },
];
