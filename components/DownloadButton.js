import React, { Component } from 'react';
import { Button } from 'react-native-paper';
import { ToastAndroid } from 'react-native';
import { FileSystem, Notifications, WebBrowser } from 'expo';
import Player from '../actions/Player';
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
    this.listenForNotifications = this.listenForNotifications.bind(this);
  }

  checkProgress(downloadProgress) {
    let progress =
        downloadProgress.totalBytesWritten /
        downloadProgress.totalBytesExpectedToWrite;

      console.log('Progress:', progress);
  }
    
  async downloadFile(url, filename, callback) {
      let result = await WebBrowser.openBrowserAsync(url);
      callback(result)
  }

  async downloadFile2(url, filename, callback) {
    let fileUri = FileSystem.documentDirectory + filename;
    FileSystem.downloadAsync(
      url,
      fileUri,
      {},
      this.checkProgress
    ).then(({ uri }) => {
      console.log('Finished downloading to ', uri);

      const localnotification = {
        title: 'Download has finished',
        body: filename + ' has been downloaded!',
        android: {
          sound: true,
        },
        data: {
          filename: filename,
          fileUri: uri
        },
      };
      localnotification.data.title = localnotification.title;
      localnotification.data.body = localnotification.body;
      let sendAfterFiveSeconds = Date.now();
      sendAfterFiveSeconds += 3000;

      const schedulingOptions = { time: sendAfterFiveSeconds };
      Notifications.scheduleLocalNotificationAsync(
        localnotification,
        schedulingOptions
      );
      
      callback(uri);
    })
    .catch(error => {
        console.error(error);
        Alert.alert(error);
    });
  };

  listenForNotifications() {
    Notifications.addListener(notification => {
      if (notification.origin === 'received') {
        // We could also make our own design for the toast
        // _this.refs.toast.show(<View><Text>hello world!</Text></View>);

        ToastAndroid.showWithGravityAndOffset(
          notification.data.filename + ' Finished Downloading!',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          0,
          50
        );
      } else if (notification.origin === 'selected') {
        //this.openFile(notification.data.fileUri);
          /*
        Player.playSong({
            title: notification.data.filename.replace('.mp3',''),
            url: notification.data.fileUri
        })
        */
      }
        // Expo.Notifications.setBadgeNumberAsync(number);
        // Notifications.setBadgeNumberAsync(10);
        // Notifications.presentLocalNotificationAsync(notification);
        // Alert.alert(notification.title, notification.body);
    });
  }

  componentWillMount() {
    this.listenForNotifications();
  }

  onPress() {
    this.setState({
      loading: true,
      disabled: true
    });

    let url = `http://lifeofcoding.online/yt-serve/${this.props.model.videoID}/${encodeURIComponent(this.props.model.videoTitle)}.mp3`;
    // WebBrowser.openBrowserAsync(url);
    this.downloadFile(url, `${this.props.model.videoTitle}.mp3`, (res) => {
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