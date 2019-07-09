import React from 'react';
import GenerateForm from 'react-native-form-builder';
import { Text, View, StyleSheet, ImageBackground, ScrollView, Image, Alert, Dimensions} from 'react-native';
import { Header, Left, Right, Icon } from 'native-base';
import Button from 'apsl-react-native-button';
import axios from 'axios';

const { width } = Dimensions.get('window')

import background from '../../images/throne.jpg';

export default class CV extends React.Component{
    static navigationOptions = {
        drawerIcon: ({ tintColor }) => (
            <Icon name="bookmarks" style={{ fontSize:24, color: tintColor }} />
        )
    };

    constructor(){
        super();

        this.state ={
            gamecount:'',
            victorycount:'',
            lastdefeat:'',
            lastvictory:'',
            epicfail:'',
            epicwin:'',
            sport:'',

        }
    }

    componentWillMount() {
          const { navigate } = this.props.navigation;
          axios.get('http://' + global.ip + '/user/' + global.user_id + '/cv?gameType=' + global.gametype, {
           withCredentials: true,
         })
         .then( response => {
             console.log("idddddddddddddddddddddddddddddd ", global.user_id);

           console.log("rrrrrrrrrreeeeeeeeeeeesssssssssssssssspppppppp ", response.status)
           console.log("gamecouuuuuuuuuuuuuuuuuuuuuuuuuuuuuunt ", response.data.data.gameCount);
           console.log("victoooooooooooooooooooryyyyyyyyyyycouuuuuuunt ", response.data.data.victoryCount);
           console.log("lastdeeeeefeeeeeeeeeeeeeeeaaaaaaaaaaaaaaattt ", response.data.data.lastDefeat);
           console.log("lastvicttttttttttttttttttooooooooooooryyyyyyyyyyyyy ", response.data.data.lastVictory);
           console.log("eepppppppiiiiicffail ", response.data.data.epicFail);
           console.log("zeeeeeeeeeeeeeeeepppppppiiiiiiiiicccccccwwwwwwwwwiiiiiiiinnn ", response.data.data.epicWin);

           this.setState({
               gamecount:response.data.data.gameCount,
               victorycount:response.data.data.victoryCount,
               lastdefeat:response.data.data.lastDefeat,
               lastvictory:response.data.data.lastVictory,
               epicfail:response.data.data.epicFail,
               epicwin:response.data.data.epicWin,
           });


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
            <Text style={styles.titreP}>CV</Text>

                <Text style={styles.titre}>Forme du moment</Text>
                {this.state.gamecount != 0 ?
                <Text style={styles.text}> {this.state.bestpartner} </Text>
                : <Text style={styles.text}>Une forme digne de celle de Gourcuff !</Text> }


                <Text style={styles.titre}>Ratio de victoire</Text>
                {this.state.gamecount != 0 ?
                <Text style={styles.text}> {this.state.gamecount} </Text>
                :<Text style={styles.text}>Apparemment t'as jamais osé rentrer une feuille de match</Text>}


                <Text style={styles.titre}>Plus grosse correction infligée</Text>
                {this.state.epicwin != null ?
                <Text style={styles.text}> {this.state.epicwin} </Text>
                :<Text style={styles.text}>Apparemment t'es mauvais Jack, t'as jamais infligé quoique ce soit à qui que ce soit !</Text>}


                <Text style={styles.titre}>Plus grosse humiliation subie</Text>
                {this.state.epicfail != null ?
                <Text style={styles.text}> {this.state.epicfail} </Text>
                :<Text style={styles.text}>Apparemment t'es costaud... du genre invincible !</Text>}


                <Text style={styles.titre}>Stérile depuis</Text>
                {this.state.lastvictory != null ?
                <Text style={styles.text}> {this.state.lastvictory} </Text>
                : <Text style={styles.text}>Apparemment tu connais pas le goût de la victoire !</Text> }


                <Text style={styles.titre}>Invaincu depuis</Text>

                {this.state.lastdefeat != null ?
                <Text style={styles.text}> {this.state.lastdefeat} </Text>
                :<Text style={styles.text}>Apparemment t'es costaud... du genre invincible !</Text> }


                <Button style={styles.button}
                onPress={() =>
                    navigate('Bromance')}>BROMANCE</Button>
                <Button style={styles.button}
                onPress={() =>
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
    black: {
        flex: 1,
        backgroundColor: 'black',
        opacity: 1,
        marginTop: 0,
        alignItems: 'center',
        width:'100%',
        padding: 20,
        color: 'white',
        justifyContent: 'space-between'
    },
    titre: {
        fontSize: 16,
        color: 'white'
    },

    typesport: {
        color: 'white',
        fontSize:40,
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
