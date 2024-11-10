import React, { useState } from "react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import FlickeringGrid from "../../components/ui/flickering-grid";
import { Toast } from "../../components/majorComponents/toast";
import signUpCall from "@/hooks/SignUpCall";

const Signup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // Steps: 1 = Form, 2 = OTP
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [otp, setOtp] = useState("");

  // Handle the user registration (Step 1)
  const handleUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !phoneNumber || !password || !confirmPassword || !firstName || !lastName) {
      Toast("Error", "All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      Toast("Error", "Passwords do not match");
      return;
    }

    try {
      // Call signup API to register the user and send OTP
      const response = await signUpCall(email, undefined, password, confirmPassword, firstName, lastName, phoneNumber);

      if (response) {
        Toast("Success", "OTP sent to your email", "Undo");
        setStep(2); // Move to OTP verification step
      } else {
        Toast("Error", "Failed to send OTP. Try again.", "Undo");
      }
    } catch (err) {
      console.error("Registration failed:", err);
      Toast("Error", "Something went wrong during registration");
    }
  };

  // Handle OTP verification (Step 2)
  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!otp) {
      Toast("Error", "OTP is required");
      return;
    }

    try {
      const response = await signUpCall( email,otp, password, confirmPassword, firstName, lastName, phoneNumber); // Verify OTP
      if (response) {
        Toast("Success", "Account created successfully", "Undo");
        navigate("/login"); // Redirect to login
      } else {
        Toast("Error", "Invalid OTP. Please try again.");
      }
    } catch (err) {
      console.error("OTP verification failed:", err);
      Toast("Error", "Invalid OTP. Please try again.");
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    try {
      const response = await signUpCall(email);
      if (response) {
        Toast("Info", "OTP sent again. Check your inbox.", "Undo");
      } else {
        Toast("Error", "Failed to resend OTP");
      }
    } catch (err) {
      console.error("Resending OTP failed:", err);
      Toast("Error", "Failed to resend OTP");
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen">
      <FlickeringGrid
        className="z-0 absolute inset-0 size-full"
        squareSize={4}
        gridGap={6}
        color="#6B7280"
        maxOpacity={0.5}
        flickerChance={0.1}
      />
      <div className="bg-white dark:bg-blue-800/20 shadow-lg rounded-lg p-6 sm:p-8 max-w-xs sm:max-w-sm w-full transform transition-transform duration-300 z-10">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-gray-200">
          Signup
        </h2>

        {step === 1 && (
          <form onSubmit={handleUserSubmit}>
            {/* Form Fields */}
            <Input
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mb-4"
            />
            <Input
              type="tel"
              id="phoneNumber"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              className="mb-4"
            />
            <Input
              type="text"
              id="firstName"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="mb-4"
            />
            <Input
              type="text"
              id="lastName"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="mb-4"
            />
            <Input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mb-4"
            />
            <Input
              type="password"
              id="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="mb-6"
            />
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-md"
            >
              Register
            </Button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleOtpSubmit}>
            {/* OTP Verification */}
            <Input
              type="text"
              id="otp"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="mb-6"
            />
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white mb-4 rounded-md"
            >
              Verify OTP
            </Button>
            <Button
              type="button"
              onClick={handleResendOtp}
              className="w-full text-blue-600 hover:text-blue-800"
            >
              Resend OTP
            </Button>
          </form>
        )}

        <div className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-500 hover:text-blue-700 underline"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;