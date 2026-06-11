import axios, { AxiosInstance } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApiResponse, LoginResponse, VerifyOtpResponse, UserDashboardData } from '@/types';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api';

class ApiService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add request interceptor to include auth token
    this.axiosInstance.interceptors.request.use(
      async (config) => {
        const token = await AsyncStorage.getItem('authToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  // Authentication endpoints
  async requestOtp(phoneNumber: string): Promise<ApiResponse<LoginResponse>> {
    try {
      const response = await this.axiosInstance.post<ApiResponse<LoginResponse>>(
        '/auth/request-otp',
        { phoneNumber }
      );
      return response.data;
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to request OTP',
      };
    }
  }

  async verifyOtp(phoneNumber: string, otp: string): Promise<ApiResponse<VerifyOtpResponse>> {
    try {
      const response = await this.axiosInstance.post<ApiResponse<VerifyOtpResponse>>(
        '/auth/verify-otp',
        { phoneNumber, otp }
      );

      if (response.data.success && response.data.data?.token) {
        await AsyncStorage.setItem('authToken', response.data.data.token);
        await AsyncStorage.setItem('user', JSON.stringify(response.data.data.user));
      }

      return response.data;
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to verify OTP',
      };
    }
  }

  async logout(): Promise<void> {
    try {
      await this.axiosInstance.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      await AsyncStorage.removeItem('authToken');
      await AsyncStorage.removeItem('user');
    }
  }

  // User endpoints
  async getUserDashboard(): Promise<ApiResponse<UserDashboardData>> {
    try {
      const response = await this.axiosInstance.get<ApiResponse<UserDashboardData>>(
        '/user/dashboard'
      );
      return response.data;
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch dashboard',
      };
    }
  }

  async getUserProfile() {
    try {
      const response = await this.axiosInstance.get('/user/profile');
      return response.data;
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch profile',
      };
    }
  }

  // Data pack endpoints
  async getDataPacks() {
    try {
      const response = await this.axiosInstance.get('/data-packs');
      return response.data;
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch data packs',
      };
    }
  }

  async updateDataUsage(usedDataMB: number) {
    try {
      const response = await this.axiosInstance.post('/data-usage/update', {
        usedDataMB,
      });
      return response.data;
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update data usage',
      };
    }
  }

  // Add-on data endpoints
  async getAddOnData() {
    try {
      const response = await this.axiosInstance.get('/add-on-data');
      return response.data;
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch add-on data',
      };
    }
  }

  async convertUnusedData() {
    try {
      const response = await this.axiosInstance.post('/conversion/convert-unused-data');
      return response.data;
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to convert unused data',
      };
    }
  }

  // Conversion history endpoints
  async getConversionHistory() {
    try {
      const response = await this.axiosInstance.get('/conversion/history');
      return response.data;
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch conversion history',
      };
    }
  }

  // Check authentication status
  async isAuthenticated(): Promise<boolean> {
    const token = await AsyncStorage.getItem('authToken');
    return !!token;
  }

  // Get stored user
  async getStoredUser() {
    const userJson = await AsyncStorage.getItem('user');
    return userJson ? JSON.parse(userJson) : null;
  }
}

export const apiService = new ApiService();
