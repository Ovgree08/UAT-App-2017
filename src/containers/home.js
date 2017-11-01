import React from 'react';
import { connect } from 'react-redux';

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

import { fetchOrganizations } from '../redux/modules/organizations';
import { fetchEvents } from '../redux/modules/events';

const Separator = () => <View style={styles.separator} />;

class Home extends React.Component {
  state = {
    searchText: '',
    loadingId: null,
  };
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(fetchOrganizations());
  }
  renderItem = ({ item }) => {
    const { navigation } = this.props;
    return (
      <TouchableOpacity
        onPress={() => {
          this.setState({ loadingId: item.id });
          this.props
            .dispatch(fetchEvents(item.id))
            .then(() => {
              this.setState({ loadingId: null });
              navigation.navigate('Events', { organization: item });
            })
            .catch(err => {
              this.setState({ loadingId: null });
              alert(err);
            });
        }}
      >
        <View style={styles.listItem}>
          <View style={{ flex: 0 }}>
            <Image
              defaultSource={require('../../assets/notfound.jpg')}
              source={{ uri: `http://162.243.240.17/${item.avatar}`}}
              style={{ width: 60, height: 60 }}
            />
          </View>
          <View style={{ flexDirection: 'column', marginTop: 2, paddingHorizontal: 20, justifyContent: 'flex-start' }}>
            <View>
              <Text style={styles.text}>
                {item.username}
                {item.id === this.state.loadingId && ' (Loading)'}
              </Text>
            </View>
            <View><Text style={styles.smallText}>Description goes here</Text></View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  keyExtractor(item) {
    return item.id;
  }
  render() {
    const { navigation, organizations } = this.props;
    const { searchText } = this.state;

    const filteredOrganizations = organizations.filter(org => {
      if (searchText === '') return true;
      if (org.username.toLowerCase().startsWith(searchText.toLowerCase()))
        return true;
    });

    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="dark-content"
        />
        {this.props.loading
          ? <View><Text>Loading</Text></View>
          : <View>
              <View style={styles.searchContainer}>
                <TextInput
                  style={styles.searchInput}
                  onChangeText={searchText => this.setState({ searchText })}
                  value={this.state.text}
                  placeholder="Search"
                />
              </View>
              <Separator />
              <FlatList
                style={styles.flatList}
                ItemSeparatorComponent={Separator}
                data={filteredOrganizations}
                keyExtractor={this.keyExtractor}
                renderItem={this.renderItem}
              />
            </View>}
      </View>
    );
  }
}

Home.navigationOptions = {
  title: ' ',
  headerStyle: {
    backgroundColor: 'white',
    paddingTop: 0,
    height: 60,
    shadowOpacity: 0,
    justifyContent: 'center'
  },
  headerLeft: (
    <Image
      style={{ height: 40, width: 40, marginLeft: 10 }}
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
  searchContainer: {
    marginVertical: 20,
    flex: 0,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  searchInput: {
    fontSize: 18,
    height: 40,
    flex: 1,
    borderColor: '#4eb5e2',
    borderWidth: 1,
    color: '#4eb5e2',
    padding: 10,
  },
  flatList: {
    flex: 1,
  },
  listItem: {
    paddingVertical: 15,
    flex: 1,
    paddingHorizontal: 10,
    flexDirection: 'row'
  },
  separator: {
    backgroundColor: '#bbb',
    height: 1,
    marginHorizontal: 10,
  },
  text: {
    color: '#0f407b',
    fontWeight: '500',
    fontSize: 18,
    marginBottom: 5
  },
  smallText: {
    color: '#979797',
    fontSize: 12
  }
});

export default connect(state => ({
  loading: state.organizations.loading,
  organizations: state.organizations.organizations,
  eventsLoading: state.events.loading,
}))(Home);
