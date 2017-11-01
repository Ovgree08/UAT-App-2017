import React from 'react';
import { connect } from 'react-redux';

import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import { fetchOrganizations } from '../redux/modules/organizations';

const Separator = () => <View style={styles.separator} />;

class Events extends React.Component {
  renderItem = ({ item }) => {
    const date = new Date(item.date);
    date.setHours(0, 0, 0, 0);
    const today = new Date(Date.now());
    today.setHours(0, 0, 0, 0);

    const bg =
      date < today ? '#4eb5e2' : date.toString() === today.toString() ? '#ffa200' : '#0f407b';

    const { navigation } = this.props;
    const { organization } = navigation.state.params;
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('EventsMain', { organization, item });
        }}
      >
        <View style={styles.listItem}>
          <View
            style={{
              flex: 0,
              flexDirection: 'column',
              width: 40,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 1,
              borderColor: 'black',
            }}
          >
            <Text style={{ fontSize: 10 }}>
              {date
                .toDateString()
                .split(' ')[1]
                .substr(0, 3)
                .toUpperCase()}
            </Text>
            <Text style={{ fontSize: 20 }}>
              {date.toDateString().split(' ')[2]}
            </Text>
            <Text style={{ fontSize: 8 }}>
              {date.toDateString().split(' ')[3]}
            </Text>
          </View>
          <View style={{ flex: 0 }}>
            <Image
              defaultSource={require('../../assets/notfound.jpg')}
              source={{ uri: `http://162.243.240.17/${item.photo}`}}
              style={{ width: 105, height: 65 }}
            />
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              backgroundColor: bg,
              padding: 10,
            }}
          >
            <View>
              <Text style={styles.text}>{item.name}</Text>
            </View>
            <View>
              <Text style={styles.smalltext}>{item.location}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  keyExtractor(item) {
    return item.id;
  }
  render() {
    const { navigation, events } = this.props;
    const { organization } = navigation.state.params;

    console.log('events', events)

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.left}>
            <Text style={styles.orgName}>{organization.username}</Text>
            <Text style={styles.events}>EVENTS</Text>
          </View>
          <View style={styles.right}>
            <View style={styles.row}>
              <Text style={styles.light}>Upcoming</Text>
              <View style={[styles.box, { backgroundColor: '#0f407b' }]} />
            </View>
            <View style={styles.row}>
              <Text style={styles.light}>Today</Text>
              <View style={[styles.box, { backgroundColor: '#ffa200' }]} />
            </View>
            <View style={styles.row}>
              <Text style={styles.light}>Past</Text>
              <View style={[styles.box, { backgroundColor: '#4eb5e2' }]} />
            </View>
          </View>
        </View>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <FlatList
            style={styles.flatList}
            data={events}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
          />
        </View>
      </View>
    );
  }
}

Events.navigationOptions = {
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
  header: {
    flex: 0,
    flexDirection: 'row',
    width: '100%',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  left: {
    flex: 0,
  },
  right: {
    flex: 0,
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  orgName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  events: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4eb6e2',
  },
  light: {
    fontSize: 12,
    color: '#555',
    textAlign: 'right',
  },
  box: {
    width: 25,
    height: 10,
    marginLeft: 10,
  },
  flatList: {
    flex: 1,
    padding: 10,
  },
  listItem: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 10,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  smalltext: {
    fontSize: 12,
    color: 'white',
  },
});

export default connect(state => ({
  events: state.events.events,
}))(Events);
