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
import {cancelBooking} from '../store/slices/bookingsSlice';
import {fetchBuses} from '../store/slices/busesSlice';
import {fetchUserTrips} from '../store/slices/userTripsSlice';
import {Booking} from '../types';

type Props = NativeStackScreenProps<AuthStackParamList, 'UpcomingTrips'>;

function UpcomingTripsScreen({}: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const {user} = useAppSelector(state => state.auth);
  const {upcomingTrips, isLoading, error} = useAppSelector(state => state.userTrips);
  const {isBooking, bookingError} = useAppSelector(state => state.bookings);

  const loadTrips = useCallback(() => {
    if (user?.id) {
      dispatch(fetchUserTrips(user.id));
    }
  }, [dispatch, user?.id]);

  useFocusEffect(
    useCallback(() => {
      loadTrips();
    }, [loadTrips]),
  );

  const onCancelBooking = async (bookingId: string) => {
    const resultAction = await dispatch(cancelBooking(bookingId));

    if (cancelBooking.fulfilled.match(resultAction)) {
      loadTrips();
      dispatch(fetchBuses());
    }
  };

  const renderTripCard = ({item}: {item: Booking}) => {
    const routeName = item.bus ? `${item.bus.from} --> ${item.bus.to}` : 'Route unavailable';
    const departure = item.bus ? item.bus.timeFrom : '-';
    const totalPrice = item.bus ? item.bus.price * item.numberOfSeats : 0;

    return (
      <View style={styles.card}>
        <Text style={styles.routeText}>{routeName}</Text>
        <Text style={styles.metaText}>Departure: {departure}</Text>
        <Text style={styles.metaText}>Seats: {item.numberOfSeats}</Text>
        <Text style={styles.metaText}>Total Price: ${totalPrice}</Text>
        <TouchableOpacity
          activeOpacity={0.85}
          style={[styles.cancelButton, isBooking ? styles.cancelButtonDisabled : null]}
          onPress={() => onCancelBooking(item.id)}
          disabled={isBooking}>
          <Text style={styles.cancelButtonText}>Cancel Booking</Text>
        </TouchableOpacity>
      </View>
    );
  };

  if (!user) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Please log in to view your trips.</Text>
      </View>
    );
  }

  if (isLoading && upcomingTrips.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#2563EB" />
        <Text style={styles.helperText}>Fetching your upcoming trips...</Text>
      </View>
    );
  }

  if (error && upcomingTrips.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>
          {error || 'Unable to load upcoming trips. Please try again.'}
        </Text>
        <TouchableOpacity
          style={styles.retryButton}
          activeOpacity={0.8}
          onPress={loadTrips}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {bookingError ? <Text style={styles.bannerErrorText}>{bookingError}</Text> : null}
      <FlatList
        data={upcomingTrips}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={renderTripCard}
        refreshing={isLoading}
        onRefresh={loadTrips}
        ListHeaderComponent={<Text style={styles.title}>Upcoming Trips</Text>}
        ListEmptyComponent={<Text style={styles.emptyText}>No upcoming trips found.</Text>}
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
  cancelButton: {
    marginTop: 10,
    alignSelf: 'flex-start',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#DC2626',
  },
  cancelButtonDisabled: {
    opacity: 0.6,
  },
  cancelButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 13,
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
  helperText: {
    marginTop: 8,
    color: '#334155',
  },
  errorText: {
    color: '#DC2626',
    textAlign: 'center',
    marginBottom: 12,
  },
  bannerErrorText: {
    color: '#DC2626',
    textAlign: 'center',
    paddingTop: 10,
    paddingHorizontal: 16,
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

export default UpcomingTripsScreen;
