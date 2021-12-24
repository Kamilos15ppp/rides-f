import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import MainTemplate from 'components/templates/MainTemplate/MainTemplate';
import Rides from './Rides/Rides';
import AddRide from './AddRide/AddRide';
import Buses from './Vehicles/Buses/Buses';
import Trams from './Vehicles/Trams/Trams';
import Others from './Vehicles/Others/Others';
import Ranking from './Ranking/Ranking';
import Statement from './Statement/Statement';
import AddUser from './AddUser/AddUser';
import UsersManagement from './UserManagement/UsersManagement';
import ChangePassword from './ChangePassword/ChangePassword';

const AuthenticatedApp = () => {
  const { pathname } = useLocation();
  return (
    <MainTemplate urlPath={pathname}>
      <Routes>
        <Route path="/*" element={<Navigate to="/rides" />} />
        <Route path="/rides" element={<Rides />} />
        <Route path="/add" element={<AddRide />} />
        <Route path="/vehicles/buses" element={<Buses />} />
        <Route path="/vehicles/trams" element={<Trams />} />
        <Route path="/vehicles/others" element={<Others />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/statement" element={<Statement />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/users-management" element={<UsersManagement />} />
      </Routes>
    </MainTemplate>
  );
};

export default AuthenticatedApp;
