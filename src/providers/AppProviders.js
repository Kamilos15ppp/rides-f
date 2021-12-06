import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { AuthProvider } from 'hooks/useAuth';
import { GlobalStyle } from 'assets/styles/GlobalStyles';

const AppProviders = ({ children }) => {
  return (
    <Router>
      <AuthProvider>
        <GlobalStyle />
        {children}
      </AuthProvider>
    </Router>
  );
};

export default AppProviders;
