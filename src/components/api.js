import axios from 'axios';

const API = axios.create({
  baseURL: 'https://leadcal-nu.vercel.app/',
});

export const signupUser = async (userData) => {
  try {
    const response = await API.post('/signup', userData);
    return response.data;
  } catch (error) {
    return { error: error.response?.data?.message || 'Signup failed' };
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await API.post('/login', userData);
    return response.data;
  } catch (error) {
    return { error: error.response?.data?.message || 'Login failed' };
  }
};

export const addProduct = async (productData) => {
  try {
    const response = await API.post('/addproduct', productData);
    return response.data;
  } catch (error) {
    return { error: error.response?.data?.message || 'Adding product failed' };
  }
};

export const addToCart = async (cartData) => {
  try {
    const response = await API.post('/addtocart', cartData);
    return response.data;
  } catch (error) {
    return { error: error.response?.data?.message || 'Adding to cart failed' };
  }
};

export const makePayment = async (paymentData) => {
  try {
    const response = await API.post('/payment', paymentData);
    return response.data;
  } catch (error) {
    return { error: error.response?.data?.message || 'Payment failed' };
  }
};

export const getCart = async (email) => {
  try {
    const response = await API.get('/getcart', { params: { email } }); // Pass email as query param
    return response.data.products; 
  } catch (error) {
    console.error('Fetching cart failed:', error);
    return [];
  }
};


export default API;
