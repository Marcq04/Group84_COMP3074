import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function AboutScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About This App</Text>
      <Text style={styles.text}>
        Hello we are the development team group 84 constisting of Marcus Quitiquit, Merve Coskun, Kadir Cinar and David Lubwama. This app helps you explore and manage restaurants complete with features like map views, sharing, and more.
      </Text>
      <Text style={styles.text}>Contact us at: support@restaurantguide.com</Text>
      <Button title="Go Back Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
});