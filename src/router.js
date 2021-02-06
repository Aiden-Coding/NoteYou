import React from 'react';
import { Router, Route, Switch } from 'dva/router';
// import IndexPage from './routes/IndexPage';
import BaicLayout from './layouts/basic/basic';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        {/* <Route path="/" exact component={IndexPage} /> */}
        <Route path="/" exact component={BaicLayout} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
