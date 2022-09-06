import { registerRootComponent } from 'expo';

import TaskList from './src/screens/TaskList';
import Auth from   './src/screens/Auth';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(Auth);
