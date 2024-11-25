import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function AboutScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About This App</Text>
      <Text style={styles.text}>
        This app helps you explore and manage restaurants complete with features like map views, sharing, and more. Developed by the team.
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