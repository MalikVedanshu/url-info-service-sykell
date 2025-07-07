import axios from 'axios';

const API = axios.create({
  baseURL: 'http://192.168.178.89:5050', // your Gin server
});

export default API;
