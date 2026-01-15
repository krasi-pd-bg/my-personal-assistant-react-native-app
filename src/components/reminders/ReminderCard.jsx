// components/reminders/ReminderCard.js
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ReminderCategory, Priority } from '../../utils/constants';

export const ReminderCard = ({ reminder, onPress, onComplete }) => {
  
  const getCategoryIcon = () => {
    const icons = {
      [ReminderCategory.PAYMENT]: 'credit-card',
      [ReminderCategory.HEALTH]: 'medical-bag',
      [ReminderCategory.EVENT]: 'calendar',
      [ReminderCategory.CAR]: 'car',
      [ReminderCategory.HOME]: 'home',
      [ReminderCategory.TASK]: 'check-circle',
    };
    return icons[reminder.category] || 'bell';
  };

  const getPriorityColor = () => {
    const colors = {
      [Priority.HIGH]: '#FF3B30',
      [Priority.MEDIUM]: '#FF9500',
      [Priority.LOW]: '#34C759',
    };
    return colors[reminder.priority];
  };

  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString('bg-BG', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const isOverdue = () => {
    return new Date(reminder.dueDate) < new Date() && !reminder.completed;
  };

  return (
    <TouchableOpacity
      style={[styles.card, isOverdue() && styles.overdueCard]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View 
        style={[
          styles.iconContainer,
          { backgroundColor: getPriorityColor() + '20' }
        ]}
      >
        <Icon
          name={getCategoryIcon()}
          size={24}
          color={getPriorityColor()}
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{reminder.title}</Text>
        {reminder.description && (
          <Text style={styles.description} numberOfLines={2}>
            {reminder.description}
          </Text>
        )}
        <View style={styles.footer}>
          <Text style={[
            styles.date,
            isOverdue() && styles.overdueText
          ]}>
            {formatDate(reminder.dueDate)}
          </Text>
          {reminder.amount && (
            <Text style={styles.amount}>
              {reminder.amount} {reminder.currency}
            </Text>
          )}
        </View>
      </View>

      <TouchableOpacity
        style={styles.completeButton}
        onPress={onComplete}
      >
        <Icon
          name={reminder.completed ? 'check-circle' : 'circle-outline'}
          size={28}
          color={reminder.completed ? '#34C759' : '#C7C7CC'}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  overdueCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#FF3B30',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 6,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  date: {
    fontSize: 12,
    color: '#8E8E93',
  },
  overdueText: {
    color: '#FF3B30',
    fontWeight: '600',
  },
  amount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
  },
  completeButton: {
    justifyContent: 'center',
    paddingLeft: 8,
  },
});