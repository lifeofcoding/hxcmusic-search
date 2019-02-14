import React from 'react';
import { ScrollView, View} from 'react-native';
import VideoListItem from './VideoListItem';


const VideoList = ({ videos }) => {
    const videoItems = videos.map(video => (
        <VideoListItem
            key={video.etag}
            video={video}
        />

    ))
    return (
        <ScrollView>
            <View style={styles.containerStyle}>
                {videoItems}
            </View>
        </ScrollView>

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
