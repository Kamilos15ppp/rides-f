import { useCallback } from 'react';
import axios from 'axios';
import { message } from 'antd';

const vehiclesAPI = axios.create({});

// const url = 'http://przejazdyapi.you2.pl/api';
const url = 'http://localhost:8000/api';

vehiclesAPI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('przejazdykm_token');

    if (token) {
      config.headers.authorization = `Bearer ${token}`;
      config.headers.accept = 'application/json';
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const useVehicles = () => {
  const getVehicles = useCallback(async (type) => {
    try {
      const response = await vehiclesAPI.get(`${url}/vehicles/${type}`);
      return response.data;
    } catch (e) {
      message.error('Nie udało się pobrać danych, spróbuj ponownie za chwilę');
    }
  }, []);

  return {
    getVehicles,
  };
};
