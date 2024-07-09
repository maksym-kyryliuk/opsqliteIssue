import {View, Button, StyleSheet} from 'react-native';
import React from 'react';

export default function HomeScreen({navigation}: any) {
  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Button title="Go to list" onPress={() => navigation.push('Details')} />
      </View>
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
});
