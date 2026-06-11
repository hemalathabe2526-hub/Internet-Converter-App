// User types
export interface User {
  id: string;
  phoneNumber: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

// Data pack types
export interface DataPack {
  id: string;
  userId: string;
  packName: string;
  totalDataMB: number;
  usedDataMB: number;
  remainingDataMB: number;
  validityStartDate: string;
  validityEndDate: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Daily usage tracking
export interface DailyUsage {
  id: string;
  userId: string;
  date: string;
  usedDataMB: number;
  remainingDataMB: number;
  convertedToAddOnMB: number;
  createdAt: string;
  updatedAt: string;
}

// Add-on data
export interface AddOnData {
  id: string;
  userId: string;
  addOnDataMB: number;
  createdDate: string;
  expiryDate: string;
  isUsed: boolean;
  usedDataMB: number;
  createdAt: string;
  updatedAt: string;
}

// Conversion history
export interface ConversionHistory {
  id: string;
  userId: string;
  conversionDate: string;
  unusedDataMB: number;
  convertedDataMB: number;
  createdAt: string;
  updatedAt: string;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface LoginResponse {
  phoneNumber: string;
  sessionId: string;
  expiresIn: number;
}

export interface VerifyOtpResponse {
  token: string;
  user: User;
  expiresIn: number;
}

export interface UserDashboardData {
  user: User;
  currentPack: DataPack;
  todayUsage: DailyUsage;
  addOnData: AddOnData[];
  conversionHistory: ConversionHistory[];
}
