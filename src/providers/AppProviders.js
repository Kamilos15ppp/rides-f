import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { AuthProvider } from 'hooks/useAuth';
import { store } from 'store';
import { GlobalStyle } from 'assets/styles/GlobalStyles';

const AppProviders = ({ children }) => {
  return (
    <Provider store={store}>
      <Router>
        <AuthProvider>
          <GlobalStyle />
          {children}
        </AuthProvider>
      </Router>
    </Provider>
  );
};

export default AppProviders;
