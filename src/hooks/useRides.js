import { useCallback } from 'react';
import axios from 'axios';
import { message } from 'antd';

const ridesAPI = axios.create({});

// const url = 'http://przejazdyapi.you2.pl/api';
const url = 'http://localhost:8000/api';

ridesAPI.interceptors.request.use(
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

export const useRides = () => {
  const getRides = useCallback(async () => {
    try {
      const response = await ridesAPI.get(`${url}/rides`);
      return response.data;
    } catch (e) {
      message.error('Nie udało się pobrać danych, spróbuj ponownie za chwilę');
    }
  }, []);

  const postRide = useCallback(
    async ({ tabor, line, direction, first, last }) => {
      try {
        const response = await ridesAPI.post(`${url}/rides`, {
          tabor,
          line,
          direction,
          first,
          last,
        });
        message.success(
          `Dodano: ${tabor} | ${line} | ${direction} | ${first} | ${last}`
        );
        return true;
      } catch (e) {
        message.error(
          'Nie udało się dodać przejazdu, spróbuj ponownie za chwilę'
        );
        return false;
      }
    },
    []
  );

  const updateRide = useCallback(
    async ({ id, tabor, line, direction, first, last }) => {
      try {
        const response = await ridesAPI.put(`${url}/rides/${id}`, {
          tabor,
          line,
          direction,
          first,
          last,
        });
        message.success('Zaktualizowano przejazd');
        return true;
      } catch (e) {
        message.error(
          'Nie udało się zapisać zmian, spróbuj ponownie za chwilę'
        );
        return false;
      }
    },
    []
  );

  const deleteRide = useCallback(async (id) => {
    try {
      await ridesAPI.delete(`${url}/rides/${id}`);
      message.success('Usunięto przejazd');
      return true;
    } catch (e) {
      message.error(
        'Nie udało się usunąć przejazdu, spróbuj ponownie za chwilę'
      );
      return false;
    }
  }, []);

  return {
    getRides,
    postRide,
    updateRide,
    deleteRide,
  };
};
