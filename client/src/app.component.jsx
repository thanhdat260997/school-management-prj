import React from 'react';
import { Route, Redirect, Switch, Router } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import appReducers from './reducers';
import AuthenticatedRoute from './components/AuthRoute/AuthRoute';
import SignInPage from './components/SignInPage/SignInPage';
import TestPage from './components/TestComponent/TestComponent'
import ClassesPage from './components/ClassesComponent/ClassesComponent'
import history from './utils/history';

export default () => {
  const middlewares = [thunkMiddleware];

  /* istanbul ignore if */
  if (process.env.NODE_ENV === 'development') {
    const loggerMiddleware = createLogger();
    middlewares.push(loggerMiddleware);
  }

  const store = createStore(appReducers, composeWithDevTools(applyMiddleware(...middlewares)));

  return (
    <Provider store={store}>
      <Router history={history} forceRefresh={true}>
        <Switch>
          <Route exact path="/" render={() => (<Redirect to="/users" />)} />
          <Route path="/signin" render={() => {
            if (localStorage.getItem('token'))
              return <Redirect to="/classes" />
            else 
              return <TestPage/>
          }} />
          {/* <AuthenticatedRoute path="/testsi" component={TestPage} /> */}
          <AuthenticatedRoute path="/classes" component={ClassesPage} />
        </Switch>
      </Router>
    </Provider>
  );
};