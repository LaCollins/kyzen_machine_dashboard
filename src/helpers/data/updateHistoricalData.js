import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const saveHistory = (newItem) => axios.post(`${baseUrl}/historicalData.json`, newItem);

export default saveHistory;
