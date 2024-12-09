import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Linking,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const API_KEY = 'AIzaSyBuJ3VdK5xAJkB0Y0RDW3RbGewkOMbe-yI';

const RestaurantScreen = ({ route, navigation }) => {
  const { restaurant } = route.params;
  const [restaurantDetails, setRestaurantDetails] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${restaurant.id}&key=${API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setRestaurantDetails(data.result);
        } else {
          Alert.alert('Error', 'Failed to fetch restaurant details.');
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        Alert.alert('Error', 'An error occurred while fetching details.');
        setLoading(false);
      });

    
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission Denied',
          'Location permission is required to get directions.'
        );
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location.coords);
    })();
  }, [restaurant.id]);

 
  const handleShare = () => {
    const subject = encodeURIComponent('Restaurant Review');
    const body = encodeURIComponent(
      `Check out ${restaurantDetails.name} with a rating of ${
        restaurantDetails.rating || 'N/A'
      } stars! It's located at ${
        restaurantDetails.formatted_address || 'No address available'
      }.`
    );

    const mailtoURL = `mailto:?subject=${subject}&body=${body}`;

    Linking.canOpenURL(mailtoURL)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(mailtoURL);
        } else {
          Alert.alert(
            'Error',
            'Email client is not available on this device. Please configure your email client first.'
          );
        }
      })
      .catch((error) => {
        console.error('Error opening email client:', error);
        Alert.alert('Error', 'Failed to open email client. Please try again.');
      });
  };

  const handleGetDirections = () => {
    if (!currentLocation) {
      Alert.alert('Error', 'Unable to get current location.');
      return;
    }
    const url = `https://www.google.com/maps/dir/?api=1&origin=${currentLocation.latitude},${currentLocation.longitude}&destination=${restaurantDetails.geometry.location.lat},${restaurantDetails.geometry.location.lng}`;
    Linking.openURL(url);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007aff" />
        <Text>Loading restaurant details...</Text>
      </View>
    );
  }

  if (!restaurantDetails) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to load restaurant details.</Text>
        <Button title="Go Back" onPress={() => navigation.navigate('Home')} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
  
      <Text style={styles.title}>{restaurantDetails.name}</Text>
      <Text style={styles.subtitle}>
        Rating: {restaurantDetails.rating || 'No rating available'} ⭐
      </Text>
      <Text style={styles.text}>Address: {restaurantDetails.formatted_address}</Text>
      <Text style={styles.text}>
        Phone: {restaurantDetails.formatted_phone_number || 'No phone number available'}
      </Text>
      <Text style={styles.description}>
        Description: {restaurantDetails.vicinity || 'No description available'}
      </Text>

    
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: restaurantDetails.geometry.location.lat,
          longitude: restaurantDetails.geometry.location.lng,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={{
            latitude: restaurantDetails.geometry.location.lat,
            longitude: restaurantDetails.geometry.location.lng,
          }}
          title={restaurantDetails.name}
        />
      </MapView>

     
      <Button title="View Full-Screen Map" onPress={handleGetDirections} />
      <Button title="Get Directions" onPress={handleGetDirections} />
      <Button title="Share via Email" onPress={handleShare} />
      <Button
        title="Share via Facebook"
        onPress={() =>
          Linking.openURL(
            `https://www.facebook.com/sharer/sharer.php?u=https://maps.google.com/?q=${restaurantDetails.geometry.location.lat},${restaurantDetails.geometry.location.lng}`
          )
        }
      />
      <Button
        title="Share via Twitter"
        onPress={() =>
          Linking.openURL(
            `https://twitter.com/intent/tweet?text=Check out ${restaurantDetails.name} at ${restaurantDetails.formatted_address}!`
          )
        }
      />
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    marginBottom: 20,
  },
});

export default RestaurantScreen;

