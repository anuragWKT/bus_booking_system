import {Bus} from './bus';

export type BookingStatus = 'upcoming' | 'cancelled' | 'completed';

export type Booking = {
  id: string;
  userId: string;
  busId: string;
  numberOfSeats: number;
  bookedAt: string;
  status: BookingStatus;
  bus?: Bus | null;
};
