import * as React from 'react';
import {
  addCategoryWithRecords,
  CategoryDTO,
  db,
  deleteCategory,
  getAll,
  SQL_CATEGORIES_WITH_SUM,
} from '../data/db';
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
      query: SQL_CATEGORIES_WITH_SUM,
      arguments: [],
      fireOn: [
        {
          table: 'categories',
        },
      ],
      callback: response => {
        console.log('Categories updated', response);
        response.rows?._array
          ? setCategories(
              response.rows?._array.map((category: any) => {
                return {
                  id: category.id,
                  title: category.title,
                  balance: category.balance,
                };
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
      {/* <View style={styles.buttons}>
        <Button
          title="Add category"
          onPress={() => navigation.push('AddCategory')}
        />
      </View> */}
      <View style={styles.buttons}>
        <Button
          title="Add category with records"
          onPress={addCategoryWithRecords}
        />
      </View>
      <ScrollView style={styles.buttons}>
        {categories.map((category, index) => (
          <View style={styles.item} key={index}>
            <View style={styles.itemText}>
              <Pressable
                key={category.id}
                onPress={() =>
                  navigation.push('CategoryDetails', {category: category})
                }>
                <Text style={styles.text}>{category.title}</Text>
              </Pressable>
              <Text>Balance: {category.balance}</Text>
            </View>
            <Pressable onPress={() => deleteCategory(category.id)}>
              <Text style={styles.deleteButton}>X</Text>
            </Pressable>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttons: {
    paddingTop: 50,
  },
  text: {
    color: 'black',
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  item: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  itemText: {
    flexDirection: 'row',
    flex: 1,
  },
  deleteButton: {
    color: 'red',
    paddingHorizontal: 16,
  },
});
