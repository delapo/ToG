import React from 'react';
import GenerateForm from 'react-native-form-builder';
import { Text, View, StyleSheet, ImageBackground, ScrollView, Image, Alert, Dimensions} from 'react-native';
import { Header, Left, Right, Icon } from 'native-base';
import Button from 'apsl-react-native-button';
import axios from 'axios';

const { width } = Dimensions.get('window')

import background from '../../images/throne.jpg';

export default class CV extends React.Component{


    constructor(props){
        super(props);

        this.state ={
            worsepartner:'',
            worseopponent:'',
            bestpartner:'',
            bestopponent:'',
            sport:'',
        }
    }


    componentWillMount() {
          const { navigate } = this.props.navigation;
          axios.get('http://' + global.ip + '/user/' + global.user_id + '/stats?gameType=' + global.gametype, {
           withCredentials: true,
         })
         .then(response => {
              this.setState({
                  worsepartner: response.data.data.worsePartner,
                  worseopponent: response.data.data.worseOpponent,
                  bestpartner: response.data.data.bestPartner,
                  bestopponent: response.data.data.bestOpponent,
              });
       })
         .catch(function (error) {
           console.log(error);
         });
     }

    componentDidUpdate(prevProps) {
      // Typical usage (don't forget to compare props):
        if (this.props.userID !== prevProps.userID) {
            this.fetchData(this.props.userID);
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
            <View style={styles.container}>
            <Text style={styles.titreP}>BROMANCE</Text>
                <Text style={styles.titre}>Mon wingman</Text>

                {this.state.bestpartner != null ?
                <Text style={styles.text}> {this.state.bestpartner} </Text>
                : <Text style={styles.text}>Y a pas de tendance très nette</Text> }


                <Text style={styles.titre}>Mon boulet, mon castrateur</Text>

                {this.state.bestpartner != null ?
                <Text style={styles.text}> {this.state.worsepartner} </Text>
                : <Text style={styles.text}>Y a pas de tendance très nette</Text> }

                <Text style={styles.titre}>Mon chat noir, mon tortionnaire</Text>

                {this.state.bestpartner != null ?
                <Text style={styles.text}> {this.state.worseopponent} </Text>
                : <Text style={styles.text}>Y a pas de tendance très nette</Text> }

                <Text style={styles.titre}>Ma victime, ma bitch</Text>

                {this.state.bestpartner != null ?
                <Text style={styles.text}> {this.state.bestopponent} </Text>
                : <Text style={styles.text}>Y a pas de tendance très nette</Text> }
                <Button style={styles.button} onPress={() =>
                    navigate('CV')}>CV</Button>
                <Button style={styles.button} onPress={() =>
                    navigate('Palmares')}>PALMARÈS</Button>
            </View>
            </ImageBackground>
        );
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        opacity: 0.8,
        marginTop: 100,
        marginBottom: 120,
        marginLeft: 20,
        marginRight: 20,
        alignItems: 'center',
        padding: 20,
        color: 'white',
        justifyContent: 'space-between'
    },
    titre: {
        fontSize: 16,
        color: 'white'
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

    titreP: {
        fontSize: 20,
        color: '#f49e42'
    },
    text: {
        fontSize: 12,
        color: '#488ffb',
    },
    button: {
        backgroundColor: '#f49e42'
    }
    });
