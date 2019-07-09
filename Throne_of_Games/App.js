import React from 'react';
import { Text, View, StyleSheet, Button, ImageBackground } from 'react-native';
import { AppDrawerNavigator } from './public/js/Menu/Menu'

 export default class App extends React.Component {
     render() {
         return (
             <AppDrawerNavigator />
         );
     }
 }

 const styles = StyleSheet.create({
     container: {
         flex: 1,
         alignItems: 'center',
         justifyContent: 'center',
     },
 });
