// utils/constants.js

export const COLORS = {
  primary: '#6200EA',
  secondary: '#03DAC6',
  background: '#F5F5F5',
  surface: '#FFFFFF',
  error: '#B00020',
  text: '#000000',
  textSecondary: '#666666',
  border: '#E0E0E0',
  success: '#4CAF50',
  warning: '#FF9800',
  info: '#2196F3',
};

export const ReminderCategory = {
  PAYMENT: 'payment',
  HEALTH: 'health',
  EVENT: 'event',
  CAR: 'car',
  HOME: 'home',
  TASK: 'task',
};

export const Priority = {
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low',
};

export const RecurrenceType = {
  NONE: 'none',
  DAILY: 'daily',
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
  YEARLY: 'yearly',
  CUSTOM: 'custom',
};

// Reminder Object Structure
export const createReminder = (data) => ({
  id: data.id || generateId(),
  title: data.title,
  description: data.description || '',
  category: data.category,
  priority: data.priority || Priority.MEDIUM,
  dueDate: data.dueDate,
  dueTime: data.dueTime || null, // "14:30"
  
  // Notifications
  notificationEnabled: data.notificationEnabled !== false,
  notifyBefore: data.notifyBefore || [60], // минути преди
  
  // Recurrence
  recurrence: data.recurrence || RecurrenceType.NONE,
  recurrenceEnd: data.recurrenceEnd || null,
  
  // Status
  completed: data.completed || false,
  completedDate: data.completedDate || null,
  snoozedUntil: data.snoozedUntil || null,
  
  // Metadata
  createdAt: data.createdAt || new Date(),
  updatedAt: new Date(),
  tags: data.tags || [],
  notes: data.notes || '',
  
  // Payment specific
  amount: data.amount || null,
  currency: data.currency || 'BGN',
});

function generateId() {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}