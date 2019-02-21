import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';
import { AppContainer } from 'react-hot-loader'; // eslint-disable-line
import { lightBlue, pink } from '@material-ui/core/colors';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import App from './views/App';

import AppState from './store/app-state';

const theme = createMuiTheme({
  palette: {
    // 主要颜色
    primary: pink,
    // 匹配色
    accent: lightBlue,
    type: 'light',
  },
});

const initialState = window.__INITIAL__STATE__ || {}; // eslint-disable-line

const root = document.getElementById('root');
const render = (Component) => {
  // 包一层的能力来自于 React 的 context 这个特性
  ReactDOM.hydrate(
    <AppContainer>
      <Provider appState={new AppState(initialState.appState)}>
        <BrowserRouter>
          {/* 挂载 theme */}
          <MuiThemeProvider theme={theme}>
            <Component />
          </MuiThemeProvider>
        </BrowserRouter>
      </Provider>
    </AppContainer>,
    root,
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./views/App', () => {
    const NextApp = require('./views/App').default; // eslint-disable-line
    render(NextApp);
  });
}
