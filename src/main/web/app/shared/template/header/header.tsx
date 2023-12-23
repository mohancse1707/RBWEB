/*
 * Copyright (c) 2020. ReserveBuddy.
 * All rights reserved.
 * All data of ReserveBuddy are confidential.
 *
 *
 */
import './header.css';
import React, { useState, useEffect } from 'react';
import { Drawer, Button, Menu, Grid, Layout } from 'antd';
import HeaderMenu from 'app/shared/template/header/header-menu';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, NavLink as Link, Redirect } from 'react-router-dom';
import { RootState } from 'app/shared/reducers';
import { showRegister } from 'app/pages/customer/register/customer-register.slice';
import { logout, showLogin } from 'app/pages/customer/customer.slice';

import { CustomerRegister } from 'app/pages/customer/register/customer-register';
import { CustomerLogin } from 'app/pages/customer/login/customer-login';

import { Storage } from 'app/shared/util/storage-util';
import { ForgotPassword } from 'app/pages/customer/forgot-password/forgot-password';
import windowSize from 'react-window-size';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const { useBreakpoint } = Grid;

export interface IHeaderProps {
  windowWidth: any;
  windowHeight: any;
  isAuthenticated: boolean;
  showHeaderMenu: boolean;
}

const { Header, Content, Footer } = Layout;
const AppHeader = (props: IHeaderProps) => {
  const { md } = useBreakpoint();
  const dispatch = useDispatch();
  const history = useHistory();
  const { showLoginModal, logoutSuccess } = useSelector((state: RootState) => state.customerReducer);
  const { showRegisterModal } = useSelector((state: RootState) => state.customerRegisterReducer);
  const { showForgotPasswordModal } = useSelector((state: RootState) => state.forgotPasswordSlice);

  useEffect(() => {
    if (props.windowWidth >= 768) {
      mobileMenuClose();
    } else {
      mobileMenuOpen();
    }
  }, [props.windowWidth, showLoginModal, showRegisterModal, logoutSuccess, showForgotPasswordModal]);

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

  const [visibleDrawer, setVisibleDrawer] = useState(true);

  const showDrawerItems = () => {
    setVisibleDrawer(true);
  };

  const onClose = () => {
    setVisibleDrawer(false);
  };

  const toggleMobileMenuOpen = () => {
    setVisibleDrawer(false);
  };

  const mobileMenuOpen = () => {
    setVisibleDrawer(true);
  };

  const mobileMenuClose = () => {
    setVisibleDrawer(false);
  };

  const renderNavLinks = () => {
    return (
      <>
        {/* <Menu.Item key='alipay'> */}
        {/*  <a href=''>Contact Us</a> */}
        {/* </Menu.Item> */}
        {/* <Menu.Item key='5'> */}
        {/*  <a href=''>Contact Us</a> */}
        {/* </Menu.Item> */}
        {/* <Menu.Item key='6'> */}
        {/*  <a href=''>Contact Us</a> */}
        {/* </Menu.Item> */}
        {/* <Menu.Item key='7'> */}
        {/*  <a href=''>Contact Us</a> */}
        {/* </Menu.Item> */}
        {/* <Menu.Item key='8'> */}
        {/*  <a href=''>Contact Us</a> */}
        {/* </Menu.Item> */}
        {/* <Menu.Item key='81'> */}
        {/*  <a href=''>Contact Us</a> */}
        {/* </Menu.Item> */}

        {/* <SubMenu title={<span>Blogs</span>}> */}
        {/*  <MenuItemGroup title='Item 1'> */}
        {/*    <Menu.Item key='setting:1'>Option 1</Menu.Item> */}
        {/*    <Menu.Item key='setting:2'>Option 2</Menu.Item> */}
        {/*  </MenuItemGroup> */}
        {/*  <MenuItemGroup title='Item 2'> */}
        {/*    <Menu.Item key='setting:3'>Option 3</Menu.Item> */}
        {/*    <Menu.Item key='setting:4'>Option 4</Menu.Item> */}
        {/*  </MenuItemGroup> */}
        {/* </SubMenu> */}
        {props.isAuthenticated ? (
          <SubMenu title='Myaccount'>
            <Menu.Item key='my-profile'>
              <Link to='/my-profile'>My Profile</Link>
            </Menu.Item>
            <Menu.Item key='my-booking'>
              <Link to='/my-booking'>My Bookings</Link>
            </Menu.Item>
            <Menu.Item key='SignOut'>
              <a onClick={loadSignOutModal}>Sign Out</a>
            </Menu.Item>
            {/* <Menu.Item key='Mchange-password'> */}
            {/*  <Link to='/change-password'>Change Password</Link> */}
            {/* </Menu.Item> */}
          </SubMenu>
        ) : (
          <>
            <Menu.Item key='sign-in'>
              <a onClick={loadSignInModal}>Sign-in</a>
            </Menu.Item>
            <Menu.Item key='/'>
              <a onClick={loadSignUpModal}>Sign-up</a>
            </Menu.Item>
          </>
        )}
      </>
    );
  };
  return (
    <>
      <Drawer title='StudentCon' placement='left' onClose={onClose} visible={visibleDrawer}>
        <Menu>{renderNavLinks()}</Menu>
      </Drawer>
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <div className='logo'>
          <a href='/'>
            <img src='static/images/reserve-buddy-logo.jpeg' />
            {/* <img className='logo' src='static/images/rb-logo.jpg' alt='Logo' /> */}
          </a>
        </div>
        <Menu style={{ float: 'right' }} theme='dark' mode='horizontal'>
          {props.windowWidth >= 768 ? renderNavLinks() : <></>}
        </Menu>
        {showRegisterModal && <CustomerRegister />}
        {showLoginModal && <CustomerLogin />}
        {showForgotPasswordModal && <ForgotPassword />}
      </Header>
    </>
  );
};

export default windowSize(AppHeader);

// //{' '}
// <nav className='menuBar'>
//   // <HeaderMenu showHeaderMenu isAuthenticated={props.isAuthenticated} />
//   //{' '}
//   <Button className='barsMenu' type='primary' onClick={showDrawerItems}>
//     // <span className='barsBtn' />
//     //{' '}
//   </Button>
//   //{' '}
//   <Drawer title='Basic Drawer' placement='right' closable={false} onClose={onClose} visible={visibleDrawer}>
//     // <HeaderMenu showHeaderMenu isAuthenticated={props.isAuthenticated} />
//     //{' '}
//   </Drawer>
//   //{' '}
// </nav>
