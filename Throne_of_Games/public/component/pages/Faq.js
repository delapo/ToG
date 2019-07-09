import React from 'react';
import { Text, View, StyleSheet, ImageBackground, Image, TouchableHighlight, ScrollView } from 'react-native';
import { Header, Left, Right, Icon } from 'native-base';
import OpenDrawer from '../../js/Menu/OpenDrawer'
import Button from 'apsl-react-native-button';

import t from 'tcomb-form-native'

import background from '../../images/throne.jpg';

export default class Faq extends React.Component {
    constructor(){
        super();
        this.state ={
            status1:false,
            status2:false,
            status3:false,
            status4:false,
            sport:'',

        }
    }
    toggleStatus1(){

        if (this.state.status2) { this.setState({ status2:!this.state.status2, }); }
        if(this.state.status3) { this.setState({ status3:!this.state.status3, }); }
        if(this.state.status4) { this.setState({ status4:!this.state.status4, }); }

        this.setState({
            status1:!this.state.status1,
        });
    }
    toggleStatus2(){

        if (this.state.status1) { this.setState({ status1:!this.state.status1, }); }
        if(this.state.status3) { this.setState({ status3:!this.state.status3, }); }
        if(this.state.status4) { this.setState({ status4:!this.state.status4, }); }

        this.setState({
            status2:!this.state.status2,
        });
    }
    toggleStatus3(){
        if(this.state.status1) { this.setState({ status1:!this.state.status1, }); }
        if (this.state.status2) { this.setState({ status2:!this.state.status2, }); }
        if(this.state.status4) { this.setState({ status4:!this.state.status4, }); }

        this.setState({
            status3:!this.state.status3,
        });
    }
    toggleStatus4(){

        if(this.state.status1) { this.setState({ status1:!this.state.status1, }); }
        if (this.state.status2) { this.setState({ status2:!this.state.status2, }); }
        if(this.state.status3) { this.setState({ status3:!this.state.status3, }); }

        this.setState({
            status4:!this.state.status4,
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

      <ScrollView style={{ alignSelf: 'stretch', marginTop: 50 }}>

          <View>
              <TouchableHighlight style={{backgroundColor: 'rgba(0, 0, 0, 0.8)', alignSelf:'center', alignItems:'center', marginTop: 30, width:'90%'}} onPress={()=>this.toggleStatus1()} >
                <Text style={styles.menu}>ToG C'est quoi?</Text>
              </TouchableHighlight>
              <TouchableHighlight style={{backgroundColor: 'rgba(0, 0, 0, 0.8)', alignSelf:'center', alignItems:'center', marginTop: 10, width:'90%'}} onPress={()=>this.toggleStatus2()} >
                <Text style={styles.menu}>Le classement ATP, ça marche comment ?</Text>
              </TouchableHighlight>
              <TouchableHighlight style={{backgroundColor: 'rgba(0, 0, 0, 0.8)', alignSelf:'center', alignItems:'center', marginTop: 10, width:'90%'}} onPress={()=>this.toggleStatus3()} >
                <Text style={styles.menu}>Calcul des points: c'est quoi le bordel ?</Text>
              </TouchableHighlight>
              <TouchableHighlight style={{backgroundColor: 'rgba(0, 0, 0, 0.8)', alignSelf:'center', alignItems:'center', marginTop: 10, width:'90%'}} onPress={()=>this.toggleStatus4()} >
                <Text style={styles.menu}>Communauté: crée ton propre royaume</Text>
              </TouchableHighlight>
          </View>

        {this.state.status1 ?
        <View style={styles.Carre}>
            <View style={styles.View} >
                <Text style={{color: 'white', fontFamily: 'verdana', fontWeight: 'bold', justifyContent: 'center', fontSize: 18}}>ToG, C'est quoi ?</Text>
                <Text style={styles.TextContent}>Throne Of Games, c’est le classement ATP du jeu, de tous les jeux. Le support indispensable à toute communauté de compétiteurs qui se respectent …</Text>
                <Text style={styles.TextContent}>Throne Of Games, c’est avant tout l’outil ultime pour briller aux yeux du monde sur des jeux In Real Life. Ici tu défies en ligne, tu castagnes en vrai.</Text>
                <Text style={styles.TextContent}>Pour démarrer, choisis ton Game, joue contre tes potes, éclate-les, rentre ton score sur le site, grimpe au classement à chaque victoire… et conquiers le TRONE !</Text>
            </View>
        </View> : null }

        {this.state.status2 ?
        <View style={styles.Carre2}>
            <View style={styles.View} >
                <Text style={{color: 'white', fontFamily: 'verdana', fontWeight: 'bold', justifyContent: 'center', fontSize: 18}}>Le classemnt ATP, ça marche comment ?</Text>
                <Text style={styles.TextContent}>Pour conquérir le trône, tu défies qui tu veux, et tu marques des points quand tu gagnes. Si tu piges rien aux points que tu gagnes, lis-donc la partie « Calcul des points : c’est quoi ce bordel ? »</Text>
                <Text style={styles.TextContent}>Dans le classement général « Worldwide » ToG, tous les matchs sont comptabilisés Pour un maximum d’équité et pour permettre à tout le monde d’atteindre le graal, Quelques petites règles :</Text>
                <Text style={{ color: 'orange', marginTop: 10, marginBottom: 10 }}>Le classement roulant sur 6 mois</Text>
                <Text style={styles.TextContent}>Tous les matchs au-delà de 6 mois sont hors classement général. Cela permet à tout joueur d’avoir une chance d’être 1er en 6 mois max. Mais t’inquiète, on garde tes vieilles perf en historique, pour que tu puisses enfin prouver à tes potes que t’es invaincus en compet’ officiel depuis 10 ans.</Text>
                <Text style={{ color: 'orange', marginTop: 10, marginBottom: 10 }}>Le plafond à 10 matchs</Text>
                <Text style={styles.TextContent}>Si tu as fait plus de 10 matchs lors des 6 derniers mois (et on te le souhaite !), alors seules des 10 derniers résultats seront pris en compte. Sinon, le premier ne sera pas forcément le meilleur, mais celui qui jouera le plus. Et on imagine que bon nombre d’entre vous sont des No Life prêt à passer 15h par jour à taper le carton.</Text>
                <Text style={{ color: 'orange', marginTop: 10, marginBottom: 10 }}>Le plafond à 3 matchs par adversaire</Text>
                <Text style={styles.TextContent}>On ne peut pas rencontrer plus de 3 fois les mêmes adversaires. Parce que c’est pas très réaliste d’apparaitre dans le classement si on joue toujours contre les mêmes. On a mis 3 pour permettre de jouer un match, puis la revanche et éventuellement la belle.</Text>
                <Text style={styles.TextContent}>Si tu joues un 4ème match contre les mêmes adversaires, pas de souci : le 1er match sera juste décomptabilisé du classement.</Text>
            </View>
        </View> : null }

        {this.state.status3 ?
        <View style={styles.Carre2}>
            <View style={styles.View} >
                <Text style={{color: 'white', fontFamily: 'verdana', fontWeight: 'bold', justifyContent: 'center', fontSize: 18}}>Calcul des points: c'est quoi ce bordel ?</Text>
                <Text style={styles.TextContent}>T’as envie de nous insulter parce que tu comprends rien aux points que tu gagnes ? Rassure-toi, t’es pas le premier.</Text>
                <Text style={styles.TextContent}>Mais dis-toi bien que si tu comprends pas, c’est pas parce que c’est compliqué, mais juste parce que tu es probablement intellectuellement limité.</Text>
                <Text style={styles.TextContent}>Alors on est sympa, on va essayer de te l’expliquer calmement :</Text>
                <Text style={{ color: 'orange', marginTop: 10, marginBottom: 10 }}>En gros faut éclater ton adversaire pour être bien classé</Text>
                <Text style={styles.TextContent}>Le but c’est d’être en haut du classement. Pour y parvenir, tu défies qui tu veux, et tu marques des points quand tu gagnes. Plus tu leur mets une tôle, plus tu gagnes des points. Minimum 100, Maximum 200.</Text>
                <Text style={styles.TextContent}>Tu affrontes des noobs, des nazes, des teubés ? Enfonce le clou, les laisse pas respirer, tu t'approcheras des 200 points;</Text>
                <Text style={styles.TextContent}>Tu gagnes tranquille et tu te relâche un peu pour pas trop humilier l'adversaire ? Erreur, tu diminues ton ratio, tu seras plus proche des 100 points</Text>
                <Text style={{ color: 'orange', marginTop: 10, marginBottom: 10 }}>Pour les matheux, ou les trolls qui veulent challenger notre algo, voici le détail</Text>
                <Text style={styles.TextContent}>La formule de point associée à un match est la suivante :</Text>
                <Text style={{ color: 'white' }}>TPts gagnés = 100 + (Différence de points entre les 2 équipes) / (Points de l'équipe vainqueur) x100.</Text>
                <Text style={styles.TextContent}>Une victoire apporte donc entre 100 et 200 points. Seuls les vainqueurs gagnent les points. Les perdants peuvent toujours tenter de prendre leur revanche.</Text>
                <Text style={styles.TextContent}>Exemple :</Text>
                <Text style={{ color: 'white', alignItems: 'center' }}>Je gagne 10-4, je fais 100 + (10-4)/10x100 = 160points.</Text>
                <Text style={{ color: 'white', alignItems: 'center' }}>Je gagne 10-9, je fais 100 + (10-9)/10x100 = 110points.</Text>
                <Text style={styles.TextContent}>Voila on peut pas plus t’aider. Mais si tu veux ajouter quelque chose, si t’as touours envie d’nous taper la tête contre les murs, écris-nous sur contact@throneofgames.fr</Text>
            </View>
        </View> : null }

        {this.state.status4 ?
        <View style={styles.Carre2}>
            <View style={styles.View} >
                <Text style={{color: 'white', fontFamily: 'verdana', fontWeight: 'bold', justifyContent: 'center', fontSize: 18}}>Communauté: crée ton propre royaume</Text>
                <Text style={{ color: 'orange', marginTop: 10, marginBottom: 10 }}>Publique ou privée</Text>
                <Text style={styles.TextContent}>A toi de voir si tu veux l’ouvrir qu’à un groupe restreint trié sur le volet, ou si n’importe qui peut y adhérer</Text>
                <Text style={{ color: 'orange', marginTop: 10, marginBottom: 10 }}>Invitation à rejoindre ta communauté</Text>
                <Text style={styles.TextContent}>Invite les joueurs de ton choix (en renseignant leur pseudo), ils verront apparaitre l’invitation. Tu peux aussi leur envoyer directement le lien de la communauté.</Text>
                <Text style={{ color: 'orange', marginTop: 10, marginBottom: 10 }}>Paramètre de classement</Text>
                <Text style={styles.TextContent}>Tu peux gérer ton propre classement : nombre de matchs pris en compte, plage temporelle, date de début de prise en compte des matchs. Pour qu’un match soit comptabilisé dans ta communauté, il faut cocher le nom de la communauté concerné au moment de remplir la feuille de match. Les points générés par le match prendra en compte uniquement les points de chaque joueur dans le classement de la communauté. Donc les points pris dans la communauté peuvent être différents des points pris au général.</Text>
            </View>
        </View> : null }

        </ScrollView>
      </ImageBackground>

    );
  }
}

const styles = StyleSheet.create({
  View: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    // marginTop: 50,
    padding: 20,
    color: 'white',
  },
  Carre: {
    flex: 1,
    backgroundColor: 'black',
    opacity: 0.8,
    marginTop: 40,
    marginBottom: 25,
    marginLeft: 20,
    marginRight: 20,
  },
  Carre2: {
    flex: 1,
    backgroundColor: 'black',
    opacity: 0.8,
    marginTop: 10,
    marginBottom: 25,
    marginLeft: 20,
    marginRight: 20,
  },
  TextContent: {
    color: 'white',
    marginTop: 10,
    marginBottom: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    },
    menu: {
        fontSize: 25,
        textAlign: 'center',
        marginBottom: 20,
        color: '#EFEFEF'
    },
});
