import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://project-2-task-management-backend.vercel.app/', // Backend URL
});

export default instance;