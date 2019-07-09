import React from 'react';
import { Text, View, StyleSheet, ImageBackground, Dimensions, ScrollView, FlatList } from 'react-native';
import { Header, Left, Right    }   from 'native-base';
import  Button  from 'apsl-react-native-button';
import GenerateForm from 'react-native-form-builder';
import Communaute from './Communaute';
import axios from 'axios';

import MainMenu from './MainMenu';
import { Icon } from 'react-native-elements'


const { width } = Dimensions.get('window')

import background from '../images/throne.jpg';


export default class AttachLigue extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            data: [],
            page: 1,
            sport: '',
            seed: 1,
            error: null,
            sport: '',
            refreshing: false
        };
    }

    componentDidMount() {
        this.ligSearch();
    }

    ligSearch() {
        this.setState({ loading: true });

        const formValues = this.formGenerator.getValues();

          axios.post('http://' + global.ip + '/league/suggestions/' + formValues.Nom + '?gameType=FOOSBALL', {
           withCredentials: true,
           max: 20,
           page: 0,
           shouldResolvePage: true,
       })
         .then(response => {
            this.setState({
                data: response.data.data,
                isLoading: false
            });
            console.log("data", response.data.data);
         })
         .catch(error => this.setState({ error, isLoading: false }));
    }

    renderItem = ({item}) => {
        return (
            <Text style={styles.Text}>{item.league.name}</Text>
        )
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
           <Text style={styles.welcome}>Ligues</Text>

           <GenerateForm
                    ref={(c) => {
                    this.formGenerator = c;
                    }}
                    fields = {liguecreate}
                    onValueChange={() => this.ligSearch()}
                    />

                    <View>
                        <FlatList
                            data={this.state.data}
                            renderItem={this.renderItem}
                            keyExtractor={(item, index) => index}
                        />
                    </View>

                    <Text style={styles.last} onPress={() =>
                     navigate('Matchs')}>Valider</Text>


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
        label: 'Rechercher',
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
      marginBottom: 5,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: "center",
      marginLeft:  40,
      marginRight:  40,

  },

  Text2: {
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

});
