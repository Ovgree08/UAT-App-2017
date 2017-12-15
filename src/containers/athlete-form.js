import React from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import { addAthlete } from '../redux/modules/athletes';

class AthleteForm extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    athleteId: '',
  };
  addAthlete = () => {
    if (
      this.state.firstName === '' ||
      this.state.lastName === '' ||
      this.state.athleteId === ''
    ) {
      return;
    }
    this.props
      .dispatch(
        addAthlete({
          ...this.state,
          event_id: this.props.navigation.state.params.item.id,
          token: this.props.token,
        })
      )
      .then(() => {
        this.props.navigation.dispatch(NavigationActions.back());
      });
  };
  render() {
    const disabled =
      this.state.firstName === '' ||
      this.state.lastName === '' ||
      this.state.athleteId === '';
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <View>
              <Text style={styles.heading}>UAT ASSESSMENT</Text>
            </View>
            <View>
              <Text style={styles.blueText}>Add Athlete</Text>
            </View>
          </View>
        </View>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={this.state.firstName}
            onChangeText={text => {
              this.setState({
                firstName: text,
              });
            }}
            placeholderTextColor="#4eb5e2"
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="First Name"
          />
        </View>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={this.state.lastName}
            onChangeText={text => {
              this.setState({
                lastName: text,
              });
            }}
            placeholderTextColor="#4eb5e2"
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Last Name"
          />
        </View>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={this.state.athleteId}
            onChangeText={text => {
              this.setState({
                athleteId: text,
              });
            }}
            keyboardType="numeric"
            placeholderTextColor="#4eb5e2"
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Athlete ID"
          />
        </View>
        {!disabled && (
          <TouchableOpacity style={styles.button} onPress={this.addAthlete}>
            <Text style={styles.buttonText}>ADD ATHLETE</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

AthleteForm.navigationOptions = {
  title: 'Add Athlete',
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
    marginBottom: 60,
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
  input: {
    height: 40,
    width: '100%',
    padding: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#4eb5e2',
    color: '#4eb5e2',
  },
  inputWrapper: {
    flex: 0,
    width: '80%',
    paddingHorizontal: 20,
    marginBottom: 20,
    flexDirection: 'row',
  },
  button: {
    padding: 15,
    minWidth: 125,
    backgroundColor: '#ffa200',
    borderColor: '#b27100',
    borderWidth: 1,
    marginTop: 60,
  },
});

export default connect(state => ({
  token: state.user.token,
}))(AthleteForm);
