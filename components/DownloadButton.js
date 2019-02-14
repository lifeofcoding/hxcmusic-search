import React from 'react';
import { Button } from 'react-native-paper';
import { WebBrowser } from 'expo';
const sanitize = (filename) => require('slugify')(encodeURIComponent(filename.replace('/', '')), { remove: /"<>#%\{\}\|\\\^~\[\]`;\?:@=&\//g });

const DownloadButton = ({model}) => (
  <Button icon="save" mode="contained" compact={false} dark={true} onPress={() => {
    let url = `http://lifeofcoding.online/yt-serve/${model.videoID}/${sanitize(model.videoTitle)}.mp3`;
    WebBrowser.openBrowserAsync(url);
  }}>
    Download
  </Button>
);

export default DownloadButton;
