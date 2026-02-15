import React, {useState} from 'react';
import {KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import AppButton from '../components/AppButton';
import AppTextInput from '../components/AppTextInput';
import {AuthStackParamList} from '../navigation/types';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {clearAuthError, loginUser} from '../store/slices/authSlice';
import {validateLoginForm} from '../utils/validation';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

function LoginScreen({navigation}: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const {isLoading, error} = useAppSelector(state => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const canSubmit = email.trim().length > 0 && password.trim().length > 0;

  const onLoginPress = async () => {
    const validationError = validateLoginForm(email, password);
    if (validationError) {
      setFormError(validationError);
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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Welcome back</Text>
        <Text style={styles.subtitle}>Log in to continue booking your bus tickets.</Text>

        <AppTextInput
        value={email}
        onChangeText={text => setEmail(text)}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
      />

        <AppTextInput
        value={password}
        onChangeText={text => setPassword(text)}
        placeholder="Password"
        secureTextEntry
      />

        {formError ? <Text style={styles.errorText}>{formError}</Text> : null}
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <AppButton
          title="Login"
          isLoading={isLoading}
          disabled={!canSubmit}
        onPress={onLoginPress}
        />

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.linkText}>Don&apos;t have an account? Sign up</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 24,
  },
  card: {
    borderRadius: 14,
    padding: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 16,
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
