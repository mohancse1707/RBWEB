/*
 * Copyright (c) 2020. ReserveBuddy.
 * All rights reserved.
 * All data of ReserveBuddy are confidential.
 *
 *
 */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

const homeSlice = createSlice({
  name: 'HomeSearch',
  initialState: {
    loading: false,
    customerRegisterRes: [],
    error: null,
    flightList: []
  },
  reducers: {
    searchFlightsLoading: (state) => {
      state.loading = true;
      state.flightList = [];
      state.error = null;
    },
    searchFlightsSuccess: (state, action) => {
      state.loading = false;
      state.flightList = action.payload;
      state.error = null;
    },
    searchFlightsFailure: (state, action) => {
      state.loading = false;
      state.flightList = [];
      state.error = action.payload;
    }
  },
  extraReducers: undefined
});

export default homeSlice.reducer;

// Actions
const { searchFlightsLoading, searchFlightsSuccess, searchFlightsFailure } = homeSlice.actions;

export const searchFlights = (from, to) => async (dispatch) => {
  try {
    dispatch(searchFlightsLoading());
    const response = await axios.post('/app/reservebuddy/flight/search/', {
      from,
      to
    });
    const results = await response.data;
    dispatch(searchFlightsSuccess(results));
  } catch (error) {
    dispatch(searchFlightsFailure(error.toString()));
    // return console.error(e.message);
  }
};
