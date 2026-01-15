// screens/Home/HomeScreen.js
import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { ReminderCard } from '../../components/reminders/ReminderCard';
import { useReminders } from '../../hooks/useReminders';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const HomeScreen = ({ navigation }) => {
  const { 
    reminders, 
    loading, 
    completeReminder,
    getUpcoming 
  } = useReminders();

  const upcomingReminders = getUpcoming();

  const handleAddPress = () => {
    navigation.navigate('AddReminder');
  };

  const handleReminderPress = (reminder) => {
    navigation.navigate('ReminderDetail', { reminder });
  };

  const handleCompletePress = async (id) => {
    await completeReminder(id);
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <View>
        <Text style={styles.greeting}>Здравей! 👋</Text>
        <Text style={styles.subtitle}>
          Имаш {upcomingReminders.length} предстоящи напомняния
        </Text>
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Icon name="calendar-check" size={80} color="#C7C7CC" />
      <Text style={styles.emptyText}>Няма предстоящи напомняния</Text>
      <Text style={styles.emptySubtext}>
        Добави ново напомняне с бутона долу
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      
      <FlatList
        data={upcomingReminders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ReminderCard
            reminder={item}
            onPress={() => handleReminderPress(item)}
            onComplete={() => handleCompletePress(item.id)}
          />
        )}
        contentContainerStyle={styles.list}
        ListEmptyComponent={!loading && renderEmptyState()}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={handleAddPress}
        activeOpacity={0.8}
      >
        <Icon name="plus" size={28} color="#FFFFFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#8E8E93',
  },
  list: {
    padding: 16,
    flexGrow: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#8E8E93',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#C7C7CC',
    marginTop: 8,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});