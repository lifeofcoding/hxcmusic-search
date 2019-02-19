import React, { Component } from 'react';
import { View, StyleSheet, Animated, Linking, Text } from 'react-native';
import { Avatar, Card, Title, Paragraph, Colors, Appbar } from 'react-native-paper';
import { withNavigation } from 'react-navigation';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding:10,
        marginTop:25
    },
    avatar: {
        flex:1,
        flexDirection:'row',
        justifyContent: 'space-evenly',
        margin: 20
    },
    icon: {
        width: 24,
        height: 24,
    },
});

class AboutHeader extends React.Component {
  render() {
        return (
          <Appbar.Header>
            <Appbar.Action icon="menu" onPress={() => { this.props.navigation.toggleDrawer() }} />
            <Appbar.Content
              title="About"
              subtitle="HXCMusic Search App"
            />
          </Appbar.Header>
        );
  }
}

let Header = withNavigation(AboutHeader);

export default class Home extends Component {
    static navigationOptions = {
        drawerLabel: 'About',
        drawerIcon: ({ tintColor }) => (
          <Avatar.Icon size={24} icon="info-outline" color={tintColor} />
        ),
    };

    state = {
        animatedValue:0
    }


    render() {
        const { loading, videos } = this.state
        return (
          <Animated.ScrollView // <-- Use the Animated ScrollView wrapper
              style={{backgroundColor:'#333'}}
              scrollEventThrottle={1} // <-- Use 1 here to make sure no events are ever missed
              onScroll={Animated.event(
                [
                  {
                    nativeEvent: {
                      contentOffset: {y: this.state.animatedValue},
                    },
                  },
                ],
                {useNativeDriver: true}, // <-- Add this
            )}>
            <Header/>
            <View style={styles.container}>
              <Avatar.Image size={180} style={styles.avatar} source={{uri:"http://lifeofcoding.online/img/profile.jpg"}} />
              <Card>
                <Card.Title title="Made for my friends" />
                <Card.Content>
                  <Paragraph>This app was made for fun, and for my friends <Text style={{color: Colors.cyan800}} onPress={() => Linking.openURL('https://www.facebook.com/kenndogg3002')}>Kenny</Text> & <Text style={{color: Colors.cyan800}} onPress={() => Linking.openURL('https://www.facebook.com/antlerhands')}>Chris</Text>, Shout out!</Paragraph>
                </Card.Content>
              </Card>
            </View>
          </Animated.ScrollView>
        );
    }
}
