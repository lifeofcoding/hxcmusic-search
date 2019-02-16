import React from 'react';
import { View, ImageBackground } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph, Divider } from 'react-native-paper';
import DownloadButton from './DownloadButton';
import PlayButton from './PlayButton';
import * as Animatable from 'react-native-animatable';

const VideoListItem = ({ video }) => {
    handleViewRef = ref => this.view = ref;

    bounce = () => this.view.bounce(800).then(endState => console.log(endState.finished ? 'bounce finished' : 'bounce cancelled'));

    componentDidUpdate = () => {
        this.bounce()
    }

    const {
        cardStyle,
        contentStyle,
        titleStyle,
        descriptionStyle,
        buttonStyles,
        viewStyle
    } = styles;
    const {
        title,
        channelTitle,
        description,
        thumbnails: { medium: { url } }
    } = video.snippet;
    // console.log('video', video);
    return (
        <Animatable.View ref={this.handleViewRef}>
              <Card style={cardStyle}>
                  <ImageBackground source={{ uri: url }} style={{width: '100%', height: '100%'}}>
                    <View style={viewStyle}>
                        <Card.Title style={titleStyle} title={title} subtitle={channelTitle} left={(props) => <Avatar.Icon {...props} size={42} icon="music-video" />} />
                        <Card.Content containerStyle={contentStyle}>
                          <Paragraph style={descriptionStyle}>{description}</Paragraph>
                        </Card.Content>
                        <Card.Actions style={buttonStyles}>
                          <PlayButton model={{videoTitle:title, videoID:video.id.videoId}} />
                          <DownloadButton model={{videoTitle:title, videoID:video.id.videoId}} />
                        </Card.Actions>
                    </View>
                </ImageBackground>
              </Card>
        </Animatable.View>
    );
}

const styles = {
    viewStyle: {
        backgroundColor:'rgba(0, 0, 0, 0.6);',
        height:'100%',
        flex:1,
        flexDirection:'column',
        justifyContent: 'space-evenly'
    },
    cardStyle: {
        padding: 5,
        marginBottom: 15,
        backgroundColor:'#000',
        height: 250
    },
    contentStyle: {
        padding: 5,
        flexDirection: 'column',
        justifyContent: 'space-evenly'
    },
    titleStyle: {
        marginBottom: 5,
        marginLeft: 5
    },
    descriptionStyle: {
        fontSize: 11,
        paddingLeft: 50
    },
    buttonStyles: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    }
}

export default VideoListItem;
