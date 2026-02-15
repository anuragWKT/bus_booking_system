import {API_PREFIX} from '../constants/api';

export const API_PATHS = {
  login: `${API_PREFIX}/auth/login`,
  signup: `${API_PREFIX}/auth/signup`,
  buses: `${API_PREFIX}/buses`,
  users: `${API_PREFIX}/users`,
  bookTickets: `${API_PREFIX}/bookings/book`,
};
