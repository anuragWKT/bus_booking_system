import React, {useMemo, useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../navigation/types';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {clearAuthError, signupUser} from '../store/slices/authSlice';

type Props = NativeStackScreenProps<AuthStackParamList, 'Signup'>;

function SignupScreen({navigation}: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const {isLoading, error} = useAppSelector(state => state.auth);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [pic, setPic] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  const canSubmit = useMemo(
    () =>
      name.trim().length > 0 &&
      email.trim().length > 0 &&
      password.trim().length > 0,
    [name, email, password],
  );

  const onSignupPress = async () => {
    if (!canSubmit) {
      setFormError('Name, email and password are required');
      return;
    }

    setFormError(null);
    dispatch(clearAuthError());

    const resultAction = await dispatch(
      signupUser({
        name: name.trim(),
        email: email.trim(),
        password,
        phone: phone.trim() || undefined,
        pic: pic.trim() || undefined,
      }),
    );

    if (signupUser.fulfilled.match(resultAction)) {
      navigation.replace('AvailableBuses');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signup Screen</Text>

      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Name"
        placeholderTextColor="#94A3B8"
      />

      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        placeholderTextColor="#94A3B8"
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        placeholderTextColor="#94A3B8"
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        placeholder="Phone (optional)"
        placeholderTextColor="#94A3B8"
      />

      <TextInput
        style={styles.input}
        value={pic}
        onChangeText={setPic}
        placeholder="Profile picture URL (optional)"
        placeholderTextColor="#94A3B8"
        autoCapitalize="none"
      />

      {formError ? <Text style={styles.errorText}>{formError}</Text> : null}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.button, !canSubmit || isLoading ? styles.buttonDisabled : null]}
        onPress={onSignupPress}
        disabled={!canSubmit || isLoading}>
        {isLoading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.buttonText}>Sign Up</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.linkText}>Already have an account? Log in</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
    color: '#0F172A',
  },
  button: {
    marginTop: 4,
    width: '100%',
    borderRadius: 10,
    paddingVertical: 14,
    backgroundColor: '#2563EB',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  errorText: {
    width: '100%',
    color: '#DC2626',
    marginBottom: 8,
  },
  linkText: {
    marginTop: 14,
    color: '#2563EB',
    fontWeight: '500',
  },
});

export default SignupScreen;
