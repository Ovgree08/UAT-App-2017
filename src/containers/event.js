import React from 'react';
import { connect } from 'react-redux';
import { startAuth, loadAuth, errorAuth, logout } from '../redux/modules/user';
import axios from 'axios';

import { fetchTests } from '../redux/modules/tests';
import { fetchScores } from '../redux/modules/scores';
import { fetchAthletes } from '../redux/modules/athletes';

import Tabs from '../components/tabs';
import Notify from '../components/notify';
import Scores from '../components/scores';
import AthleteBar from '../components/athlete-bar';

import {
  Modal,
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';

import prompt from 'react-native-prompt-android';

class Event extends React.Component {
  state = {
    tabIndex: 'overall',
  };

  logout = () => {
    this.props.dispatch(logout());
  };

  addAthlete = () => {
    this.props.navigation.navigate('AthleteForm', {
      item: this.props.navigation.state.params.item,
    });
  };

  beginAuth = () => {
    prompt(
      'Enter password',
      '',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: password => {
            axios
              .post('http://162.243.240.17:3000/auth', {
                id: this.props.navigation.state.params.item.id,
                password: password,
              })
              .then(data => {
                if (data.data.success === true) {
                  this.props.dispatch(loadAuth(data.data));
                } else {
                  alert(data.data.message);
                }
              })
              .catch(err => alert(err));
          },
        },
      ],
      {
        type: 'secure-text',
        cancelable: false,
        defaultValue: '',
        placeholder: 'placeholder',
      }
    );
  };

  changeTab = tabIndex => {
    this.setState({
      tabIndex,
    });
  };

  componentDidMount() {
    if (this.props.navigation.state.params.item.id) {
      this.props.dispatch(
        fetchTests(this.props.navigation.state.params.item.id)
      );
      this.props.dispatch(
        fetchScores(this.props.navigation.state.params.item.id)
      );
      this.props.dispatch(
        fetchAthletes(this.props.navigation.state.params.item.id)
      );
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <View>
              <Text style={styles.heading}>UAT ASSESSMENT</Text>
            </View>
            <View>
              <Text style={styles.blueText}>Leaderboard</Text>
            </View>
          </View>
          <View style={{ flex: 0 }}>
            {this.props.token ? (
              <TouchableOpacity style={styles.button} onPress={this.logout}>
                <Text style={styles.buttonText}>LOGOUT</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.button} onPress={this.beginAuth}>
                <Text style={styles.buttonText}>ADMIN</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {this.props.loading ? (
          <Notify>Loading</Notify>
        ) : this.props.tests.length > 0 ? (
          <Tabs
            tests={this.props.tests}
            onTabChange={this.changeTab}
            tabIndex={this.state.tabIndex}
          />
        ) : (
          <Notify>No Tests Found</Notify>
        )}
        {this.props.loading === false && (
          <Scores
            tabIndex={this.state.tabIndex}
            athletes={this.props.athletes}
            scores={this.props.scores}
            tests={this.props.tests}
            editable={this.props.token !== null}
          />
        )}
        {this.props.token && <AthleteBar onPress={this.addAthlete} />}
      </View>
    );
  }
}

Event.navigationOptions = {
  headerTintColor: '#0f407b',
  headerStyle: {
    backgroundColor: 'white',
    paddingTop: 0,
    height: 60,
    shadowOpacity: 0,
    justifyContent: 'center',
  },
  headerTitle: (
    <Image
      style={{ height: 23, width: 65 }}
      source={require('../../assets/stormLogo.png')}
    />
  ),
  headerRight: (
    <Image
      style={{ height: 40, width: 40, marginRight: 10 }}
      source={require('../../assets/logo.png')}
    />
  ),
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  row: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
  },
  blueText: {
    color: '#4eb5e2',
    fontSize: 14,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
  },
  button: {
    padding: 15,
    minWidth: 125,
    backgroundColor: '#ffa200',
    borderColor: '#b27100',
    borderWidth: 1,
  },
});

export default connect(state => ({
  token: state.user.token,
  tests: state.tests.tests,
  athletes: state.athletes.athletes,
  scores: state.scores.scores,
  loading:
    state.tests.loading === true ||
    state.athletes.loading === true ||
    state.scores.loading === true,
}))(Event);
