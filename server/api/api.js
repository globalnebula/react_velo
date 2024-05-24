import axios from 'axios';

export const createUser = async (formData) => {
  try {
    const response = await axios.post('http://localhost:5173/signup', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};
