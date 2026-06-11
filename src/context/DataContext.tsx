import React, { createContext, useContext, useState, useCallback } from 'react';
import { DataPack, DailyUsage, AddOnData, ConversionHistory } from '@/types';
import { apiService } from '@/services/api';

interface DataContextType {
  currentPack: DataPack | null;
  todayUsage: DailyUsage | null;
  addOnData: AddOnData[];
  conversionHistory: ConversionHistory[];
  isLoading: boolean;
  error: string | null;
  fetchDashboardData: () => Promise<void>;
  fetchAddOnData: () => Promise<void>;
  fetchConversionHistory: () => Promise<void>;
  convertUnusedData: () => Promise<boolean>;
  refreshData: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPack, setCurrentPack] = useState<DataPack | null>(null);
  const [todayUsage, setTodayUsage] = useState<DailyUsage | null>(null);
  const [addOnData, setAddOnData] = useState<AddOnData[]>([]);
  const [conversionHistory, setConversionHistory] = useState<ConversionHistory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await apiService.getUserDashboard();

      if (response.success && response.data) {
        setCurrentPack(response.data.currentPack);
        setTodayUsage(response.data.todayUsage);
        setAddOnData(response.data.addOnData);
        setConversionHistory(response.data.conversionHistory);
      } else {
        setError(response.error || 'Failed to fetch dashboard data');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchAddOnData = useCallback(async () => {
    try {
      const response = await apiService.getAddOnData();
      if (response.success && response.data) {
        setAddOnData(response.data);
      }
    } catch (err) {
      console.error('Error fetching add-on data:', err);
    }
  }, []);

  const fetchConversionHistory = useCallback(async () => {
    try {
      const response = await apiService.getConversionHistory();
      if (response.success && response.data) {
        setConversionHistory(response.data);
      }
    } catch (err) {
      console.error('Error fetching conversion history:', err);
    }
  }, []);

  const convertUnusedData = useCallback(async (): Promise<boolean> => {
    try {
      setIsLoading(true);
      const response = await apiService.convertUnusedData();

      if (response.success) {
        // Refresh data after conversion
        await fetchDashboardData();
        return true;
      } else {
        setError(response.error || 'Failed to convert unused data');
        return false;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [fetchDashboardData]);

  const refreshData = useCallback(async () => {
    await Promise.all([fetchDashboardData(), fetchAddOnData(), fetchConversionHistory()]);
  }, [fetchDashboardData, fetchAddOnData, fetchConversionHistory]);

  const value: DataContextType = {
    currentPack,
    todayUsage,
    addOnData,
    conversionHistory,
    isLoading,
    error,
    fetchDashboardData,
    fetchAddOnData,
    fetchConversionHistory,
    convertUnusedData,
    refreshData,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within DataProvider');
  }
  return context;
};
