import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { Provider, useStaticRendering } from 'mobx-react';
import App from './views/App';
// 注意： 没有 ./ 会到 node_modules 文件夹中去找
import { createStoreMap } from './store/store';

// 让 mobx 在服务端渲染的时候不会重复数据变换，导致内存溢出
useStaticRendering(true);

export default (stores, routerContext, url) => (
  <Provider {...stores}>
    <StaticRouter context={routerContext} location={url}>
      <App />
    </StaticRouter>
  </Provider>
);

export { createStoreMap };
