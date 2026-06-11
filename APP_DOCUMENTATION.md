# Internet Converter Mobile App

## Overview

**Internet Converter** is a React Native mobile application that helps users automatically convert their unused daily internet data into add-on data for the next day. The app provides real-time tracking of data usage and seamlessly manages data conversion at midnight every day.

## Key Features

### 1. **User Authentication**
- Phone number-based login with OTP verification
- Secure token-based authentication
- Persistent session management

### 2. **Data Pack Management**
- View current active data pack details
- Track total, used, and remaining data
- Monitor data pack validity dates
- Visual progress indicators for data usage

### 3. **Daily Usage Tracking**
- Real-time monitoring of today's data consumption
- Breakdown of used vs. remaining data
- Automatic calculation of data to be converted

### 4. **Add-on Data Management**
- View all active add-on data
- Track add-on expiry dates
- Monitor remaining add-on data usage
- Historical view of all add-ons

### 5. **Automatic Midnight Conversion**
- Automatic conversion of unused data at 12:00 AM daily
- Background task execution for seamless operation
- Manual conversion trigger available anytime
- Conversion history tracking

### 6. **Conversion History**
- Detailed history of all data conversions
- Statistics including total conversions and averages
- Date and time stamps for each conversion
- Visual representation of conversion trends

### 7. **User Profile & Settings**
- View account information
- Notification preferences (coming soon)
- Privacy and security settings (coming soon)
- Support and help resources
- Secure logout functionality

## Project Structure

```
internet-converter-app/
├── src/
│   ├── app/
│   │   ├── (tabs)/
│   │   │   ├── _layout.tsx          # Tab navigation layout
│   │   │   ├── home.tsx             # Dashboard screen
│   │   │   ├── history.tsx          # Conversion history screen
│   │   │   └── profile.tsx          # Profile & settings screen
│   │   ├── _layout.tsx              # Root layout with providers
│   │   ├── login.tsx                # Login screen
│   │   └── verify-otp.tsx           # OTP verification screen
│   ├── components/                  # Reusable UI components
│   ├── context/
│   │   ├── AuthContext.tsx          # Authentication state management
│   │   └── DataContext.tsx          # Data state management
│   ├── services/
│   │   ├── api.ts                   # API service layer
│   │   ├── backgroundTask.ts        # Background task management
│   │   └── scheduler.ts             # Task scheduling service
│   ├── hooks/
│   │   └── useScheduler.ts          # Scheduler hook
│   ├── types/
│   │   └── index.ts                 # TypeScript type definitions
│   └── constants/
├── package.json
├── app.json
└── tsconfig.json
```

## Technology Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **State Management**: React Context API
- **Navigation**: Expo Router
- **Storage**: AsyncStorage
- **HTTP Client**: Axios
- **Background Tasks**: Expo Task Manager & Background Fetch
- **Styling**: React Native StyleSheet with custom theme

## Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Expo CLI

### Installation Steps

```bash
# Clone the repository
cd internet-converter-app

# Install dependencies
npm install

# Install additional packages
npm install axios @react-native-async-storage/async-storage expo-task-manager expo-background-fetch

# Start the development server
npm start

# Run on specific platform
npm run android    # Android
npm run ios        # iOS
npm run web        # Web
```

## API Integration

The app communicates with a backend API for:

- **Authentication**: `/auth/request-otp`, `/auth/verify-otp`
- **User Data**: `/user/profile`, `/user/dashboard`
- **Data Packs**: `/data-packs`
- **Data Usage**: `/data-usage/update`
- **Add-on Data**: `/add-on-data`
- **Conversion**: `/conversion/convert-unused-data`, `/conversion/history`

### Environment Variables

Create a `.env` file in the root directory:

```env
EXPO_PUBLIC_API_URL=http://your-api-url/api
```

## Data Models

### User
```typescript
{
  id: string;
  phoneNumber: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}
```

### DataPack
```typescript
{
  id: string;
  userId: string;
  packName: string;
  totalDataMB: number;
  usedDataMB: number;
  remainingDataMB: number;
  validityStartDate: string;
  validityEndDate: string;
  isActive: boolean;
}
```

### AddOnData
```typescript
{
  id: string;
  userId: string;
  addOnDataMB: number;
  createdDate: string;
  expiryDate: string;
  isUsed: boolean;
  usedDataMB: number;
}
```

