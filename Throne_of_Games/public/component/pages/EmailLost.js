import React from 'react';
import GenerateForm from 'react-native-form-builder';
import { Text, View, StyleSheet, ImageBackground, ScrollView, Image } from 'react-native';
import { Header, Left, Right, Icon } from 'native-base';
import Button from 'apsl-react-native-button';
import {ToastAndroid} from 'react-native';
import axios from 'axios';

import t from 'tcomb-form-native';

const Form = t.form.Form;

const User = t.struct({
  email: t.String,
});
const email = [
  {
    type: 'email',
    name: 'email',
    required: true,
    icon: 'ios-person',
    label: 'email',
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

import background from '../../images/ThronesOfGame.png';
import theme from '../../../form-theme';

export default class EmailLost extends React.Component {

      handleSubmit = () => {
        const value = this._form.getValue();
        console.log('value: ', value);
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
                              fields= {email}
                              theme = {theme}
                          />
                      </View>
                  <View >
                          <Button
                              title="login"
                              style={{borderColor: "transparent",borderRadius: 20, backgroundColor:'#f49e42', width:'50%', alignSelf:'center'}}
                              block onPress={() => navigate('Login')}>
                              <Text style={{fontSize:15, fontFamily: 'Verdana',}} >VALIDER</Text>
                          </Button>
                  </View>
          </View>
      );
    }
  }