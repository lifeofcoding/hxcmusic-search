import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import YTSearch from 'youtube-api-search';
import AppHeader from './AppHeader';
import SearchBar from './SearchBar';
import VideoList from './VideoList';
import Player from './Player';
import { Avatar } from 'react-native-paper';

import { apiUrl } from '../config.json';

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});

export default class Home extends Component {
    static navigationOptions = {
        drawerLabel: 'Home',
        drawerIcon: ({ tintColor }) => (
          <Avatar.Icon size={24} icon="home" color={tintColor} />
        ),
    };

    state = {
        searchTerms: '',
        showSearch: false,
        loading: false,
        videos: []
    }

    componentWillMount() {
        this.searchYT('Music Video');
        this.searchBox = this.searchBox.bind(this);
    }

    onPressSearch = term => {
        this.searchYT(term);
    }

    searchYT = term => {
        this.setState({
            searchTerms: term,
            loading: true
        });

        fetch(`${apiUrl}search/${term}`)
        .then((response) => response.json())
        .then((response) => response.items)
        .then((videos) => {
          this.setState({
            loading: false,
            videos
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }

    searchBox() {
        console.log('this.state.showSearch', this.state.showSearch)
        this.setState({
          showSearch: !this.state.showSearch
        })
    }

    render() {
        const { loading, videos } = this.state
        return (
          <View style={{flex: 1, backgroundColor: '#333'}}>
            <AppHeader headerText='HXCMusic Search' searchBoxOpen={this.state.showSearch} toggleSearch={this.searchBox} />
            <SearchBar loading={loading} onPressSearch={this.onPressSearch} showSearch={this.state.showSearch} />
            <VideoList videos={videos} searchTerms={this.state.searchTerms} />
            <Player />
          </View>
        );
    }
}
