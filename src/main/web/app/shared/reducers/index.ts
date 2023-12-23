/*
 * Copyright (c) 2020. ReserveBuddy.
 *  All rights reserved.
 * All data of ReserveBuddy are confidential.
 *
 *
 */

import { combineReducers } from '@reduxjs/toolkit';
import customerRegisterReducer from 'app/pages/customer/register/customer-register.slice';
import customerReducer from 'app/pages/customer/customer.slice';
import homeReducer from 'app/pages/home/home.slice';
import myProfileReducer from 'app/pages/myaccount/myprofile/my-profile.slice';
import commonReducer from './common.slice';
import forgotPasswordSlice from 'app/pages/customer/forgot-password/forgot-password.slice';
import changePasswordSlice from '../../pages/myaccount/change-password/change-password.slice';
import addPassengerSlice from '../../pages/myaccount/myprofile/add-passenger/add-passenger.slice';
const rootReducer = combineReducers({
  customerRegisterReducer: customerRegisterReducer,
  customerReducer: customerReducer,
  homeReducer: homeReducer,
  myProfileReducer: myProfileReducer,
  commonReducer: commonReducer,
  forgotPasswordSlice: forgotPasswordSlice,
  changePasswordSlice: changePasswordSlice,
  addPassengerSlice: addPassengerSlice
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
