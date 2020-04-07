import React, { Fragment, ReactComponentElement, ReactElement } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { Route } from 'react-router';
import Main from './pages/Main';
import Signup from './pages/Signup';
import Landing from './pages/Landing';
import Notfound from './pages/Notfound';
import Appbar from './components/Appbar';
import { index, main, signup } from './urls';
import { ThemeProvider } from '@material-ui/core';
import { theme } from './styles';

export const withAppbar = (Component) => {
  return ({ ...props }) => (
    <Fragment>
      <Appbar />
      <Component {...props} />
    </Fragment>
  );
};

const MainPage = withAppbar(Main);

const App = () => {
  return (
    <Fragment>
      <Router>
        <Switch>
          <Route exact path={index} component={() => <Landing />} />
          <Route exact path={main} component={() => <MainPage />} />
          <Route exact path={signup} component={() => <Signup />} />
          <Route component={() => <Notfound />} />
        </Switch>
      </Router>
    </Fragment>
  );
};

export default () => (
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);
