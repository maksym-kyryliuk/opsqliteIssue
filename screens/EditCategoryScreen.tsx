import * as React from 'react';
import {updateCategory} from '../data/db';
import {Button, StyleSheet, TextInput, View} from 'react-native';

export default function EditCategoryScreen({navigation, route}: any) {
  const [title, setTitle] = React.useState(route.params.category.title);

  const handleAddCategory = () => {
    updateCategory({id: route.params.category.id, title: title}).then(() => {
      navigation.goBack();
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter category name"
        placeholderTextColor={'black'}
      />
      <View style={styles.paddingBottom}>
        <Button title="Update category" onPress={handleAddCategory} />
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
