import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getAllData = () => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/historicalData.json`)
      .then((result) => {
        const allDataObj = result.data;
        const data = [];
        if (allDataObj != null) {
          Object.keys(allDataObj).forEach((entryId) => {
            const newEntry = allDataObj[entryId];
            newEntry.id = entryId;
            data.push(newEntry);
          });
        }
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });

export default getAllData;
