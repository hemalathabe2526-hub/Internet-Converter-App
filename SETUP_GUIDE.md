# Internet Converter App - Setup Guide

## Quick Start

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **Expo CLI**: Latest version
- **Git**: For version control
- **Android Studio** (for Android development)
- **Xcode** (for iOS development on macOS)

### Installation

1. **Clone the repository**
   ```bash
   cd internet-converter-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install additional packages**
   ```bash
   npm install axios @react-native-async-storage/async-storage expo-task-manager expo-background-fetch
   ```

4. **Create environment file**
   ```bash
   cp .env.example .env
   ```

5. **Configure API URL**
   Edit `.env` and set your backend API URL:
   ```
   EXPO_PUBLIC_API_URL=http://your-backend-api.com/api
   ```

## Running the App

### Development Mode

**Web**
```bash
npm run web
```
Opens the app in your default browser at `http://localhost:19006`

**Android**
```bash
npm run android
```
Requires Android emulator or connected Android device

**iOS**
```bash
npm run ios
```
Requires macOS and iOS simulator or connected iPhone

**Expo Go (Easiest)**
```bash
npm start
```
Then scan the QR code with Expo Go app on your phone

### Production Build

**Android**
```bash
eas build --platform android --auto-submit
```

**iOS**
```bash
eas build --platform ios --auto-submit
```

## Project Structure

```
internet-converter-app/
├── src/
│   ├── app/                    # Screens and routing
│   │   ├── (tabs)/            # Tab-based screens
│   │   │   ├── _layout.tsx
│   │   │   ├── home.tsx
│   │   │   ├── history.tsx
│   │   │   └── profile.tsx
│   │   ├── _layout.tsx         # Root layout
│   │   ├── login.tsx           # Login screen
│   │   └── verify-otp.tsx      # OTP verification
│   ├── components/             # Reusable components
│   ├── context/                # State management
│   │   ├── AuthContext.tsx
│   │   └── DataContext.tsx
│   ├── services/               # API and business logic
│   │   ├── api.ts
│   │   ├── backgroundTask.ts
│   │   └── scheduler.ts
│   ├── hooks/                  # Custom React hooks
│   │   └── useScheduler.ts
│   ├── types/                  # TypeScript definitions
│   │   └── index.ts
│   └── constants/              # App constants
├── assets/                     # Images, fonts, etc.
├── app.json                    # Expo configuration
├── package.json                # Dependencies
├── tsconfig.json               # TypeScript config
└── README.md                   # Project documentation
```

## Configuration

### API Configuration

Update `EXPO_PUBLIC_API_URL` in `.env`:

```env
# Development
EXPO_PUBLIC_API_URL=http://localhost:3000/api

# Staging
EXPO_PUBLIC_API_URL=https://staging-api.example.com/api

# Production
EXPO_PUBLIC_API_URL=https://api.example.com/api
```

### App Configuration

Edit `app.json` to customize:

```json
{
  "expo": {
    "name": "Internet Converter",
    "slug": "internet-converter-app",
    "version": "1.0.0",
    "scheme": "internetconverterapp"
  }
}
```

## Development Workflow

### 1. Feature Development

```bash
# Create a new branch
git checkout -b feature/feature-name

# Make changes
# Test locally
npm start

# Commit changes
git add .
git commit -m "feat: add feature description"

# Push to repository
git push origin feature/feature-name
```

### 2. Testing

**Manual Testing**
- Test on multiple devices/emulators
- Test on both Android and iOS
- Test on web browser

**Automated Testing** (Future)
```bash
npm test
```

### 3. Code Quality

**Linting**
```bash
npm run lint
```

**TypeScript Check**
```bash
npx tsc --noEmit
```

## Debugging

### Using React Native Debugger

1. Install React Native Debugger
2. Run app: `npm start`
3. Press `d` in terminal to open debugger
4. Open React Native Debugger app

### Using Expo DevTools

Press `Shift + M` in terminal to access menu:
- `d` - Open debugger
- `i` - Open iOS simulator
- `a` - Open Android emulator
- `w` - Open web browser
- `r` - Reload app
- `m` - Toggle menu

