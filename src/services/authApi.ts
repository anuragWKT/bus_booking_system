import {API_BASE_URL} from '../constants/api';
import {LoginPayload, SignupPayload, User} from '../types';
import {API_PATHS} from './apiPaths';

type ApiError = {
  error?: string;
};

async function postJson<TResponse, TPayload>(
  path: string,
  payload: TPayload,
): Promise<TResponse> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = (await response.json()) as TResponse | ApiError;

  if (!response.ok) {
    const message = (data as ApiError).error ?? 'Request failed';
    throw new Error(message);
  }

  return data as TResponse;
}

export function loginApi(payload: LoginPayload): Promise<User> {
  return postJson<User, LoginPayload>(API_PATHS.login, payload);
}

export function signupApi(payload: SignupPayload): Promise<User> {
  return postJson<User, SignupPayload>(API_PATHS.signup, payload);
}
