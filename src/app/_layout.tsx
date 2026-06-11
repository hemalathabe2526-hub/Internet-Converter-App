import React, { useEffect } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useRouter } from 'expo-router';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { DataProvider } from '@/context/DataContext';
import { initializeBackgroundTask } from '@/services/backgroundTask';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

function RootLayoutNav() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();
  const [fontsLoaded] = useFonts({
    SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    // Initialize background task for midnight conversion
    initializeBackgroundTask();
  }, []);

  useEffect(() => {
    if (fontsLoaded && !isLoading) {
      SplashScreen.hideAsync();

      // Navigate based on authentication status
      if (isAuthenticated) {
        router.replace('/(tabs)/home');
      } else {
        router.replace('/login');
      }
    }
  }, [fontsLoaded, isLoading, isAuthenticated]);

  if (!fontsLoaded || isLoading) {
    return null;
  }

  return null;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <DataProvider>
        <RootLayoutNav />
      </DataProvider>
    </AuthProvider>
  );
}