### ConversionHistory
```typescript
{
  id: string;
  userId: string;
  conversionDate: string;
  unusedDataMB: number;
  convertedDataMB: number;
}
```

## Features in Detail

### Authentication Flow

1. User enters phone number on login screen
2. App sends OTP request to backend
3. User receives SMS with 6-digit OTP
4. User enters OTP on verification screen
5. App verifies OTP and receives authentication token
6. Token is stored locally for future requests
7. User is redirected to dashboard

### Data Conversion Process

1. **Automatic Conversion (Midnight)**
   - Background task runs at 12:00 AM
   - Calculates unused data from previous day
   - Converts unused data to add-on data
   - Updates user's add-on data balance

2. **Manual Conversion**
   - User can trigger conversion anytime via dashboard
   - Immediate conversion of remaining daily data
   - Real-time update of add-on data

3. **Conversion History**
   - All conversions are logged with timestamp
   - User can view detailed history
   - Statistics available for analysis

### Background Task Management

The app uses Expo's background task system to:
- Register periodic tasks
- Execute conversion at midnight
- Sync data in background
- Maintain reliability across app restarts

## State Management

### AuthContext
Manages:
- User authentication state
- Login/logout operations
- OTP verification
- Phone number storage

### DataContext
Manages:
- Current data pack information
- Daily usage statistics
- Add-on data list
- Conversion history
- Data refresh operations

## Styling & Theme

The app uses a consistent color scheme:
- **Primary Blue**: `#208AEF`
- **Success Green**: `#27ae60`
- **Error Red**: `#e74c3c`
- **Light Background**: `#f9f9f9`
- **Text Primary**: `#333333`
- **Text Secondary**: `#666666`

## Security Considerations

1. **Authentication**: Token-based with secure storage
2. **Data Storage**: Sensitive data encrypted in AsyncStorage
3. **API Communication**: HTTPS only
4. **Session Management**: Automatic logout on token expiry
5. **Privacy**: No third-party data sharing

## Testing

### Manual Testing Checklist

- [ ] Login with valid phone number
- [ ] Verify OTP functionality
- [ ] View dashboard with data pack info
- [ ] Check today's usage display
- [ ] View add-on data list
- [ ] Manual data conversion
- [ ] Check conversion history
- [ ] View profile information
- [ ] Test logout functionality
- [ ] Verify background task execution

### Testing Midnight Conversion

For development/testing:
```typescript
import { triggerMidnightConversion } from '@/services/backgroundTask';

// Manually trigger conversion
await triggerMidnightConversion();
```

## Troubleshooting

### Common Issues

1. **Background task not running**
   - Ensure app has proper permissions
   - Check battery optimization settings
   - Verify task is registered on app start

2. **OTP not received**
   - Check SMS permissions
   - Verify phone number format
   - Check backend SMS service

3. **Data not syncing**
   - Verify API URL in environment
   - Check network connectivity
   - Review API response format

4. **Authentication token expired**
   - App automatically handles re-authentication
   - User will be redirected to login

## Future Enhancements

- [ ] Push notifications for conversions
- [ ] Data usage analytics and charts
- [ ] Multiple device support
- [ ] Offline mode with sync
- [ ] Data sharing between users
- [ ] Custom conversion rules
- [ ] Integration with carrier APIs
- [ ] Multi-language support
- [ ] Dark mode enhancement
- [ ] Advanced analytics dashboard

## Performance Optimization

- Lazy loading of screens
- Efficient re-renders with React.memo
- Optimized API calls with caching
- Background task throttling
- Memory management for large datasets

## Deployment

### Building for Production

```bash
# Android
eas build --platform android --auto-submit

# iOS
eas build --platform ios --auto-submit

# Web
npm run build
```

### Environment Setup

1. Configure API endpoint for production
2. Set up secure token storage
3. Enable production logging
4. Configure push notifications
5. Set up analytics

## Support & Maintenance

- Regular security updates
- Performance monitoring
- User feedback integration
- Bug fixes and patches
- Feature updates based on user needs

## License

This project is proprietary and confidential.

## Contact

For support and inquiries, please contact the development team.

---

**Version**: 1.0.0  
**Last Updated**: June 2026
