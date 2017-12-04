import React from 'react';
import _ from 'lodash';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
} from 'react-native';

import Athlete from './athlete-view';

const Separator = () => <View style={styles.separator} />;

class Scores extends React.Component {
  state = {
    activeItem: null,
    modalOpen: false,
  };

  toggleModal = item => {
    this.setState({
      modalOpen: true,
      activeItem: item,
    });
  };

  closeModal = () => {
    this.setState({
      modalOpen: false,
      activeItem: null,
    });
  };

  getOverall = () => {
    return this.props.athletes.map(a => {
      let sum = 0;
      let scoreCount = 0;

      this.props.tests.forEach(t => {
        let score = _.find(this.props.scores, {
          test_id: t.id,
          user_id: a.id,
        });
        if (score) {
          scoreCount++;
          sum += score.score;
        }
      });

      a.score = sum !== 0 ? (sum / scoreCount).toFixed(2) : 'N/A';
      return a;
    });
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

  getData = () => {
    if (this.props.tabIndex === 'overall') {
      return this.getOverall();
    }

    const test = this.props.tests[this.props.tabIndex];

    return this.props.athletes.map(a => {
      let score = _.find(this.props.scores, {
        test_id: test.id,
        user_id: a.id,
      });
      a.result = score ? score.performance + this.getSuffix(test) : 'N/A';
      a.score = score ? score.score : 'N/A';
      return a;
    });
  };

  renderItem = ({ item, index, ...rest }) => {
    return this.props.tabIndex === 'overall' ? (
      <View style={styles.listItem}>
        <View style={{ width: '12%' }}>
          <Text style={styles.number}>{index + 1}</Text>
        </View>
        <View style={{ width: '73%' }}>
          <TouchableOpacity onPress={this.toggleModal.bind(null, item)}>
            <Text style={styles.name}>{item.athlete_name}</Text>
          </TouchableOpacity>
        </View>
        <View style={{ width: '15%' }}>
          <Text style={styles.score}>{item.score}</Text>
        </View>
      </View>
    ) : (
      <View style={styles.listItem}>
        <View style={{ width: '12%' }}>
          <Text style={styles.number}>{index + 1}</Text>
        </View>
        <View style={{ width: '58%' }}>
          <TouchableOpacity onPress={this.toggleModal.bind(null, item)}>
            <Text style={styles.name}>{item.athlete_name}</Text>
          </TouchableOpacity>
        </View>
        <View style={{ width: '15%' }}>
          <Text style={styles.score}>{item.result}</Text>
        </View>
        <View style={{ width: '15%' }}>
          <Text style={styles.score}>{item.score}</Text>
        </View>
      </View>
    );
  };

  keyExtractor = item => item.id;

  render() {
    const data = this.getData();
    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        {this.props.tabIndex === 'overall' ? (
          <View
            style={{
              flex: 0,
              flexDirection: 'row',
              width: '100%',
              paddingHorizontal: 15,
              paddingTop: 20,
            }}
          >
            <View style={{ width: '85%' }} />
            <View style={{ width: '15%' }}>
              <Text style={styles.heading}>score</Text>
            </View>
          </View>
        ) : (
          <View
            style={{
              flex: 0,
              flexDirection: 'row',
              width: '100%',
              paddingHorizontal: 15,
              paddingTop: 20,
            }}
          >
            <View style={{ width: '70%' }} />
            <View style={{ width: '15%' }}>
              <Text style={styles.heading}>result</Text>
            </View>
            <View style={{ width: '15%' }}>
              <Text style={styles.heading}>score</Text>
            </View>
          </View>
        )}

        <FlatList
          style={styles.flatList}
          ItemSeparatorComponent={Separator}
          data={data}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
        />

        <Modal
          visible={this.state.modalOpen}
          animationType="fade"
          presentationStyle="overFullScreen"
          transparent={true}
        >
          <Athlete
            onClose={this.closeModal}
            item={this.state.activeItem}
            scores={this.props.scores}
            tests={this.props.tests}
          />
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flatList: {
    flex: 1,
    width: '100%',
  },
  listItem: {
    paddingVertical: 10,
    flex: 1,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  separator: {
    backgroundColor: '#bbb',
    height: 1,
    marginHorizontal: 15,
  },
  number: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#aabac1',
    paddingHorizontal: 10,
  },
  name: {
    color: '#0f407b',
  },
  score: {
    textAlign: 'center',
  },
  heading: {
    textAlign: 'center',
    color: '#4eb5e2',
  },
});

export default Scores;
