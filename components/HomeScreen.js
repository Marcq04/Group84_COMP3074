import React from 'react';
import {View, Text, StyleSheet, Button, FlatList} from 'react-native';

// Dummy data
const restaurantData = [
    { id: '1', name: 'The Gourmet Kitchen', rating: 4.5, location: 'Downtown' },
    { id: '2', name: 'Pasta Palace', rating: 4.0, location: 'Uptown' },
    { id: '3', name: 'Burger Haven', rating: 3.8, location: 'Midtown' },
    { id: '4', name: 'Sushi World', rating: 4.7, location: 'Eastside' },
    { id: '5', name: 'Steakhouse Deluxe', rating: 4.3, location: 'Westside' },
];

export default function HomeScreen({navigation}) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Home Screen</Text>
            <Button title="About Us" onPress={() => navigation.navigate('About')} />
            {/* Implement a list view of restaurants */}
            <View style={styles.listViewContainer}>
                <Text style={styles.text}>Restaurants Visited</Text>
                <FlatList
                    data={restaurantData}
                    renderItem={({ item }) => (
                        <View style={styles.listItem}>
                            <Text>{item.name}</Text>
                            <Text>Rating: {item.rating} ⭐</Text>
                            <Text>Location: {item.location}</Text>
                            <Button title="Visit" onPress={() => navigation.navigate('Restaurant', { restaurant: item })} />
                        </View>
                    )}
                    keyExtractor={(item) => item.id}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    listViewContainer: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'black',
    },
    listItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
    },
  });
