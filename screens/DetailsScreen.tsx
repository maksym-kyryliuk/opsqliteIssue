import * as React from 'react';
import {CategoryDTO, db, getAll} from '../data/db';
import {Button, ScrollView, StyleSheet, Text, View} from 'react-native';

export default function DetailsScreen({navigation}: any) {
  const [categories, setCategories] = React.useState<CategoryDTO[]>([]);

  //Init categories
  React.useEffect(() => {
    getAll().then((response: CategoryDTO[]) => {
      setCategories(response);
    });
  }, []);

  //Subscription to the categories table
  React.useEffect(() => {
    const unsubscribe = db.reactiveExecute({
      query: 'SELECT * FROM categories',
      arguments: [],
      fireOn: [
        {
          table: 'categories',
        },
      ],
      callback: response => {
        setCategories(
          response.rows?._array.map((category: any) => {
            return {id: category.id, title: category.title};
          }),
        );
        console.log(response.rows._array);
      },
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Button
          title="Add category"
          onPress={() => navigation.push('AddCategory')}
        />
      </View>
      <View style={styles.buttons}>
        <Button title="Go back" onPress={() => navigation.goBack()} />
      </View>
      <ScrollView style={styles.buttons}>
        {categories.map(category => (
          <Text key={category.id} style={styles.text}>
            {category.title}
          </Text>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttons: {
    paddingTop: 35,
  },
  text: {
    color: 'black',
  },
});
