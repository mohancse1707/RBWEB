import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { ChangePassword } from 'app/pages/customer/customer.model';

const initialState = {
  loading: false,
  changePassword: {} as ChangePassword,
  errorMessage: null,
  successMessage: null
};
const changePasswordSlice = createSlice({
  name: 'ChangePassword',
  initialState,
  reducers: {
    changePasswordLoading: (state) => {
      state.loading = true;
      state.successMessage = null;
    },
    changePasswordSuccess: (state, action) => {
      state.loading = false;
      state.changePassword = action.payload;
      state.successMessage = action.payload.message;
    },
    changePasswordFailure: (state, action) => {
      state.loading = false;
    }
  },
  extraReducers: undefined
});
export default changePasswordSlice.reducer;

// Actions
const { changePasswordLoading, changePasswordSuccess, changePasswordFailure } = changePasswordSlice.actions;

export const updatePassword = (changePassword: ChangePassword) => async (dispatch) => {
  let results = null;
  try {
    dispatch(changePasswordLoading());
    const response = await axios.post('/api/customer/change-password', changePassword);
    results = await response.data;
    dispatch(changePasswordSuccess(results));
  } catch (error) {
    dispatch(changePasswordFailure(error.response.data));
  }
};
