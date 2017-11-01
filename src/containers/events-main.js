import React from 'react';
import { connect } from 'react-redux';
import { startAuth, loadAuth, errorAuth } from '../redux/modules/user';
import axios from 'axios';

import {
  Modal,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import LoginForm from '../components/login-form';

class EventsMain extends React.Component {
  state = {
    modalOpen: false,
  };
  setModalVisible = open => {
    this.setState({
      modalOpen: open,
    });
  };
  submit = state => {
    this.props.dispatch(startAuth());
    setTimeout(() => {
      axios.post('http://104.236.123.82/auth', state).then(data => {
        if (data.data.success === true) {
          this.props.dispatch(loadAuth(data.data));
          this.setModalVisible(false);
        } else {
          this.props.dispatch(errorAuth(data.data));
        }
      });
    }, 1000);
  };
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            this.setModalVisible(true);
          }}
        >
          <View style={styles.button}>
            <Text style={styles.text}>
              {this.props.token ? this.props.token : 'Log In'}
            </Text>
          </View>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalOpen}
        >
          <LoginForm
            onSubmit={state => {
              this.submit(state);
            }}
            onCancel={() => {
              this.setModalVisible(false);
            }}
          />
        </Modal>
      </View>
    );
  }
}

EventsMain.navigationOptions = {
  headerTintColor: '#0f407b',
  headerStyle: {
    backgroundColor: 'white',
    paddingTop: 0,
    height: 60,
    shadowOpacity: 0,
    justifyContent: 'center'
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
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#0f407b',
    borderRadius: 3,
  },
});

export default connect(state => ({
  token: state.user.token,
}))(EventsMain);
