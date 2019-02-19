import React, { Component } from 'react';
import Home from './components/Home';
import About from './components/About';
import { createDrawerNavigator, createAppContainer } from "react-navigation";
import { ActivityIndicator, Colors, DarkTheme, Provider as PaperProvider } from 'react-native-paper';
import { apiUrl, version } from './config.json';
import { Permissions, Notifications, Font } from 'expo';
import { StyleSheet, View } from 'react-native';
import UpdateAlert from './components/UpdateAlert';

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
    width:'100%',
    backgroundColor:'#000',
    flex:1,
    flexDirection:'column',
    justifyContent: 'space-evenly',
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
      messageText: '',
      hasUpdate: false,
      downloadUrl:'none'
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
    fetch(apiUrl + '/message', {
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
    return fetch(apiUrl + 'token', {
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

  getVersion(v) {
      return v.split('.').join('');
  }

  componentDidMount() {
    this.registerForPushNotificationsAsync()
    .then((response)=> response.json())
    .then((versionData)=> {
        if (this.getVersion(versionData.version) > this.getVersion(version)) {
            this.setState({ hasUpdate: true, downloadUrl: versionData.download })
        }
    });
  }

  render() {
    const { fontsAreLoaded, hasUpdate, downloadUrl } = this.state;

    if (!fontsAreLoaded) {
    	return  (
            <PaperProvider theme={theme}>
                 <View style={styles.loading}>
                  <ActivityIndicator animating={!fontsAreLoaded} size="large" color={Colors.cyan800} />
                </View>
            </PaperProvider>
        );
    } else {
    	return (
            <PaperProvider theme={theme}>
              <UpdateAlert  animation="zoomInUp" visible={hasUpdate} downloadUrl={downloadUrl}/>
    		  <AppContainer></AppContainer>
            </PaperProvider>
    	)
	}
  }
}
