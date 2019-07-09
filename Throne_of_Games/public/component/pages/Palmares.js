import React from 'react';
import GenerateForm from 'react-native-form-builder';
import { Text, View, StyleSheet, ImageBackground, ScrollView, Image, Alert, Dimensions} from 'react-native';
import { Header, Left, Right, Icon } from 'native-base';
import Button from 'apsl-react-native-button';
import axios from 'axios';

const { width } = Dimensions.get('window')

import background from '../../images/throne.jpg';
export default class CV extends React.Component{
    constructor(){
        super();
        this.state ={
            sport:'',
        }
    }
    componentWillMount() {
          const { navigate } = this.props.navigation;
          axios.get('http://' + global.ip + '/user/' + global.user_id + '/achievements?gameType=' + global.gametype, {
           withCredentials: true,
         })
         .then(function (response) {
             console.log("idddddddddddddddddddddddddddddd ", global.user_id);

           console.log("rrrrrrrrrreeeeeeeeeeeesssssssssssssssspppppppp ", response.status)
           console.log("ppppppppppppaaaaaaaaaallllllllllmmmmmmmmmmmmaaaaaaaaarrrrrrreeeeeeeeeeesssssssss ", response.data.data);
       })
         .catch(function (error) {
           console.log(error);
         });
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
            <Text style={styles.titreP}>PALMARÈS</Text>
                <Button style={styles.button} onPress={() =>
                    navigate('CV')}>CV</Button>
                <Button style={styles.button}
                onPress={() =>
                    navigate('Bromance')}>BROMANCE</Button>
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
    button: {
        backgroundColor: '#f49e42'
    }
    });
