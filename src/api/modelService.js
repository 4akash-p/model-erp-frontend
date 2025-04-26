import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:9051/api/v1', // Your backend base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export const createModel = async (formData) => {
  const response = await axios.post('http://localhost:9051/api/v1/models/create', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};


// 🧠 Search Models (based on your curl)
export const searchModels = async ({
  globalSearch = '',
  page = 0,
  pageSize = 10,
  sortValue = '',
  sortOrder = '',
  fieldSearchMap = {},
}) => {
  const body = {
    fieldSearchMap,
    globalSearch,
    page,
    pageSize,
    sortValue,
    sortOrder,
  };

  const response = await API.post('/models/viewAll', body);
  return response.data;
};
