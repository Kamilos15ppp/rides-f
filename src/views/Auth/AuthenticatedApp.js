import { Suspense, lazy } from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearUserInfo } from 'store/userSlice';
import { useLogoutUserMutation } from 'store/api/user';

import MainTemplate from 'components/templates/MainTemplate/MainTemplate';
import LoadingIndicator from 'components/molecules/LoadingIndicator/LoadingIndicator';

import { message } from 'antd';

const Rides = lazy(() => import('../Rides/Rides'));
const AddRide = lazy(() => import('../AddRide/AddRide'));
const Search = lazy(() => import('../Search/Search'));
const Buses = lazy(() => import('../Vehicles/Buses/Buses'));
const Trams = lazy(() => import('../Vehicles/Trams/Trams'));
const Others = lazy(() => import('../Vehicles/Others/Others'));
const Depots = lazy(() => import('../Vehicles/Depots/Depots'));
const Ranking = lazy(() => import('../Ranking/Ranking'));
const Statement = lazy(() => import('../Statement/Statement'));
const ChangePassword = lazy(() => import('../ChangePassword/ChangePassword'));
const AddUser = lazy(() => import('../AddUser/AddUser'));
const UsersManagement = lazy(() => import('../UserManagement/UsersManagement'));

const AuthenticatedApp = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const email = useSelector((state) => state.user.email);
  const [logoutUser, isSuccess] = useLogoutUserMutation();

  const handleLogout = () => {
    logoutUser({ email });
    if (isSuccess) {
      localStorage.removeItem('przejazdykm_token');
      message.success('Wylogowano poprawnie');
    }
    dispatch(clearUserInfo());
  };

  return (
    <MainTemplate urlPath={pathname} handleLogout={handleLogout}>
      <Suspense fallback={<LoadingIndicator />}>
        <Routes>
          <Route path="/*" element={<Navigate to="/rides" />} />
          <Route path="/rides" element={<Rides />} />
          <Route path="/add" element={<AddRide />} />
          <Route path="/search" element={<Search />} />
          <Route path="/vehicles/buses" element={<Buses />} />
          <Route path="/vehicles/trams" element={<Trams />} />
          <Route path="/vehicles/others" element={<Others />} />
          <Route path="/vehicles/depots" element={<Depots />} />
          <Route path="/ranking" element={<Ranking />} />
          <Route path="/statement" element={<Statement />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/add-user" element={<AddUser />} />
          <Route path="/users-management" element={<UsersManagement />} />
        </Routes>
      </Suspense>
    </MainTemplate>
  );
};

export default AuthenticatedApp;
