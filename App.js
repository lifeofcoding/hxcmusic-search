import React, { Component } from 'react';
import Home from './components/Home';
import About from './components/About';
import { createDrawerNavigator, createAppContainer } from "react-navigation";
import { ActivityIndicator, Colors, DarkTheme, Provider as PaperProvider } from 'react-native-paper';
import { apiKeys } from './config.json';
import { Permissions, Notifications, Font } from 'expo';
import { StyleSheet, View } from 'react-native';
const PUSH_REGISTRATION_ENDPOINT = 'http://lifeofcoding.online:3535/token';
const MESSAGE_ENPOINT = 'http://lifeofcoding.online:3535/message';

const API_KEY = apiKeys[Math.floor(Math.random() * apiKeys.length)];

const theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: 'black',
    accent: 'cyan',
  },
};

const styles = StyleSheet.create({
  loading: {
    justifyContent: 'center',
    alignSelf: 'center',
    margin: 10,
  },
});

const MyDrawerNavigator = createDrawerNavigator({
    Home: {
        screen: Home,
      },
     About: {
         screen: About
     }
    }, {
    drawerBackgroundColor:'#000',
    drawerType:'slide',
    contentOptions: {
      activeTintColor: Colors.cyan800,
      inactiveTintColor:'#CCC',
      itemsContainerStyle: {
        marginVertical: 0,
      },
      iconContainerStyle: {
        opacity: 1
      }
    }
});

const AppContainer = createAppContainer(MyDrawerNavigator);

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      networkAlert: false,
      notification:'',
      fontsAreLoaded: false,
      notification: null,
      messageTitle:'',
      messageText: ''
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
    //this.sendMessage()
  }


  handleNotification(notification) {
  	console.log('received notification:', notification);
    this.setState({ notification });
  }

  async sendMessage() {
    fetch(MESSAGE_ENPOINT, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: this.state.messageTitle,
        message: this.state.messageText,
      }),
    });
    this.setState({ messageText: '', messageTitle:'' });
  }

  async registerForPushNotificationsAsync() {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS, Permissions.USER_FACING_NOTIFICATIONS);
    if (status !== 'granted') {
      return;
    }
    let token = await Notifications.getExpoPushTokenAsync();
    return fetch(PUSH_REGISTRATION_ENDPOINT, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: {
          value: token,
        },
      }),
    });

    this.notificationSubscription = Notifications.addListener(this.handleNotification);
  }

  componentDidMount() {
    this.registerForPushNotificationsAsync();
  }

  render() {
    const { fontsAreLoaded } = this.state;

    if (!fontsAreLoaded) {
    	return  (
            <PaperProvider theme={theme}>
                 <View style={styles.loading}>
                  <ActivityIndicator animating={!this.state.fontsAreLoaded} size="large" color={Colors.cyan800} />
                </View>
            </PaperProvider>
        );
    } else {
    	return (
            <PaperProvider theme={theme}>
    		  <AppContainer></AppContainer>
            </PaperProvider>
    	)
	}
  }
}