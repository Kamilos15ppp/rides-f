import { useEffect, useState, Suspense, lazy } from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearUserInfo } from 'store/userSlice';
import { useLogoutUserMutation } from 'store/api/user';

import MainTemplate from 'components/templates/MainTemplate/MainTemplate';
import LoadingIndicator from 'components/molecules/LoadingIndicator/LoadingIndicator';

import { message, Result, Button } from 'antd';

const Rides = lazy(() => import('../Rides/Rides'));
const AddRide = lazy(() => import('../AddRide/AddRide'));
const Search = lazy(() => import('../Search/Search'));
const Buses = lazy(() => import('../Vehicles/Buses/Buses'));
const Trams = lazy(() => import('../Vehicles/Trams/Trams'));
const Others = lazy(() => import('../Vehicles/Others/Others'));
const Ranking = lazy(() => import('../Ranking/Ranking'));
const Statement = lazy(() => import('../Statement/Statement'));
const ChangePassword = lazy(() => import('../ChangePassword/ChangePassword'));
const AddUser = lazy(() => import('../AddUser/AddUser'));
const UsersManagement = lazy(() => import('../UserManagement/UsersManagement'));

const AuthenticatedApp = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [isIdling, setIsIdling] = useState(false);
  const email = useSelector((state) => state.user.email);
  const [logoutUser, isSuccess] = useLogoutUserMutation();
  const events = [
    'load',
    // 'mousemove',
    'mousedown',
    'click',
    'scroll',
    'keypress',
    'touchstart',
    'touchend',
    'touchcancel',
    'touchleave',
    'touchmove',
  ];
  let warnTimeout, logoutTimeout;

  const handleLogout = () => {
    logoutUser({ email });
    if (isSuccess) {
      localStorage.removeItem('przejazdykm_token');
      message.success('Wylogowano poprawnie');
    }
    dispatch(clearUserInfo());
  };

  const resetTimeouts = () => {
    setIsIdling(false);
    clearLogoutTimeout();
    setLogoutTimeout();
  };

  const clearLogoutTimeout = () => {
    if (warnTimeout) clearTimeout(warnTimeout);
    if (logoutTimeout) clearTimeout(logoutTimeout);
  };

  const setLogoutTimeout = () => {
    warnTimeout = setTimeout(() => setIsIdling(true), 20 * 60 * 1000);
    logoutTimeout = setTimeout(logout, 21 * 60 * 1000);
  };

  const logout = () => {
    setIsIdling(false);
    handleLogout();
    clearLogoutTimeout();
    console.log('LOGGED OUT');
    for (let i in events) {
      window.removeEventListener(events[i], resetTimeouts);
    }
  };

  useEffect(() => {
    for (let i in events) {
      window.addEventListener(events[i], resetTimeouts);
    }

    setLogoutTimeout();

    return () => {
      setIsIdling(false);
      clearLogoutTimeout();
      for (let i in events) {
        window.removeEventListener(events[i], resetTimeouts);
      }
    };
  }, []);

  return (
    <MainTemplate urlPath={pathname} handleLogout={handleLogout}>
      <Suspense fallback={<LoadingIndicator />}>
        {isIdling && (
          <Result
            style={{
              position: 'absolute',
              top: '10%',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 100,
              backgroundColor: 'rgba(0,0,0,0.7)',
              borderRadius: '40px',
            }}
            title="Z powodu bezczynności zostaniesz wylogowany w ciągu 1min! Aby zapobiec wylogowaniu wykonaj aktywność."
            extra={
              <Button type="primary" onClick={() => setIsIdling(false)}>
                Odłóż
              </Button>
            }
          />
        )}
        <Routes>
          <Route path="/*" element={<Navigate to="/rides" />} />
          <Route path="/rides" element={<Rides />} />
          <Route path="/add" element={<AddRide />} />
          <Route path="/search" element={<Search />} />
          <Route path="/vehicles/buses" element={<Buses />} />
          <Route path="/vehicles/trams" element={<Trams />} />
          <Route path="/vehicles/others" element={<Others />} />
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
