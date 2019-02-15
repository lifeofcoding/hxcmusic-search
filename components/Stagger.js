import React, { Component } from 'react';
import { TouchableOpacity, Text, Animated, View } from 'react-native';

export default class StaggerChildren extends Component {
  constructor(props) {
    super(props);
    this.animatedValues = [];
  }

  componentWillMount() {
    this.animatedValues = React.Children.map(this.props.children, () => new Animated.Value(0));
  }

  componentDidMount() {
    Animated.stagger(90, React.Children.map(this.props.children, (_, idx) => {
      return Animated.timing(this.animatedValues[idx], {
        toValue: 1,
        duration: 300,
      })
    })).start();
  }

  render() {
    const children = React.Children.map(this.props.children, (child, idx) => {
      const animatedValue = this.animatedValues[idx];
      const style = {
        marginBottom: 40,
        transform: [
          {
            translateY: animatedValue.interpolate({
              inputRange: [0, 0.01, 1],
              outputRange: [0, -50, 0],
            }),
          },
          {
            scale: animatedValue.interpolate({
              inputRange: [0, 0.01, 1],
              outputRange: [0, 0.3, 1],
            }),
          },
        ],
      };
      return <Animated.View style={style}>{child}</Animated.View>;
    });

    return (
      <View style={{ flex: 1 }}>
        {children}
      </View>
    );
  }
}