### Console Logging

```typescript
console.log('Debug message');
console.warn('Warning message');
console.error('Error message');
```

## Common Issues & Solutions

### Issue: "Cannot find module" errors

**Solution**:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: Port already in use

**Solution**:
```bash
# Find process using port 19000
lsof -i :19000

# Kill process
kill -9 <PID>
```

### Issue: Android emulator not starting

**Solution**:
```bash
# List available emulators
emulator -list-avds

# Start emulator
emulator -avd <emulator_name>
```

### Issue: iOS build fails

**Solution**:
```bash
# Clear build cache
rm -rf ~/Library/Developer/Xcode/DerivedData/*

# Reinstall pods
cd ios
pod install
cd ..
```

### Issue: API connection fails

**Solution**:
1. Check API URL in `.env`
2. Verify backend is running
3. Check network connectivity
4. Review API response in console

## Performance Optimization

### 1. Code Splitting

Use lazy loading for screens:
```typescript
import { lazy, Suspense } from 'react';

const HomeScreen = lazy(() => import('./home'));

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <HomeScreen />
    </Suspense>
  );
}
```

### 2. Image Optimization

Use optimized images:
```typescript
import { Image } from 'react-native';

<Image
  source={require('./image.png')}
  style={{ width: 100, height: 100 }}
  resizeMode="contain"
/>
```

### 3. List Optimization

Use FlatList for large lists:
```typescript
import { FlatList } from 'react-native';

<FlatList
  data={items}
  renderItem={({ item }) => <Item item={item} />}
  keyExtractor={(item) => item.id}
  removeClippedSubviews={true}
  maxToRenderPerBatch={10}
  updateCellsBatchingPeriod={50}
/>
```

## Deployment

### Staging Deployment

1. Update version in `app.json`
2. Build for staging:
   ```bash
   eas build --platform android --profile staging
   eas build --platform ios --profile staging
   ```
3. Test thoroughly
4. Submit to staging store

### Production Deployment

1. Update version and build number
2. Update changelog
3. Build for production:
   ```bash
   eas build --platform android --auto-submit
   eas build --platform ios --auto-submit
   ```
4. Monitor app store submissions
5. Announce release

## Monitoring & Analytics

### Error Tracking

Integrate with error tracking service:
```typescript
import * as Sentry from "sentry-expo";

Sentry.init({
  dsn: "your-sentry-dsn",
  enableInExpoDevelopment: true,
  tracesSampleRate: 1.0,
});
```

### Analytics

Track user events:
```typescript
import { Analytics } from '@/services/analytics';

Analytics.track('user_login', {
  phoneNumber: '9876543210',
  timestamp: new Date(),
});
```

## Security Checklist

- [ ] API uses HTTPS
- [ ] Sensitive data encrypted
- [ ] No hardcoded credentials
- [ ] Token refresh implemented
- [ ] Input validation on all forms
- [ ] Error messages don't expose sensitive info
- [ ] Security headers configured
- [ ] Dependencies updated
- [ ] Code reviewed before merge
- [ ] Penetration testing completed

## Maintenance

### Regular Tasks

**Weekly**
- Monitor error logs
- Check app performance
- Review user feedback

**Monthly**
- Update dependencies
- Security audit
- Performance review

**Quarterly**
- Major version updates
- Feature planning
- User research

### Backup & Recovery

```bash
# Backup project
git push origin main

# Restore from backup
git clone <repository>
npm install
```

## Resources

- [React Native Documentation](https://reactnative.dev)
- [Expo Documentation](https://docs.expo.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [React Hooks Guide](https://react.dev/reference/react/hooks)

## Support

For issues and questions:
1. Check documentation
2. Search GitHub issues
3. Ask in team Slack channel
4. Contact development team

## Next Steps

1. Set up backend API
2. Configure environment variables
3. Run app locally
4. Test all features
5. Deploy to staging
6. Gather user feedback
7. Deploy to production

---

**Last Updated**: June 2026  
**Version**: 1.0.0
