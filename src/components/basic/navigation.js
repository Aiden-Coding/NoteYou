import React from 'react';
// import PropTypes from 'prop-types';
import 'font-awesome/less/font-awesome.less';
import 'react-fontawesome';
import { Menu } from 'antd';
import style from './navigation.module.less';

import {Link } from 'react-router-dom';
class BasicNavigation extends React.Component {
  render() {
    return (
      <>
        <Menu
          defaultSelectedKeys={['1']}
          mode="inline"
          theme="dark"
          height="100vh"
          className={style.antMenuInline}
          inlineIndent="0"
          style={{ textAlign: 'center' }}
        >
          <Menu.Item
            key="1"
            className={style.antMenuItem}
            style={{ padding: '0px' }}
            icon={<i className="fa fa-home fa-2x" style={{ verticalAlign: 'middle' }}></i>}
          >
            <Link to="/home"></Link>
          </Menu.Item>
          <Menu.Item
            key="2"
            className={style.antMenuItem}
            style={{ textAlign: 'center', padding: '0px' }}
            icon={<i className="fa fa-book fa-2x" style={{ verticalAlign: 'middle' }}></i>}
          >
            <Link to="/search"></Link>
          </Menu.Item>
          {/* <Menu.Item key="3" icon={<i className="fa fa-pencil fa-fw"></i>}></Menu.Item> */}
          <Menu.Item
            key="3"
            className={style.antMenuItem}
            style={{ textAlign: 'center', padding: '0px', position: 'absolute', bottom: '40px' }}
            icon={<i className="fa fa-user fa-2x" style={{ verticalAlign: 'middle' }}></i>}
          >
            <Link to="/user"></Link>
          </Menu.Item>
          <Menu.Item
            key="4"
            className={style.antMenuItem}
            style={{ textAlign: 'center', padding: '0px', position: 'absolute', bottom: '0' }}
            icon={<i className="fa fa-cog fa-2x" style={{ verticalAlign: 'middle' }}></i>}
          >
            <Link to="/setting"></Link>
          </Menu.Item>
        </Menu>
      </>
    );
  }
}

export default BasicNavigation;
