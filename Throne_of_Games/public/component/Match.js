import React from 'react';
import { Text, View, StyleSheet, ImageBackground, Dimensions, ScrollView, TextInput } from 'react-native';
import { Header, Left, Right}   from 'native-base';
import  Button  from 'apsl-react-native-button';
import GenerateForm from 'react-native-form-builder';
import AttachTournoi from './AttachTournoi';
import AttachLigue from './AttachLigue';
import MainMenu from './MainMenu';
import { Icon } from 'react-native-elements'
import axios from 'axios';
import {ToastAndroid} from 'react-native';
import DateTime from 'react-native-customize-selected-date';
import _ from 'lodash'



const { width } = Dimensions.get('window')

import background from '../images/throne.jpg';


export default class CommunauteCreate extends React.Component {
    static navigationOptions = {
      drawerIcon: ({ tintColor }) => (
            <Icon name="face" style={{ fontSize:24, color: tintColor }} />
        )
    };

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            data: [],
            j1: [],
            j2: [],
            j3: [],
            j4: [],
            pseudo: '',
            email : '',
            text: '',
            j1name: '',
            j2name: '',
            j3name: '',
            j4name: '',
            time: '',
            date: '',
            score1:'',
            score2:'',
            page: 1,
            seed: 1,
            error: null,
            refreshing: false,
            sport: ''
        };
    }

    componentDidMount() {
        axios.post('http://' + global.ip + '/user', {
         withCredentials: true,
       })
       .then(response => {
         this.setState({
             pseudo: response.data.data.pseudo,
             email: response.data.data.email,
             j1: response.data.data,
         });
     })
       .catch(function (error) {
         console.log(error);
       });
    }

    searchUser1() {
        this.setState({ loading: true });

        console.log("value", this.state.j1name)
          axios.post('http://' + global.ip + '/user/' + this.state.j1name, {
           withCredentials: true,
       })
         .then(response => {
            this.setState({
                j1: response.data.data,
                isLoading: false
            });
            console.log("player1", this.state.p1);
         })
         .catch(error => this.setState({ error, isLoading: false }));
    }

    searchUser2() {
        this.setState({ loading: true });

          axios.post('http://' + global.ip + '/user/' + this.state.j2name, {
           withCredentials: true,
       })
         .then(response => {
            this.setState({
                j2: response.data.data,
                isLoading: false
            });
            console.log(this.state.p2);
         })
         .catch(error => this.setState({ error, isLoading: false }));
    }

    searchUser3() {
        this.setState({ loading: true });

          axios.post('http://' + global.ip + '/user/' + this.state.j3name, {
           withCredentials: true,
       })
         .then(response => {
            this.setState({
                j3: response.data.data,
                isLoading: false
            });
            console.log(this.state.p3);
         })
         .catch(error => this.setState({ error, isLoading: false }));
    }

    searchUser4() {
        this.setState({ loading: true });

          axios.post('http://' + global.ip + '/user/' + this.state.j4name, {
           withCredentials: true,
       })
         .then(response => {
            this.setState({
                j4: response.data.data,
                isLoading: false
            });
            console.log(this.state.p4);
         })
         .catch(error => this.setState({ error, isLoading: false }));
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
        <View style={styles.menu2}>
         <Text style={styles.welcome}>Matchs</Text>
         <Text style={styles.last}>Bah y a rien à montrer p'tit chat, t'attends quoi pour rentrer une feuille de match ?</Text>

            </View>
            <Text style={styles.typesport}>{this.state.sport}</Text>

           <View style={styles.menu}>
                <Text style={styles.welcome}>Nouvelle feuille de Match</Text>
           <DateTime
             date={this.state.time}
             changeDate={(date) => this.onChangeDate(date)}
             format='YYYY-MM-DD'
             renderChildDay={(day) => this.renderChildDay(day)}
           />

                  <View style={{  justifyContent: 'center', alignItems: 'center', alignSelf: "center",   flexDirection: 'row', marginBottom: 15, marginTop: 25 }}>
                    <Icon name='face' color='orange' />
                    <Text>"             "</Text>
                   <Icon name='face' color='orange' />
                </View>


                <View style={{  justifyContent: 'center', alignItems: 'center', alignSelf: "center",   flexDirection: 'row', marginBottom: 5 }}>
                    <TextInput
                    style={{height: 40, width: 100, borderColor: 'gray', borderWidth: 1,  color: 'white'}}
                    onChangeText={(text) => this.setState({j1name: text})}
                    value={this.state.j1name}
                    />

                    <TextInput
                        style={{height: 40, width: 100, borderColor: 'gray', borderWidth: 1,  color: 'white'}}
                        onChangeText={(text) => this.setState({j2name: text})}
                        value={this.state.j2name}
                    />
                </View>

                <View style={{  justifyContent: 'center', alignItems: 'center', alignSelf: "center",   flexDirection: 'row', marginBottom: 15 }}>
                    <Text style={{ color: 'white', marginRight: 75 }} onPress={() => this.searchUser1()}>Valider</Text>
                    <Text style={{ color: 'white', marginLeft: 75 }} onPress={() => this.searchUser2()}>Valider</Text>
                </View>




                <View style={{  justifyContent: 'center', alignItems: 'center', alignSelf: "center",   flexDirection: 'row', marginBottom: 25 }}>
                     <Icon name='face' color='orange' />
                     <Text>"             "</Text>

                     <Icon name='face'color='orange' />
               </View>


               <View style={{  justifyContent: 'center', alignItems: 'center', alignSelf: "center",   flexDirection: 'row', marginBottom: 5 }}>
                   <TextInput
                   style={{height: 40, width: 100, borderColor: 'gray', borderWidth: 1, color: 'white'}}
                   onChangeText={(text) => this.setState({j3name: text})}
                   value={this.state.j3name}
                   />

                   <TextInput
                       style={{height: 40, width: 100, borderColor: 'gray', borderWidth: 1, color: 'white'}}
                       onChangeText={(text) => this.setState({j4name: text})}
                       value={this.state.j4name}
                   />
                </View>

                        <View style={{  justifyContent: 'center', alignItems: 'center', alignSelf: "center",   flexDirection: 'row', marginBottom: 15 }}>
                            <Text style={{ color: 'white', marginRight: 75 }} onPress={() => this.searchUser3()}>Valider</Text>
                            <Text style={{ color: 'white', marginLeft: 75 }} onPress={() => this.searchUser4()}>Valider</Text>
                        </View>

        </View>

        <View style={styles.menu}>

           <View style={{  justifyContent: 'center', alignItems: 'center', alignSelf: "center",   flexDirection: 'row', marginBottom: 15 }}>
               <TextInput
               style={{height: 40, width: 100, borderColor: 'gray', borderWidth: 1, color: 'white'}}
               onChangeText={(text) => this.setState({score1: text})}
               value={this.state.score1}
               />

               <TextInput
               style={{height: 40, width: 100, borderColor: 'gray', borderWidth: 1, color: 'white'}}
               onChangeText={(text) => this.setState({score2: text})}
               value={this.state.score2}
               />
        </View>

            <View style={{  justifyContent: 'center', alignItems: 'center', alignSelf: "center",   flexDirection: 'row', marginBottom: 15 }}>
            <Text style={styles.Text}>Score</Text>
            <Text style={styles.Text}>Score</Text>

            </View>
           <Text style={styles.Text} onPress={() =>
            navigate('AttachTournoi')}>Rattacher à un tournoi</Text>
           <Text style={styles.Text} onPress={() =>
            navigate('AttachLigue')}>Rattacher à une ligue</Text>
           <Text style={styles.last} onPress={() =>
            this.creer()}>Valider</Text>
        </View>

         </ScrollView>

    </ImageBackground>
    );
  }
  creer() {
      const { navigate } = this.props.navigation;
      console.log("rrrrrrrrrrrrrrrrrrrrrrr jjjjjjjjj111111111111111111111111111", this.state.j1);
      console.log("rrrrrrrrrrrrrrrrrrrrrrr jjjjjjjjjj222222222222222222", this.state.j2);
      console.log("rrrrrrrrrrrrrrrrrrrrrrr jjjjjjjjjjjjjjjjj33333333333333333", this.state.j3);
      console.log("rrrrrrrrrrrrrrrrrrrrrrr jjjjjjjjjjjjjjj4444444444444444", this.state.j4);

      axios.post('http://' + global.ip + '/game?gameType=' + global.gametype, {
       withCredentials: true,
       communities: [],
       date: this.state.time,
       gameType: global.gametype,
       matchday: {},
       tournamentRound: {},
       teams: [{
           score: this.state.score1,
           teamMates: [
               {
               user:
               {
                   id: this.state.j1.id,
                   email: this.state.j1.email,
                   pseudo: this.state.j1.pseudo,
               }
           },
       {   user:
           {
               id: this.state.j2.id,
               email: this.state.j2.email,
               pseudo: this.state.j2.pseudo,
         }

       }]
   },
   {
       score: this.state.score2,
       teamMates: [
           {
           user:
           {
               id: this.state.j4.id,
               email: this.state.j4.email,
               pseudo: this.state.j4.pseudo,
           }
       },
   {   user:
       {
           id: this.state.j4.id,
           email: this.state.j4.email,
           pseudo: this.state.j4.pseudo,
     }

   }]
   }
   ]

     })
     .then(function (response) {

         console.log("ffffffffffffffffffffffffffff ", response.status);

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


      navigate('Accueil')
  }
}



const styles = StyleSheet.create({

    menu: {
    backgroundColor: 'black',
    opacity:0.8,
    marginTop: 20,
    marginLeft: 30,
    marginRight: 30
  },

  menu2: {
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
      color: '#488ffb',
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
      marginBottom: 5,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: "center",
      marginLeft:  40,
      marginRight:  40,

  },

});
