import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiService } from './api';

interface ScheduledTask {
  id: string;
  name: string;
  time: string; // HH:MM format
  enabled: boolean;
  lastRun?: string;
}

const SCHEDULED_TASKS_KEY = 'scheduledTasks';
const LAST_SYNC_KEY = 'lastDataSync';

// Initialize default scheduled tasks
export const initializeScheduler = async () => {
  try {
    const existingTasks = await AsyncStorage.getItem(SCHEDULED_TASKS_KEY);

    if (!existingTasks) {
      const defaultTasks: ScheduledTask[] = [
        {
          id: 'midnight-conversion',
          name: 'Midnight Data Conversion',
          time: '00:00',
          enabled: true,
        },
        {
          id: 'hourly-sync',
          name: 'Hourly Data Sync',
          time: '00:00', // Runs every hour
          enabled: true,
        },
        {
          id: 'daily-report',
          name: 'Daily Usage Report',
          time: '09:00',
          enabled: true,
        },
      ];

      await AsyncStorage.setItem(SCHEDULED_TASKS_KEY, JSON.stringify(defaultTasks));
    }
  } catch (error) {
    console.error('Error initializing scheduler:', error);
  }
};

// Get all scheduled tasks
export const getScheduledTasks = async (): Promise<ScheduledTask[]> => {
  try {
    const tasks = await AsyncStorage.getItem(SCHEDULED_TASKS_KEY);
    return tasks ? JSON.parse(tasks) : [];
  } catch (error) {
    console.error('Error getting scheduled tasks:', error);
    return [];
  }
};

// Update a scheduled task
export const updateScheduledTask = async (
  taskId: string,
  updates: Partial<ScheduledTask>
) => {
  try {
    const tasks = await getScheduledTasks();
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, ...updates } : task
    );
    await AsyncStorage.setItem(SCHEDULED_TASKS_KEY, JSON.stringify(updatedTasks));
  } catch (error) {
    console.error('Error updating scheduled task:', error);
  }
};

// Check if it's time to run a task
const isTimeToRun = (taskTime: string, lastRun?: string): boolean => {
  const now = new Date();
  const [hours, minutes] = taskTime.split(':').map(Number);

  const taskHour = hours;
  const taskMinute = minutes;

  // For midnight conversion, check if current time is between 00:00 and 00:05
  if (taskTime === '00:00') {
    if (now.getHours() === 0 && now.getMinutes() < 5) {
      // Check if we haven't already run today
      if (lastRun) {
        const lastRunDate = new Date(lastRun);
        if (
          lastRunDate.toDateString() === now.toDateString()
        ) {
          return false; // Already ran today
        }
      }
      return true;
    }
  }

  // For other times, check if current time matches
  if (now.getHours() === taskHour && now.getMinutes() === taskMinute) {
    if (lastRun) {
      const lastRunDate = new Date(lastRun);
      if (
        lastRunDate.toDateString() === now.toDateString() &&
        lastRunDate.getHours() === taskHour
      ) {
        return false; // Already ran this hour
      }
    }
    return true;
  }

  return false;
};

// Execute a scheduled task
export const executeScheduledTask = async (taskId: string): Promise<boolean> => {
  try {
    const tasks = await getScheduledTasks();
    const task = tasks.find((t) => t.id === taskId);

    if (!task || !task.enabled) {
      return false;
    }

    let success = false;

    switch (taskId) {
      case 'midnight-conversion':
        // Convert unused data to add-ons
        const conversionResponse = await apiService.convertUnusedData();
        success = conversionResponse.success;
        break;

      case 'hourly-sync':
        // Sync data usage
        const dashboardResponse = await apiService.getUserDashboard();
        success = dashboardResponse.success;
        break;

      case 'daily-report':
        // Generate daily report (can be extended)
        success = true;
        break;

      default:
        return false;
    }

    // Update last run time
    if (success) {
      await updateScheduledTask(taskId, {
        lastRun: new Date().toISOString(),
      });
    }

    return success;
  } catch (error) {
    console.error(`Error executing task ${taskId}:`, error);
    return false;
  }
};

// Check and execute all due tasks
export const checkAndExecuteDueTasks = async () => {
  try {
    const tasks = await getScheduledTasks();

    for (const task of tasks) {
      if (task.enabled && isTimeToRun(task.time, task.lastRun)) {
        await executeScheduledTask(task.id);
      }
    }
  } catch (error) {
    console.error('Error checking due tasks:', error);
  }
};

// Get last sync time
export const getLastSyncTime = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(LAST_SYNC_KEY);
  } catch (error) {
    console.error('Error getting last sync time:', error);
    return null;
  }
};

// Update last sync time
export const updateLastSyncTime = async () => {
  try {
    await AsyncStorage.setItem(LAST_SYNC_KEY, new Date().toISOString());
  } catch (error) {
    console.error('Error updating last sync time:', error);
  }
};

// Enable/disable all automatic tasks
export const setAutomaticTasksEnabled = async (enabled: boolean) => {
  try {
    const tasks = await getScheduledTasks();
    const updatedTasks = tasks.map((task) => ({
      ...task,
      enabled: task.id === 'midnight-conversion' ? enabled : task.enabled,
    }));
    await AsyncStorage.setItem(SCHEDULED_TASKS_KEY, JSON.stringify(updatedTasks));
  } catch (error) {
    console.error('Error setting automatic tasks:', error);
  }
};
