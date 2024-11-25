import React, { useEffect } from 'react';

import { View, Text, StyleSheet, Image } from 'react-native';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Home');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require('./icon.png')} style={styles.logo} />
      <Text style={styles.tagline}>Your Personal Restaurant Guide</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  tagline: {
    fontSize: 18,
    fontStyle: 'italic',
    color: '#888888',
  },
});
