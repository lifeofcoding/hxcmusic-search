import React, { Component } from 'react';
import Home from './components/Home';
import { createDrawerNavigator, createAppContainer } from "react-navigation";
import { ActivityIndicator, Colors } from 'react-native-paper';

import { apiKeys } from './config.json';
import { Permissions, Notifications, Font } from 'expo';
import { StyleSheet } from 'react-native';
const PUSH_REGISTRATION_ENDPOINT = 'http://lifeofcoding.online:3535/token';
const MESSAGE_ENPOINT = 'http://lifeofcoding.online:3535/message';

const API_KEY = apiKeys[Math.floor(Math.random() * apiKeys.length)];

const MyDrawerNavigator = createDrawerNavigator({
    Home: {
        screen: Home,
      }
    }, {
    drawerBackgroundColor:'#000',
    drawerType:'slide',
});

const AppContainer = createAppContainer(MyDrawerNavigator);

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
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

    this.setState({ fontsAreLoaded: true, messageText:'test', messageTitle:'HXCMusic Alert'})
    this.sendMessage()
  }


  handleNotification(notification) {
  	console.log('received notification:', notification);
    this.setState({ notification });
  }

  handleChangeText(text) {
    this.setState({ messageText: text });
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
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
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
        user: {
          username: 'warly',
          name: 'Dan Ward'
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
    	return  <ActivityIndicator animating={true} color={Colors.red800} />;
    } else {
    	return (
    		<AppContainer>
    			<Notify visible={this.state.notification} />
    		</AppContainer>
    	)
	}
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

class Notify extends React.Component {
  state = {
    visible: false,
  };

  render() {
    const { visible } = this.state;
    return (
      <View style={styles.container}>
        <Snackbar
          visible={this.state.visible}
          onDismiss={() => this.setState({ visible: false })}
          action={{
            label: 'Undo',
            onPress: () => {
              // Do something
            },
          }}
        >
          Hey there! I'm a Snackbar.
        </Snackbar>
      </View>
    );
  }
}
