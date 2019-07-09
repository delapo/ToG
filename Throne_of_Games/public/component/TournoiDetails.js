import React from 'react';
import { Text, View, StyleSheet, ImageBackground, Dimensions, ScrollView } from 'react-native';
import { Header, Left, Right } from 'native-base';
import  Button  from 'apsl-react-native-button';
import GenerateForm from 'react-native-form-builder';
import { Icon } from 'react-native-elements';

const { width } = Dimensions.get('window')

import background from '../images/throne.jpg';

console.disableYellowBox = true;

export default class TournoiDetails extends React.Component {
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
    <ScrollView>
    <Text style={styles.typesport}>{global.gametype}</Text>

          <View style={styles.menu}>
           <Text style={styles.welcome}>Communauté de *User*</Text>
            <Text style={styles.WorldWide}>Info</Text>
            <Text style={styles.WorldWide}>Matchs</Text>


            <Text style={styles.welcome}>Nouvelle feuille de Match</Text>

            <GenerateForm
                     ref={(c) => {
                     this.formGenerator = c;
                     }}
                     fields = {liguecreate}/>

                   <View style={{  justifyContent: 'center', alignItems: 'center', alignSelf: "center",   flexDirection: 'row', marginBottom: 15, marginTop: 25 }}>
                     <Icon
                    name='face'
                    color='orange'
                   />
                    <Text>"             "</Text>

                    <Icon
                   name='face'
                   color='orange'
                   />
                 </View>



                 <View style={{  justifyContent: 'center', alignItems: 'center', alignSelf: "center",   flexDirection: 'row', marginBottom: 15 }}>
                 <GenerateForm
                          ref={(c) => {
                          this.formGenerator = c;
                          }}
                          fields = {p1}/>
                          <GenerateForm
                                   ref={(c) => {
                                   this.formGenerator = c;
                                   }}
                                   fields = {p2}/>
                          </View>




                  <View style={{  justifyContent: 'center', alignItems: 'center', alignSelf: "center",   flexDirection: 'row', marginBottom: 25 }}>
                   <Icon
                  name='face'
                  color='orange'
                 />
                 <Text>"             "</Text>

                <Icon
                name='face'
                color='orange'
                />
                </View>


                <View style={{  justifyContent: 'center', alignItems: 'center', alignSelf: "center",   flexDirection: 'row', marginBottom: 15 }}>
                <GenerateForm
                         ref={(c) => {
                         this.formGenerator = c;
                         }}
                         fields = {p3}/>
                         <GenerateForm
                                  ref={(c) => {
                                  this.formGenerator = c;
                                  }}
                                  fields = {p4}/>
                         </View>
                         </View>
                         <View style={styles.menu}>

                <View style={{  justifyContent: 'center', alignItems: 'center', alignSelf: "center",   flexDirection: 'row', marginBottom: 15 }}>
                <GenerateForm
                         ref={(c) => {
                         this.formGenerator = c;
                         }}
                         fields = {liguecreate2}/>
                         <GenerateForm
                                  ref={(c) => {
                                  this.formGenerator = c;
                                  }}
                                  fields = {liguecreate3}/>
                         </View>

            <Text style={styles.Text} onPress={() =>
             navigate('AttachTournoi')}>Rattacher à un tournoi</Text>
            <Text style={styles.Text} onPress={() =>
             navigate('AttachLigue')}>Rattacher à une ligue</Text>
            <Text style={styles.last} onPress={() =>
             navigate('Accueil')}>Valider</Text>
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
        label: 'Date',
      },
];

const liguecreate2 = [
    {
        type: 'text',
        name: 'Nom',
        width: 15,
        height: 20,
        required: true,
        icon: 'ios-person',
        label: 'Score',
      },
];

const p1 = [
    {
        type: 'text',
        name: 'Nom',
        required: true,
        icon: 'ios-person',
        label: 'Joueur 1',
      },
];

const p2 = [
    {
        type: 'text',
        name: 'Nom',
        width: 15,
        height: 20,
        required: true,
        icon: 'ios-person',
        label: 'Joueur 2',
      },
];


const p3 = [
    {
        type: 'text',
        name: 'Nom',
        required: true,
        icon: 'ios-person',
        label: 'Joueur 3',
      },
];

const p4 = [
    {
        type: 'text',
        name: 'Nom',
        width: 15,
        height: 20,
        required: true,
        icon: 'ios-person',
        label: 'Joueur 4',
      },
];

const liguecreate3 = [
    {
        type: 'text',
        name: 'Nom',
        width: 15,
        height: 20,
        required: true,
        icon: 'ios-person',
        label: 'Score',
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
  View: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 50,
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
