/*
 * Copyright (c) 2020. ReserveBuddy.
 * All rights reserved.
 * All data of ReserveBuddy are confidential.
 *
 *
 */

export interface Country {
  id: string;
  countryCode2: string;
  countryCode3: string;
  countryName: string;
  countryDesc: string;
  nationality: string;
  callingCode: string;
  flag: string;
  isActive: boolean;
}

export interface Phone {
  id: string;
  country: Country;
  phoneNumber: string;
}

export interface Passport {
  id: string;
  issuingCountry: Country;
  passportNumber: string;
  issueDate: Date;
  expiryDate: Date;
}

export interface ICustomer {
  password: string;
  confirmPassword: string;
  id: string;
  emailId: string;
  firstName: string;
  lastName: string;
  fullName: string;
  gender: string;
  title: string;
  mobileNumber: string;
  callingCode: string;
  countryCode: string;
  invalidAttempts: number;
  isActive: boolean;
  isPasswordChanged: boolean;
  isAccountLocked: boolean;
  isPasswordResetRequested: boolean;
  passwordResetKey: string;
  passwordResetDate: Date;
  accountLockedDate: Date;
  lastLogin: Date;
  birthDate: Date;
  avatarURL: string;
  role: string;
  roles: string[];
  newPassword: string;
  verificationCode: string;
  customerName: string;
  status: string;
  verificationType: string;
  verificationFor: string;
  isVerified: boolean;
  expiredDateTime: Date;
  issuedDateTime: Date;
  confirmedDateTime: Date;
}

export interface CustomerPassport {
  id: string;
  isActive: boolean;
  passportNumber: string;
  issueDate: Date;
  expiryDate: Date;
  issuingCountry: string;
  customerId: string;
}

export interface CustomerPhone {
  id: string;
  isActive: boolean;
  phone: Phone;
  customerId: number;
}

export const defaultCountry: Country = {
  id: '',
  countryCode2: '',
  countryCode3: '',
  countryName: '',
  countryDesc: '',
  nationality: '',
  callingCode: '',
  flag: '',
  isActive: false
};

export const defaultPhone: Phone = {
  id: '',
  country: defaultCountry,
  phoneNumber: ''
};

export const defaultPassport: Passport = {
  id: null,
  issuingCountry: defaultCountry,
  passportNumber: '',
  issueDate: null,
  expiryDate: null
};

export const defaultCustomerPassport: CustomerPassport = {
  id: null,
  customerId: null,
  isActive: false,
  expiryDate: null,
  issueDate: null,
  passportNumber: '',
  issuingCountry: ''
};

export const defaultCustomerPhone: CustomerPhone = {
  id: null,
  isActive: false,
  customerId: null,
  phone: defaultPhone
};

export interface ChangePassword {
  id: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface IPassenger {
  id: string;
  firstName: string;
  lastName: string;
  gender: string;
  fullName: string;
  emailId: string;
  mobileNumber: string;
  callingCode: string;
  isActive: boolean;
  birthDay: Date;
  customerId: string;
  travelDocuments: ITravelDocument[];
}

export interface ITravelDocument {
  id: string;
  isActive: boolean;
  passportNumber: string;
  issueDate?: Date | undefined;
  expiryDate?: Date | undefined;
  issuingCountry: string;
  passengerId: string;
  travelDocumentType: string;
}
