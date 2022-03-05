import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import 'antd/dist/antd.css';
import logo from '@assets/svg/ball.svg';
import { MENU_ITEMS } from '@utils/constants';
import cl from './Header.module.scss';

const { Header } = Layout;

function MyHeader() {
  return (
    <Header className={cl.header}>
      <img src={logo} alt="app-logo" className={cl.logo} />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} disabledOverflow>
        {MENU_ITEMS.map((item) => {
          return (
            <Menu.Item key={item.id}>
              <Link to={item.to}>{item.name}</Link>
            </Menu.Item>
          );
        })}
      </Menu>
    </Header>
  );
}

export default MyHeader;
