import React, { Component } from 'react';
import { Font } from 'expo';
import Home from './components/Home';
import { createDrawerNavigator, createAppContainer } from "react-navigation";
import { ActivityIndicator, Colors } from 'react-native-paper';

import { apiKeys } from './config.json';

const API_KEY = apiKeys[Math.floor(Math.random() * apiKeys.length)];

const MyDrawerNavigator = createDrawerNavigator({
  Home: {
    screen: Home,
  }
});

const AppContainer = createAppContainer(MyDrawerNavigator);

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
    return !fontsAreLoaded ? <ActivityIndicator animating={true} color={Colors.red800} /> : <AppContainer/>
  }
}
