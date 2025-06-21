import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, RefreshControl, Alert } from 'react-native';
import ArticleCard from '../components/ArticleCard';
import SkeletonLoader from '../components/SkeletonLoader';
import SearchBar from '../components/SearchBar';
import { fetchArticles } from '../utils/api';
import { saveArticles, loadArticles } from '../utils/storage';

const HomeScreen = () => {
  const [articles, setArticles] = useState([]);
  const [displayedArticles, setDisplayedArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [offline, setOffline] = useState(false);
  const [liked, setLiked] = useState({});
  const [bookmarked, setBookmarked] = useState({});

  const loadData = async (refresh = false, keyword = '') => {
    if (loading) return;
    setLoading(true);
    try {
      const newPage = refresh ? 1 : page;
      const fetchedArticles = await fetchArticles(newPage, keyword);
      if (refresh) {
        setArticles(fetchedArticles);
        setDisplayedArticles(fetchedArticles);
        setPage(2);
      } else {
        setArticles(prev => [...prev, ...fetchedArticles]);
        setDisplayedArticles(prev => [...prev, ...fetchedArticles]);
        setPage(prev => prev + 1);
      }
      // Cache articles for offline use
      saveArticles(fetchedArticles);
      setOffline(false);
    } catch (error) {
      // On error load cached articles if available
      const cachedArticles = await loadArticles();
      if (cachedArticles && cachedArticles.length > 0) {
        setArticles(cachedArticles);
        setDisplayedArticles(cachedArticles);
        setOffline(true);
      } else {
        Alert.alert("Error", "Failed to fetch articles and no cached data available.");
      }
    } finally {
      setLoading(false);
      setLoadingInitial(false);
      if (refresh) setRefreshing(false);
    }
  };

  useEffect(() => {
    loadData(true);
  }, []);

  useEffect(() => {
    if (search.trim().length > 0) {
      // Optionally, filter locally or fetch from API with keyword
      setDisplayedArticles(
        articles.filter(article =>
          (article.title || '').toLowerCase().includes(search.toLowerCase()) ||
          (article.description || '').toLowerCase().includes(search.toLowerCase())
        )
      );
    } else {
      setDisplayedArticles(articles);
    }
  }, [search, articles]);

  const handleRefresh = () => {
    setRefreshing(true);
    loadData(true, search);
  };

  const handleEndReached = () => {
    if (!loading && !offline && !search.trim()) {
      loadData(false);
    }
  };

  const handleLike = useCallback((article) => {
    setLiked(prev => ({
      ...prev,
      [article.url]: !prev[article.url]
    }));
  }, []);

  const handleBookmark = useCallback((article) => {
    setBookmarked(prev => ({
      ...prev,
      [article.url]: !prev[article.url]
    }));
  }, []);

  const renderItem = ({ item }) => (
    <ArticleCard
      article={item}
      onPress={() => { /* implement navigation to details if needed */ }}
      onLike={() => handleLike(item)}
      onBookmark={() => handleBookmark(item)}
    />
  );

  const renderFooter = () => {
    if (loading && !loadingInitial) {
      return (
        <View style={styles.footer}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Smart News Feed</Text>
      <SearchBar
        value={search}
        onChangeText={setSearch}
        placeholder="Search articles..."
      />
      {offline && (
        <View style={styles.offlineBanner}>
          <Text style={styles.offlineText}>You are offline. Showing cached articles.</Text>
        </View>
      )}
      {loadingInitial ? (
        <SkeletonLoader />
      ) : (
        <FlatList
          data={displayedArticles}
          keyExtractor={(item, index) => item.url || index.toString()}
          renderItem={renderItem}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 0,
  },
  footer: {
    paddingVertical: 20,
  },
  offlineBanner: {
    backgroundColor: '#ffcc00',
    padding: 10,
    alignItems: 'center',
  },
  offlineText: {
    color: '#333',
    fontWeight: 'bold',
  },
});

export default HomeScreen;