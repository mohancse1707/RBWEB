/*
 * Copyright (c) 2020. ReserveBuddy.
 * All rights reserved.
 * All data of ReserveBuddy are confidential.
 *
 *
 */
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { ICustomer } from 'app/pages/customer/customer.model';

const initialState = {
  showForgotPasswordModal: false,
  isForgotPasswordCodeSent: false,
  confirmForgotPasswordResponse: null,
  error: null
};

const forgotPasswordSlice = createSlice({
  name: 'ForgotPasswordSlice',
  initialState,
  reducers: {
    sendForgotPasswordLoading: (state) => {
      state.error = null;
      state.isForgotPasswordCodeSent = false;
    },
    sendForgotPasswordSuccess: (state, action) => {
      state.error = null;
      state.isForgotPasswordCodeSent = true;
    },
    sendForgotPasswordFailure: (state, action) => {
      state.error = action.payload;
      state.showForgotPasswordModal = true;
    },
    confirmForgotPasswordLoading: (state) => {
      state.error = null;
      state.confirmForgotPasswordResponse = null;
      state.showForgotPasswordModal = true;
      state.isForgotPasswordCodeSent = false;
    },
    confirmForgotPasswordSuccess: (state, action) => {
      state.error = null;
      state.confirmForgotPasswordResponse = action.payload;
      state.isForgotPasswordCodeSent = false;
    },
    confirmForgotPasswordFailure: (state, action) => {
      state.error = action.payload;
      state.confirmForgotPasswordResponse = null;
      state.showForgotPasswordModal = true;
      state.isForgotPasswordCodeSent = false;
    },
    reset: (state) => {
      state.error = null;
      state.confirmForgotPasswordResponse = null;
      state.showForgotPasswordModal = false;
      state.isForgotPasswordCodeSent = false;
    },
    hideForgotPasswordModal: (state) => {
      state.showForgotPasswordModal = false;
    }
  },
  extraReducers: undefined
});

export default forgotPasswordSlice.reducer;

// Actions
const {
  confirmForgotPasswordFailure,
  confirmForgotPasswordLoading,
  confirmForgotPasswordSuccess,
  sendForgotPasswordLoading,
  sendForgotPasswordSuccess,
  sendForgotPasswordFailure,
  reset,
  hideForgotPasswordModal
} = forgotPasswordSlice.actions;

export const sendForgotPasswordCode = (emailId) => async (dispatch) => {
  try {
    dispatch(sendForgotPasswordLoading());
    const response = await axios.post('/api/customer/resetPassword', {
      emailId
    });
    const results = await response.data;
    dispatch(sendForgotPasswordSuccess(results));
  } catch (error) {
    dispatch(sendForgotPasswordFailure(error.response.data));
  }
};

export const confirmForgotPassword = (customer: ICustomer) => async (dispatch) => {
  let results = null;
  try {
    dispatch(confirmForgotPasswordLoading());
    const response = await axios.post('/api/customer/completePasswordReset', customer);
    results = await response.data;
    dispatch(confirmForgotPasswordSuccess(results));
  } catch (error) {
    dispatch(confirmForgotPasswordFailure(error.response.data));
  }
};

export const resetForgotPassword = () => (dispatch) => {
  dispatch(reset());
};

export const showForgotPassword = () => async (dispatch) => {
  dispatch(confirmForgotPasswordLoading());
};
export const hideForgotPassword = () => async (dispatch) => {
  dispatch(hideForgotPasswordModal());
};
