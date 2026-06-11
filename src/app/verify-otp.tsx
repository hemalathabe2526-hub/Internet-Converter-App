import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAuth } from '@/context/AuthContext';

export default function VerifyOtpScreen() {
  const router = useRouter();
  const { verifyOtp, isLoading, phoneNumber } = useAuth();
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRef = useRef<TextInput>(null);

  // Timer for resend OTP
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else if (resendTimer === 0) {
      setCanResend(true);
    }
  }, [resendTimer]);

  const handleVerifyOtp = async () => {
    setError('');

    if (otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    try {
      const success = await verifyOtp(otp);
      if (success) {
        router.replace('/(tabs)/home');
      } else {
        setError('Invalid OTP. Please try again.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const handleResendOtp = () => {
    setResendTimer(60);
    setCanResend(false);
    setOtp('');
    setError('');
    // Call resend API here if needed
  };

  const handleOtpChange = (text: string) => {
    const cleaned = text.replace(/\D/g, '').slice(0, 6);
    setOtp(cleaned);

    // Auto-submit when 6 digits are entered
    if (cleaned.length === 6) {
      handleVerifyOtp();
    }
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
              <ThemedText style={styles.backButton}>← Back</ThemedText>
            </TouchableOpacity>
            <ThemedText type="title" style={styles.title}>
              Verify OTP
            </ThemedText>
            <ThemedText style={styles.subtitle}>
              Enter the 6-digit code sent to {phoneNumber}
            </ThemedText>
          </View>

          {/* OTP Input */}
          <View style={styles.formContainer}>
            <View style={styles.otpInputContainer}>
              <TextInput
                ref={inputRef}
                style={styles.otpInput}
                placeholder="000000"
                placeholderTextColor="#ccc"
                keyboardType="number-pad"
                maxLength={6}
                value={otp}
                onChangeText={handleOtpChange}
                editable={!isLoading}
              />
            </View>

            {/* OTP Display */}
            <View style={styles.otpDisplay}>
              {Array.from({ length: 6 }).map((_, index) => (
                <View key={index} style={styles.otpBox}>
                  <ThemedText style={styles.otpBoxText}>
                    {otp[index] || ''}
                  </ThemedText>
                </View>
              ))}
            </View>

            {error ? <ThemedText style={styles.errorText}>{error}</ThemedText> : null}

            <TouchableOpacity
              style={[styles.button, isLoading && styles.buttonDisabled]}
              onPress={handleVerifyOtp}
              disabled={isLoading || otp.length !== 6}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <ThemedText style={styles.buttonText}>Verify OTP</ThemedText>
              )}
            </TouchableOpacity>

            {/* Resend OTP */}
            <View style={styles.resendContainer}>
              <ThemedText style={styles.resendText}>Didn't receive the code?</ThemedText>
              <TouchableOpacity
                onPress={handleResendOtp}
                disabled={!canResend}
                style={[!canResend && styles.resendDisabled]}
              >
                <ThemedText
                  style={[
                    styles.resendButton,
                    !canResend && styles.resendButtonDisabled,
                  ]}
                >
                  {canResend ? 'Resend OTP' : `Resend in ${resendTimer}s`}
                </ThemedText>
              </TouchableOpacity>
            </View>
          </View>

          {/* Info */}
          <View style={styles.infoContainer}>
            <ThemedText style={styles.infoTitle}>💡 Tip</ThemedText>
            <ThemedText style={styles.infoText}>
              Check your SMS for the verification code. It may take a few seconds to arrive.
            </ThemedText>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
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
  },
  backButton: {
    fontSize: 14,
    color: '#208AEF',
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
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
  otpInputContainer: {
    marginBottom: 20,
  },
  otpInput: {
    fontSize: 24,
    letterSpacing: 8,
    textAlign: 'center',
    opacity: 0,
    height: 0,
  },
  otpDisplay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  otpBox: {
    width: '14%',
    aspectRatio: 1,
    borderWidth: 2,
    borderColor: '#208AEF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f7ff',
  },
  otpBoxText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#208AEF',
  },
  errorText: {
    color: '#e74c3c',
    fontSize: 12,
    marginBottom: 12,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#208AEF',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  resendText: {
    fontSize: 14,
    color: '#666',
  },
  resendButton: {
    fontSize: 14,
    color: '#208AEF',
    fontWeight: '600',
  },
  resendButtonDisabled: {
    color: '#ccc',
  },
  resendDisabled: {
    opacity: 0.5,
  },
  infoContainer: {
    backgroundColor: '#f0f7ff',
    borderRadius: 8,
    padding: 12,
    marginTop: 20,
  },
  infoTitle: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
    color: '#208AEF',
  },
  infoText: {
    fontSize: 12,
    color: '#666',
    lineHeight: 18,
  },
});
