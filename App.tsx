import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useEffect} from 'react';
import {enablePragma, initDB} from './data/db';
import AddCategoryScreen from './screens/AddCategoryScreen';
import ListScreen from './screens/ListScreen';
import CategoryDetailsScreen from './screens/CategoryDetailsScreen';
import EditCategoryScreen from './screens/EditCategoryScreen';
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
        <Stack.Screen name="Details" component={ListScreen} />
        <Stack.Screen name="AddCategory" component={AddCategoryScreen} />
        <Stack.Screen name="EditCategory" component={EditCategoryScreen} />
        <Stack.Screen
          name="CategoryDetails"
          component={CategoryDetailsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
