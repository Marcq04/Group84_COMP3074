import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, FlatList, TextInput } from 'react-native';

// Dummy data
const initialRestaurantData = [
    { id: '1', name: 'The Gourmet Kitchen', rating: 4.5, location: 'Downtown' },
    { id: '2', name: 'Pasta Palace', rating: 4.0, location: 'Uptown' },
    { id: '3', name: 'Burger Haven', rating: 3.8, location: 'Midtown' },
    { id: '4', name: 'Sushi World', rating: 4.7, location: 'Eastside' },
    { id: '5', name: 'Steakhouse Deluxe', rating: 4.3, location: 'Westside' },
];

export default function HomeScreen({ navigation }) {
    const [restaurants, setRestaurants] = useState(initialRestaurantData);
    const [restaurantName, setRestaurantName] = useState('');
    const [restaurantLocation, setRestaurantLocation] = useState('');
    const [restaurantRating, setRestaurantRating] = useState('');

    // Function to add a new restaurant
    const addRestaurant = () => {
        if (restaurantName && restaurantLocation && restaurantRating) {
            const newRestaurant = {
                id: (restaurants.length + 1).toString(),
                name: restaurantName,
                rating: parseFloat(restaurantRating),
                location: restaurantLocation,
            };

            setRestaurants((prevRestaurants) => [...prevRestaurants, newRestaurant]);

            // Clear input fields after adding
            setRestaurantName('');
            setRestaurantLocation('');
            setRestaurantRating('');
        } else {
            alert('Please fill in all fields');
        }
    };

    // Function to remove a restaurant by id
    const removeRestaurant = (id) => {
        setRestaurants((prevRestaurants) =>
            prevRestaurants.filter((restaurant) => restaurant.id !== id)
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Home Screen</Text>
            <Button title="About Us" onPress={() => navigation.navigate('About')} />

            {/* Input fields for adding a new restaurant */}
            <View style={styles.addRestaurantContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Restaurant Name"
                    value={restaurantName}
                    onChangeText={setRestaurantName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Location"
                    value={restaurantLocation}
                    onChangeText={setRestaurantLocation}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Rating (0-5)"
                    value={restaurantRating}
                    keyboardType="numeric"
                    onChangeText={setRestaurantRating}
                />
                <Button title="Add Restaurant" onPress={addRestaurant} />
            </View>

            {/* List View of Restaurants */}
            <View style={styles.listViewContainer}>
                <Text style={styles.text}>Restaurants Visited</Text>
                <FlatList
                    data={restaurants}
                    renderItem={({ item }) => (
                        <View style={styles.listItem}>
                            <Text>{item.name}</Text>
                            <Text>Rating: {item.rating} ⭐</Text>
                            <Text>Location: {item.location}</Text>
                            <Button
                                title="Visit"
                                onPress={() => navigation.navigate('Restaurant', { restaurant: item })}
                            />
                            <Button title="Remove" onPress={() => removeRestaurant(item.id)} />
                        </View>
                    )}
                    keyExtractor={(item) => item.id}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    addRestaurantContainer: {
        width: '100%',
        marginBottom: 20,
        padding: 10,
    },
    input: {
        width: '100%',
        padding: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    listViewContainer: {
        flex: 1,
        width: '100%',
        borderWidth: 1,
        borderColor: 'black',
        padding: 10,
    },
    listItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        marginBottom: 10,
    },
});