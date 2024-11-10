import { Toast } from '@/components/majorComponents/toast';
import axios from 'axios';

const signUpCall = async (
email: string, otp?: string, password?: string, confirmPassword?: string, firstName?: string, lastName?: string, phoneNumber?: string) => {
  try {
    if (!otp) {
      // Step 1: Register user and send OTP
      const response = await axios.post('http://localhost:3000/auth/signup', {
        email,
        firstName,
        lastName,
        phoneNumber,
        password,
        confirmPassword,
      });
      return response.data; // OTP sent
    } else {
      // Step 2: Verify OTP with all details
      const response = await axios.post('http://localhost:3000/auth/signup/verify', {
        email,
        otp,
        password,
        confirmPassword,
        firstName,
        lastName,
        phoneNumber,
      });
      return response.data; // OTP verified
    }
  } catch (error: any) {
    console.error(error.response ? error.response.data : error.message);
    Toast('Failed', 'Something went wrong. Please try again.', 'Undo');
    throw error;
  }
};

export default signUpCall;