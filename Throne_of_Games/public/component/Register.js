import React from 'react';
import GenerateForm from 'react-native-form-builder';
import { Text, View, StyleSheet, ImageBackground, Image, ScrollView } from 'react-native';
import { Header, Left, Right, Icon } from 'native-base';
import Button from 'apsl-react-native-button';
import {ToastAndroid} from 'react-native';
import axios from 'axios';
import Login from './Home';


import t from 'tcomb-form-native'

const Form = t.form.Form;

const styles = {
  wrapper: {
    flex: 1,
    marginTop: 150,
  },
  submitButton: {
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  left: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  container: {
    flex: 1,
    backgroundColor:'rgba(0, 0, 0, 0.8)',
    width: '100%',
    justifyContent:'center',
  },
};

const register = [
  {
    type: 'email',
    name: 'email',
    style:{color:'white'},
    required: true,
    icon: 'ios-person',
    label: 'email',
  },
  {
    type: 'text',
    name: 'user_name',
    required: true,
    icon: 'ios-person',
    label: 'Username',
  },
  {
    type: 'password',
    name: 'password',
    icon: 'ios-lock',
    required: true,
    label: 'Password',
  },
  {
    type: 'password',
    name: 'confirm-password',
    icon: 'ios-lock',
    required: true,
    label: 'confirm-Password',
  },
];

import background from '../images/ThronesOfGame.png';
import theme from '../../form-theme';

export default class Register extends React.Component {

  register() {
    const formValues = this.formGenerator.getValues();
    console.log('FORM VALUES', formValues);
    console.log('EEEEEEE', formValues.email);

     let data = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: formValues.email,
        pseudo: formValues.user_name,
        password: formValues.password,
        confirmPassword: formValues.confirm_password,
      }),
  }
  const { navigate } = this.props.navigation;


  return fetch('http://' + global.ip + '/signup?gameType=URBAN', data)
            .then(function (response) {
                console.log("sssssssssiiiiiiiiiiiizzzzzzzzzzzzeeeeeeeeeee ", response._bodyInit._data.size);
                if(response._bodyInit._data.size != 99) {
                    ToastAndroid.show('Account created', ToastAndroid.SHORT);


                    axios.post('http://' + global.ip + '/login?gameType=URBAN',  {
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
                         navigate('Homepage')
                     }
                   })
                   .catch(function (error) {
                     console.log(error);
                   });

                } else if (response._bodyInit._data.size == 99 ||  response.status != 200){
                    ToastAndroid.show('An error occured the creation of the account', ToastAndroid.SHORT);
            }
            })
        }

  render() {
      const { navigate } = this.props.navigation;
    return (
            <View style={styles.container}>
            <ScrollView>
                <Image source={background} style={{width:'90%', height:150, alignSelf:'center', resizeMode: 'contain'}}/>

                <View style={{background:'rgba(0, 0, 0, 0,8 )'}}>
                    <GenerateForm
                        ref={(c) => {
                          this.formGenerator = c;
                        }}
                        fields = {register}
                        theme = {theme}/>
                </View>


                <View style={styles.submitButton}>
                  <Button title="Register" style={{borderColor: "transparent",borderRadius: 20, backgroundColor:'#f49e42', width:'50%', alignSelf:'center'}} block onPress={() =>  this.register()}>
                    <Text style={{fontSize:15, fontFamily: 'Verdana',}}>Register</Text>
                  </Button>
                  <Text style={{color:'#f49e42', fontSize:10, fontFamily: 'Verdana', alignSelf:'center', textDecorationLine:'underline', marginBottom:10, marginTop:20}}
                  onPress={() => navigate('Login')} >Vous avez deja un compte ?</Text>

                </View>
            </ScrollView>
              </View>
    );
  }
}
