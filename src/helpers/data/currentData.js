import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getCurrentData = () => axios.get(`${baseUrl}/currentData/currentData.json`);

export default getCurrentData;
