import React, { Component } from 'react';
import { View, TextInput } from 'react-native';
import { Searchbar, Button } from 'react-native-paper';

class SearchBar extends Component {
    state = { term: ''}

    render() {
        const {
            containerStyle,
            searchTextStyle,
            buttonStyle
        } = styles;

        return (
            <View style={containerStyle}>
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
          </View>
        )
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

export default SearchBar;
