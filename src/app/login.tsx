import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  ScrollView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAuth } from '@/context/AuthContext';

export default function LoginScreen() {
  const router = useRouter();
  const { login, isLoading } = useAuth();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError('');

    // Validate phone number
    const cleanPhone = phoneNumber.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setError('Please enter a valid phone number');
      return;
    }

    try {
      const success = await login(cleanPhone);
      if (success) {
        router.push('/verify-otp');
      } else {
        setError('Failed to send OTP. Please try again.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const formatPhoneNumber = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    let formatted = '';

    if (cleaned.length > 0) {
      if (cleaned.length <= 3) {
        formatted = cleaned;
      } else if (cleaned.length <= 6) {
        formatted = `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
      } else {
        formatted = `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
      }
    }

    setPhoneNumber(formatted);
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <ThemedText type="title" style={styles.title}>
              Internet Converter
            </ThemedText>
            <ThemedText style={styles.subtitle}>
              Convert your unused data to next-day add-ons
            </ThemedText>
          </View>

          {/* Form */}
          <View style={styles.formContainer}>
            <ThemedText type="subtitle" style={styles.label}>
              Enter Your Phone Number
            </ThemedText>

            <View style={styles.inputWrapper}>
              <ThemedText style={styles.countryCode}>+91</ThemedText>
              <TextInput
                style={styles.input}
                placeholder="Enter 10-digit phone number"
                placeholderTextColor="#999"
                keyboardType="phone-pad"
                maxLength={12}
                value={phoneNumber}
                onChangeText={formatPhoneNumber}
                editable={!isLoading}
              />
            </View>

            {error ? <ThemedText style={styles.errorText}>{error}</ThemedText> : null}

            <TouchableOpacity
              style={[styles.button, isLoading && styles.buttonDisabled]}
              onPress={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <ThemedText style={styles.buttonText}>Send OTP</ThemedText>
              )}
            </TouchableOpacity>

            <ThemedText style={styles.infoText}>
              We'll send you a one-time password to verify your phone number
            </ThemedText>
          </View>

          {/* Features */}
          <View style={styles.featuresContainer}>
            <ThemedText type="subtitle" style={styles.featuresTitle}>
              Features
            </ThemedText>
            <FeatureItem icon="📊" title="Track Usage" description="Monitor your daily data usage" />
            <FeatureItem icon="🔄" title="Auto Convert" description="Unused data converts at midnight" />
            <FeatureItem icon="➕" title="Add-ons" description="Get bonus data for next day" />
          </View>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

interface FeatureItemProps {
  icon: string;
  title: string;
  description: string;
}

function FeatureItem({ icon, title, description }: FeatureItemProps) {
  return (
    <View style={styles.featureItem}>
      <ThemedText style={styles.featureIcon}>{icon}</ThemedText>
      <View style={styles.featureContent}>
        <ThemedText type="subtitle" style={styles.featureTitle}>
          {title}
        </ThemedText>
        <ThemedText style={styles.featureDescription}>{description}</ThemedText>
      </View>
    </View>
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
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  header: {
    marginBottom: 40,
    marginTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#208AEF',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  formContainer: {
    marginBottom: 40,
  },
  label: {
    marginBottom: 12,
    fontWeight: '600',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
  },
  countryCode: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
    color: '#333',
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  errorText: {
    color: '#e74c3c',
    fontSize: 12,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#208AEF',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  infoText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
  },
  featuresContainer: {
    marginTop: 30,
  },
  featuresTitle: {
    marginBottom: 16,
    fontWeight: '600',
  },
  featureItem: {
    flexDirection: 'row',
    marginBottom: 16,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  featureIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 12,
    color: '#666',
  },
});
