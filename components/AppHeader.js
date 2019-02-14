import React from 'react';
import { Header } from 'react-native-elements';

const AppHeader = ({ headerText }) => ( // { headerText } === props.headerText
    <Header
      leftComponent={{ icon: 'menu', color: '#fff' }}
      centerComponent={{ text: headerText, style: { color: 'white'} }}
      outerContainerStyles={{ backgroundColor: '#0c0c0c'}}
    />
);

export default AppHeader;
