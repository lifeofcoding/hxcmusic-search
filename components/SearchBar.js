import React, { Component } from 'react';
import { View, TextInput } from 'react-native';
import { Searchbar, Button } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import PropTypes from 'prop-types';

class SearchBar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            term: ''
        }

        this.handleViewRef = ref => this.view = ref;
        this.bounce = () => this.view.fadeInUp(500).then(endState => console.log(endState.finished ? 'bounce finished' : 'bounce cancelled'));
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.showSearch && !prevProps.showSearch) {
            this.bounce();
        }
    }

    render() {
        const {
            containerStyle,
            searchTextStyle,
            buttonStyle
        } = styles;

        if (this.props.showSearch) {
            return (
              <Animatable.View style={containerStyle} ref={this.handleViewRef}>
                  <Searchbar
                    style={searchTextStyle}
                    placeholder="Search"
                    onChangeText={query => { this.setState({ term: query }); }}
                    value={this.state.term}
                  />
                  <Button style={buttonStyle} loading={this.props.loading}
                    mode="contained" dark={true}
                    onPress={() => this.props.onPressSearch(this.state.term)}
                  >
                    {this.props.loading ? 'Loading...' : 'Search'}
                  </Button>
              </Animatable.View>
            );
        } else {
            return null;
        }
    }
}

const styles = {
    containerStyle: {
      flexDirection: 'row',
      marginLeft: 20,
      marginRight: 10,
      paddingTop: 10,
      paddingBottom: 10
    },
    searchTextStyle: {
      flex: 1
    },
    buttonStyle: {
      marginLeft: 10
    }
}

SearchBar.propTypes = {
  showSearch: PropTypes.bool
};

export default SearchBar;
