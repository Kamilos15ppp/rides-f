import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import { store } from 'store';
import { GlobalStyle } from 'assets/styles/GlobalStyles';
import { ConfigProvider } from 'antd';
import locale from 'antd/lib/locale/pl_PL';
import 'moment/locale/pl';

const AppProviders = ({ children }) => {
  return (
    <Provider store={store}>
      <Router>
        <ConfigProvider locale={locale}>
          <GlobalStyle />
          {children}
        </ConfigProvider>
      </Router>
    </Provider>
  );
};

export default AppProviders;

AppProviders.propTypes = {
  children: PropTypes.node.isRequired,
};
