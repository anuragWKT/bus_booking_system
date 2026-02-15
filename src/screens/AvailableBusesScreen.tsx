import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../navigation/types';
import {Bus} from '../types';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {fetchBuses} from '../store/slices/busesSlice';

type Props = NativeStackScreenProps<AuthStackParamList, 'AvailableBuses'>;

function AvailableBusesScreen({navigation}: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const {buses, isLoading, error} = useAppSelector(state => state.buses);

  useEffect(() => {
    dispatch(fetchBuses());
  }, [dispatch]);

  const renderBusCard = ({item}: {item: Bus}) => (
    <TouchableOpacity
      activeOpacity={0.85}
      style={styles.card}
      onPress={() => navigation.navigate('BusDetails', {busId: item.id})}>
      <Text style={styles.routeText}>
        {item.from} {'-->'} {item.to}
      </Text>
      <Text style={styles.metaText}>Bus: {item.busName}</Text>
      <Text style={styles.metaText}>Price per seat: ${item.price}</Text>
      <Text style={styles.metaText}>Departure: {item.timeFrom}</Text>
      <Text style={styles.metaText}>Available seats: {item.seatsAvailable}</Text>
    </TouchableOpacity>
  );

  if (isLoading && buses.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#2563EB" />
        <Text style={styles.loadingText}>Loading buses...</Text>
      </View>
    );
  }

  if (error && buses.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity
          style={styles.retryButton}
          activeOpacity={0.8}
          onPress={() => dispatch(fetchBuses())}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={buses}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={renderBusCard}
        refreshing={isLoading}
        onRefresh={() => dispatch(fetchBuses())}
        ListHeaderComponent={<Text style={styles.title}>Available Buses</Text>}
        ListEmptyComponent={<Text style={styles.emptyText}>No buses available right now.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  listContainer: {
    padding: 16,
    paddingBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 12,
  },
  card: {
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  routeText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 6,
  },
  metaText: {
    fontSize: 14,
    color: '#475569',
    marginBottom: 2,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#F8FAFC',
  },
  loadingText: {
    marginTop: 8,
    color: '#334155',
  },
  errorText: {
    color: '#DC2626',
    textAlign: 'center',
    marginBottom: 12,
  },
  retryButton: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 18,
    backgroundColor: '#2563EB',
  },
  retryText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  emptyText: {
    color: '#64748B',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default AvailableBusesScreen;
