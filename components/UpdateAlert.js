import * as React from 'react';
import { View, WebBrowser, TouchableWithoutFeedback } from 'react-native';
import { Button, Paragraph, Modal, Portal, Card } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import PropTypes from 'prop-types';

class UpdateAlert extends React.Component {
  state = {
    visible: false,
    dismissed: false
  };

  _doUpdate() {
      WebBrowser.openBrowserAsync(this.props.downloadUrl);
      this.setState({
          dismissed: true
      })
  }

  _hideDialog = () => this.setState({ dismissed: true });

  render() {
    return (
        <Portal>
          <Modal
             visible={!this.state.dismissed && this.props.visible}>
             <Card style={{width: '90%', alignSelf:'center'}}>
              <Card.Title title="New Update Available!" />
              <Card.Content>
                <Paragraph>Please update to get the best experience.</Paragraph>
              </Card.Content>
              <Card.Actions style={{justifyContent:'space-evenly'}}>
                <Button icon="cancel" mode="contained" onPress={() => this._hideDialog()}>Cancel</Button>
                <Button icon="update" mode="contained" onPress={() => this._doUpdate()}>Update</Button>
              </Card.Actions>
            </Card>
          </Modal>
        </Portal>
    );
  }
}

UpdateAlert.propTypes = {
  visible: PropTypes.bool.isRequired,
  downloadUrl: PropTypes.string.isRequired
};
export default Animatable.createAnimatableComponent(UpdateAlert);
