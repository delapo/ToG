import React from 'react';
import { Text, View, StyleSheet, Button, ImageBackground, Image, TouchableHighlight } from 'react-native';

export default class OpenDrawer extends React.Component {
    render() {
        return(
            <TouchableHighlight style={{ width: 30, height: 30, marginLeft: 10, marginTop: 10 }} onPress={() =>
            {this.props.nav.openDrawer()}}>
              <Image
                  style={{width: 30, height: 30, marginLeft: 30, marginTop: 30}}
                  source={require('../../icons/menu-icon.png')}
              />
            </TouchableHighlight>
        );
    }
}
