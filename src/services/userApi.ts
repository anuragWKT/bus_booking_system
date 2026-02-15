import {API_BASE_URL} from '../constants/api';
import {User} from '../types';
import {API_PATHS} from './apiPaths';

type ApiError = {
  error?: string;
};

export async function fetchUserByIdApi(userId: string): Promise<User> {
  const response = await fetch(`${API_BASE_URL}${API_PATHS.users}/${userId}`);
  const data = (await response.json()) as User | ApiError;

  if (!response.ok) {
    const message = (data as ApiError).error ?? 'Unable to fetch user details';
    throw new Error(message);
  }

  return data as User;
}
