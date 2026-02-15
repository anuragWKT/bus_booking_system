type SignupFields = {
  name: string;
  email: string;
  password: string;
  pic?: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const URL_REGEX = /^(https?:\/\/).+/i;

export function validateLoginForm(email: string, password: string): string | null {
  if (!email.trim() || !password.trim()) {
    return 'Please enter both email and password';
  }

  if (!EMAIL_REGEX.test(email.trim())) {
    return 'Please enter a valid email address';
  }

  return null;
}

export function validateSignupForm(fields: SignupFields): string | null {
  const {name, email, password, pic} = fields;

  if (!name.trim() || !email.trim() || !password.trim()) {
    return 'Name, email and password are required';
  }

  if (!EMAIL_REGEX.test(email.trim())) {
    return 'Please enter a valid email address';
  }

  if (password.trim().length < 6) {
    return 'Password must be at least 6 characters';
  }

  if (pic && pic.trim().length > 0 && !URL_REGEX.test(pic.trim())) {
    return 'Profile picture must be a valid URL (http/https)';
  }

  return null;
}
