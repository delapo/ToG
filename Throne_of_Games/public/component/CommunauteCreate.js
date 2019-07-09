import React from 'react';
import { Text, View, StyleSheet, ImageBackground, Dimensions, ScrollView } from 'react-native';
import { Header, Left, Right, Icon} from 'native-base';
import GenerateForm from 'react-native-form-builder';
import axios from 'axios';
import ToggleSwitch from 'toggle-switch-react-native'
import  Button  from 'apsl-react-native-button';
const { width } = Dimensions.get('window')
import {ToastAndroid} from 'react-native';
import background from '../images/throne.jpg';
import Communaute from './Communaute';
import MainMenu from './MainMenu';
import Homepage from './pages/Homepage';



export default class CommunauteCreate extends React.Component {
    constructor(props) {
      super(props);
      this.state = { switchOn: false, sampleText: 'Publique' , color:'#f49e42', sport:''};
  }
  changeTextValue = () => {
      if ( this.state.switchOn == true ){ this.setState( { switchOn: false, sampleText: 'Private', color:'red' }); }
      else { this.setState( { switchOn: true, sampleText: 'Publique', color:'#f49e42'}); }
  }




    Community() {
      const formValues = this.formGenerator.getValues();
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
      console.log('FORM VALUES', formValues);

      const { navigate } = this.props.navigation;
      axios.post('http://' + global.ip + '/community?gameType=' + global.gametype, {
       withCredentials: true,
       name: formValues.Nom,
       open: this.state.switchOn,
       rankingSettings: {
       rollingGameCount: formValues.NbrMatchs,
       rollingMonthes: formValues.NbrMois }
     })
     .then(function (response) {
       console.log("rrrrrrrrrreeeeeeeeeeeesssssssssssssssspppppppp ", response.status)
       console.log("ffffffffffffffffffffffffffff ", response);

       if(response.data.success != true || response.status != 200) {
           ToastAndroid.show('Error in data(s), please check', ToastAndroid.SHORT);
       }
       else if(response.data.success == true || response.status == 200) {
           navigate('Accueil')
           ToastAndroid.show('Communauté créée', ToastAndroid.SHORT);
       }
     })
     .catch(function (error) {
         ToastAndroid.show('Error in data(s), please check', ToastAndroid.SHORT);
       console.log(error);
     });

  }

  render() {
      const { navigate } = this.props.navigation;
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
    <ScrollView>
           <View style={styles.menu}>
           <Text style={styles.welcome} onPress={() =>
            console.log('Communauté créée')}>Créée Ta Communauté !</Text>

            <View style={{  justifyContent: 'center', alignItems: 'center', alignSelf: "center"}}>

            <Button
                title="login"
                style={{borderColor: "transparent",borderRadius: 20, backgroundColor:this.state.color , width:'50%', alignSelf:'center'}}
                block onPress={() => this.changeTextValue()}>
                    <Text style={styles.Text}>
                        {this.state.sampleText}
                    </Text>
            </Button>


            </View>
           <GenerateForm
                ref={(c) => {
                this.formGenerator = c;
                }}
                fields = {liguecreate}/>

           <Text style={styles.Text} onPress={() => this.Community()}>Valider</Text>
           <Text style={styles.Text} onPress={() => navigate('Communautés')}>Communaute</Text>
           <Text style={styles.last} onPress={() => navigate('Accueil')}>Menu</Text>

         </View>
         </ScrollView>

    </ImageBackground>

    );
  }
}

const liguecreate = [
    {
        type: 'text',
        name: 'Nom',
        required: true,
        icon: 'ios-person',
        label: 'Nom',
      },

  {
    type: 'text',
    name: 'NbrMatchs',
    required: true,
    icon: 'ios-person',
    label: 'Nbr de matchs',
  },

  {
    type: 'text',
    name: 'NbrMois',
    required: true,
    icon: 'ios-person',
    label: 'Nombre de mois',
  },
];

const styles = StyleSheet.create({

    menu: {
    backgroundColor: 'black',
    opacity:0.8,
    marginTop: 80,
    marginLeft: 30,
    marginRight: 30

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

});
