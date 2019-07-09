import React from 'react';
import GenerateForm from 'react-native-form-builder';
import { Text, View, StyleSheet, ImageBackground, Dimensions, ScrollView } from 'react-native';
import { Header, Left, Right, Icon } from 'native-base';
import Button from 'apsl-react-native-button';
import axios from 'axios';

const { width } = Dimensions.get('window')

import background from '../../images/throne.jpg';
import theme from '../../../form-theme';

import t from 'tcomb-form-native'

const Form = t.form.Form;

const styles = {
  wrapper: {
    backgroundColor: 'black',
    opacity:0.8,
    marginTop: 150,
    marginLeft: 30,
    marginRight: 30,
    flex: 1,
    marginBottom: 150,
    justifyContent: 'center',
    //alignItems:'center'
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

  submitButton: {
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  left: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  text: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    alignSelf:'center',
    alignItems:'center',
    textAlign: 'center',
    marginTop: 30,
    width:'90%',
    fontSize: 25,
    marginBottom: 20,
    color: '#EFEFEF'
  },
};

const profil = [
    {
        type: 'text',
        name: 'user_name',
        required: true,
        defaultValue: '',
        icon: 'ios-person',
        label: 'Change your username',
    },
    {
        type: 'email',
        name: 'email',
        required: true,
        defaultValue: '',
        icon: 'ios-person',
        label: 'Change your email',
    },
];

export default class Profil extends React.Component {
  static navigationOptions = {
    drawerIcon: ({ tintColor }) => (
        <Icon name="person" style={{ fontSize:24, color: tintColor }} />
    )
  };

    constructor(props){
        super(props);

        this.state ={
            pseudo: '',
            email : '',
            sport: '',
        }
    }
    register() {
        const formValues = this.formGenerator.getValues();
        console.log('FORM VALUES', formValues);
    }

    componentWillMount() {
          axios.post('http://' + global.ip + '/user', {
           withCredentials: true,
         })
         .then(response => {

           console.log("STATUS : ", response.status)
           console.log("PSEUDO : ", response.data.data.pseudo);
           console.log("EMAIL : ", response.data.data.email);
           console.log("PROFIL DEFAULTVALUE : ", profil[0].defaultValue);

           this.setState({
               pseudo: response.data.data.pseudo,
               email: response.data.data.email,
           });
       })
         .catch(function (error) {
           console.log(error);
         });
     }


     change() {
      const formValues = this.formGenerator.getValues();
      console.warn('FORM VALUES', formValues);

      const { navigate } = this.props.navigation;
      axios.post('http://' + global.ip + '/user?gameType=URBAN', {
       withCredentials: true,
       id: global.user_id,
       pseudo: formValues.user_name,
       email: formValues.email,
     })
     .then(function (response) {
       if(response.data.success != true) {
           ToastAndroid.show('Error in data(s), please check', ToastAndroid.SHORT);
       }
       else if(response.data.success == true) {
           console.log("USERNAME :  ", global.userName);
           console.log("ID : ", global.id);
           console.log("RESPONSE : ", response);
       }
     })
     .catch(function (error) {
       console.log(error);
     });
    }

err() {
   console.log("ERR");
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

      <ScrollView>
             <View style={styles.wrapper}>

                 <View>
                 <Text style={styles.text}>Your Username is : {this.state.pseudo}</Text>
                 <Text style={styles.text}>Your Email is : {this.state.email}</Text>
                     <GenerateForm
                         ref={(c) => {
                           this.formGenerator = c;
                         }}
                         fields = {profil}
                         theme = {theme}
                       />

                </View>
                <View style={styles.submitButton}>
                    </View>
                         <Button
                             title="Valider"
                             style={{borderColor: "transparent",borderRadius: 20, backgroundColor:'#f49e42', width:'50%', alignSelf:'center'}}block onPress={() => this.change()}
                         >
                            <Text style={{fontSize:15, fontFamily: 'Verdana'}}>Valider</Text>
                         </Button>
               </View>
        </ScrollView>
    </ImageBackground>
    );
  }
}
