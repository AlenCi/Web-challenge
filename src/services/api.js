// src/services/api.js
import axios from 'axios';

const BASE_URL = 'https://dummyjson.com';

// USER API
export const fetchUsers = async (limit = 30, skip = 0, select = '') => {
  const response = await axios.get(`${BASE_URL}/users`, { params: { limit, skip, select } });
  return response.data;
};

export const loginUser = async (username, password, expiresInMins = 60) => {
  const response = await axios.post(`${BASE_URL}/auth/login`, { username, password, expiresInMins });
  return response.data;
};

export const getCurrentUser = async (token) => {
  const response = await axios.get(`${BASE_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getSingleUser = async (userId) => {
  const response = await axios.get(`${BASE_URL}/users/${userId}`);
  return response.data;
};

export const searchUsers = async (query) => {
  const response = await axios.get(`${BASE_URL}/users/search?q=${query}`);
  return response.data;
};

export const filterUsers = async (key, value, limit = 30, skip = 0, select = '') => {
  const response = await axios.get(`${BASE_URL}/users/filter`, { 
    params: { key, value, limit, skip, select } 
  });
  return response.data;
};

export const getUserCarts = async (userId) => {
  const response = await axios.get(`${BASE_URL}/users/${userId}/carts`);
  return response.data;
};

export const getUserPosts = async (userId) => {
  const response = await axios.get(`${BASE_URL}/users/${userId}/posts`);
  return response.data;
};

export const getUserTodos = async (userId) => {
  const response = await axios.get(`${BASE_URL}/users/${userId}/todos`);
  return response.data;
};

export const addUser = async (userData) => {
  const response = await axios.post(`${BASE_URL}/users/add`, userData);
  return response.data;
};

export const updateUser = async (userId, userData) => {
  const response = await axios.put(`${BASE_URL}/users/${userId}`, userData);
  return response.data;
};

export const deleteUser = async (userId) => {
  const response = await axios.delete(`${BASE_URL}/users/${userId}`);
  return response.data;
};

// PRODUCTS API
export const fetchProducts = async (limit = 30, skip = 0) => {
  const response = await axios.get(`${BASE_URL}/products`, { params: { limit, skip } });
  return response.data;
};

export const getSingleProduct = async (productId) => {
  const response = await axios.get(`${BASE_URL}/products/${productId}`);
  return response.data;
};

export const searchProducts = async (query) => {
  const response = await axios.get(`${BASE_URL}/products/search?q=${query}`);
  return response.data;
};

export const getProductCategories = async () => {
  const response = await axios.get(`${BASE_URL}/products/categories`);
  console.log(response.data)
  return response.data;
};

export const getProductsByCategory = async (category) => {
  const response = await axios.get(`${BASE_URL}/products/category/${category}`);
  return response.data;
};

export const addProduct = async (productData) => {
  const response = await axios.post(`${BASE_URL}/products/add`, productData);
  return response.data;
};

export const updateProduct = async (productId, productData) => {
  const response = await axios.put(`${BASE_URL}/products/${productId}`, productData);
  return response.data;
};

export const deleteProduct = async (productId) => {
  const response = await axios.delete(`${BASE_URL}/products/${productId}`);
  return response.data;
};

export const fetchChartData = async () => {
  const response = await axios.get(`${BASE_URL}/carts?limit=100`); 
  return response.data;
};