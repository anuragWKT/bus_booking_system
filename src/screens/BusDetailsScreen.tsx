import React, {useEffect, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../navigation/types';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {fetchBuses} from '../store/slices/busesSlice';
import {bookTickets, clearBookingState} from '../store/slices/bookingsSlice';

type Props = NativeStackScreenProps<AuthStackParamList, 'BusDetails'>;

function BusDetailsScreen({navigation, route}: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const {busId} = route.params;

  const {user} = useAppSelector(state => state.auth);
  const {buses, isLoading} = useAppSelector(state => state.buses);
  const {isBooking, bookingError, lastBooking} = useAppSelector(
    state => state.bookings,
  );

  const [ticketCount, setTicketCount] = useState(1);

  const bus = useMemo(() => buses.find(item => item.id === busId), [buses, busId]);

  useEffect(() => {
    if (!bus) {
      dispatch(fetchBuses());
    }
  }, [bus, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(clearBookingState());
    };
  }, [dispatch]);

  useEffect(() => {
    if (lastBooking) {
      dispatch(fetchBuses());
    }
  }, [dispatch, lastBooking]);

  const maxSelectableSeats = bus?.seatsAvailable ?? 1;
  const safeTicketCount = Math.min(ticketCount, Math.max(1, maxSelectableSeats));
  const totalPrice = (bus?.price ?? 0) * safeTicketCount;

  const decrementSeats = () => {
    setTicketCount(prev => Math.max(1, prev - 1));
  };

  const incrementSeats = () => {
    setTicketCount(prev => Math.min(maxSelectableSeats, prev + 1));
  };

  const onBookTickets = async () => {
    if (!user || !bus) {
      return;
    }

    const resultAction = await dispatch(
      bookTickets({
        userId: user.id,
        busId: bus.id,
        numberOfSeats: safeTicketCount,
      }),
    );

    if (bookTickets.fulfilled.match(resultAction)) {
      navigation.goBack();
    }
  };

  if (isLoading && !bus) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#2563EB" />
        <Text style={styles.helperText}>Loading bus details...</Text>
      </View>
    );
  }

  if (!bus) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Unable to find this bus.</Text>
        <TouchableOpacity
          style={styles.secondaryButton}
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}>
          <Text style={styles.secondaryButtonText}>Go back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>
          {bus.from} {'-->'} {bus.to}
        </Text>
        <Text style={styles.metaText}>Bus: {bus.busName}</Text>
        <Text style={styles.metaText}>Departure: {bus.timeFrom}</Text>
        <Text style={styles.metaText}>Arrival: {bus.timeTo}</Text>
        <Text style={styles.metaText}>Price per seat: ${bus.price}</Text>
        <Text style={styles.metaText}>Seats available: {bus.seatsAvailable}</Text>

        <View style={styles.seatRow}>
          <Text style={styles.sectionTitle}>Tickets</Text>
          <View style={styles.stepperContainer}>
            <TouchableOpacity
              style={styles.stepperButton}
              activeOpacity={0.8}
              onPress={decrementSeats}
              disabled={safeTicketCount <= 1}>
              <Text style={styles.stepperButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.ticketCount}>{safeTicketCount}</Text>
            <TouchableOpacity
              style={styles.stepperButton}
              activeOpacity={0.8}
              onPress={incrementSeats}
              disabled={safeTicketCount >= maxSelectableSeats}>
              <Text style={styles.stepperButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.totalText}>Total Price: ${totalPrice}</Text>
        {bookingError ? <Text style={styles.errorText}>{bookingError}</Text> : null}

        <TouchableOpacity
          activeOpacity={0.85}
          style={[styles.primaryButton, isBooking ? styles.disabledButton : null]}
          onPress={onBookTickets}
          disabled={isBooking || bus.seatsAvailable === 0}>
          {isBooking ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.primaryButtonText}>Book Tickets</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 16,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#F8FAFC',
  },
  card: {
    borderRadius: 14,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 10,
  },
  metaText: {
    fontSize: 14,
    color: '#475569',
    marginBottom: 4,
  },
  seatRow: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F172A',
  },
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepperButton: {
    width: 36,
    height: 36,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  stepperButtonText: {
    fontSize: 20,
    color: '#0F172A',
    fontWeight: '600',
  },
  ticketCount: {
    width: 44,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
  },
  totalText: {
    marginTop: 18,
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
  },
  primaryButton: {
    marginTop: 14,
    borderRadius: 10,
    paddingVertical: 14,
    backgroundColor: '#2563EB',
  },
  primaryButtonText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  disabledButton: {
    opacity: 0.6,
  },
  helperText: {
    marginTop: 8,
    color: '#334155',
  },
  errorText: {
    marginTop: 10,
    color: '#DC2626',
    textAlign: 'center',
  },
  secondaryButton: {
    marginTop: 12,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#2563EB',
  },
  secondaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

export default BusDetailsScreen;
