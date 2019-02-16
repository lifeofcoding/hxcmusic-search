import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Snackbar, Button, Avatar, Appbar, ProgressBar, Colors } from 'react-native-paper';
import PlayerStore from '../stores/Player';
import Actions from '../actions/Player';
import { Audio } from 'expo';
import * as Animatable from 'react-native-animatable';
import { apiUrl } from '../config.json';
//import MusicControl from 'react-native-music-control';

export default class Player extends React.Component {
    state = {
        currentlyPlaying: {
            currentTime: ''
        },
        isPlaying: false,
        visible: false,
        song: {
            url: '',
            title: '',
            duration: ''
        }
    };
    constructor(props) {
        super(props);


        PlayerStore.on('PLAY_SONG', () => {
            console.log('store event: PLAY_SONG');

            let {url, title} = PlayerStore.getPlaying();

            this.getMetaData(url);
        })

        PlayerStore.on('STOP_PLAYING', () => {
            console.log('store event: PLAY_SONG');

            this.sound.stopAsync();

            this.setState({
                isPlaying: false,
                visible: false,
                song: {
                  url:'',
                  title:'',
                  duration: ''
                }
            })
        })

        this.handleViewRef = ref => this.view = ref;
        this.bounce = () => this.view.slideInUp(1500).then(endState => console.log(endState.finished ? 'bounce finished' : 'bounce cancelled'));
    }

    getMetaData(url) {
        let videoId = url.split('/')[4];

        fetch(`${apiUrl}get/${videoId}`)
        .then((response) => response.json())
        .then((response) => response.items)
        .then((videos) => {
          let track = videos[0];

          console.log(videos)
          this.setState({
            isPlaying: true,
            visible: true,
            song: {
                title: track.snippet.title,
                duration: track.contentDetails.duration,
                url
            }
          });

          this.play(url, this.state.song);
          this.bounce();
        })
        .catch((error) => {
          console.error(error);
        });

    }

    getImage(url) {
        return `https://i.ytimg.com/vi/${url.split('/')[4]}/mqdefault.jpg`;
    }

    async play(url, track) {
/*
        MusicControl.setNowPlaying({
          title: track.title,
          artwork: `https://i.ytimg.com/vi/${url.split('/')[4]}/mqdefault.jpg`, // URL or RN's image require()
          artist: track.title,
          duration: track.duration, // (Seconds)
          color: 0xFFFFFF, // Notification Color - Android Only
          notificationIcon: 'music' // Android Only (String), Android Drawable resource name for a custom notification icon
        })
*/
         if (!this.sound) {
             this.sound = this.sound || new Audio.Sound();

             if (!this.state.init) {
                 await this.sound.loadAsync({uri: url});
             }

             await this.sound.playAsync();
         } else {
             await this.sound.pauseAsync();
         }
    }

    get song() {
        return this.state.song;
    }

    get percentPlayed() {
        const { currentlyPlaying: { currentTime } } = this.props;

        return currentTime / (this.state.song.duration/1000);
    }

    onPlayProgress = ({ currentTime }) => {
        this.setState({
            currentlyPlaying: {
                currentTime
            }
        })
        console.log('currentTime', currentTime)
    }

    onPlayEnd = () => {
        console.log('song ended');
    }

  render() {
    const { visible, song } = this.state;

    if (this.state.visible) {
        return (
            <Animatable.View style={styles.bottom} ref={this.handleViewRef}>
                <Appbar style={{flex:1, flexDirection:'row', justifyContent:'space-evenly'}}>
                    <Appbar.Action icon={{ source: { uri: 'https://avatars0.githubusercontent.com/u/17571969?v=3&s=400' } }} onPress={() => console.log('Pressed avatar')} />
                    <Appbar.Action icon="pause" onPress={() => console.log('Pressed pause')} />
                    <Appbar.Content>
                        <View>
                        <Text>Now Playing: {song.title}</Text>
                        </View>
                    </Appbar.Content>
                    <Appbar.Action icon="close" onPress={() => console.log('Pressed close')} />
                  </Appbar>
            </Animatable.View>
        );
    } else {
        return null
    }
  }
}


const styles = StyleSheet.create({
  bottom: {
      padding:10,
    flex:1,
    flexDirection:'row',
    backgroundColor: '#000',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
});
