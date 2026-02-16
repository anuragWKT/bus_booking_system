import {API_BASE_URL} from '../constants/api';
import {Booking} from '../types';
import {API_PATHS} from './apiPaths';

type BookTicketsPayload = {
  userId: string;
  busId: string;
  numberOfSeats: number;
};

type ApiError = {
  error?: string;
};

export async function bookTicketsApi(payload: BookTicketsPayload): Promise<Booking> {
  const response = await fetch(`${API_BASE_URL}${API_PATHS.bookTickets}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = (await response.json()) as Booking | ApiError;

  if (!response.ok) {
    const message = (data as ApiError).error ?? 'Unable to complete booking';
    throw new Error(message);
  }

  return data as Booking;
}

export async function cancelBookingApi(bookingId: string): Promise<Booking> {
  const response = await fetch(`${API_BASE_URL}${API_PATHS.cancelBooking(bookingId)}`, {
    method: 'POST',
  });

  const data = (await response.json()) as Booking | ApiError;

  if (!response.ok) {
    const message = (data as ApiError).error ?? 'Unable to cancel booking';
    throw new Error(message);
  }

  return data as Booking;
}
