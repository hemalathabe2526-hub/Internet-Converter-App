import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useData } from '@/context/DataContext';
import { useAuth } from '@/context/AuthContext';

export default function HomeScreen() {
  const { currentPack, todayUsage, addOnData, isLoading, error, fetchDashboardData, convertUnusedData } = useData();
  const { user } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [conversionInProgress, setConversionInProgress] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchDashboardData();
    setRefreshing(false);
  };

  const handleConvertData = async () => {
    setConversionInProgress(true);
    const success = await convertUnusedData();
    setConversionInProgress(false);
    if (success) {
      // Show success message
    }
  };

  const calculateUsagePercentage = () => {
    if (!currentPack) return 0;
    return Math.round((currentPack.usedDataMB / currentPack.totalDataMB) * 100);
  };

  const calculateAddOnTotal = () => {
    return addOnData.reduce((sum, item) => sum + (item.addOnDataMB - item.usedDataMB), 0);
  };

  if (isLoading && !currentPack) {
    return (
      <ThemedView style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#208AEF" />
          </View>
        </SafeAreaView>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <ThemedText type="title" style={styles.title}>
              Dashboard
            </ThemedText>
            <ThemedText style={styles.subtitle}>
              Welcome, {user?.phoneNumber}
            </ThemedText>
          </View>

          {error && <ThemedText style={styles.errorText}>{error}</ThemedText>}

          {/* Current Data Pack */}
          {currentPack && (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <ThemedText type="subtitle" style={styles.cardTitle}>
                  Current Data Pack
                </ThemedText>
                <ThemedText style={styles.packName}>{currentPack.packName}</ThemedText>
              </View>

              {/* Usage Bar */}
              <View style={styles.usageContainer}>
                <View style={styles.usageBar}>
                  <View
                    style={[
                      styles.usageFill,
                      { width: `${calculateUsagePercentage()}%` },
                    ]}
                  />
                </View>
                <View style={styles.usageStats}>
                  <View style={styles.statItem}>
                    <ThemedText style={styles.statLabel}>Used</ThemedText>
                    <ThemedText style={styles.statValue}>
                      {currentPack.usedDataMB.toFixed(2)} MB
                    </ThemedText>
                  </View>
                  <View style={styles.statItem}>
                    <ThemedText style={styles.statLabel}>Remaining</ThemedText>
                    <ThemedText style={styles.statValue}>
                      {currentPack.remainingDataMB.toFixed(2)} MB
                    </ThemedText>
                  </View>
                  <View style={styles.statItem}>
                    <ThemedText style={styles.statLabel}>Total</ThemedText>
                    <ThemedText style={styles.statValue}>
                      {currentPack.totalDataMB.toFixed(2)} MB
                    </ThemedText>
                  </View>
                </View>
              </View>

              {/* Validity */}
              <View style={styles.validityContainer}>
                <ThemedText style={styles.validityLabel}>Valid Until</ThemedText>
                <ThemedText style={styles.validityDate}>
                  {new Date(currentPack.validityEndDate).toLocaleDateString()}
                </ThemedText>
              </View>
            </View>
          )}

          {/* Today's Usage */}
          {todayUsage && (
            <View style={styles.card}>
              <ThemedText type="subtitle" style={styles.cardTitle}>
                Today's Usage
              </ThemedText>
              <View style={styles.usageGrid}>
                <View style={styles.gridItem}>
                  <ThemedText style={styles.gridLabel}>Used Today</ThemedText>
                  <ThemedText style={styles.gridValue}>
                    {todayUsage.usedDataMB.toFixed(2)} MB
                  </ThemedText>
                </View>
                <View style={styles.gridItem}>
                  <ThemedText style={styles.gridLabel}>Remaining Today</ThemedText>
                  <ThemedText style={styles.gridValue}>
                    {todayUsage.remainingDataMB.toFixed(2)} MB
                  </ThemedText>
                </View>
                <View style={styles.gridItem}>
                  <ThemedText style={styles.gridLabel}>Will Convert</ThemedText>
                  <ThemedText style={styles.gridValue}>
                    {todayUsage.convertedToAddOnMB.toFixed(2)} MB
                  </ThemedText>
                </View>
              </View>
            </View>
          )}

          {/* Add-on Data */}
          {addOnData.length > 0 && (
            <View style={styles.card}>
              <ThemedText type="subtitle" style={styles.cardTitle}>
                Active Add-ons
              </ThemedText>
              <View style={styles.addOnStats}>
                <View style={styles.addOnStatItem}>
                  <ThemedText style={styles.addOnStatLabel}>Total Add-on Data</ThemedText>
                  <ThemedText style={styles.addOnStatValue}>
                    {calculateAddOnTotal().toFixed(2)} MB
                  </ThemedText>
                </View>
                <View style={styles.addOnStatItem}>
                  <ThemedText style={styles.addOnStatLabel}>Active Add-ons</ThemedText>
                  <ThemedText style={styles.addOnStatValue}>
                    {addOnData.length}
                  </ThemedText>
                </View>
              </View>

              {/* Add-on List */}
              <View style={styles.addOnList}>
                {addOnData.map((addon) => (
                  <View key={addon.id} style={styles.addOnItem}>
                    <View style={styles.addOnInfo}>
                      <ThemedText style={styles.addOnName}>
                        {addon.addOnDataMB.toFixed(2)} MB
                      </ThemedText>
                      <ThemedText style={styles.addOnDate}>
                        Expires: {new Date(addon.expiryDate).toLocaleDateString()}
                      </ThemedText>
                    </View>
                    <ThemedText style={styles.addOnUsed}>
                      {(addon.addOnDataMB - addon.usedDataMB).toFixed(2)} MB left
                    </ThemedText>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Manual Conversion */}
          <TouchableOpacity
            style={[styles.conversionButton, conversionInProgress && styles.buttonDisabled]}
            onPress={handleConvertData}
            disabled={conversionInProgress}
          >
            {conversionInProgress ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <ThemedText style={styles.conversionButtonText}>
                🔄 Convert Unused Data Now
              </ThemedText>
            )}
          </TouchableOpacity>

          {/* Info */}
          <View style={styles.infoBox}>
            <ThemedText style={styles.infoTitle}>ℹ️ How It Works</ThemedText>
            <ThemedText style={styles.infoText}>
              Unused data at the end of each day (after 12 AM) is automatically converted to add-on data for the next day. You can also manually convert anytime.
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
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#208AEF',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  errorText: {
    color: '#e74c3c',
    fontSize: 12,
    marginBottom: 12,
    padding: 8,
    backgroundColor: '#ffe6e6',
    borderRadius: 4,
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#208AEF',
  },
  cardHeader: {
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  packName: {
    fontSize: 14,
    color: '#666',
  },
  usageContainer: {
    marginBottom: 12,
  },
  usageBar: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 12,
  },
  usageFill: {
    height: '100%',
    backgroundColor: '#208AEF',
  },
  usageStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flex: 1,
  },
  statLabel: {
    fontSize: 11,
    color: '#999',
    marginBottom: 2,
  },
  statValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
  },
  validityContainer: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  validityLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  validityDate: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  usageGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  gridItem: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  gridLabel: {
    fontSize: 11,
    color: '#999',
    marginBottom: 4,
  },
  gridValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#208AEF',
  },
  addOnStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  addOnStatItem: {
    flex: 1,
  },
  addOnStatLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  addOnStatValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#27ae60',
  },
  addOnList: {
    gap: 8,
  },
  addOnItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#27ae60',
  },
  addOnInfo: {
    flex: 1,
  },
  addOnName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  addOnDate: {
    fontSize: 11,
    color: '#999',
  },
  addOnUsed: {
    fontSize: 12,
    fontWeight: '600',
    color: '#27ae60',
  },
  conversionButton: {
    backgroundColor: '#27ae60',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  conversionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  infoBox: {
    backgroundColor: '#e8f4f8',
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
