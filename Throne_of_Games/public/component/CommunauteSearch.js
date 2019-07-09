import React from 'react';
import { Text, View, StyleSheet, ImageBackground, Dimensions, FlatList } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { Header, Left, Right, Icon} from 'native-base';
import  Button  from 'apsl-react-native-button';
import GenerateForm from 'react-native-form-builder';
import Communaute from './Communaute';
import MainMenu from './MainMenu';
import axios from 'axios';

const { width } = Dimensions.get('window')

import background from '../images/throne.jpg';


export default class CommunauteSearch extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            data: [],
            page: 1,
            seed: 1,
            error: null,
            refreshing: false,
            sport:'',
        };
    }

    componentDidMount() {
        this.comSearch();
    }

    comSearch() {
        this.setState({ loading: true });

        const formValues = this.formGenerator.getValues();

          axios.post('http://' + global.ip + '/community/suggestions/' + formValues.Nom, {
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
            console.log(response.data.data);
         })
         .catch(error => this.setState({ error, isLoading: false }));
    }

    renderItem = ({item}) => {
        console.log("test");
        console.log({item});
        return (
            <Text style={styles.Text}>{item.name}</Text>
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
        const { data, loading } = this.state;
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
               <Text style={styles.welcome}>Trouve ta clique !</Text>

               <GenerateForm
                        ref={(c) => {
                        this.formGenerator = c;
                        }}
                        fields = {liguecreate}/>

                <View>
                    <FlatList
                        data={this.state.data}
                        renderItem={this.renderItem}
                        keyExtractor={(item, index) => index}
                    />
                </View>

                <Text style={styles.Text} onPress={() =>
                   this.comSearch()}>Valider</Text>

                <Text style={styles.Text} onPress={() =>
                   navigate('Communautés')}>Communaute
                </Text>

               <Text style={styles.last} onPress={() =>
                navigate('Accueil')}>Menu</Text>

             </View>

        </ImageBackground>
        );
    }
}

const liguecreate = [
    {
        type: 'text',
        name: 'Nom',
        required: false,
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
      marginBottom: 25,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: "center",
      marginLeft:  40,
      marginRight:  40,

  },

});
