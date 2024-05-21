import 'react-native-gesture-handler';

import {NavigationContainer} from '@react-navigation/native';
import {Text} from 'react-native';
import {StackNavigator} from './presentation/navigation/StackNsavigator';

export const MapsApp = () => {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
};
