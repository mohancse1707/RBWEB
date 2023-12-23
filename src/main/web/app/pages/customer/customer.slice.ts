/*
 * Copyright (c) 2020. ReserveBuddy.
 * All rights reserved.
 * All data of ReserveBuddy are confidential.
 *
 *
 */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { CustomerPassport, defaultCustomerPassport, ICustomer, Passport } from 'app/pages/customer/customer.model';
import { Storage } from 'app/shared/util/storage-util';

const AUTH_TOKEN_KEY = 'rb-auth';
const customer = Storage.local.get('user-info');

const initialState = {
  error: null,
  isAuthenticated: !!Storage.local.get('user-info'),
  logoutSuccess: false,
  showLoginModal: false,
  loginResponse: null,
  account: {} as ICustomer,
  customerPassport: {} as CustomerPassport
};

const customerSlice = createSlice({
  name: 'CustomerLogin',
  initialState,
  reducers: {
    hideLoginModal: (state) => {
      state.error = null;
      state.loginResponse = null;
      state.showLoginModal = false;
    },
    loginLoading: (state) => {
      state.error = null;
      state.loginResponse = null;
      state.showLoginModal = true;
      state.logoutSuccess = false;
    },
    loginSuccess: (state, action) => {
      state.error = null;
      state.loginResponse = action.payload;
      state.showLoginModal = false;
      state.logoutSuccess = false;
    },
    loginFailure: (state, action) => {
      state.error = action.payload;
      state.loginResponse = null;
      state.showLoginModal = true;
    },
    accountLoading: (state) => {
      state.error = null;
      state.logoutSuccess = false;
      state.account = customer;
      // state.customerPassport = customer && customer.customerPassport.length > 0 ? customer.customerPassport[0] : defaultCustomerPassport;
      state.isAuthenticated = false;
    },
    accountSuccess: (state, action) => {
      state.error = null;
      state.account = action.payload;
      // state.customerPassport = action.payload.customerPassport.length > 0 ? action.payload.customerPassport[0] : defaultCustomerPassport;
      state.loginResponse = null;
      state.isAuthenticated = true;
      state.logoutSuccess = false;
    },
    accountFailure: (state, action) => {
      state.error = action.payload;
      state.account = null;
      state.logoutSuccess = false;
      state.isAuthenticated = false;
    },
    logoutLoading: (state) => {
      state.logoutSuccess = false;
    },
    logoutSuccess: (state) => {
      state.error = null;
      state.logoutSuccess = true;
      state.isAuthenticated = false;
    },
    updateCustomerProfileLoading: (state) => {},
    updateCustomerProfileSuccess: (state, action) => {
      state.account = action.payload;
    },
    updateCustomerProfileFailure: (state, action) => {},
    reset: (state) => {
      state.error = null;
      state.account = null;
      state.logoutSuccess = false;
    }
  },
  extraReducers: undefined
});

export default customerSlice.reducer;

// Actions
const {
  loginLoading,
  loginSuccess,
  loginFailure,
  accountLoading,
  accountSuccess,
  accountFailure,
  updateCustomerProfileLoading,
  updateCustomerProfileSuccess,
  updateCustomerProfileFailure,
  logoutSuccess,
  hideLoginModal,
  reset
} = customerSlice.actions;

export const login = (username, password, rememberMe) => async (dispatch) => {
  try {
    dispatch(loginLoading());
    const response = await axios.post('/api/login/authenticate', {
      username,
      password,
      rememberMe
    });
    const results = await response.data;
    const bearerToken = response.headers.authorization;
    if (bearerToken && bearerToken.slice(0, 7) === 'Bearer ') {
      const jwt = bearerToken.slice(7, bearerToken.length);
      if (rememberMe) {
        Storage.local.set(AUTH_TOKEN_KEY, jwt);
      } else {
        Storage.session.set(AUTH_TOKEN_KEY, jwt);
      }
    }
    dispatch(loginSuccess(results));
    await dispatch(getAccount());
  } catch (error) {
    dispatch(loginFailure(error.response.data));
  }
};

export const getAccount = () => async (dispatch) => {
  try {
    dispatch(accountLoading());
    const response = await axios.get('/api/customer/account');
    const results = await response.data;
    Storage.local.set('user-info', results);
    dispatch(accountSuccess(results));
  } catch (error) {
    dispatch(accountFailure(error.response.data));
  }
};

export const updateCustomerProfile = (customer: ICustomer) => async (dispatch) => {
  let results = null;
  try {
    dispatch(updateCustomerProfileLoading());
    const response = await axios.post('/api/customer/updateProfile', customer);
    results = await response.data;
    Storage.local.set('user-info', results);
    dispatch(updateCustomerProfileSuccess(results));
  } catch (error) {
    console.error('TEST', error.response.data.message);
    dispatch(updateCustomerProfileFailure(error.response.data));
  }
};

export const clearAuthToken = () => (dispatch) => {
  if (Storage.local.get(AUTH_TOKEN_KEY)) {
    Storage.local.remove(AUTH_TOKEN_KEY);
  }
  if (Storage.local.get('user-info')) {
    Storage.local.remove('user-info');
  }
  if (Storage.session.get(AUTH_TOKEN_KEY)) {
    Storage.session.remove(AUTH_TOKEN_KEY);
  }
};

export const logout = () => async (dispatch) => {
  dispatch(clearAuthToken());
  dispatch(logoutSuccess());
};

export const showLogin = () => async (dispatch) => {
  dispatch(loginLoading());
};
export const hideLogin = () => async (dispatch) => {
  dispatch(hideLoginModal());
};

export const clearAuthentication = (messageKey) => (dispatch, getState) => {
  clearAuthToken();
};

export const resetCustomerRegister = () => (dispatch) => {
  dispatch(reset());
};
