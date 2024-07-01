// src/services/api.js
import axios from 'axios';

const BASE_URL = 'https://dummyjson.com';

export const fetchUsers = async (limit = 10, skip = 0) => {
  const response = await axios.get(`${BASE_URL}/users?limit=${limit}&skip=${skip}`);
  return response.data;
};

export const fetchProducts = async (limit = 10, skip = 0) => {
  const response = await axios.get(`${BASE_URL}/products?limit=${limit}&skip=${skip}`);
  return response.data;
};

export const searchUsers = async (query) => {
  const response = await axios.get(`${BASE_URL}/users/search?q=${query}`);
  return response.data;
};

export const searchProducts = async (query) => {
  const response = await axios.get(`${BASE_URL}/products/search?q=${query}`);
  return response.data;
};

// Add more API functions as needed