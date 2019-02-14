import React, { Component } from 'react';
import { Button } from 'react-native-paper';
// import { Button } from 'react-native-paper';
import { Audio } from 'expo';
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

  async playSound(url) {
    console.log('url:', url);
    // RNAudioStreamer.setUrl(url)
    // RNAudioStreamer.play()
      // await Audio.setIsEnabledAsync(true);

      if (!this.state.isPlaying) {
        this.sound = this.sound || new Audio.Sound();

        if (!this.state.init) {
          await this.sound.loadAsync({uri: url});
        }

        await this.sound.playAsync();
      } else {
        await this.sound.pauseAsync();
      }

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
          this.playSound(`http://lifeofcoding.online/yt-serve/${model.videoID}/stream.mp3`);
      }}>
        {this.state.isPlaying ? 'Pause' : 'Play'}
      </Button>
    )
  }
}
