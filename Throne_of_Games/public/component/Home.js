import React from 'react';
import GenerateForm from 'react-native-form-builder';
import { Text, View, StyleSheet, ImageBackground, ScrollView, Image } from 'react-native';
import { Header, Left, Right, Icon } from 'native-base';
import Button from 'apsl-react-native-button';
import {ToastAndroid} from 'react-native';
import axios from 'axios';

import Homepage from './pages/Homepage';
import Register from './Register';

import t from 'tcomb-form-native';

const Form = t.form.Form;
console.disableYellowBox = true;

global.ip = '172.16.1.188:8080';

const User = t.struct({
  email: t.String,
  password: t.String,
});
const login = [
  {
    type: 'email',
    name: 'email',
    required: true,
    icon: 'ios-person',
    label: 'email',
  },
  {
    type: 'password',
    name: 'password',
    icon: 'ios-lock',
    required: true,
    label: 'Password',
  },
];
const styless = {
    wrapper: {
        flex: 1,
        alignSelf:'baseline',
        width: '100%',
    },
    backgroundImage: {
        flex: 1,
        width: 50,
        height: 50,
        // resizeMode: 'cover', // or 'stretch'
        justifyContent: 'center',

    },
    submitButton: {
    },
    left: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    view: {
        flex: 1,
        justifyContent: 'center',
        marginTop: 50,
        padding: 20,
        color: 'white',
    },
    carre: {
        flex: 1,
        backgroundColor: 'black',
        opacity: 0.8,
        marginTop: 300,
        marginBottom: 180,
        marginLeft: 20,
        marginRight: 20,
    },
    container: {
          flex: 1,
          backgroundColor:'rgba(0, 0, 0, 0.8)',
          width: '100%',
          justifyContent:'center',

      },
      wrap_content: {
          marginBottom:0,
      },
};

import background from '../images/ThronesOfGame.png';
import theme from '../../form-theme';

export default class Home extends React.Component {

      handleSubmit = () => {
        const value = this._form.getValue();
        console.log('value: ', value);
      }

  login() {
    const formValues = this.formGenerator.getValues();
    console.log('FORM VALUES', formValues);

   const { navigate } = this.props.navigation;
   axios.post('http://' + global.ip + '/login?gameType=URBAN', {
    withCredentials: true,
    email: formValues.email,
    pseudo: formValues.user_name,
    password: formValues.password,
    confirmPassword: formValues.confirm_password,
  })
  .then(function (response) {
    if(response.data.success != true) {
        ToastAndroid.show('Error in data(s), please check', ToastAndroid.SHORT);
    }
    else if(response.data.success == true) {
        global.user_id = response.data.data.id;
        global.userName = response.data.data.pseudo;
        console.log("rrrrrrrrrrrrrreeeeeeeeeeeeeeeeerrrrrrrrrrrr ", global.userName);
        navigate('Homepage')
    }
  })
  .catch(function (error) {
    console.log(error);
  });
}
  render() {
      const { navigate } = this.props.navigation;
    return (
        <View style={styless.container}>
        <Image source={background} style={{width:'90%', height:'30%', alignSelf:'center', resizeMode: 'contain'}}/>

                    <View style={styless.wrap_content}>
                        <GenerateForm
                            ref={(c) => {
                              this.formGenerator = c;
                            }}
                            fields= {login}
                            theme = {theme}
                        />
                    </View>
                <View >
                    <Text style={{color:'#f49e42', fontSize:10, fontFamily: 'Verdana', alignSelf:'center', textDecorationLine:'underline', marginBottom:10, marginTop:20}}
                    onPress={() => navigate('Register')} >Pas encore de compte ?</Text>
                        <Button
                            title="login"
                            style={{borderColor: "transparent",borderRadius: 20, backgroundColor:'#f49e42', width:'50%', alignSelf:'center'}}block onPress={() => this.login()}>
                            <Text style={{fontSize:15, fontFamily: 'Verdana',}} >Login</Text>
                        </Button>
                    <Text style={{color:'#f49e42', fontSize:10, fontFamily: 'Verdana', alignSelf:'center', textDecorationLine:'underline'}} onPress={() => navigate('EmailLost')}>Mot de passe oublié ?</Text>
                </View>
        </View>
    );
  }
}
