import { StackNavigator } from 'react-navigation';

import Home from './containers/home';
import EventsMain from './containers/events-main';
import Events from './containers/events';

const Navigator = StackNavigator(
  {
    Home: { screen: Home },
    EventsMain: { screen: EventsMain },
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
