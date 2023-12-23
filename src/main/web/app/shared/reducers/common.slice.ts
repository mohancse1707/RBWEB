import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { Country } from 'app/pages/customer/customer.model';
import { Storage } from 'app/shared/util/storage-util';
const initialState = {
  loading: false,
  countries: [] as Country[]
};
const commonSlice = createSlice({
  name: 'CommonSlice',
  initialState,
  reducers: {
    getCountriesLoading: (state) => {
      state.loading = true;
      state.countries = [] as Country[];
    },
    getCountriesSuccess: (state, action) => {
      state.loading = false;
      state.countries = action.payload;
    },
    getCountriesFailure: (state, action) => {
      state.loading = false;
      state.countries = [] as Country[];
    }
  },
  extraReducers: undefined
});
export default commonSlice.reducer;

// Actions
const { getCountriesLoading, getCountriesSuccess, getCountriesFailure } = commonSlice.actions;

export const loadCountries = () => async (dispatch) => {
  try {
    dispatch(getCountriesLoading());
    const countries = Storage.local.get('countries');
    if (countries) {
      dispatch(getCountriesSuccess(countries));
    } else {
      const response = await axios.get('/api/common/countries');
      const results = await response.data;
      Storage.local.set('countries', results);
      dispatch(getCountriesSuccess(results));
    }
  } catch (error) {
    dispatch(getCountriesFailure(error.toString()));
    // return console.error(e.message);
  }
};
