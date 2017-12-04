import React from 'react';
import _ from 'lodash';

import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

class Athlete extends React.Component {
  getOverall = () => {
    let sum = 0;
    let scoreCount = 0;

    this.props.tests.forEach(t => {
      let score = _.find(this.props.scores, {
        test_id: t.id,
        user_id: this.props.item.id,
      });
      if (score) {
        scoreCount++;
        sum += score.score;
      }
    });

    return sum !== 0 ? (sum / scoreCount).toFixed(2) : 'N/A';
  };

  getResults = test => {
    let s = {};
    let score = _.find(this.props.scores, {
      test_id: test.id,
      user_id: this.props.item.id,
    });
    s.result = score ? score.performance : 'N/A';
    s.score = score ? score.score : 'N/A';
    return s;
  };

  getSuffix = test => {
    switch (test.measuring_units) {
      case 'Inches':
        return '"';
      case 'Minutes, Seconds':
        return 'm';
      case 'Lbs':
        return 'lbs';
      case 'Meters, Centimeters':
        return 'm';
      case 'Reps':
        return '';
      case 'Seconds':
        return 's';
      case 'Feet, Inches':
        return `'`;
      default:
        return '';
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.modal}>
          <Text style={styles.name}>{this.props.item.athlete_name}</Text>
          <Text style={styles.label}>overall score</Text>
          <Text style={styles.score}>{this.getOverall()}</Text>
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <View style={{ width: '60%' }} />
            <View style={{ width: '20%' }}>
              <Text style={styles.heading}>result</Text>
            </View>
            <View style={{ width: '20%' }}>
              <Text style={[styles.heading, { textAlign: 'center' }]}>
                score
              </Text>
            </View>
          </View>
          {this.props.tests.map(t => {
            const data = this.getResults(t);
            return (
              <View style={{ flexDirection: 'row', marginTop: 10 }} key={t.id}>
                <View style={{ width: '60%' }}>
                  <Text style={styles.white}>{t.activity}</Text>
                </View>
                <View style={{ width: '20%' }}>
                  <Text style={styles.white}>
                    {data.result}
                    {this.getSuffix(t)}
                  </Text>
                </View>
                <View style={{ width: '20%' }}>
                  <Text style={[styles.white, { textAlign: 'center' }]}>
                    {data.score}
                  </Text>
                </View>
              </View>
            );
          })}
          <TouchableOpacity style={styles.button} onPress={this.props.onClose}>
            <Text style={styles.buttonText}>CLOSE</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  modal: {
    backgroundColor: '#0f407b',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0,
    width: '70%',
  },
  name: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  label: {
    color: 'white',
  },
  score: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4eb5e2',
  },
  white: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  heading: {
    color: '#4eb5e2',
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.8)',
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
  },
});

export default Athlete;
