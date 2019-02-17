import * as React from 'react';
import { View } from 'react-native';
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';

export default class NetworkAlert extends React.Component {
  state = {
    visible: false,
  };

  _showDialog = () => this.setState({ visible: true });

  _hideDialog = () => this.setState({ visible: false });

  render() {
    return (
      <Dialog
         visible={this.state.visible}
         dismissable={false}>
        <Dialog.Title>Network Disconnected!</Dialog.Title>
        <Dialog.Content>
          <Paragraph>A network connection is needed to function properly!</Paragraph>
        </Dialog.Content>
      </Dialog>
    );
  }
}