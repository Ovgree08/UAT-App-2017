import { StackNavigator } from 'react-navigation';

import Home from './containers/home';
import EventMain from './containers/event';
import Events from './containers/events';
import AthleteForm from './containers/athlete-form';

const Navigator = StackNavigator(
  {
    Home: { screen: Home },
    Event: { screen: EventMain },
    Events: { screen: Events },
    AthleteForm: { screen: AthleteForm },
  },
  {
    headerMode: 'float',
    navigationOptions: {
      headerStyle: {
        backgroundColor: 'white',
        shadowOpacity: 0,
      },
    },
  }
);

export default Navigator;
