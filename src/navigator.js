import { StackNavigator } from 'react-navigation';

import Home from './containers/home';
import Event from './containers/event';
import Events from './containers/events';

const Navigator = StackNavigator(
  {
    Home: { screen: Home },
    Event: { screen: Event },
    Events: { screen: Events },
  },
  {
    navigationOptions: {
      headerStyle: {
        backgroundColor: 'white',
        shadowOpacity: 0,
      },
    },
  }
);

export default Navigator;
