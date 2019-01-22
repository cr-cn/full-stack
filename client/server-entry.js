import React from 'react';
import { StaticRouter } from 'react-router-dom';
import App from './views/App';
// 注意： 没有 ./ 会到 node_modules 文件夹中去找

export default () => (
  <StaticRouter>
    <App />
  </StaticRouter>
);
