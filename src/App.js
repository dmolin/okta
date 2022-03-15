import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { LoginCallback, Security, SecureRoute } from '@okta/okta-react';

import './App.css';
import Home from "./Home";
import Profile from "./Profile";

const oktaAuth = new OktaAuth({
  issuer: process.env.REACT_APP_OKTA_ISSUER,
  clientId: process.env.REACT_APP_OKTA_CLIENT_ID,
  redirectUri: window.location.origin + '/login/callback'
});

function App(props) {
  const { history } = props;

  const _restoreOriginalURI = async (_oktaAuth, originalUri) => {
    history.replace(toRelativeUrl(originalUri || '/', window.location.origin));
  };

  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={_restoreOriginalURI}>
      <Route path="/login/callback" component={LoginCallback}/>
      <SecureRoute path="/" exact={true} component={Home}/>
      <SecureRoute path="/profile" component={Profile}/>
    </Security>
  );
}

const AppWithRouter = withRouter(App);
const AppContainer = (props) => (
  <Router>
    <AppWithRouter {...props} />
  </Router>
);

export default AppContainer;
