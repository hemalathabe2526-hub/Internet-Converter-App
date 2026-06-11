import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAuth } from '@/context/AuthContext';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Logout',
        onPress: async () => {
          setIsLoggingOut(true);
          await logout();
          router.replace('/login');
        },
        style: 'destructive',
      },
    ]);
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <ThemedText type="title" style={styles.title}>
              Profile
            </ThemedText>
          </View>

          {/* User Info Card */}
          <View style={styles.userCard}>
            <View style={styles.avatarContainer}>
              <ThemedText style={styles.avatar}>👤</ThemedText>
            </View>
            <View style={styles.userInfo}>
              <ThemedText style={styles.phoneNumber}>
                {user?.phoneNumber}
              </ThemedText>
              <ThemedText style={styles.userStatus}>
                Account Active
              </ThemedText>
            </View>
          </View>

          {/* Settings Sections */}
          <View style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Settings
            </ThemedText>

            <SettingItem
              icon="🔔"
              title="Notifications"
              description="Manage notification preferences"
              onPress={() => Alert.alert('Notifications', 'Feature coming soon')}
            />
            <SettingItem
              icon="🔐"
              title="Privacy & Security"
              description="Manage your privacy settings"
              onPress={() => Alert.alert('Privacy', 'Feature coming soon')}
            />
            <SettingItem
              icon="💾"
              title="Data Usage"
              description="View detailed usage analytics"
              onPress={() => Alert.alert('Data Usage', 'Feature coming soon')}
            />
          </View>

          {/* Support Section */}
          <View style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Support
            </ThemedText>

            <SettingItem
              icon="❓"
              title="Help & FAQ"
              description="Get answers to common questions"
              onPress={() => Alert.alert('Help', 'Feature coming soon')}
            />
            <SettingItem
              icon="📧"
              title="Contact Us"
              description="Get in touch with our support team"
              onPress={() => Alert.alert('Contact', 'Feature coming soon')}
            />
            <SettingItem
              icon="📋"
              title="Terms & Conditions"
              description="Read our terms and conditions"
              onPress={() => Alert.alert('Terms', 'Feature coming soon')}
            />
          </View>

          {/* About Section */}
          <View style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              About
            </ThemedText>

            <View style={styles.aboutItem}>
              <ThemedText style={styles.aboutLabel}>App Version</ThemedText>
              <ThemedText style={styles.aboutValue}>1.0.0</ThemedText>
            </View>
            <View style={styles.aboutItem}>
              <ThemedText style={styles.aboutLabel}>Build Number</ThemedText>
              <ThemedText style={styles.aboutValue}>001</ThemedText>
            </View>
          </View>

          {/* Logout Button */}
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
            disabled={isLoggingOut}
          >
            <ThemedText style={styles.logoutButtonText}>
              🚪 Logout
            </ThemedText>
          </TouchableOpacity>

          {/* Info Box */}
          <View style={styles.infoBox}>
            <ThemedText style={styles.infoTitle}>💡 Tip</ThemedText>
            <ThemedText style={styles.infoText}>
              Your data is securely stored and encrypted. We never share your personal information with third parties.
            </ThemedText>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

interface SettingItemProps {
  icon: string;
  title: string;
  description: string;
  onPress: () => void;
}

function SettingItem({ icon, title, description, onPress }: SettingItemProps) {
  return (
    <TouchableOpacity style={styles.settingItem} onPress={onPress}>
      <ThemedText style={styles.settingIcon}>{icon}</ThemedText>
      <View style={styles.settingContent}>
        <ThemedText style={styles.settingTitle}>{title}</ThemedText>
        <ThemedText style={styles.settingDescription}>{description}</ThemedText>
      </View>
      <ThemedText style={styles.settingArrow}>›</ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#208AEF',
  },
  userCard: {
    backgroundColor: '#f0f7ff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#208AEF',
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#e8f4f8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatar: {
    fontSize: 32,
  },
  userInfo: {
    flex: 1,
  },
  phoneNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  userStatus: {
    fontSize: 12,
    color: '#27ae60',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 8,
  },
  settingIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 12,
    color: '#999',
  },
  settingArrow: {
    fontSize: 20,
    color: '#ccc',
  },
  aboutItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 8,
  },
  aboutLabel: {
    fontSize: 14,
    color: '#666',
  },
  aboutValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  infoBox: {
    backgroundColor: '#f0f7ff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    borderLeftWidth: 3,
    borderLeftColor: '#208AEF',
  },
  infoTitle: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 6,
    color: '#208AEF',
  },
  infoText: {
    fontSize: 12,
    color: '#555',
    lineHeight: 18,
  },
});
