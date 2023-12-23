import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { Country, CustomerPassport, Passport } from 'app/pages/customer/customer.model';
import { getAccount } from 'app/pages/customer/customer.slice';
import { Storage } from 'app/shared/util/storage-util';
const initialState = {
  loading: false,
  customerPassport: {} as CustomerPassport
};
const myProfileSlice = createSlice({
  name: 'MyProfileSlice',
  initialState,
  reducers: {
    updateCustomerPassportLoading: (state) => {
      state.loading = true;
    },
    updateCustomerPassportSuccess: (state, action) => {
      state.loading = false;
      state.customerPassport = action.payload;
    },
    updateCustomerPassportFailure: (state, action) => {
      state.loading = false;
    },
    getCustomerPassportSuccess: (state, action) => {
      state.loading = false;
      state.customerPassport = action.payload;
    },
    getCustomerPassportFailure: (state, action) => {
      state.loading = false;
      state.customerPassport = {} as CustomerPassport;
    }
  },
  extraReducers: undefined
});
export default myProfileSlice.reducer;

// Actions
const {
  updateCustomerPassportLoading,
  updateCustomerPassportSuccess,
  updateCustomerPassportFailure,
  getCustomerPassportSuccess,
  getCustomerPassportFailure
} = myProfileSlice.actions;

export const getCustomerPassport = () => async (dispatch) => {
  const isAuthenticated = !!Storage.local.get('user-info');
  try {
    if (isAuthenticated) {
      const id = Storage?.local?.get('user-info').id;
      const response = await axios.get('/api/customer/customerPassport', { params: { customerId: id } });
      const results = await response.data;
      dispatch(getCustomerPassportSuccess(results));
    }
  } catch (error) {
    dispatch(getCustomerPassportFailure(error.response.data));
  }
};
export const updateCustomerPassport = (passport: CustomerPassport) => async (dispatch) => {
  let results = null;
  try {
    dispatch(updateCustomerPassportLoading());
    const response = await axios.post('/api/customer/updatePassport', passport);
    results = await response.data;
    dispatch(updateCustomerPassportSuccess(results));
    dispatch(getAccount());
  } catch (error) {
    dispatch(updateCustomerPassportFailure(error.response.data));
  }
};
