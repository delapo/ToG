import React from 'react';
import { View, Text, Button, SafeAreaView, ScrollView, Dimensions, Image, StyleSheet } from 'react-native';
import { createAppContainer, createStackNavigator, createDrawerNavigator, DrawerItems, StackActions, NavigationActions, StackNavigator } from 'react-navigation'; // Version can be specified in package.json

// Pages
import HomeScreen from '../../component/Home';

import MainMenu from '../../component/MainMenu';
import Ligues from '../../component/Ligues';
import LiguesCreate from '../../component/LiguesCreate';
import Classement from '../../component/Classement';
import Register from '../../component/Register';
import Homepage from '../../component/pages/Homepage';
import Profil from '../../component/pages/Profil';
import CV from '../../component/pages/CV';
import Palmares from '../../component/pages/Palmares';
import Bromance from '../../component/pages/Bromance';
import CommunauteCreate from '../../component/CommunauteCreate';
import Communaute from '../../component/Communaute';
import CommunauteSearch from '../../component/CommunauteSearch';
import Tournament from '../../component/Tournament';
import TournamentCreate from '../../component/TournamentCreate';
import Match from '../../component/Match';
import AttachTournoi from '../../component/AttachTournoi';
import AttachLigue from '../../component/AttachLigue';
import MatchHistory from '../../component/MatchHistory';
import CommunauteDetails from '../../component/CommunauteDetails';
import TournoiDetails from '../../component/TournoiDetails';
import Faq from '../../component/pages/Faq';
import LiguesSearch from '../../component/LiguesSearch';
import EmailLost from '../../component/pages/EmailLost';

const CustomDrawerComponent = (props) => (
    <SafeAreaView style={{ flex: 1 ,backgroundColor:'rgba(0, 0, 0, 0.8)', color:'white'}} >
        <View style= {{ height: 150, backgroundColor:'rgba(250, 250, 250, 0.2)' , alignItems: 'center', justifyContent: 'center',}}>
            <Image source={require('../../images/ThronesOfGame.png')} style={{ height: "90%", width: '90%', justifyContent:'center', resizeMode: 'contain'}} />
        </View>
        <ScrollView>
            <DrawerItems {...props} />
        </ScrollView>
    </SafeAreaView>
)

const DrawerNavigator = createDrawerNavigator({

    Login: {
        screen: HomeScreen,
        navigationOptions: {
            drawerLabel: () => null
        }
    },
    CommunauteCreate:CommunauteCreate,
    Homepage:Homepage,
    Accueil:MainMenu,
    Ligues:Ligues,
    Classement:Classement,
    Matchs:Match,
    Communautés:Communaute,
    CV:CV,
    Profil:Profil,
    Tournois:Tournament,

    EmailLost: {
        screen: EmailLost,
        navigationOptions: {
            drawerLabel: () => null
        }
    },

    AttachTournoi: {
        screen: AttachTournoi,
        navigationOptions: {
            drawerLabel: () => null
        }
    },

    AttachLigue: {
        screen: AttachLigue,
        navigationOptions: {
            drawerLabel: () => null
        }
    },


    CommunauteCreate: {
        screen: CommunauteCreate,
        navigationOptions: {
            drawerLabel: () => null
        }
    },

    TournamentCreate: {
        screen: TournamentCreate,
        navigationOptions: {
            drawerLabel: () => null
        }
    },

    CommunauteSearch: {
        screen: CommunauteSearch,
        navigationOptions: {
            drawerLabel: () => null
        }
    },

    Register: {
        screen: Register,
        navigationOptions: {
            drawerLabel: () => null
        }
    },

    LiguesCreate: {
        screen: LiguesCreate,
        navigationOptions: {
            drawerLabel: () => null
        }
    },


    Bromance: {
        screen: Bromance,
        navigationOptions: {
            drawerLabel: () => null
        }
    },

    Faq: {
        screen: Faq,
        navigationOptions: {
            drawerLabel: () => null
        }
    },

    Palmares: {
        screen: Palmares,
        navigationOptions: {
            drawerLabel: () => null
        }
    },
     MatchHistory: {
        screen: MatchHistory,
        navigationOptions: {
            drawerLabel: () => null
        }
    },

    CommunauteDetails: {
        screen: CommunauteDetails,
        navigationOptions: {
            drawerLabel: () => null
        }
    },

    TournoiDetails: {
        screen: TournoiDetails,
        navigationOptions: {
            drawerLabel: () => null
        }
    },

    LiguesSearch: {
        screen: LiguesSearch,
        navigationOptions: {
            drawerLabel: () => null
        }
    }

}, {
    contentComponent: CustomDrawerComponent,
    contentOptions: {
        activeTintColor: 'orange',
        labelStyle: {
            color: 'rgba(200, 200, 200, 1)',
        },
    }
})

export const AppDrawerNavigator = createAppContainer(DrawerNavigator);
