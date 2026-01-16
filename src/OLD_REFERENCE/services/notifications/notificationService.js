// services/notifications/notificationService.js
import notifee, { 
  TriggerType, 
  AndroidImportance 
} from '@notifee/react-native';
import { ReminderCategory } from '../../utils/constants';

class NotificationService {
  async scheduleReminder(reminder) {
    // Създаване на channel за Android
    const channelId = await notifee.createChannel({
      id: reminder.category,
      name: this.getCategoryName(reminder.category),
      importance: AndroidImportance.HIGH,
    });

    // Schedule основното напомняне
    await notifee.createTriggerNotification(
      {
        title: reminder.title,
        body: reminder.description || 'Имате напомняне',
        android: {
          channelId,
          importance: AndroidImportance.HIGH,
          pressAction: {
            id: 'default',
            launchActivity: 'default',
          },
          actions: [
            {
              title: 'Завърши',
              pressAction: { id: 'complete' },
            },
            {
              title: 'Snooze',
              pressAction: { id: 'snooze' },
            },
          ],
        },
        ios: {
          categoryId: reminder.category,
        },
        data: {
          reminderId: reminder.id,
          category: reminder.category,
        },
      },
      {
        type: TriggerType.TIMESTAMP,
        timestamp: new Date(reminder.dueDate).getTime(),
      }
    );

    // Schedule допълнителни напомняния
    if (reminder.notifyBefore && reminder.notifyBefore.length > 0) {
      for (const minutes of reminder.notifyBefore) {
        const notificationTime = new Date(
          new Date(reminder.dueDate).getTime() - minutes * 60 * 1000
        );

        if (notificationTime > new Date()) {
          await notifee.createTriggerNotification(
            {
              title: `${reminder.title} - ${this.getTimeLabel(minutes)}`,
              body: reminder.description,
              android: { channelId },
              data: { 
                reminderId: reminder.id, 
                type: 'advance' 
              },
            },
            {
              type: TriggerType.TIMESTAMP,
              timestamp: notificationTime.getTime(),
            }
          );
        }
      }
    }
  }

  async cancelReminder(reminderId) {
    const notifications = await notifee.getTriggerNotifications();
    const reminderNotifications = notifications.filter(
      n => n.notification.data?.reminderId === reminderId
    );

    for (const notification of reminderNotifications) {
      await notifee.cancelNotification(notification.notification.id);
    }
  }

  async snoozeReminder(reminderId, minutes) {
    const snoozeTime = new Date(Date.now() + minutes * 60 * 1000);
    // Re-schedule notification
  }

  getTimeLabel(minutes) {
    if (minutes < 60) return `${minutes} мин преди`;
    if (minutes < 1440) return `${Math.floor(minutes / 60)} ч преди`;
    return `${Math.floor(minutes / 1440)} ден преди`;
  }

  getCategoryName(category) {
    const names = {
      [ReminderCategory.PAYMENT]: 'Плащания',
      [ReminderCategory.HEALTH]: 'Здраве',
      [ReminderCategory.EVENT]: 'Събития',
      [ReminderCategory.CAR]: 'Автомобил',
      [ReminderCategory.HOME]: 'Битови',
      [ReminderCategory.TASK]: 'Задачи',
    };
    return names[category] || 'Напомняния';
  }
}

export default new NotificationService();