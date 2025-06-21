import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'cachedArticles';

export const saveArticles = async (articles) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
  } catch (error) {
    console.log('Error saving articles:', error);
  }
};

export const loadArticles = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.log('Error loading articles:', error);
    return [];
  }
};