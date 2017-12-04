import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';

class Tabs extends React.Component {
  changeTab = data => {
    this.props.onTabChange(data);
  };
  render() {
    return (
      <View style={styles.tabWrapper}>
        <ScrollView
          horizontal={true}
          alwaysBounceHorizontal={false}
          style={styles.tabContainer}
          contentContainerStyle={styles.tabContent}
        >
          <TouchableHighlight onPress={this.changeTab.bind(null, 'overall')}>
            <View
              style={[
                styles.tab,
                this.props.tabIndex === 'overall' && {
                  backgroundColor: '#0f407b',
                },
              ]}
            >
              <Text style={styles.tabText}>Overall Score</Text>
            </View>
          </TouchableHighlight>
          {this.props.tests.map((test, i) => (
            <TouchableHighlight
              key={test.id}
              onPress={this.changeTab.bind(null, i)}
            >
              <View
                style={[
                  styles.tab,
                  this.props.tabIndex === i && {
                    backgroundColor: '#0f407b',
                  },
                ]}
              >
                <Text style={styles.tabText}>{test.activity}</Text>
              </View>
            </TouchableHighlight>
          ))}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tabContainer: { flex: 0 },
  tabWrapper: {
    borderBottomColor: '#0f407b',
    borderBottomWidth: 2,
    flex: 0,
    width: '100%',
    marginTop: 20,
  },
  tabContent: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  tab: {
    padding: 20,
    borderRightWidth: 2,
    borderColor: '#fff',
    backgroundColor: '#4eb5e2',
    borderBottomWidth: 0,
  },
  tabText: {
    color: 'white',
    fontSize: 12,
  },
});

export default Tabs;
