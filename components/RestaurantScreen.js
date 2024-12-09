import React from 'react';
import { View, Text, Button, StyleSheet, Linking, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps'; // For map view

const RestaurantScreen = ({ route, navigation }) => {
  const { restaurant } = route.params; // Get restaurant data from params

  const handleShare = () => {
    const message = `Check out ${restaurant.name} with a rating of ${restaurant.rating} stars! It's located in ${restaurant.location}.`;
    Linking.openURL(`mailto:?subject=Restaurant Review&body=${message}`);
  };

  const handleGetDirections = () => {
    const url = `https://www.google.com/maps?q=${restaurant.location}`; // Open Google Maps with the restaurant location
    Linking.openURL(url);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Restaurant Details */}
      <Text style={styles.title}>{restaurant.name}</Text>
      <Text style={styles.subtitle}>Rating: {restaurant.rating} ⭐</Text>
      <Text style={styles.text}>Location: {restaurant.location}</Text>
      <Text style={styles.description}>Description: {restaurant.description}</Text> {/* Display specific description */}
      <Text style={styles.text}>Address: {restaurant.address}</Text>
      <Text style={styles.text}>Phone: {restaurant.phone}</Text>
      
      {/* Map View */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825, // Example coordinates, replace with actual restaurant coordinates
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{ latitude: 37.78825, longitude: -122.4324 }} // Replace with actual coordinates
          title={restaurant.name}
        />
      </MapView>

      {/* Buttons for actions */}
      <Button title="View on Map" onPress={handleGetDirections} />
      <Button title="Share" onPress={handleShare} />
      <Button title="Get Directions" onPress={handleGetDirections} />
      <Button title="Go Back" onPress={() => navigation.navigate('Home')} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 20,
  },
  map: {
    height: 300,
    marginBottom: 20,
  },
});

export default RestaurantScreen;
