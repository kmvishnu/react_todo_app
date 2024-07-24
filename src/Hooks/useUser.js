import axios from 'axios';
import config from '../config';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const userName = useSelector((state) => state.user.name);
  const userEmail = useSelector((state) => state.user.email);
  const userPassword = useSelector((state) => state.user.password);


  const sendOtp = async (email) => {
    setLoading(true);
    setError(null);
    const payload = { email };
    try {
      const response = await axios.post(`${config.apiBaseUrl}/v2/sendOtp`, payload);
      setLoading(false);
      return response.data;
    } catch (error) {
      setLoading(false);
      setError('Failed to send OTP. Please try again.');
      console.error('Send OTP request failed:', error);
      return { status: 'error' };
    }
  };

  const verifyOtp = async (otp) => {
    setLoading(true);
    setError(null);
    const payload ={
      "name":userName,
      "email":userEmail,
      "password":userPassword,
      "otp":otp
  }
    try {
      const response = await axios.post(`${config.apiBaseUrl}/v2/verifyOtp`, payload);
      setLoading(false);
      return response.data;
    } catch (error) {
      setLoading(false);
      setError('Failed to verify OTP. Please try again.');
      console.error('Verify OTP request failed:', error);
      return { status: 'error' };
    }
  };

  return {
    loading,
    error,
    sendOtp,
    verifyOtp,
  };
};
