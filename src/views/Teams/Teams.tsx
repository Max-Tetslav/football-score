import React from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import cl from './Teams.module.scss';

const { Content } = Layout;

function Teams() {
  return (
    <Content className={cl.content}>
      <Outlet />
    </Content>
  );
}

export default Teams;
