import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, TextInput, ScrollView, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const STORAGE_KEY = '@reminders';

// Add Reminder Screen
function AddReminderScreen({ navigation }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [time, setTime] = useState(new Date());
    const [showTimePicker, setShowTimePicker] = useState(false);

    const onDateChange = (event, selectedDate) => {
        setShowDatePicker(Platform.OS === 'ios');
        if (selectedDate) {
            setDate(selectedDate);
        }
    };

    const onTimeChange = (event, selectedTime) => {
        setShowTimePicker(Platform.OS === 'ios');
        if (selectedTime) {
            setTime(selectedTime);
        }
    };

    const handleSave = async () => {
        if (title.trim() === '') {
            alert('Please enter a title');
            return;
        }

        try {
            const newReminder = {
                id: Date.now().toString(),
                title: title,
                description: description,
                date: date.toISOString(),
                time: time.toISOString(),
                createdAt: new Date().toISOString(),
            };

            const existingReminders = await AsyncStorage.getItem(STORAGE_KEY);
            const reminders = existingReminders ? JSON.parse(existingReminders) : [];
            reminders.push(newReminder);
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(reminders));

            setTitle('');
            setDescription('');
            setDate(new Date());
            setTime(new Date());
            navigation.goBack();
        } catch (error) {
            console.error('Error saving reminder:', error);
            alert('Failed to save reminder');
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.form}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput
                        style={styles.input}
                        value={title}
                        onChangeText={setTitle}
                        placeholder="Enter reminder title"
                    />

                    <Text style={styles.label}>Description</Text>
                    <TextInput
                        style={styles.input}
                        value={description}
                        onChangeText={setDescription}
                        placeholder="Enter description (optional)"
                        multiline
                    />

                    <Text style={styles.label}>Date</Text>
                    <TouchableOpacity
                        style={styles.dateButton}
                        onPress={() => setShowDatePicker(true)}
                    >
                        <Text style={styles.dateButtonText}>
                            📅 {date.toLocaleDateString('en-GB')}
                        </Text>
                    </TouchableOpacity>

                    {showDatePicker && (
                        <DateTimePicker
                            value={date}
                            mode="date"
                            display="default"
                            onChange={onDateChange}
                        />
                    )}

                    <Text style={styles.label}>Time</Text>
                    <TouchableOpacity
                        style={styles.dateButton}
                        onPress={() => setShowTimePicker(true)}
                    >
                        <Text style={styles.dateButtonText}>
                            🕐 {time.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                        </Text>
                    </TouchableOpacity>

                    {showTimePicker && (
                        <DateTimePicker
                            value={time}
                            mode="time"
                            display="default"
                            onChange={onTimeChange}
                        />
                    )}

                    <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                        <Text style={styles.saveButtonText}>💾 Save Reminder</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

// Home List Screen
function HomeListScreen({ navigation }) {
    const [reminders, setReminders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Load when screen comes into focus
        const unsubscribe = navigation.addListener('focus', () => {
            loadReminders();
        });
        return unsubscribe;
    }, [navigation]);

    const loadReminders = async () => {
        try {
            const data = await AsyncStorage.getItem(STORAGE_KEY);
            if (data) {
                setReminders(JSON.parse(data));
                console.log('Reminders loaded:', JSON.parse(data));
            }
        } catch (error) {
            console.error('Error loading:', error);
        } finally {
            setLoading(false);
        }
    };

    const deleteReminder = async (id) => {
        const updated = reminders.filter(r => r.id !== id);
        setReminders(updated);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    };

    // ⏳ НОВО - функции за форматиране на дата и час
    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleDateString('en-GB');
    };

    const formatTime = (isoString) => {
        const time = new Date(isoString);
        return time.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#6200EA" />
            </View>
        );
    }

    return (
        <View style={styles.screen}>
            {reminders.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyIcon}>📝</Text>
                    <Text style={styles.emptyText}>No reminders yet</Text>
                    <Text style={styles.emptySubtext}>Tap + to create your first reminder</Text>
                </View>
            ) : (
                <FlatList
                    data={reminders}
                    keyExtractor={(item) => item.id}
                    style={styles.list}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <View style={styles.cardContent}>
                                <Text style={styles.cardTitle}>{item.title}</Text>
                                {item.description ? (
                                    <Text style={styles.cardDescription} numberOfLines={2}>
                                        {item.description}
                                    </Text>
                                ) : null}
                                {/* ⏳ НОВО - форматирано показване на дата и час */}
                                <Text style={styles.cardDate}>
                                    📅 {formatDate(item.date)}  🕐 {formatTime(item.time)}
                                </Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => deleteReminder(item.id)}
                                style={styles.deleteButton}
                            >
                                <Text style={styles.deleteText}>🗑️</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            )}

            <TouchableOpacity
                style={styles.fab}
                onPress={() => navigation.navigate('AddReminder')}
            >
                <Text style={styles.fabText}>+</Text>
            </TouchableOpacity>
        </View>
    );
}

// Home Stack
function HomeStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="HomeList"
                component={HomeListScreen}
                options={{ title: '📝 My Reminders' }}
            />
            <Stack.Screen
                name="AddReminder"
                component={AddReminderScreen}
                options={{ title: 'Add Reminder' }}
            />
        </Stack.Navigator>
    );
}

// Calendar Screen
function CalendarScreen() {
    return (
        <View style={styles.screen}>
            <Text style={styles.header}>📅 Calendar</Text>
            <Text style={styles.subtitle}>Coming soon...</Text>
        </View>
    );
}

// Main App
export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen
                    name="Home"
                    component={HomeStack}
                    options={{ headerShown: false }}
                />
                <Tab.Screen name="Calendar" component={CalendarScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        padding: 20,
        backgroundColor: '#fff',
    },
    subtitle: {
        fontSize: 18,
        color: '#666',
        textAlign: 'center',
        marginTop: 50,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    emptyIcon: {
        fontSize: 80,
        marginBottom: 20,
    },
    emptyText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    emptySubtext: {
        fontSize: 14,
        color: '#666',
    },
    list: {
        flex: 1,
        padding: 15,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    cardContent: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 5,
    },
    cardDescription: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },
    cardDate: {
        fontSize: 12,
        color: '#999',
    },
    deleteButton: {
        padding: 5,
    },
    deleteText: {
        fontSize: 24,
    },
    fab: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#6200EA',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    fabText: {
        fontSize: 32,
        color: '#fff',
        fontWeight: 'bold',
    },
    formContainer: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    formContent: {
        padding: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
        color: '#333',
    },
    input: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        marginBottom: 20,
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    saveButton: {
        backgroundColor: '#6200EA',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 10,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    cancelButton: {
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    cancelButtonText: {
        color: '#666',
        fontSize: 16,
    },
    dateButton: {
        backgroundColor: '#f0f0f0',
        padding: 15,
        borderRadius: 8,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    dateButtonText: {
        fontSize: 16,
        color: '#333',
    },
    scrollView: {
  flex: 1,
},
container: {
  flex: 1,
  backgroundColor: '#f5f5f5',
},
form: {
  padding: 20,
},

});