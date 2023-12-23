/*
 * Copyright (c) 2021. ReserveBuddy.
 *  All rights reserved.
 * All data of ReserveBuddy are confidential.
 *
 *
 */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { ICustomer } from 'app/pages/customer/customer.model';
import { IFlightSearchModel } from 'app/pages/flights/search/flight-search-model';
const initialState = {
  loading: false,
  error: null,
  flightSearchResponse: null
};

const flightSearchSlice = createSlice({
  name: 'FlightSearch',
  initialState,
  reducers: {
    flightSearchLoading: (state) => {
      state.error = null;
      state.flightSearchResponse = null;
    },
    flightSearchSuccess: (state, action) => {
      state.flightSearchResponse = action.payload.response;
      state.error = null;
    },
    flightSearchFailure: (state, action) => {
      state.flightSearchResponse = null;
      state.error = action.payload;
    }
  },
  extraReducers: undefined
});
export default flightSearchSlice.reducer;

// Actions
const { flightSearchLoading, flightSearchSuccess, flightSearchFailure } = flightSearchSlice.actions;
export const searchFlight = (flightSearchModel: IFlightSearchModel) => async (dispatch) => {
  let results = null;
  try {
    dispatch(flightSearchLoading());
    const response = await axios.post('/app/rest/flight/v1/search/searchFlight', flightSearchModel);
    results = await response.data;
    dispatch(flightSearchSuccess(results));
  } catch (error) {
    console.error('TEST', error.response.data.message);
    dispatch(flightSearchFailure(error.response.data));
  }
};
