# Internet Converter - Mobile Application

<div align="center">

![Internet Converter](https://img.shields.io/badge/React%20Native-Expo-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0.3-blue?style=flat-square&logo=typescript)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)
![Version](https://img.shields.io/badge/Version-1.0.0-brightgreen?style=flat-square)
![Status](https://img.shields.io/badge/Status-Active-success?style=flat-square)

**Convert your unused daily internet data into add-on data for the next day automatically**

[Features](#-features) • [Installation](#-installation) • [Documentation](#-documentation) • [Contributing](#-contributing) • [License](#-license)

</div>

---

## 📱 Overview

**Internet Converter** is a cutting-edge React Native mobile application that revolutionizes how users manage their internet data. The app automatically converts unused daily internet data into add-on data for the next day at midnight, ensuring no data goes to waste.

Built with modern technologies including React Native, Expo, TypeScript, and comprehensive state management, Internet Converter provides a seamless user experience across Android, iOS, and web platforms.

### 🎯 Problem Statement

Users often have unused internet data at the end of each day that expires and goes to waste. Internet Converter solves this by automatically converting unused data into next-day add-ons, maximizing data utilization and providing better value to users.

---

## ✨ Key Features

### 🔐 Authentication
- **Phone Number-Based Login** - Simple and secure authentication
- **OTP Verification** - 6-digit one-time password verification
- **Token-Based Security** - JWT tokens with secure storage
- **Session Management** - Automatic logout and token refresh

### 📊 Data Tracking
- **Real-Time Usage Monitoring** - Live data consumption tracking
- **Data Pack Information** - View active plans and validity dates
- **Usage Breakdown** - Detailed daily usage statistics
- **Visual Progress Indicators** - Easy-to-understand progress bars

### 🔄 Automatic Conversion
- **Midnight Conversion** - Automatic conversion at 12:00 AM daily
- **Background Task Execution** - Runs even when app is closed
- **Manual Trigger** - Convert anytime on demand
- **Conversion Logging** - Complete history of all conversions

### ➕ Add-on Management
- **Active Add-ons Display** - View all available add-on data
- **Expiry Tracking** - Monitor add-on expiration dates
- **Usage Monitoring** - Track remaining add-on data
- **Historical Records** - View all past add-ons

### 📈 Analytics & History
- **Conversion History** - Detailed records with timestamps
- **Usage Statistics** - Total conversions and averages
- **Trend Analysis** - Historical data visualization
- **Daily Reports** - Comprehensive usage summaries

### ⚙️ User Settings
- **Profile Management** - View and manage account information
- **Notification Preferences** - Customize alerts and notifications
- **Privacy Settings** - Control data and privacy options
- **Support Resources** - Access help and documentation

---

## 🛠 Technology Stack

### Frontend
| Technology | Version | Purpose |
|-----------|---------|---------|
| React Native | 0.85.3 | Mobile framework |
| Expo | 56.0.11 | Development platform |
| TypeScript | 6.0.3 | Type safety |
| Expo Router | 56.2.10 | Navigation |
| React Context | 19.2.3 | State management |

### Libraries & Tools
| Library | Version | Purpose |
|---------|---------|---------|
| Axios | 1.17.0 | HTTP client |
| AsyncStorage | 3.1.1 | Local storage |
| Expo Task Manager | 56.0.18 | Background tasks |
| Expo Background Fetch | 56.0.18 | Background execution |
| React Native Safe Area | 5.7.0 | Safe area handling |

### Development
- **Language**: TypeScript
- **Styling**: React Native StyleSheet
- **Build Tool**: Expo CLI
- **Version Control**: Git
- **Package Manager**: npm

---

## 📦 Installation

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher)
- **Expo CLI** (latest version)
- **Git**

### Step 1: Clone the Repository

```bash
git clone https://github.com/hemalathabe2526-hub/Internet-Converter-App.git
cd Internet-Converter-App
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Configure Environment

```bash
# Copy the environment template
cp .env.example .env

# Edit .env and set your API URL
EXPO_PUBLIC_API_URL=http://your-api-url/api
```

### Step 4: Start Development Server

```bash
npm start
```

### Step 5: Run on Your Device

**Android:**
```bash
npm run android
```

**iOS:**
```bash
npm run ios
```

**Web:**
```bash
npm run web
```

**Expo Go (Easiest):**
- Scan the QR code with Expo Go app on your phone

---

## 📁 Project Structure

```
Internet-Converter-App/
├── src/
│   ├── app/
│   │   ├── (tabs)/
│   │   │   ├── _layout.tsx          # Tab navigation
│   │   │   ├── home.tsx             # Dashboard
│   │   │   ├── history.tsx          # Conversion history
│   │   │   └── profile.tsx          # User profile
│   │   ├── _layout.tsx              # Root layout
│   │   ├── login.tsx                # Login screen
│   │   └── verify-otp.tsx           # OTP verification
│   │
│   ├── context/
│   │   ├── AuthContext.tsx          # Authentication state
│   │   └── DataContext.tsx          # Data management state
│   │
│   ├── services/
│   │   ├── api.ts                   # API client
│   │   ├── backgroundTask.ts        # Background tasks
│   │   └── scheduler.ts             # Task scheduling
│   │
│   ├── hooks/
│   │   └── useScheduler.ts          # Custom scheduler hook
│   │
│   ├── types/
│   │   └── index.ts                 # TypeScript interfaces
│   │
│   └── constants/
│       └── theme.ts                 # Theme constants
│
├── assets/                          # Images and icons
├── Documentation/
│   ├── APP_DOCUMENTATION.md         # Feature documentation
│   ├── BACKEND_API_GUIDE.md         # API integration guide
│   ├── SETUP_GUIDE.md               # Development guide
│   └── PROJECT_SUMMARY.md           # Project overview
│
├── app.json                         # Expo configuration
├── package.json                     # Dependencies
├── tsconfig.json                    # TypeScript config
├── .env.example                     # Environment template
└── README.md                        # This file
```

---

## 🚀 Quick Start

### Development

```bash
# Install dependencies
npm install

# Start development server
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios

# Run on Web
npm run web
```

### Building for Production

```bash
# Android
eas build --platform android --auto-submit

# iOS
eas build --platform ios --auto-submit

# Web
npm run build
```

---

## 📚 Documentation

Comprehensive documentation is available in the repository:

### 1. [APP_DOCUMENTATION.md](./APP_DOCUMENTATION.md)
Complete feature documentation including:
- Feature overview and details
- Data models and types
- API integration points
- Security considerations
- Performance optimizations

### 2. [BACKEND_API_GUIDE.md](./BACKEND_API_GUIDE.md)
Backend API integration guide with:
- All API endpoints
- Request/response formats
- Database schema
- Error handling
- Rate limiting

### 3. [SETUP_GUIDE.md](./SETUP_GUIDE.md)
Development setup guide including:
- Installation instructions
- Configuration options
- Debugging techniques
- Troubleshooting
- Deployment procedures

### 4. [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)
Project overview with:
- Feature checklist
- Technology stack
- Project statistics
- Next steps

---

## 🔄 Data Conversion Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    Daily Data Cycle                         │
└─────────────────────────────────────────────────────────────┘

1. USER ACTIVITY
   └─ User consumes internet data throughout the day

2. DAILY USAGE TRACKING
   └─ App monitors and records data consumption

3. MIDNIGHT TRIGGER (12:00 AM)
   └─ Background task automatically executes

4. UNUSED DATA CALCULATION
   └─ System calculates remaining/unused data

5. CONVERSION
   └─ Unused data converted to add-on data

6. ADD-ON CREATION
   └─ New add-on created for next day

7. HISTORY LOGGING
   └─ Conversion recorded with details

8. NEXT DAY
   └─ User can use add-on data + new plan data
```

---

## 🔐 Security Features

- ✅ **JWT Authentication** - Secure token-based authentication
- ✅ **Encrypted Storage** - Sensitive data encrypted locally
- ✅ **HTTPS Communication** - All API calls over HTTPS
- ✅ **Input Validation** - All inputs validated on client and server
- ✅ **Session Management** - Automatic logout on token expiry
- ✅ **Error Handling** - Secure error messages without sensitive info
- ✅ **No Hardcoded Secrets** - All secrets in environment variables

---

## 📊 API Integration

The app communicates with a backend API for:

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/auth/request-otp` | POST | Request OTP |
| `/auth/verify-otp` | POST | Verify OTP & login |
| `/user/dashboard` | GET | Get dashboard data |
| `/data-packs` | GET | Get data packs |
| `/add-on-data` | GET | Get add-ons |
| `/conversion/convert-unused-data` | POST | Trigger conversion |
| `/conversion/history` | GET | Get history |

For detailed API documentation, see [BACKEND_API_GUIDE.md](./BACKEND_API_GUIDE.md)

---

## 🧪 Testing

### Manual Testing Checklist

- [ ] Login with valid phone number
- [ ] OTP verification flow
- [ ] Dashboard data display
- [ ] Add-on data visibility
- [ ] Manual conversion trigger
- [ ] Conversion history view
- [ ] Profile information display
- [ ] Logout functionality
- [ ] Background task execution
- [ ] Error handling
- [ ] Network error recovery

### Running Tests

```bash
# Lint code
npm run lint

# Type check
npx tsc --noEmit
```

---

## 🐛 Troubleshooting

### Common Issues

**Issue**: "Cannot find module" errors
```bash
rm -rf node_modules package-lock.json
npm install
```

**Issue**: Port already in use
```bash
# Find and kill process using port 19000
lsof -i :19000
kill -9 <PID>
```

**Issue**: Background task not running
- Check app permissions
- Verify battery optimization settings
- Ensure task is registered on app start

**Issue**: API connection fails
- Verify API URL in `.env`
- Check network connectivity
- Review API response in console

For more troubleshooting, see [SETUP_GUIDE.md](./SETUP_GUIDE.md)

---

## 📈 Performance

- **Lazy Loading** - Screens load on demand
- **Optimized Renders** - React.memo for efficiency
- **Efficient API Calls** - Caching and throttling
- **Background Task Throttling** - Minimal battery impact
- **Memory Management** - Efficient data structures
- **Bundle Size** - Optimized for fast loading

---

## 🔄 State Management

### AuthContext
Manages:
- User authentication state
- Login/logout operations
- OTP verification
- Phone number storage

### DataContext
Manages:
- Data pack information
- Daily usage statistics
- Add-on data list
- Conversion history

---

## 🎨 UI/UX Design

### Color Scheme
- **Primary**: `#208AEF` (Blue)
- **Success**: `#27ae60` (Green)
- **Error**: `#e74c3c` (Red)
- **Background**: `#f9f9f9` (Light Gray)

### Responsive Design
- Adapts to all screen sizes
- Safe area handling
- Touch-friendly interface
- Accessible typography

---

## 🚀 Deployment

### Staging Deployment

```bash
eas build --platform android --profile staging
eas build --platform ios --profile staging
```

### Production Deployment

```bash
eas build --platform android --auto-submit
eas build --platform ios --auto-submit
```

---

## 📋 Environment Variables

Create a `.env` file with:

```env
# API Configuration
EXPO_PUBLIC_API_URL=http://your-api-url/api

# App Configuration
EXPO_PUBLIC_APP_NAME=Internet Converter
EXPO_PUBLIC_APP_VERSION=1.0.0

# Feature Flags
EXPO_PUBLIC_ENABLE_BACKGROUND_TASKS=true
EXPO_PUBLIC_ENABLE_NOTIFICATIONS=false

# Debug
EXPO_PUBLIC_DEBUG_MODE=false
```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
   ```bash
   git clone https://github.com/yourusername/Internet-Converter-App.git
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow the existing code style
   - Add comments for complex logic
   - Update documentation

4. **Commit your changes**
   ```bash
   git commit -m "feat: Add your feature description"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**
   - Describe your changes
   - Reference any related issues

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---

## 📞 Support

For support and inquiries:

- 📧 **Email**: support@internetconverter.app
- 🐛 **Issues**: [GitHub Issues](https://github.com/hemalathabe2526-hub/Internet-Converter-App/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/hemalathabe2526-hub/Internet-Converter-App/discussions)

---

## 🙏 Acknowledgments

- Built with [React Native](https://reactnative.dev)
- Powered by [Expo](https://expo.dev)
- Type-safe with [TypeScript](https://www.typescriptlang.org)
- State management with [React Context API](https://react.dev/reference/react/useContext)

---

## 📊 Project Statistics

| Metric | Value |
|--------|-------|
| Total Files | 73 |
| Lines of Code | 15,404 |
| TypeScript Files | 30+ |
| Screens | 5 |
| Services | 3 |
| Context Providers | 2 |
| Documentation Files | 4 |

---

## 🗺️ Roadmap

### Phase 1: MVP (Current)
- ✅ Authentication system
- ✅ Data tracking
- ✅ Automatic conversion
- ✅ History tracking

### Phase 2: Enhancement
- 📅 Push notifications
- 📅 Advanced analytics
- 📅 Multi-language support
- 📅 Dark mode

### Phase 3: Expansion
- 📅 Data sharing
- 📅 Custom conversion rules
- 📅 Carrier API integration
- 📅 Advanced reporting

---

## 📈 Version History

### v1.0.0 (Current)
- Initial release
- Core features implemented
- Full documentation
- Backend API ready

---

<div align="center">

**Made with ❤️ for better data management**

[⬆ Back to top](#internet-converter---mobile-application)

</div>
