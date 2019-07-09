import React from 'react';
import { Text, View, StyleSheet, ImageBackground, Dimensions, FlatList } from 'react-native';
import { Header, Left, Right, Icon} from 'native-base';
import  Button  from 'apsl-react-native-button';
import CommunauteCreate from './CommunauteCreate';
import CommunauteSearch from './CommunauteSearch';
import axios from 'axios';

//import { Icon } from 'react-native-elements'


const { width } = Dimensions.get('window')

import background from '../images/throne.jpg';


export default class Communaute extends React.Component {
    static navigationOptions = {
        drawerIcon: ({ tintColor }) => (
            <Icon name="people" style={{ fontSize:24, color: tintColor }} />
        )
    };

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            data: [],
            pseudo: '',
            email : '',
            sport: '',
            page: 1,
            seed: 1,
            error: null,
            refreshing: false
        };
    }

    componentDidMount() {
        axios.post('http://' + global.ip + '/user', {
         withCredentials: true,
       })
       .then(response => {

         console.log("STATUS : ", response.status)
         console.log("PSEUDO : ", response.data.data.pseudo);
         console.log("EMAIL : ", response.data.data.email);

         this.setState({
             pseudo: response.data.data.pseudo,
             email: response.data.data.email,
         });
         this.comSearch();
     })
       .catch(function (error) {
         console.log(error);
       });
    }

    comSearch() {
        console.log(this.state.pseudo, "PSEUDAL");
        this.setState({ loading: true });
          axios.post('http://' + global.ip + '/user/' + this.state.pseudo, {
           withCredentials: true,
       })
         .then(response => {
            this.setState({
                data: response.data.data.memberships,
                isLoading: false
            });
            console.log("data", response.data.data.memberships);
         })
         .catch(error => this.setState({ error, isLoading: false }));
    }

    renderItem = ({item}) => {
        return (
            <Text style={styles.Text2}>{item.community.name}</Text>
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

          <View style={styles.menu}>
           <Text style={styles.welcome}>Communautés</Text>

           {this.state.data.length == 0 ?
               <View>
                    <Text style={styles.Text}>Bah t'es un nobod ?</Text>
                    <Text style={styles.Text}>T'attends quoi pour rejoindre une communauté ?</Text>
                </View>

               :<FlatList
                   data={this.state.data}
                   renderItem={this.renderItem}
                   keyExtractor={(item, index) => index}
               />
           }
           <Button style={{backgroundColor: 'orange', width: 50, alignSelf: 'center', borderRadius: 50}}>

         <Icon
              name='search'
              color='orange'
              onPress={() =>
            navigate('CommunauteSearch')}/>
</Button>
           <Button style={{backgroundColor: 'orange', width: 50, alignSelf: 'center', marginTop: 30, marginBottom: 30, borderRadius: 50}} textStyle={{fontSize: 28, color: 'white'}}
           onPress={() =>
         navigate('CommunauteCreate')}>+</Button>
      </View>

    </ImageBackground>

    );
  }
}

const styles = StyleSheet.create({
    menu: {
    backgroundColor: 'black',
    opacity:0.8,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    },

    menu: {
    backgroundColor: 'black',
    opacity:0.8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 120,
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
