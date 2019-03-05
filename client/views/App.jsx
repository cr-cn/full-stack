import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import Routes from '../config/router';

import AppBar from './layout/app-bar';

export default class App extends Component {
  componentDidMount() {
    // do something here
  }

  render() {
    return [
      // <div key="banner">
      //   <Link to="/">首页</Link>
      //   <br />
      //   <Link to="/detail">详情页</Link>
      // </div>,
      <AppBar key="App-Bar" />,
      <Routes key="routes" />,
    ];
  }
}
