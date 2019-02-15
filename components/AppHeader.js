import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Appbar } from 'react-native-paper';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';

class AppHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity>
          <Appbar.Header>
            <Appbar.Action icon="menu" onPress={() => { this.props.navigation.toggleDrawer() }} />
            <Appbar.Content
              title="HXCMusic"
            />
            <Appbar.Action icon={this.props.searchBoxOpen ? 'close' : 'search'} onPress={() => { this.props.toggleSearch() }} />
          </Appbar.Header>
      </TouchableOpacity>
    );
  }
}

AppHeader.propTypes = {
  toggleSearch: PropTypes.func,
  searchBoxOpen: PropTypes.bool
};

export default withNavigation(AppHeader);
