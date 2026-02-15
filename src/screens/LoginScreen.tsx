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
import {clearAuthError, loginUser} from '../store/slices/authSlice';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

function LoginScreen({navigation}: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const {isLoading, error} = useAppSelector(state => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  const canSubmit = useMemo(
    () => email.trim().length > 0 && password.trim().length > 0,
    [email, password],
  );

  const onLoginPress = async () => {
    if (!canSubmit) {
      setFormError('Please enter both email and password');
      return;
    }

    setFormError(null);
    dispatch(clearAuthError());

    const resultAction = await dispatch(
      loginUser({
        email: email.trim(),
        password,
      }),
    );

    if (loginUser.fulfilled.match(resultAction)) {
      navigation.replace('AvailableBuses');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={text => setEmail(text)}
        placeholder="Email"
        placeholderTextColor="#94A3B8"
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        value={password}
        onChangeText={text => setPassword(text)}
        placeholder="Password"
        placeholderTextColor="#94A3B8"
        secureTextEntry
      />

      {formError ? <Text style={styles.errorText}>{formError}</Text> : null}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.button, !canSubmit || isLoading ? styles.buttonDisabled : null]}
        onPress={onLoginPress}
        disabled={!canSubmit || isLoading}>
        {isLoading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.linkText}>Don&apos;t have an account? Sign up</Text>
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

export default LoginScreen;
