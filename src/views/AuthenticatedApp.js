import { Redirect, Route, Switch } from 'react-router-dom';
import MainTemplate from 'components/templates/MainTemplate/MainTemplate';
import Rides from './Rides/Rides';
import AddRide from './AddRide/AddRide';
import ChangePassword from './ChangePassword/ChangePassword';
import Vehicles from './Vehicles/Vehicles';

const AuthenticatedApp = () => {
  return (
    <MainTemplate>
      <Switch>
        <Route exact path="/">
          <Redirect to="/rides" />
        </Route>
        <Route path="/rides">
          <Rides />
        </Route>
        <Route path="/add">
          <AddRide />
        </Route>
        <Route path="/change-password">
          <ChangePassword />
        </Route>
        <Route path="/vehicles/:type">
          <Vehicles />
        </Route>
      </Switch>
    </MainTemplate>
  );
};

export default AuthenticatedApp;
