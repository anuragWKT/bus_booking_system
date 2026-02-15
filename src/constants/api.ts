import {Platform} from 'react-native';

const LOCALHOST = 'localhost';
const ANDROID_EMULATOR_HOST = '10.0.2.2';

export const API_BASE_URL =
  Platform.OS === 'android'
    ? `http://${ANDROID_EMULATOR_HOST}:3000`
    : `http://${LOCALHOST}:3000`;

export const API_PREFIX = '/api';
