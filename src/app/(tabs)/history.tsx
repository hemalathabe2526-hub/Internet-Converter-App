import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useData } from '@/context/DataContext';

export default function HistoryScreen() {
  const { conversionHistory, isLoading, fetchConversionHistory } = useData();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchConversionHistory();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchConversionHistory();
    setRefreshing(false);
  };

  if (isLoading && conversionHistory.length === 0) {
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
              Conversion History
            </ThemedText>
            <ThemedText style={styles.subtitle}>
              Track your data conversions
            </ThemedText>
          </View>

          {/* History List */}
          {conversionHistory.length > 0 ? (
            <View style={styles.historyList}>
              {conversionHistory.map((item, index) => (
                <View key={item.id || index} style={styles.historyItem}>
                  <View style={styles.dateSection}>
                    <ThemedText style={styles.dateLabel}>
                      {new Date(item.conversionDate).toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </ThemedText>
                    <ThemedText style={styles.timeLabel}>
                      {new Date(item.conversionDate).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </ThemedText>
                  </View>

                  <View style={styles.conversionDetails}>
                    <View style={styles.detailRow}>
                      <ThemedText style={styles.detailLabel}>Unused Data</ThemedText>
                      <ThemedText style={styles.detailValue}>
                        {item.unusedDataMB.toFixed(2)} MB
                      </ThemedText>
                    </View>
                    <View style={styles.arrow}>
                      <ThemedText style={styles.arrowText}>→</ThemedText>
                    </View>
                    <View style={styles.detailRow}>
                      <ThemedText style={styles.detailLabel}>Converted</ThemedText>
                      <ThemedText style={styles.convertedValue}>
                        {item.convertedDataMB.toFixed(2)} MB
                      </ThemedText>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          ) : (
            <View style={styles.emptyContainer}>
              <ThemedText style={styles.emptyIcon}>📊</ThemedText>
              <ThemedText style={styles.emptyTitle}>No Conversions Yet</ThemedText>
              <ThemedText style={styles.emptyText}>
                Your data conversion history will appear here
              </ThemedText>
            </View>
          )}

          {/* Stats Summary */}
          {conversionHistory.length > 0 && (
            <View style={styles.statsContainer}>
              <ThemedText type="subtitle" style={styles.statsTitle}>
                Summary
              </ThemedText>
              <View style={styles.statsGrid}>
                <View style={styles.statCard}>
                  <ThemedText style={styles.statCardLabel}>Total Conversions</ThemedText>
                  <ThemedText style={styles.statCardValue}>
                    {conversionHistory.length}
                  </ThemedText>
                </View>
                <View style={styles.statCard}>
                  <ThemedText style={styles.statCardLabel}>Total Converted</ThemedText>
                  <ThemedText style={styles.statCardValue}>
                    {conversionHistory
                      .reduce((sum, item) => sum + item.convertedDataMB, 0)
                      .toFixed(2)}{' '}
                    MB
                  </ThemedText>
                </View>
                <View style={styles.statCard}>
                  <ThemedText style={styles.statCardLabel}>Avg Conversion</ThemedText>
                  <ThemedText style={styles.statCardValue}>
                    {(
                      conversionHistory.reduce((sum, item) => sum + item.convertedDataMB, 0) /
                      conversionHistory.length
                    ).toFixed(2)}{' '}
                    MB
                  </ThemedText>
                </View>
              </View>
            </View>
          )}

          {/* Info */}
          <View style={styles.infoBox}>
            <ThemedText style={styles.infoTitle}>💡 About Conversions</ThemedText>
            <ThemedText style={styles.infoText}>
              Every day at 12 AM, your unused data is automatically converted to add-on data for the next day. The conversion happens seamlessly in the background.
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
  historyList: {
    gap: 12,
    marginBottom: 20,
  },
  historyItem: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#27ae60',
  },
  dateSection: {
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  dateLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  timeLabel: {
    fontSize: 12,
    color: '#999',
  },
  conversionDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  detailRow: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 11,
    color: '#999',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  convertedValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#27ae60',
  },
  arrow: {
    paddingHorizontal: 12,
  },
  arrowText: {
    fontSize: 18,
    color: '#208AEF',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  emptyText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  statsContainer: {
    marginBottom: 20,
  },
  statsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#e8f4f8',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  statCardLabel: {
    fontSize: 11,
    color: '#666',
    marginBottom: 6,
  },
  statCardValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#208AEF',
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
