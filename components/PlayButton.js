import React, { Component } from 'react';
import { Button } from 'react-native-paper';
// import { Button } from 'react-native-paper';
import Player from '../actions/Player';

const sanitize = (filename) => require('slugify')(filename.replace('/', ''), { remove: /"<>#%\{\}\|\\\^~\[\]`;\?:@=&\//g });

export default class PlayButton extends Component {
  constructor(props) {
    super(props)

    this.state = {
      init: false,
      isPlaying: false
    }

    this.playSound = this.playSound.bind(this);
  }

  playSound(url, title) {
    console.log('url:', url);

    Player.playSong({
        title,
        url
    })

    this.setState({
        init: true,
        isPlaying: !this.state.isPlaying
    })
  }

  stopSound() {
      Player.stop()

      this.setState({
          init: true,
          isPlaying: !this.state.isPlaying
      })
  }

  render() {
    let model = this.props.model;

    return (
      <Button icon={this.state.isPlaying ? 'pause-circle-outline' : 'play-circle-outline'} mode="contained" compact={false} onPress={() => {
          console.log('props', model.videoID, sanitize(model.videoTitle))
          if (!this.state.isPlaying) {
              this.playSound(`http://lifeofcoding.online/yt-serve/${model.videoID}/stream.mp3`, sanitize(model.videoTitle));
          } else if (this.state.init) {
              this.stopSound();
          }
      }}>
        {this.state.isPlaying ? 'Pause' : 'Play'}
      </Button>
    )
  }
}
