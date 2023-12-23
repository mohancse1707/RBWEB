/*
 * Copyright (c) 2020. ReserveBuddy.
 *  All rights reserved.
 * All data of ReserveBuddy are confidential.
 *
 *
 */
import React, { useEffect } from 'react';
import { NavLink as Link, Redirect, useHistory } from 'react-router-dom';
import { Grid, Menu } from 'antd';
import { CustomerRegister } from 'app/pages/customer/register/customer-register';
import { CustomerLogin } from 'app/pages/customer/login/customer-login';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'app/shared/reducers';
import { showLogin, logout } from 'app/pages/customer/customer.slice';
import { showRegister } from 'app/pages/customer/register/customer-register.slice';
import { Storage } from 'app/shared/util/storage-util';
import { ForgotPassword } from 'app/pages/customer/forgot-password/forgot-password';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const { useBreakpoint } = Grid;

export interface IHeaderMenuProps {
  isAuthenticated: boolean;
  showHeaderMenu: boolean;
}

export const HeaderMenu = (props: IHeaderMenuProps) => {
  const { md } = useBreakpoint();
  const dispatch = useDispatch();
  const history = useHistory();
  const { showLoginModal, logoutSuccess } = useSelector((state: RootState) => state.customerReducer);
  const { showRegisterModal } = useSelector((state: RootState) => state.customerRegisterReducer);
  const { showForgotPasswordModal } = useSelector((state: RootState) => state.forgotPasswordSlice);

  useEffect(() => {}, [showLoginModal, showRegisterModal, logoutSuccess, showForgotPasswordModal]);

  const loadSignUpModal = () => {
    dispatch(showRegister());
  };

  const loadSignInModal = () => {
    dispatch(showLogin());
  };

  const loadSignOutModal = () => {
    dispatch(logout());
    history.push('/');
  };

  return (
    <div>
      <div className='logo'>
        <a href='/'>
          <img className='logo' src='static/images/rb-dark-logo.jpg' alt='Logo' />
        </a>
      </div>
      <div className='menuCon'>
        <div className='leftMenu' />
        <div className='rightMenu'>
          <Menu mode={md ? 'horizontal' : 'inline'}>
            <Menu.Item key='alipay'>
              <a href=''>Contact Us</a>
            </Menu.Item>

            {props.isAuthenticated ? (
              <SubMenu title='Myaccount'>
                <Menu.Item key='SignOut'>
                  <a onClick={loadSignOutModal}>Sign Out</a>
                </Menu.Item>
                <Menu.Item key='my-profile'>
                  <Link to='/my-profile'>My Profile</Link>
                </Menu.Item>
                <Menu.Item key='Mchange-password'>
                  <Link to='/change-password'>Change Password</Link>
                </Menu.Item>
              </SubMenu>
            ) : (
              <>
                <Menu.Item key='mail'>
                  <a onClick={loadSignInModal}>Sign-in</a>
                </Menu.Item>
                <Menu.Item key='/'>
                  <a onClick={loadSignUpModal}>Sign-up</a>
                </Menu.Item>
              </>
            )}
          </Menu>
        </div>
      </div>
      {showRegisterModal && <CustomerRegister />}
      {showLoginModal && <CustomerLogin />}
      {showForgotPasswordModal && <ForgotPassword />}
    </div>
  );
};

export default HeaderMenu;
