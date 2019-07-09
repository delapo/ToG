import React from 'react';
import { Text, View, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import { Header, Left, Right, Icon} from 'native-base';
import  Button  from 'apsl-react-native-button';
import GenerateForm from 'react-native-form-builder';

const { width } = Dimensions.get('window')

import background from '../images/throne.jpg';


export default class CommunauteDetails extends React.Component {
    constructor(props){
        super(props);

        this.state ={
            sport: '',
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
          <View style={styles.menu}>
           <Text style={styles.welcome}>Communauté de *User*</Text>
            <Text style={styles.WorldWide}>Info</Text>
            <Text style={styles.WorldWide}>Classement</Text>

         </View>

    </ImageBackground>

    );
  }
}

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
      color: "#1E90FF",
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

  WorldWide: {
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
});
