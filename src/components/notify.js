import React from 'react';

import { View, Text } from 'react-native';

class Loading extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text>{this.props.children}</Text>
      </View>
    );
  }
}

export default Loading;
