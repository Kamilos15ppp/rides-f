import React from 'react';
import { useAuth } from 'hooks/useAuth';
import UnauthenticatedApp from './UnauthenticatedApp';
import AuthenticatedApp from './AuthenticatedApp';
import LoadingIndicator from 'components/molecules/LoadingIndicator/LoadingIndicator';
import 'antd/dist/antd.dark.css';

const Root = () => {
  const auth = useAuth();

  return (
    <>
      {auth.user ? (
        <AuthenticatedApp />
      ) : auth.isLoading ? (
        <UnauthenticatedApp />
      ) : (
        <LoadingIndicator />
      )}
    </>
  );
};

export default Root;
