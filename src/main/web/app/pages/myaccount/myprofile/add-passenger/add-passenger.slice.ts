import { CustomerPassport, IPassenger } from 'app/pages/customer/customer.model';
import { createSlice } from '@reduxjs/toolkit';
import { Storage } from 'app/shared/util/storage-util';
import axios from 'axios';
import { getAccount } from 'app/pages/customer/customer.slice';

const initialState = {
  loading: false,
  passenger: {} as IPassenger,
  passengerList: [] as any[]
};
const addPassengerSlice = createSlice({
  name: 'AddPassengerSlice',
  initialState,
  reducers: {
    addOrUpdatePassengerLoading: (state) => {
      state.loading = true;
    },
    addOrUpdatePassengerSuccess: (state, action) => {
      state.loading = false;
      state.passenger = null;
    },
    addOrUpdatePassengerFailure: (state, action) => {
      state.loading = false;
    },
    getPassengersSuccess: (state, action) => {
      state.loading = false;
      state.passengerList = action.payload.data;
    },
    getPassengersFailure: (state, action) => {
      state.loading = false;
      state.passengerList = [];
    },
    editPassenger: (state, action) => {
      state.passengerList.find((pass) => pass.id === action.payload.id).isEditable = true;
      state.passenger = action.payload;
    },
    resetPassengerEdit: (state, action) => {
      state.passengerList.find((pass) => pass.id === action.payload.id).isEditable = false;
      state.passenger = null;
    }
  },
  extraReducers: undefined
});
export default addPassengerSlice.reducer;

// Actions
const {
  addOrUpdatePassengerLoading,
  addOrUpdatePassengerSuccess,
  addOrUpdatePassengerFailure,
  getPassengersSuccess,
  getPassengersFailure,
  editPassenger,
  resetPassengerEdit
} = addPassengerSlice.actions;

export const getPassengers = () => async (dispatch) => {
  const isAuthenticated = !!Storage.local.get('user-info');
  try {
    if (isAuthenticated) {
      const id = Storage.local.get('user-info').id;
      const response = await axios.get('/api/customer/passenger-list', { params: { customerId: id } });
      const results = await response.data;
      results.data.forEach((passenger) => {
        passenger.isEditable = false;
      });
      dispatch(getPassengersSuccess(results));
    }
  } catch (error) {
    dispatch(getPassengersFailure(error.response.data));
  }
};
export const addOrUpdatePassenger = (passenger) => async (dispatch) => {
  let results = null;
  try {
    dispatch(addOrUpdatePassengerLoading());
    const response = await axios.post('/api/customer/add-or-update-passenger', passenger);
    results = await response.data;
    dispatch(addOrUpdatePassengerSuccess(results));
    await dispatch(getPassengers());
    // dispatch(getAccount());
  } catch (error) {
    dispatch(addOrUpdatePassengerFailure(error.response.data));
  }
};

export const updateEditableFlag = (item) => async (dispatch) => {
  dispatch(editPassenger(item));
};

export const resetEditableFlag = (item) => async (dispatch) => {
  dispatch(resetPassengerEdit(item));
};
