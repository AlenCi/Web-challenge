// src/services/api.js
import axios from 'axios';

const BASE_URL = 'https://dummyjson.com';

export const fetchUsers = async (limit = 10, skip = 0) => {
  const response = await axios.get(`${BASE_URL}/users?limit=${limit}&skip=${skip}`);
  return response.data;
};

export const fetchAllProducts = async () => {
    // Fetch the total count of products first
    const countResponse = await axios.get(`${BASE_URL}/products`);
    const totalProducts = countResponse.data.total;
  
    // Then fetch all products
    const response = await axios.get(`${BASE_URL}/products?limit=${totalProducts}`);
    return response.data;
  };

export const fetchProducts = async (limit = 20, skip = 0) => {
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
// src/services/api.js
export const fetchChartData = async () => {
    const response = await axios.get(`${BASE_URL}/carts?limit=100`); // Fetch more carts for better data
    return response.data;
  };

  
