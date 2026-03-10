import axios from "./axios";

// const API = "http://localhost:5000/api/auth";

export const login = (data) => axios.post(`/auth/login`, data);
export const register = (data) => axios.post(`/auth/register`, data);
export const createAdmin = (data) => axios.post(`/auth/create-admin`, data);

export const profile = (data) => axios.post(`/auth/create-admin`, data);
