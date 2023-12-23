/*
 * Copyright (c) 2020. ReserveBuddy.
 * All rights reserved.
 * All data of ReserveBuddy are confidential.
 *
 *
 */
import React, { useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from 'app/pages/customer/customer.slice';
interface ICustomerLogoutProp {}

export const Logout = (props: ICustomerLogoutProp) => {
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    dispatch(logout());
  });

  return (
    <div className='p-5'>
      <h4>Logged out successfully!</h4>
    </div>
  );
};
