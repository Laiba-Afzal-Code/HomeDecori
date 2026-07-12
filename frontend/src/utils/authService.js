import axios from "./axios";

// Login
export const login = (data) =>
  axios.post("/auth/login", data);


// Register
export const register = (data) =>
  axios.post("/auth/register", data);


// Create Admin
export const createAdmin = (data) =>
  axios.post("/auth/create-admin", data);


// Get Profile
export const profile = () =>
  axios.get("/auth/profile");


// Forgot Password - send reset link
export const forgotPassword = (data) =>
  axios.post("/auth/forgot-password", data);


// Reset Password - update password using token
export const resetPassword = (token, data) =>
  axios.post(`/auth/reset-password/${token}`, data);