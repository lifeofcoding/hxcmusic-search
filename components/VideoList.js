import React from 'react';
import { ScrollView, View, Animated, Text } from 'react-native';
import { ActivityIndicator, Colors } from 'react-native-paper';
import VideoListItem from './VideoListItem';
import StaggerChildren from './Stagger';

const VideoList = ({ videos, searchTerms }) => {
    state = {
        animatedValue: 0,
        counter: 0
    }
    const results = (function() {
        console.log('this.state.counter', this.state.counter)
        if (videos.length) {
            return (
                <StaggerChildren key={this.state.counter}>
                    <View>
                        {videos.map(video => (
                            <VideoListItem
                                key={video.etag}
                                video={video}
                            />

                        ))}
                    </View>
                </StaggerChildren>
            )
        } else {
            return (
                <View style={{flex:1, flexDirection:'column', justifyContent:'space-evenly', alignContent:'center'}}>
                    <ActivityIndicator animating={true} color={Colors.cyan800} />
                </View>
            )
        }
    })()

    const videoItems = videos.map(video => (
        <VideoListItem
            key={video.etag}
            video={video}
        />

    ))
    return (
        <Animated.ScrollView // <-- Use the Animated ScrollView wrapper
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
            <View style={styles.containerStyle}>
                {results}
            </View>
        </Animated.ScrollView>

    );
}

const styles = {
    containerStyle: {
        marginBottom: 10,
        marginLeft: 5,
        marginRight: 5,
        paddingTop: 20
    }
}

export default VideoList;
