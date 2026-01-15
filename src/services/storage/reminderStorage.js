// services/storage/reminderStorage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const REMINDERS_KEY = '@reminders';

class ReminderStorage {
  async getAllReminders() {
    try {
      const data = await AsyncStorage.getItem(REMINDERS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading reminders:', error);
      return [];
    }
  }

  async saveReminder(reminder) {
    try {
      const reminders = await this.getAllReminders();
      const index = reminders.findIndex(r => r.id === reminder.id);
      
      if (index >= 0) {
        reminders[index] = { ...reminder, updatedAt: new Date() };
      } else {
        reminders.push(reminder);
      }
      
      await AsyncStorage.setItem(REMINDERS_KEY, JSON.stringify(reminders));
    } catch (error) {
      console.error('Error saving reminder:', error);
      throw error;
    }
  }

  async deleteReminder(id) {
    try {
      const reminders = await this.getAllReminders();
      const filtered = reminders.filter(r => r.id !== id);
      await AsyncStorage.setItem(REMINDERS_KEY, JSON.stringify(filtered));
    } catch (error) {
      console.error('Error deleting reminder:', error);
      throw error;
    }
  }

  async getUpcomingReminders(days = 7) {
    const reminders = await this.getAllReminders();
    const now = new Date();
    const futureDate = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
    
    return reminders
      .filter(r => !r.completed)
      .filter(r => {
        const dueDate = new Date(r.dueDate);
        return dueDate >= now && dueDate <= futureDate;
      })
      .sort((a, b) => 
        new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      );
  }

  async getRemindersByCategory(category) {
    const reminders = await this.getAllReminders();
    return reminders.filter(r => r.category === category && !r.completed);
  }

  async getOverdueReminders() {
    const reminders = await this.getAllReminders();
    const now = new Date();
    
    return reminders
      .filter(r => !r.completed)
      .filter(r => new Date(r.dueDate) < now)
      .sort((a, b) => 
        new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      );
  }
}

export default new ReminderStorage();