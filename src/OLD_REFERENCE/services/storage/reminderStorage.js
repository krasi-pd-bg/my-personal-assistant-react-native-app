// services/storage/reminderStorage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@reminders';

// Get all reminders
export const getAllReminders = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (error) {
    console.error('Error getting reminders:', error);
    return [];
  }
};

// Get reminder by ID
export const getReminderById = async (id) => {
  try {
    const reminders = await getAllReminders();
    return reminders.find(r => r.id === id) || null;
  } catch (error) {
    console.error('Error getting reminder by ID:', error);
    return null;
  }
};

// Save a new reminder
export const saveReminder = async (reminder) => {
  try {
    const reminders = await getAllReminders();
    const newReminders = [...reminders, reminder];
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newReminders));
    return true;
  } catch (error) {
    console.error('Error saving reminder:', error);
    return false;
  }
};

// Update an existing reminder
export const updateReminder = async (id, updatedReminder) => {
  try {
    const reminders = await getAllReminders();
    const index = reminders.findIndex(r => r.id === id);
    
    if (index !== -1) {
      reminders[index] = { ...reminders[index], ...updatedReminder, updatedAt: new Date() };
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(reminders));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error updating reminder:', error);
    return false;
  }
};

// Delete a reminder
export const deleteReminder = async (id) => {
  try {
    const reminders = await getAllReminders();
    const filteredReminders = reminders.filter(r => r.id !== id);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filteredReminders));
    return true;
  } catch (error) {
    console.error('Error deleting reminder:', error);
    return false;
  }
};

// Toggle reminder completion
export const toggleReminderComplete = async (id) => {
  try {
    const reminders = await getAllReminders();
    const index = reminders.findIndex(r => r.id === id);
    
    if (index !== -1) {
      reminders[index].completed = !reminders[index].completed;
      reminders[index].completedDate = reminders[index].completed ? new Date() : null;
      reminders[index].updatedAt = new Date();
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(reminders));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error toggling reminder:', error);
    return false;
  }
};

// Clear all reminders (for testing)
export const clearAllReminders = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing reminders:', error);
    return false;
  }
};

// Get reminders by category
export const getRemindersByCategory = async (category) => {
  try {
    const reminders = await getAllReminders();
    return reminders.filter(r => r.category === category);
  } catch (error) {
    console.error('Error getting reminders by category:', error);
    return [];
  }
};

// Get upcoming reminders (not completed, due in future)
export const getUpcomingReminders = async () => {
  try {
    const reminders = await getAllReminders();
    const now = new Date();
    return reminders.filter(r => 
      !r.completed && new Date(r.dueDate) >= now
    ).sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  } catch (error) {
    console.error('Error getting upcoming reminders:', error);
    return [];
  }
};

// Get overdue reminders
export const getOverdueReminders = async () => {
  try {
    const reminders = await getAllReminders();
    const now = new Date();
    return reminders.filter(r => 
      !r.completed && new Date(r.dueDate) < now
    ).sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  } catch (error) {
    console.error('Error getting overdue reminders:', error);
    return [];
  }
};