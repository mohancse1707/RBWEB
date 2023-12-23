/*
 * Copyright (c) 2020. ReserveBuddy.
 * All rights reserved.
 * All data of ReserveBuddy are confidential.
 *
 *
 */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { ICustomer } from 'app/pages/customer/customer.model';

const initialState = {
  loading: false,
  isActivationCodeSent: false,
  error: null,
  customerRegisterResponse: null,
  activationResponse: null,
  showRegisterModal: false
};

const customerRegisterSlice = createSlice({
  name: 'CustomerRegister',
  initialState,
  reducers: {
    sendActivationCodeLoading: (state) => {
      state.isActivationCodeSent = false;
      state.error = null;
      state.activationResponse = null;
      state.customerRegisterResponse = null;
    },
    sendActivationCodeSuccess: (state, action) => {
      state.isActivationCodeSent = true;
      state.activationResponse = action.payload.response;
      state.customerRegisterResponse = null;
      state.error = null;
    },
    sendActivationCodeFailure: (state, action) => {
      state.isActivationCodeSent = false;
      state.activationResponse = null;
      state.customerRegisterResponse = null;
      state.error = action.payload;
    },
    customerRegisterLoading: (state) => {
      state.loading = true;
      state.error = null;
      state.isActivationCodeSent = false;
      state.customerRegisterResponse = null;
      state.showRegisterModal = true;
    },
    customerRegisterSuccess: (state, action) => {
      state.loading = false;
      state.customerRegisterResponse = action.payload;
      state.isActivationCodeSent = false;
      state.activationResponse = null;
      state.error = null;
    },
    customerRegisterFailure: (state, action) => {
      state.loading = false;
      state.customerRegisterResponse = null;
      state.isActivationCodeSent = false;
      state.error = action.payload;
      state.showRegisterModal = true;
    },
    reset: (state) => {
      state.isActivationCodeSent = false;
      state.activationResponse = null;
      state.customerRegisterResponse = null;
      state.showRegisterModal = false;
      state.error = null;
      state.loading = false;
    },
    hideRegisterModal: (state) => {
      state.showRegisterModal = false;
    }
  },
  extraReducers: undefined
});

export default customerRegisterSlice.reducer;

// Actions
const {
  customerRegisterLoading,
  customerRegisterSuccess,
  customerRegisterFailure,
  sendActivationCodeFailure,
  sendActivationCodeSuccess,
  sendActivationCodeLoading,
  reset,
  hideRegisterModal
} = customerRegisterSlice.actions;

export const sendActivationCode = (emailId) => async (dispatch) => {
  try {
    dispatch(sendActivationCodeLoading());
    const response = await axios.post('/api/customer/sendActivationCode', {
      emailId
    });
    const results = await response.data;
    dispatch(sendActivationCodeSuccess(results));
  } catch (error) {
    dispatch(sendActivationCodeFailure(error.response.data));
  }
};

export const registerCustomer = (customer: ICustomer) => async (dispatch) => {
  let results = null;
  try {
    dispatch(customerRegisterLoading());
    const response = await axios.post('/api/customer/verifyAndRegisterCustomer', customer);
    results = await response.data;
    dispatch(customerRegisterSuccess(results));
  } catch (error) {
    console.error('TEST', error.response.data.message);
    dispatch(customerRegisterFailure(error.response.data));
  }
};

// export const getCustomerAccountDetails = (username, password) => async (dispatch) => {
//   try {
//     dispatch(customerAccountDetailsLoading());
//     const response = await axios.get('/app/rest/myaccount/customer/getCustomerData/', {
//       params: { username: username }
//     });
//     const results = await response.data;
//     dispatch(customerAccountDetailsSuccess(results));
//   } catch (error) {
//     dispatch(customerAccountDetailsFailure(error.toString()));
//     // return console.error(e.message);
//   }
// };

export const resetCustomerRegister = () => (dispatch) => {
  dispatch(reset());
};

export const showRegister = () => async (dispatch) => {
  dispatch(customerRegisterLoading());
};
export const hideRegister = () => async (dispatch) => {
  dispatch(hideRegisterModal());
};
