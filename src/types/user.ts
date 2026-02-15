import {Booking} from './booking';

export type User = {
  id: string;
  name: string;
  phone: string;
  email: string;
  pic: string;
  upcomingBookings: Booking[];
  bookingHistory: Booking[];
};
