// API Configuration
// Uses environment variable in production, falls back to localhost in development
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/api/auth/login`,
    REGISTER: `${API_BASE_URL}/api/auth/register`,
  },
  TRANSACTIONS: {
    BASE: `${API_BASE_URL}/api/transactions`,
    GET_INCOMES: `${API_BASE_URL}/api/transactions/get-incomes`,
    GET_EXPENSES: `${API_BASE_URL}/api/transactions/get-expenses`,
    ADD_INCOME: `${API_BASE_URL}/api/transactions/add-income`,
    ADD_EXPENSE: `${API_BASE_URL}/api/transactions/add-expense`,
    UPDATE_INCOME: (id) => `${API_BASE_URL}/api/transactions/update-income/${id}`,
    UPDATE_EXPENSE: (id) => `${API_BASE_URL}/api/transactions/update-expense/${id}`,
    DELETE_INCOME: (id) => `${API_BASE_URL}/api/transactions/delete-income/${id}`,
    DELETE_EXPENSE: (id) => `${API_BASE_URL}/api/transactions/delete-expense/${id}`,
  },
};

export default API_BASE_URL;

