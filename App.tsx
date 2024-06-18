import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useEffect} from 'react';
import {enablePragma, initDB} from './data/db';
import AddCategoryScreen from './screens/AddCategoryScreen';
import DetailsScreen from './screens/DetailsScreen';
import HomeScreen from './screens/HomeScreen';

const Stack = createNativeStackNavigator();

function App() {
  useEffect(() => {
    async function init() {
      await initDB();
    }
    enablePragma();
    init();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="AddCategory" component={AddCategoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
