import axios from 'axios';

const API_KEY = 'a43edc0d0d4245b19fe777f5579ec18b'; // Replace with your actual News API key
const BASE_URL = 'https://newsapi.org/v2';

export const fetchArticles = async (page = 1, keyword = '') => {
  try {
    const params = {
      country: 'us',
      apiKey: API_KEY,
      page: page,
      pageSize: 10,
    };
    if (keyword && keyword.trim()) {
      params.q = keyword.trim();
    }
    const response = await axios.get(`${BASE_URL}/top-headlines`, { params });
    return response.data.articles;
  } catch (error) {
    throw error;
  }
};