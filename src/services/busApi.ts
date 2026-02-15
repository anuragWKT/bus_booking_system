import {API_BASE_URL} from '../constants/api';
import {Bus} from '../types';
import {API_PATHS} from './apiPaths';

type ApiError = {
  error?: string;
};

export async function fetchBusesApi(): Promise<Bus[]> {
  const response = await fetch(`${API_BASE_URL}${API_PATHS.buses}`);

  const data = (await response.json()) as Bus[] | ApiError;

  if (!response.ok) {
    const message = (data as ApiError).error ?? 'Unable to fetch buses';
    throw new Error(message);
  }

  return data as Bus[];
}
