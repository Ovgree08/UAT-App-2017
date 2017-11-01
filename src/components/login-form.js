import React from 'react';

import {
  Modal,
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

class LoginForm extends React.Component {
  state = {
    username: null,
    password: null,
  };
  userChange = text => {
    this.setState({
      username: text,
    });
  };
  passwordChange = text => {
    this.setState({
      password: text,
    });
  };
  submit = () => {
    this.props.onSubmit(this.state);
  };
  render() {
    return (
      <View style={[styles.container, { backgroundColor: '#eee' }]}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={this.state.username}
            onChangeText={this.userChange}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Username"
          />
        </View>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={this.state.password}
            onChangeText={this.passwordChange}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            placeholder="Password"
          />
        </View>
        <View style={styles.adjacent}>
          <TouchableOpacity onPress={this.submit}>
            <View style={styles.button}>
              <Text style={styles.text}>Submit</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.props.onCancel}>
            <View style={styles.button}>
              <Text style={styles.text}>Cancel</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  adjacent: {
    flex: 0,
    flexDirection: 'row',
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    backgroundColor: '#0f407b',
    borderRadius: 3,
  },
  input: {
    height: 40,
    width: '100%',
    padding: 10,
    backgroundColor: 'white',
  },
  inputWrapper: {
    flex: 0,
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 20,
    flexDirection: 'row',
  },
});

export default LoginForm;
