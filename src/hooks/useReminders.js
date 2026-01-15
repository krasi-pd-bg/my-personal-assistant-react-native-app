// hooks/useReminders.js
import { useState, useEffect } from 'react';
import reminderStorage from '../services/storage/reminderStorage';
import notificationService from '../services/notifications/notificationService';

export const useReminders = () => {
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReminders();
  }, []);

  const loadReminders = async () => {
    try {
      const data = await reminderStorage.getAllReminders();
      setReminders(data);
    } catch (error) {
      console.error('Error loading reminders:', error);
    } finally {
      setLoading(false);
    }
  };

  const addReminder = async (reminder) => {
    try {
      await reminderStorage.saveReminder(reminder);
      
      if (reminder.notificationEnabled) {
        await notificationService.scheduleReminder(reminder);
      }
      
      await loadReminders();
    } catch (error) {
      console.error('Error adding reminder:', error);
      throw error;
    }
  };

  const updateReminder = async (reminder) => {
    try {
      await reminderStorage.saveReminder(reminder);
      await notificationService.cancelReminder(reminder.id);
      
      if (reminder.notificationEnabled && !reminder.completed) {
        await notificationService.scheduleReminder(reminder);
      }
      
      await loadReminders();
    } catch (error) {
      console.error('Error updating reminder:', error);
      throw error;
    }
  };

  const deleteReminder = async (id) => {
    try {
      await reminderStorage.deleteReminder(id);
      await notificationService.cancelReminder(id);
      await loadReminders();
    } catch (error) {
      console.error('Error deleting reminder:', error);
      throw error;
    }
  };

  const completeReminder = async (id) => {
    const reminder = reminders.find(r => r.id === id);
    if (reminder) {
      await updateReminder({
        ...reminder,
        completed: true,
        completedDate: new Date(),
      });
    }
  };

  const getUpcoming = () => {
    return reminders
      .filter(r => !r.completed)
      .filter(r => new Date(r.dueDate) >= new Date())
      .sort((a, b) => 
        new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      );
  };

  const getByCategory = (category) => {
    return reminders.filter(r => r.category === category && !r.completed);
  };

  return {
    reminders,
    loading,
    addReminder,
    updateReminder,
    deleteReminder,
    completeReminder,
    getUpcoming,
    getByCategory,
    reload: loadReminders,
  };
};