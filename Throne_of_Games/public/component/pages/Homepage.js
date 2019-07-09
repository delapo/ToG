import React from 'react';
import { Text, View, StyleSheet, Button, ImageBackground, Image, TouchableHighlight } from 'react-native';
import { Header, Left, Right, Icon } from 'native-base';
import OpenDrawer from '../../js/Menu/OpenDrawer'
import {ToastAndroid} from 'react-native';

import t from 'tcomb-form-native'

import background from '../../images/throne.jpg';

global.gametype = null;

export default class Homepage extends React.Component {
    constructor(props){
        super(props);

        this.state ={
            sport: '',
        }
    }

  static navigationOptions = {
    drawerIcon: ({ tintColor }) => (
        <Icon name="paper" style={{ fontSize:24, color: tintColor }} />
    )
};
  render() {
      const {navigate} = this.props.navigation;
      const { didBlurSubscription } = this.props.navigation.addListener('willFocus', payload =>  {

              switch (global.gametype)
              {
                  case 'PETANQUE':
                  this.setState({sport: 'PETANQUE'});
                      break;
                  case 'URBAN':
                  this.setState({sport: 'URBANFOOT'});
                      break;
                  case 'FOOSBALL':
                  this.setState({sport: 'BABYFOOT'});
                      break;
                  case 'COINCHE':
                  this.setState({sport: 'COINCHE'});
                      break;
                  default:
                  this.setState({sport: 'Choisi ton sport !'});
              }
      });
    return (
      <ImageBackground source={background} style={{width: '100%', height: '100%'}}>
      <Text style={styles.typesport}>{this.state.sport}</Text>

        <View style={styles.Carre}>
          <View style={styles.View} >
          <Text style={{color: 'white', fontFamily: 'verdana', fontWeight: 'bold', justifyContent: 'center', fontSize: 18}}>Choisis ton game, conquiers le Trône !</Text>
          <Text style={{color: 'white', marginTop: 10}} onPress={() => this.coinche()}>COINCHE</Text>
          <Text style={{color: 'white', marginTop: 10}}  onPress={() => this.petanque()}>PETANQUE</Text>
          <Text style={{color: 'white', marginTop: 10}}  onPress={() => this.foosball()}>BABYFOOT</Text>
          <Text style={{color: 'white', marginTop: 10}}  onPress={() => this.urban()}>URBANFOOT</Text>
          <Text style={{color: 'white', marginTop: 25, fontFamily: 'verdana', fontWeight: 'bold', fontSize: 18}}>What the FAQ ?</Text>
          <Text style={{color: 'white', marginTop: 10}}>Throne Of Games, c’est le classement ATP du jeu, de tous les jeux. Ici tu défies en ligne, tu castagnes en vrai.</Text>
          <Text style={{color: 'white', marginTop: 10, marginBottom: 25}}>Alors choisis ton Game, crée ta communauté, challenge tes potes, grimpe au classement … et conquiers le TRONE !</Text>
          </View>
            <TouchableHighlight style={{ flex: 0.1 }} onPress={() =>
            navigate('Faq') }>
                <Text style={{color: 'white', marginLeft: 15, marginBottom: 10}}>EN SAVOIR PLUS...</Text>
            </TouchableHighlight>
        </View>
      </ImageBackground>

    );
}

  coinche() {
      const {navigate} = this.props.navigation;

      global.gametype = 'COINCHE'
      ToastAndroid.show('You Choose to play coinche', ToastAndroid.SHORT);
      navigate('Accueil');
  }
  petanque() {
      const {navigate} = this.props.navigation;

      global.gametype = 'PETANQUE'
      ToastAndroid.show('You Choose to play petanque', ToastAndroid.SHORT);
      navigate('Accueil');

  }
  foosball() {
      const {navigate} = this.props.navigation;

      global.gametype = 'FOOSBALL'
      ToastAndroid.show('You Choose to play babyfoot', ToastAndroid.SHORT);
      navigate('Accueil');

  }
  urban() {
      const {navigate} = this.props.navigation;

      global.gametype = 'URBAN'
      ToastAndroid.show('You Choose to play urban', ToastAndroid.SHORT);
      navigate('Accueil');

  }
}



const styles = StyleSheet.create({
  View: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    // marginTop: 50,
    padding: 20,
    color: 'white',
  },

  typesport: {
      textDecorationLine:'underline',
      color: 'white',
      fontFamily: 'verdana',
      marginTop: 10,
      marginBottom: 10,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: "center",
      marginLeft:  60,
      marginRight:  60,
  },

  Carre: {
    flex: 1,
    backgroundColor: 'black',
    opacity: 0.8,
    marginTop: 100,
    marginBottom: 120,
    marginLeft: 20,
    marginRight: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    },
});
