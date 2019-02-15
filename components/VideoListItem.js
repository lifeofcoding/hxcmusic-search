import React from 'react';
import { View } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph, Divider } from 'react-native-paper';
import DownloadButton from './DownloadButton';
import PlayButton from './PlayButton';

const VideoListItem = ({ video }) => {
    const {
        cardStyle,
        contentStyle,
        titleStyle,
        descriptionStyle,
        buttonStyles,
    } = styles;
    const {
        title,
        channelTitle,
        description,
        thumbnails: { medium: { url } }
    } = video.snippet;
    // console.log('video', video);
    return (
          <Card style={cardStyle}>
            <Card.Title style={titleStyle} title={title} subtitle={channelTitle} left={(props) => <Avatar.Icon {...props} size={42} icon="music-video" />} />
            <Card.Content containerStyle={contentStyle}>
              <Paragraph style={descriptionStyle}>{description}</Paragraph>
            </Card.Content>
            <Card.Cover source={{ uri: url }} />
            <Card.Actions style={buttonStyles}>
              <PlayButton model={{videoTitle:title, videoID:video.id.videoId}} />
              <DownloadButton model={{videoTitle:title, videoID:video.id.videoId}} />
            </Card.Actions>
          </Card>
    );
}

const styles = {
    cardStyle: {
        padding: 5,
        marginBottom: 15,
    },
    contentStyle: {
        padding: 5,
        width: '100%',
    },
    titleStyle: {
        marginBottom: 5,
        marginLeft: 5
    },
    descriptionStyle: {
        fontSize: 11,
    },
    buttonStyles: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    }
}

export default VideoListItem;
