import React from 'react';
import { ScrollView, View, Animated, Text } from 'react-native';
import { ActivityIndicator, Colors } from 'react-native-paper';
import VideoListItem from './VideoListItem';
import StaggerChildren from './Stagger';

const styles = {
    containerStyle: {
        marginBottom: 10,
        marginLeft: 5,
        marginRight: 5,
        paddingTop: 20
    }
}

export default class VideoList extends React.Component {
    constructor(props) {
        super(props);

        const { videos, searchTerms } = this.props;

        this.state = {
            animatedValue: 0,
            counter: 0,
            canLoadMoreContent:true
        }
    }

    results() {
        console.log('this.state.counter', this.state.counter)
        if (this.props.videos.length) {
            return (
                <StaggerChildren key={this.state.counter}>
                    <View>
                        {this.props.videos.map(video => (
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
    }

    videoItems() {
        return this.props.videos.map(video => (
            <VideoListItem
                key={video.etag}
                video={video}
            />

        ))
    }

    handleScroll(event) {
        console.log(event.nativeEvent.contentOffset.y);
        if((this._height - 300) < event.nativeEvent.contentOffset.y) {
            this.props.loadMore();
        }
    }

    find_dimesions(layout) {
        const {x, y, width, height} = layout;

        this._height = height;
    }

    render() {
        return (
            <Animated.ScrollView // <-- Use the Animated ScrollView wrapper
              scrollEventThrottle={1} // <-- Use 1 here to make sure no events are ever missed
               onScroll={this.handleScroll}>
                <View style={styles.containerStyle} onLayout={(event) => { this.find_dimesions(event.nativeEvent.layout) }}>
                    {this.results()}
                </View>
            </Animated.ScrollView>
        );
    }
}
