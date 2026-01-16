import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { COLORS } from '../../utils/constants';
import ReminderCard from '../../components/reminders/ReminderCard';

export default function HomeScreen({ navigation }) {
  const [reminders, setReminders] = useState([]);

  const handleAddReminder = () => {
    navigation.navigate('AddReminder');
  };

  const handleEditReminder = (reminder) => {
    navigation.navigate('EditReminder', { reminder });
  };

  return (
    <View style={styles.container}>
      {reminders.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>📝</Text>
          <Text style={styles.emptyTitle}>No reminders yet</Text>
          <Text style={styles.emptySubtitle}>
            Tap the + button to create your first reminder
          </Text>
        </View>
      ) : (
        <FlatList
          data={reminders}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ReminderCard
              reminder={item}
              onPress={() => handleEditReminder(item)}
            />
          )}
          contentContainerStyle={styles.listContainer}
        />
      )}

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={handleAddReminder}
        activeOpacity={0.8}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContainer: {
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 80,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
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
});