import axios from "axios";
// const url = "https://mdtamiz.xyz/api";
const url = 'http://localhost:5000/api'
const api = axios.create({
  baseURL: url,
  headers: {
    auth: localStorage.getItem("very_very_secret_token"),
    "content-type": "application/json",
    sender: localStorage.getItem("CUemail")
  },
});

export default api;