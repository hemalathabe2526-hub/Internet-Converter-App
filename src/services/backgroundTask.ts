import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiService } from './api';

const BACKGROUND_TASK_NAME = 'internet-converter-midnight-task';

// Define the background task
TaskManager.defineTask(BACKGROUND_TASK_NAME, async () => {
  try {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    // Check if it's around midnight (between 12:00 AM and 12:05 AM)
    if (hours === 0 && minutes < 5) {
      // Get auth token
      const token = await AsyncStorage.getItem('authToken');

      if (token) {
        // Call conversion API
        const response = await apiService.convertUnusedData();

        if (response.success) {
          // Log successful conversion
          const conversions = await AsyncStorage.getItem('midnightConversions');
          const conversionsArray = conversions ? JSON.parse(conversions) : [];
          conversionsArray.push({
            date: new Date().toISOString(),
            success: true,
          });

          // Keep only last 30 conversions
          if (conversionsArray.length > 30) {
            conversionsArray.shift();
          }

          await AsyncStorage.setItem(
            'midnightConversions',
            JSON.stringify(conversionsArray)
          );

          return BackgroundFetch.BackgroundFetchResult.NewData;
        }
      }
    }

    return BackgroundFetch.BackgroundFetchResult.NoData;
  } catch (error) {
    console.error('Background task error:', error);
    return BackgroundFetch.BackgroundFetchResult.Failed;
  }
});

// Initialize background task
export const initializeBackgroundTask = async () => {
  try {
    // Check if task is already registered
    const isRegistered = await TaskManager.isTaskRegisteredAsync(BACKGROUND_TASK_NAME);

    if (!isRegistered) {
      // Register the background fetch task
      await BackgroundFetch.registerTaskAsync(BACKGROUND_TASK_NAME, {
        minimumInterval: 15 * 60, // 15 minutes
        stopOnTerminate: false,
        startOnBoot: true,
      });

      console.log('Background task registered successfully');
    }
  } catch (error) {
    console.error('Error initializing background task:', error);
  }
};

// Stop background task
export const stopBackgroundTask = async () => {
  try {
    const isRegistered = await TaskManager.isTaskRegisteredAsync(BACKGROUND_TASK_NAME);
    if (isRegistered) {
      await BackgroundFetch.unregisterTaskAsync(BACKGROUND_TASK_NAME);
      console.log('Background task unregistered');
    }
  } catch (error) {
    console.error('Error stopping background task:', error);
  }
};

// Get conversion history from background tasks
export const getBackgroundConversionHistory = async () => {
  try {
    const conversions = await AsyncStorage.getItem('midnightConversions');
    return conversions ? JSON.parse(conversions) : [];
  } catch (error) {
    console.error('Error getting background conversion history:', error);
    return [];
  }
};

// Manual midnight conversion trigger (for testing)
export const triggerMidnightConversion = async () => {
  try {
    const token = await AsyncStorage.getItem('authToken');

    if (token) {
      const response = await apiService.convertUnusedData();
      return response.success;
    }

    return false;
  } catch (error) {
    console.error('Error triggering midnight conversion:', error);
    return false;
  }
};
