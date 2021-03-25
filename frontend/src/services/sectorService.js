import axios from 'axios';

export const getAllSectors = () => axios.get('/sectors/all');
