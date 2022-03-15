import { withOktaAuth } from '@okta/okta-react';
import './App.css';
import logo from './logo.svg';
import { Button, Segment } from "semantic-ui-react";
import { useState } from "react";

const Home = (props) => {
  const { oktaAuth, history } = props;

  const [processing, setProcessing] = useState(false);

  const _logout = async () => {
    setProcessing(true);
    await oktaAuth.signOut();
  };

  const _profile = () => {
    history.push("/profile");
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <Segment basic className="">
          <Button
            disabled={processing}
            primary
            onClick={_profile}
          >Profile</Button>
          <Button
            disabled={processing}
            loading={processing}
            secondary
            onClick={_logout}
          >Logout</Button>
        </Segment>
      </header>
    </div>
  );
};

export default withOktaAuth(Home);
