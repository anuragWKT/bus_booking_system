import {Platform} from 'react-native';

const LOCALHOST = 'localhost';

const ANDROID_CONNECTION_MODE: 'usb' | 'wireless' = 'usb';
const ANDROID_WIRELESS_HOST = '10.243.173.145';

const ANDROID_HOST =
  ANDROID_CONNECTION_MODE === 'usb' ? LOCALHOST : ANDROID_WIRELESS_HOST;

export const API_BASE_URL =
  Platform.OS === 'android'
    ? `http://${ANDROID_HOST}:3000`
    : `http://${LOCALHOST}:3000`;

export const API_PREFIX = '/api';
