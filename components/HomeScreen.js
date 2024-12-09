import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, FlatList, TextInput, Alert, TouchableOpacity } from 'react-native';

const API_KEY = 'AIzaSyBuJ3VdK5xAJkB0Y0RDW3RbGewkOMbe-yI';

export default function HomeScreen({ navigation }) {
    const [foundRestaurants, setFoundRestaurants] = useState([]);
    const [savedRestaurants, setSavedRestaurants] = useState([]);
    const [searchName, setSearchName] = useState('');
    const [editingRestaurantId, setEditingRestaurantId] = useState(null);
    const [tempName, setTempName] = useState('');
    const [tempRating, setTempRating] = useState('');

    const searchRestaurants = () => {
        if (searchName.trim() === '') {
            Alert.alert('Error', 'Please enter a restaurant name.');
            return;
        }

        fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${searchName}&key=${API_KEY}`)
            .then(response => response.json())
            .then(data => {
                const results = data.results;
                const newRestaurants = results.map(result => ({
                    id: result.place_id,
                    name: result.name,
                    rating: result.rating || 'No rating available',
                    location: result.formatted_address || 'No address available',
                }));
                setFoundRestaurants(newRestaurants);
            })
            .catch(error => {
                console.error(error);
                Alert.alert('Error', 'Failed to fetch restaurants. Please try again.');
            });
    };

    const saveRestaurant = (restaurant) => {
        if (savedRestaurants.find(r => r.id === restaurant.id)) {
            Alert.alert('Info', 'This restaurant is already saved.');
        } else {
            setSavedRestaurants([...savedRestaurants, restaurant]);
            Alert.alert('Success', `${restaurant.name} has been added to your saved restaurants.`);
        }
    };

    const deleteRestaurant = (restaurantId) => {
        setSavedRestaurants(savedRestaurants.filter(r => r.id !== restaurantId));
        Alert.alert('Success', 'Restaurant has been removed from your saved list.');
    };

    const startEditingRestaurant = (restaurant) => {
        setEditingRestaurantId(restaurant.id);
        setTempName(restaurant.name);
        setTempRating(restaurant.rating.toString());
    };

    const confirmEditRestaurant = () => {
        const updatedRestaurants = savedRestaurants.map(r =>
            r.id === editingRestaurantId
                ? { ...r, name: tempName, rating: tempRating }
                : r
        );
        setSavedRestaurants(updatedRestaurants);
        setEditingRestaurantId(null);
        setTempName('');
        setTempRating('');
        Alert.alert('Success', 'Restaurant details updated.');
    };

    const viewRestaurant = (restaurant) => {
        navigation.navigate('Restaurant', { restaurant });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Restaurant Finder</Text>

            <TextInput
                style={styles.input}
                placeholder="Enter restaurant name"
                value={searchName}
                onChangeText={setSearchName}
            />
            <Button title="Search" onPress={searchRestaurants} />

            <View style={styles.listViewContainer}>
                <Text style={styles.text}>Restaurants Found</Text>
                <FlatList
                    data={foundRestaurants}
                    renderItem={({ item }) => (
                        <View style={styles.listItem}>
                            <Text style={styles.listTitle}>{item.name}</Text>
                            <Text>Rating: {item.rating} ⭐</Text>
                            <Text>Location: {item.location}</Text>
                            <Button
                                title="Save"
                                onPress={() => saveRestaurant(item)}
                            />
                            <TouchableOpacity style={styles.viewButton} onPress={() => viewRestaurant(item)}>
                                <Text style={styles.viewButtonText}>View</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    keyExtractor={(item) => item.id}
                />
            </View>

            <View style={styles.border} />

            <View style={styles.listViewContainer}>
                <Text style={styles.text}>Saved Restaurants</Text>
                <FlatList
                    data={savedRestaurants}
                    renderItem={({ item }) => (
                        <View style={styles.listItem}>
                            {editingRestaurantId === item.id ? (
                                <>
                                    <TextInput
                                        style={styles.input}
                                        value={tempName}
                                        onChangeText={setTempName}
                                    />
                                    <TextInput
                                        style={styles.input}
                                        value={tempRating}
                                        onChangeText={setTempRating}
                                        keyboardType="numeric"
                                    />
                                    <Button title="Confirm" onPress={confirmEditRestaurant} />
                                </>
                            ) : (
                                <>
                                    <Text style={styles.listTitle}>{item.name}</Text>
                                    <Text>Rating: {item.rating} ⭐</Text>
                                    <Text>Location: {item.location}</Text>
                                    <Button
                                        title="Edit"
                                        onPress={() => startEditingRestaurant(item)}
                                    />
                                    <Button
                                        title="Delete"
                                        onPress={() => deleteRestaurant(item.id)}
                                    />
                                    <TouchableOpacity style={styles.viewButton} onPress={() => viewRestaurant(item)}>
                                        <Text style={styles.viewButtonText}>View</Text>
                                    </TouchableOpacity>
                                </>
                            )}
                        </View>
                    )}
                    keyExtractor={(item) => item.id}
                />
            </View>
            <Button title="About Us" onPress={() => navigation.navigate('About')} />
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
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
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
        marginTop: 20,
    },
    listItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    listTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    border: {
        width: '100%',
        height: 1,
        backgroundColor: '#ccc',
    },
    viewButton: {
        backgroundColor: '#007aff',
        padding: 10,
        borderRadius: 5,
    },
    viewButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

