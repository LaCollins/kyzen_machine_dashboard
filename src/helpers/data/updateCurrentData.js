import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const updateCurrentData = (newData) => axios.put(`${baseUrl}/currentData/currentData.json`, newData);

export default updateCurrentData;
