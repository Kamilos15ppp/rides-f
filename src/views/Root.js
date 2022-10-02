import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UnauthenticatedApp from './UnAuth/UnauthenticatedApp';
import AuthenticatedApp from './Auth/AuthenticatedApp';
import 'antd/dist/antd.dark.min.css';
import { useGetUserMutation } from 'store/api/user';
import { updateUserInfo, updateUserToken } from 'store/userSlice';

const Root = () => {
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.user.isLogged);
  const [getUser] = useGetUserMutation();

  React.useEffect(() => {
    if (isLogged === false) {
      const token = localStorage.getItem('przejazdykm_token');
      if (token) {
        dispatch(updateUserToken({ token }));
        getUser().then((res) => dispatch(updateUserInfo(res.data)));
      }
    }
  }, [isLogged]);

  return <>{isLogged ? <AuthenticatedApp /> : <UnauthenticatedApp />}</>;
};

export default Root;
