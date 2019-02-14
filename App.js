import React, { Component } from 'react';
import { View } from 'react-native';
import YTSearch from 'youtube-api-search';
import AppHeader from './components/AppHeader';
import SearchBar from './components/SearchBar';
import VideoList from './components/VideoList';
import { Font } from 'expo';
import { DarkTheme, Provider as PaperProvider, ActivityIndicator, Colors } from 'react-native-paper';

import { apiKeys } from './config.json';

// const API_KEY = 'AIzaSyAYnNH4aaQ0Kqdzh0VL4sMGvGWfYzs_sDU';
//const API_KEY = 'AIzaSyCXd3M-Cb0KvyBMKTNS23nfaoiez6l51Go';
const API_KEY = apiKeys[Math.floor(Math.random() * apiKeys.length)];

const theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: 'black',
    accent: 'cyan',
  },
};

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      fontsAreLoaded: false
    }
  }
  async componentWillMount() {
    await Font.loadAsync({
      Octicons: require('@expo/vector-icons/fonts/Octicons.ttf'),
      FontAwesome: require('@expo/vector-icons/fonts/FontAwesome.ttf'),
      MaterialIcons: require('@expo/vector-icons/fonts/MaterialIcons.ttf'),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
    });

    this.setState({ fontsAreLoaded: true })
  }
  render() {
    const { fontsAreLoaded } = this.state
    return !fontsAreLoaded ? <ActivityIndicator animating={true} color={Colors.red800} /> : <PaperProvider theme={theme}><NativeApp /></PaperProvider>
  }
}

class NativeApp extends Component {
  state = {
    loading: false,
    videos: []
  }

  componentWillMount() {
    this.searchYT('Music Video');
  }

  onPressSearch = term => {
    this.searchYT(term);
  }

  searchYT = term => {
    this.setState({
      loading: true
    });

    YTSearch({ key: API_KEY, term }, videos => {
      videos.filter((v) => {
        return v.videoCategoryId == 10
      })

      this.setState({
        loading: false,
        videos
      });
    })
  }

  render() {
    const { loading, videos } = this.state
    return (
      <View style={{flex: 1, backgroundColor: '#333'}}>
        <AppHeader headerText='HXCMusic Search' />
        <SearchBar
          loading={loading}
          onPressSearch={this.onPressSearch} />
        <VideoList videos={videos} />
      </View>
    );
  }
}
