import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types';
import { apiService } from '@/services/api';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  phoneNumber: string;
  setPhoneNumber: (phone: string) => void;
  login: (phoneNumber: string) => Promise<boolean>;
  verifyOtp: (otp: string) => Promise<boolean>;
  logout: () => Promise<void>;
  checkAuthStatus: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState('');

  // Check authentication status on app start
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const isAuth = await apiService.isAuthenticated();
      if (isAuth) {
        const storedUser = await apiService.getStoredUser();
        setUser(storedUser);
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (phone: string): Promise<boolean> => {
    try {
      setPhoneNumber(phone);
      const response = await apiService.requestOtp(phone);
      return response.success;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const verifyOtp = async (otp: string): Promise<boolean> => {
    try {
      const response = await apiService.verifyOtp(phoneNumber, otp);
      if (response.success && response.data?.user) {
        setUser(response.data.user);
        return true;
      }
      return false;
    } catch (error) {
      console.error('OTP verification error:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await apiService.logout();
      setUser(null);
      setPhoneNumber('');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    phoneNumber,
    setPhoneNumber,
    login,
    verifyOtp,
    logout,
    checkAuthStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
