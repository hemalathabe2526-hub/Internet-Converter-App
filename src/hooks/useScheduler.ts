import { useEffect, useState, useCallback } from 'react';
import {
  initializeScheduler,
  getScheduledTasks,
  executeScheduledTask,
  checkAndExecuteDueTasks,
  setAutomaticTasksEnabled,
} from '@/services/scheduler';

interface ScheduledTask {
  id: string;
  name: string;
  time: string;
  enabled: boolean;
  lastRun?: string;
}

export const useScheduler = () => {
  const [tasks, setTasks] = useState<ScheduledTask[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize scheduler on mount
  useEffect(() => {
    const init = async () => {
      await initializeScheduler();
      const scheduledTasks = await getScheduledTasks();
      setTasks(scheduledTasks);
      setIsInitialized(true);
    };

    init();
  }, []);

  // Check for due tasks periodically
  useEffect(() => {
    if (!isInitialized) return;

    const checkInterval = setInterval(async () => {
      await checkAndExecuteDueTasks();
      const updatedTasks = await getScheduledTasks();
      setTasks(updatedTasks);
    }, 60000); // Check every minute

    return () => clearInterval(checkInterval);
  }, [isInitialized]);

  const executeTask = useCallback(async (taskId: string) => {
    const success = await executeScheduledTask(taskId);
    if (success) {
      const updatedTasks = await getScheduledTasks();
      setTasks(updatedTasks);
    }
    return success;
  }, []);

  const enableAutomaticTasks = useCallback(async (enabled: boolean) => {
    await setAutomaticTasksEnabled(enabled);
    const updatedTasks = await getScheduledTasks();
    setTasks(updatedTasks);
  }, []);

  return {
    tasks,
    isInitialized,
    executeTask,
    enableAutomaticTasks,
  };
};
