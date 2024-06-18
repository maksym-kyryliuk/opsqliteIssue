import * as React from 'react';
import {addCategory} from '../data/db';
import {Alert, Button, StyleSheet, TextInput, View} from 'react-native';

export default function AddCategoryScreen({navigation}: any) {
  const [category, setCategory] = React.useState('');

  const handleAddCategory = () => {
    addCategory(category).then(() => {
      Alert.alert('Category added successfully');
      setCategory('');
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={category}
        onChangeText={setCategory}
        placeholder="Enter category name"
        placeholderTextColor={'black'}
      />
      <View style={styles.paddingBottom}>
        <Button
          title="Add category"
          onPress={handleAddCategory}
          disabled={category.length === 0}
          style={category.length === 0 ? styles.disabled : {}}
        />
      </View>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  disabled: {
    backgroundColor: 'grey',
  },
  paddingBottom: {
    paddingBottom: 50,
  },
  text: {
    color: 'black',
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    width: 200,
    padding: 10,
    margin: 10,
    color: 'black',
  },
});
