import React from 'react';
import { Text, View, StyleSheet, ImageBackground, Dimensions, FlatList } from 'react-native';
import { Header, Left, Right, Icon} from 'native-base';
import  Button  from 'apsl-react-native-button';
import GenerateForm from 'react-native-form-builder';
import { SearchBar } from 'react-native-elements';
import TournamentCreate from './TournamentCreate';
import axios from 'axios';

const { width } = Dimensions.get('window')

import background from '../images/throne.jpg';


export default class Tournament extends React.Component {
    static navigationOptions = {
        drawerIcon: ({ tintColor }) => (
            <Icon name="trophy" style={{ fontSize:24, color: tintColor }} />
        )
    };

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
        this.tournamentSearch();
    }

    tournamentSearch() {
        this.setState({ loading: true });
        const formValues = this.formGenerator.getValues();

          axios.post('http://' + global.ip + '/tournament/suggestions/' + formValues.Nom + '?gameType=' + global.gametype, {
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
            <Text style={styles.Text2}>{item.name}</Text>
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
             <View style={styles.container}>

                <View style={styles.menu}>
                <Text style={styles.typesport}>{this.state.sport}</Text>

                    <Text style={styles.welcome}>Tournois !</Text>

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
                            this.tournamentSearch()}>Valider</Text>

                     <Button style={{backgroundColor: 'orange', width: 50, alignSelf: 'center', marginTop: 30, marginBottom: 30, borderRadius: 50}} textStyle={{fontSize: 25, color: 'white'}}
                           onPress={ () => navigate('TournamentCreate') }
                       >+</Button>

                </View>
            </View>
        </ImageBackground>

        );
    }
}

    const styles = StyleSheet.create({
    container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    },

    typesport: {
        textDecorationLine:'underline',
        color: 'white',
        fontFamily: 'verdana',
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: "center",
        marginLeft:  60,
        marginRight:  60,
    },

    menu: {
    backgroundColor: 'black',
    opacity:0.8,
    width:'80%',
    },

    View: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    color: 'white',
    },

    Text: {
      color: "#1E90FF",
      fontFamily: 'verdana',
      marginTop: 10,
      marginBottom: 10,
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

    const liguecreate = [
        {
            type: 'text',
            name: 'Nom',
            required: false,
            icon: 'ios-person',
            label: 'Rechercher',
          },

    ];
