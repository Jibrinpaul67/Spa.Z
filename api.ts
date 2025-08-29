// api.ts

import axios from "axios";

export const registerUser = async (formData: any) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/registrations",
      formData
    );
    return response.data; // Optionally return data if needed
  } catch (error) {
    throw error; // Rethrow the error for handling in the component
  }
};


export const createSpace = async (spaceData: any) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/createspace",
      spaceData
    );
    return response.data; // Optionally return data if needed
  } catch (error) {
    throw error; // Rethrow the error for handling in the component
  }
};
