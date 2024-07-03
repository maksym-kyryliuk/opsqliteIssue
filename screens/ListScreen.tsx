import * as React from 'react';
import {CategoryDTO, db, getAll} from '../data/db';
import {
  Button,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function ListScreen({navigation}: any) {
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
        response.rows?._array
          ? setCategories(
              response.rows?._array.map((category: any) => {
                return {id: category.id, title: category.title};
              }),
            )
          : setCategories([]);
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
      <ScrollView style={styles.buttons}>
        {categories.map(category => (
          <Pressable
            key={category.id}
            onPress={() =>
              navigation.push('CategoryDetails', {category: category})
            }>
            <Text style={styles.text}>{category.title}</Text>
          </Pressable>
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
    paddingTop: 50,
  },
  text: {
    color: 'black',
    borderWidth: 1,
    padding: 8,
    borderRadius: 15,
  },
});
