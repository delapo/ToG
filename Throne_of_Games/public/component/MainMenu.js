import React from 'react';
import { Text, View, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import { Header, Left, Right, Icon, HomeIcon } from 'native-base';
import Ligues from './Ligues';
import Button from 'apsl-react-native-button';
import Classement from './Classement';
import Communaute from './Communaute';
import Match from './Match';
import axios from 'axios';

const { width } = Dimensions.get('window')

import background from '../images/throne.jpg';

global.username = "test";

export default class MainMenu extends React.Component {
    constructor(props){
        super(props);

        this.state ={
            sport: '',
        }
    }
  static navigationOptions = {
    drawerIcon: ({ tintColor }) => (
        <Icon name="home" style={{ fontSize:24, color: tintColor }} />
    )
};
  render() {
      const { navigate } = this.props.navigation;
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
      axios.post('http://' + global.ip + '/user', {
       withCredentials: true,
     })
     .then(function (response) {
         global.username = response.data.data.pseudo;
         console.log("rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr ", global.username)
       console.log("rrrrrrrrrreeeeeeeeeeeesssssssssssssssspppppppp ", response.status)
       console.log("ffffffffffffffffffffffffffff ", response.data.data.pseudo);
    })
     .catch(function (error) {
       console.log(error);
     });


 console.log("eeeeeeeeeeeeeeeeeee   ", global.username);
    return (
        <ImageBackground source={background} style={{width: '100%', height: '100%'}}>
        <Header
            style={{backgroundColor:'#222', opacity:0.8}}
            barStyle="light-content"
            >
            <Text
                style={{
                    color: 'white',
                    fontSize:20,
                    marginTop: 10,
                    marginBottom: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: "center",
                    marginLeft:  60,
                    marginRight:  60,}}>{this.state.sport}</Text>

            <Button
                style={{borderColor: "transparent",borderRadius: 20, backgroundColor:'rgba(0, 0, 0, 0.3)', width:'30%', height:'100%', alignSelf:'center', marginTop:10}}
                onPress={() => navigate('Login')}
                title='LOGOUT'
                >
                    <Text style={{fontSize:20, textDecorationLine:'underline', fontFamily: 'Verdana', color:'#f49e42'}} >LOGOUT</Text>
            </Button>
        </Header>

         <View style={styles.container}>
          <View style={styles.menu}>
           <Text style={styles.welcome}>Bienvenue {global.userName} !</Text>
           <Text style={styles.Text} onPress={() =>
            navigate('Ligues')}>Ligues</Text>
           <Text style={styles.Text}  onPress={() =>
            navigate('Matchs')}>Matchs</Text>

           <Text style={styles.Text}  onPress={() =>
            navigate('Classement')} >Classement</Text>

           <Text style={styles.Text}  onPress={() =>
            navigate('Communautés')}>Communautés</Text>

           <Text style={styles.Text} onPress={() =>
            navigate('CV')}>C.V</Text>
           <Text style={styles.Text} onPress={() =>
            navigate('Profil')}>Profil</Text>
           <Text style={styles.tournois} onPress={() =>
            navigate('Tournois')}>Tournois</Text>
         </View>
        </View>
    </ImageBackground>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    },

    menu: {
    backgroundColor: 'black',
    opacity:0.8,
  },

  View: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    color: 'white',
   },

  Text: {
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


  welcome: {
      color: 'white',
      fontFamily: 'Cochin',
      fontSize: 20,
      marginTop: 25,
      marginBottom: 25,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: "center",
      marginLeft:  60,
      marginRight:  60,

  },

  tournois: {
      textDecorationLine:'underline',

      color: 'white',
      fontFamily: 'verdana',
      marginTop: 10,
      marginBottom: 20,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: "center",
      marginLeft:  60,
      marginRight:  60,

  },
});
