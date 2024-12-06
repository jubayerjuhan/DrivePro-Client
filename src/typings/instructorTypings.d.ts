export interface Instructor {
  avater: string;
  car: Car;
  available: boolean;
  dateOfBirth: date;
  email: string;
  firstName: string;
  credit: number;
  gender: string;
  languages: string[];
  lastName: string;
  phone: string;
  bio: string;
  reviews: [];
  serviceSuburbs: {
    suburbs: Suburb[];
  };
  hasGst: Boolean;
  createdAt: Date;
  transmissionType: string;
  drivingLicenseExpire: string;
  instructorLicenseExpire?: string;
  instructorLicenseExpire?: string;
  childrenCheckLicenseExpire?: string;
  abnNumber: number;
  invoiceAddress: string;
  bankAccountNumber: number;
  bsbNumber: number;

  _id: string;
  reviews: Review[];
}

export type Suburb = {
  id?: string;
  suburb: string;
  postcode: string;
  state: string;
  price: number;
  _id: string;
  name?: string;
};
type Car = {
  name?: string;
  numberPlate?: string;
  image?: string;
  transmissionType?: string;
};

export type Review = {
  rating: number;
  message: string;
  user: string;
};

export interface Applicant {
  abnNumber: string;
  accountNumber: string;
  address: string;
  avater: string;
  bsbNumber: string;
  car: string;
  childrenCheckLicenseExpire: string;
  createdAt: string;
  dateOfBirth: string;
  drivingLicenseExpire: string;
  email: string;
  firstName: string;
  gender: string;
  instructorLicenseExpire: string;
  languages: [];
  lastName: string;
  message: string;
  phone: string;
  serviceSuburbs: Suburb[];
  signature: string;
  transmissionType: string;
  licensePhotos: string[];
  _id;
}
