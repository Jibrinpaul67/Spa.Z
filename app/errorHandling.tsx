// errorHandling.ts

import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';

interface ErrorResponse {
  message?: string;
}

export const handleError = (error: unknown): string => {
  console.error("Error:", error);

  let errorMessage = "An unexpected error occurred.";

  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ErrorResponse>;
    if (axiosError.response) {
      // Server responded with an error
      errorMessage = axiosError.response.data.message || "An error occurred";
    } else if (axiosError.request) {
      // No response received from the server
      if (!navigator.onLine) {
        errorMessage = "No internet connection. Please check your network and try again.";
      } else {
        errorMessage = "Unable to communicate with the server. Please try again later.";
      }
    } else {
      // Other Axios-related errors
      errorMessage = axiosError.message || "An error occurred. Please try again.";
    }
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  toast.error(errorMessage);
  return errorMessage;
};