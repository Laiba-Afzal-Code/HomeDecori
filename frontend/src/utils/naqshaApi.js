import axios from "axios";

const API = "http://localhost:5000/api/naqsha";

export const generateNaqsha = (data) => {
  return axios.post(`${API}/generate`, data);
};

export const getNaqsha = (id) => {
  return axios.get(`${API}/${id}`);
};