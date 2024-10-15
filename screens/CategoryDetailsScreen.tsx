import * as React from 'react';
import {db, deleteCategory} from '../data/db';
import {Button, StyleSheet, Text, View} from 'react-native';

export default function CategoryDetailsScreen({navigation, route}: any) {
  const [id, setId] = React.useState(route.params.category.id);
  const [title, setTitle] = React.useState(route.params.category.title);

  const handleEditCategory = () => {
    navigation.push('EditCategory', {category: route.params.category});
  };

  const handleDelete = () => {
    deleteCategory(route.params.category.id).then(() => {
      navigation.goBack();
    });
  };

  //Subscription to the categories table
  React.useEffect(() => {
    const unsubscribe = db.reactiveExecute({
      query: 'SELECT title FROM categories where id = ?',
      arguments: [route.params.category.id],
      fireOn: [
        {
          table: 'categories',
        },
      ],
      callback: response => {
        console.log(response);
      },
    });

    return () => {
      unsubscribe();
    };
  }, [route.params.category.id]);

  return (
    <View style={styles.container}>
      <Text>ID: {id}</Text>
      <Text>Title: {title}</Text>
      <View style={styles.paddingBottom}>
        <View style={{paddingBottom: 25}}>
          <Button title="Edit" onPress={handleEditCategory} />
        </View>
        <Button title="Delete" onPress={handleDelete} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
  },
  disabled: {
    backgroundColor: 'grey',
  },
  paddingBottom: {
    paddingVertical: 50,
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
