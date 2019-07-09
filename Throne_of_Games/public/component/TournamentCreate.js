import React from 'react';
import { Text, View, StyleSheet, ImageBackground, Dimensions, ScrollView } from 'react-native';
import { Header, Left, Right, Icon} from 'native-base';
import  Button  from 'apsl-react-native-button';
import GenerateForm from 'react-native-form-builder';
import DateTime from 'react-native-customize-selected-date';
import _ from 'lodash'

import Tournament from './Tournament';
import MainMenu from './MainMenu';
import {ToastAndroid} from 'react-native';
import Homepage from './pages/Homepage';

import axios from 'axios';

const { width } = Dimensions.get('window')

import background from '../images/throne.jpg';

global.date;

export default class TournamentCreate extends React.Component {
    Tournament(date) {
      const formValues = this.formGenerator.getValues();
      console.log('FORM VALUES', formValues);

      const { navigate } = this.props.navigation;
      axios.post('http://' + global.ip + '/tournament?gameType=' + global.gametype, {
       withCredentials: true,
       name: formValues.Nom,
       sport:'',
       date: global.date,
       ratios: [{
       ratio: 2,
       step: "OTHER" },
     { ratio: 3,
       step: "FINALE" }
    ]
     })
     .then(function (response) {

       console.log("ffffffffffffffffffffffffffff ", response);

       if(response.data.success != true || response.status != 200 ) {
           ToastAndroid.show('Error in data(s), please check', ToastAndroid.SHORT);
       }
       else if(response.data.success == true || response.status == 200 ) {
           ToastAndroid.show('Tournoi créée', ToastAndroid.SHORT);
           navigate('Accueil')
       }
     })
     .catch(function (error) {
         ToastAndroid.show('Error in data(s), please check', ToastAndroid.SHORT);
       console.log(error);
     });

    }

    constructor(props) {
      super(props)
      this.state = {
        time: ''
      }
    }

    onChangeDate(date) {
        global.date = date;
    }

    renderChildDay(day) {
      if (_.includes(['2018-11-15', '2018-12-10', '2018-12-20'], day)) {
        return <Image source={require('../../node_modules/react-native-customize-selected-date/Example/src/Images/ic_lock_green.png')} style={styles.icLockRed} />
      }
      if (_.includes(['2018-11-16', '2018-12-12', '2018-12-21', '2018-12-18'], day)) {
        return <Image source={require('../../node_modules/react-native-customize-selected-date/Example/src/Images/ic_lock_red.png')} style={styles.icLockRed} />
      }
    }

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
    return (
    <View>
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
            <ScrollView>
            <View style={styles.menu}>
                <Text style={styles.welcome}>Créée ton Tournois !</Text>

                    <GenerateForm ref={(c) => { this.formGenerator = c; }} fields = {liguecreate}/>
                    <View style={{ flex: 1}}>
                    <DateTime
                      date={this.state.time}
                      changeDate={(date) => this.onChangeDate(date)}
                      format='YYYY-MM-DD'
                      renderChildDay={(day) => this.renderChildDay(day)}
                    />

                </View>
                <Text style={styles.Text} onPress={() => this.Tournament()}>Valider</Text>
                <Text style={styles.Text} onPress={() => navigate('Tournois')}>Tournois</Text>
                <Text style={styles.last} onPress={() => navigate('Accueil')}>Menu</Text>

             </View>
            </ScrollView>
        </ImageBackground>
    </View>
    );
  }
}

const liguecreate = [
    {
        type: 'text',
        name: 'Nom',
        required: true,
        icon: 'ios-person',
        label: 'Nom du Tournois',
        color: '#ADADAD'
      },

];

const styles = StyleSheet.create({

    menu: {
    backgroundColor: 'black',
    opacity:0.8,
    marginTop: 80,
    marginLeft: 10,
    marginRight: 10

  },

  View: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    color: 'white',
   },

  Text: {
      color: "white",
      fontFamily: 'verdana',
      marginTop: 10,
      marginBottom: 10,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: "center",
      marginLeft:  40,
      marginRight:  40,
  },


  last: {
      color: "white",
      fontFamily: 'verdana',
      marginTop: 10,
      marginBottom: 30,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: "center",
      marginLeft:  40,
      marginRight:  40,
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
      marginLeft:  40,
      marginRight:  40,

  },
  icLockRed: {
    width: 13 / 2,
    height: 9,
    position: 'absolute',
    top: 2,
    left: 1
  }

});
