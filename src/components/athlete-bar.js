import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default class AthleteBar extends React.Component {
  render() {
    return (
      <TouchableOpacity style={styles.container} onPress={this.props.onPress}>
        <View style={styles.button}>
          <FontAwesome name="plus" size={24} color="white" />
        </View>
        <Text>Add Athlete</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    padding: 10,
  },
  button: {
    backgroundColor: 'green',
    borderRadius: 32,
    height: 32,
    width: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
});
