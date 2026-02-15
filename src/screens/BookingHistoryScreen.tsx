import {useFocusEffect} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {AuthStackParamList} from '../navigation/types';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {fetchUserTrips} from '../store/slices/userTripsSlice';
import {Booking} from '../types';

type Props = NativeStackScreenProps<AuthStackParamList, 'BookingHistory'>;

function BookingHistoryScreen({}: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const {user} = useAppSelector(state => state.auth);
  const {bookingHistory, isLoading, error} = useAppSelector(state => state.userTrips);

  const loadHistory = useCallback(() => {
    if (user?.id) {
      dispatch(fetchUserTrips(user.id));
    }
  }, [dispatch, user?.id]);

  useFocusEffect(
    useCallback(() => {
      loadHistory();
    }, [loadHistory]),
  );

  const renderHistoryCard = ({item}: {item: Booking}) => {
    const routeName = item.bus ? `${item.bus.from} --> ${item.bus.to}` : 'Route unavailable';
    const departure = item.bus ? item.bus.timeFrom : '-';
    const totalPrice = item.bus ? item.bus.price * item.numberOfSeats : 0;

    return (
      <View style={styles.card}>
        <Text style={styles.routeText}>{routeName}</Text>
        <Text style={styles.metaText}>Departure: {departure}</Text>
        <Text style={styles.metaText}>Seats: {item.numberOfSeats}</Text>
        <Text style={styles.metaText}>Total Price: ${totalPrice}</Text>
        <Text style={styles.statusText}>Status: {item.status}</Text>
      </View>
    );
  };

  if (!user) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Please log in to view booking history.</Text>
      </View>
    );
  }

  if (isLoading && bookingHistory.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#2563EB" />
        <Text style={styles.helperText}>Fetching your booking history...</Text>
      </View>
    );
  }

  if (error && bookingHistory.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>
          {error || 'Unable to load booking history. Please try again.'}
        </Text>
        <TouchableOpacity
          style={styles.retryButton}
          activeOpacity={0.8}
          onPress={loadHistory}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={bookingHistory}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={renderHistoryCard}
        refreshing={isLoading}
        onRefresh={loadHistory}
        ListHeaderComponent={<Text style={styles.title}>Booking History</Text>}
        ListEmptyComponent={<Text style={styles.emptyText}>No past or cancelled bookings found.</Text>}
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
  statusText: {
    marginTop: 6,
    fontSize: 13,
    fontWeight: '600',
    color: '#0F172A',
    textTransform: 'capitalize',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#F8FAFC',
  },
  helperText: {
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
    lineHeight: 20,
  },
});

export default BookingHistoryScreen;
