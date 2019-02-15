import React, { Component } from 'react';
import { Button } from 'react-native-paper';
import { WebBrowser, FileSystem } from 'expo';
const sanitize = (filename) => require('slugify')(encodeURIComponent(filename.replace('/', '')), { remove: /"<>#%\{\}\|\\\^~\[\]`;\?:@=&\//g });

class DownloadButton extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      icon: 'save',
      buttonText: 'Download',
      disabled: false
    }

    this.onPress = this.onPress.bind(this);
  }

  checkProgress(downloadProgress) {
    let progress =
        downloadProgress.totalBytesWritten /
        downloadProgress.totalBytesExpectedToWrite;

      console.log('Progress:', progress);
  }

  async downloadFile(url, filename, callback) {
    const fileUri = FileSystem.documentDirectory + filename;

    let downloadObject = FileSystem.createDownloadResumable(
      url,
      fileUri,
      {},
      this.checkProgress
    );
    let response = await downloadObject.downloadAsync();

    callback(response)
  }

  onPress() {
    this.setState({
      loading: true,
      disabled: true
    });

    let url = `http://lifeofcoding.online/yt-serve/${this.props.model.videoID}/${sanitize(this.props.model.videoTitle)}.mp3`;
    // WebBrowser.openBrowserAsync(url);
    this.downloadFile(url, `${sanitize(this.props.model.videoTitle)}.mp3`, (res) => {
      console.log('Done!', res);
      this.setState({
        loading: false,
        icon: 'check-box',
        buttonText: 'Downloaded'
      });
    });
  }

  render() {
    return (
      <Button icon={this.state.icon} loading={this.state.loading} disabled={this.state.disabled} mode="contained" compact={false} dark={true} onPress={this.onPress}>
        {this.state.buttonText}
      </Button>
    );
  }
}

export default DownloadButton;
