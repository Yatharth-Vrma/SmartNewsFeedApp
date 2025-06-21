````markdown
# Smart News Feed App

This is a React Native app that displays a news feed with infinite scroll and offline support.

## Features

- Fetches news articles from [News API](https://newsapi.org/)
- Displays articles in a scrollable list with infinite scrolling
- Pull-to-refresh to update articles
- Caches articles using AsyncStorage for offline viewing
- Shows loading indicators and skeleton placeholders
- Handles API errors and offline mode with a banner message

## Tech Stack

- React Native
- Axios for API calls
- AsyncStorage for offline caching
- FlatList for list rendering
- (Optional) React Navigation and React Native Gesture Handler

## Setup

1. Clone the repository:
   ```
   git clone https://github.com/Yatharth-Vrma/SmartNewsFeedApp.git
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Replace `YOUR_NEWS_API_KEY` in `utils/api.js` with your actual News API key.
4. Run the app:
   ```
   npm start
   ```
````
