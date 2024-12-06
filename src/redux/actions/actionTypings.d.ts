export type Action = userSuccess;

export interface userSuccess {
  type: string;
  payload?: any;
}

export interface LearnerRegisterCredentials {
  firstName: string;
  lastName: string;
  email: string;
  phone: number;
  dateOfBirth: string;
  licenseStatus: string;
  password: string;
}

export interface LearnerLoginCredentials {
  password: string;
  email: string;
}
