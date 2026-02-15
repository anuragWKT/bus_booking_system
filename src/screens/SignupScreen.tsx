import React, {useState} from 'react';
import {KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import AppButton from '../components/AppButton';
import AppTextInput from '../components/AppTextInput';
import {AuthStackParamList} from '../navigation/types';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {clearAuthError, signupUser} from '../store/slices/authSlice';
import {validateSignupForm} from '../utils/validation';

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
  const canSubmit =
    name.trim().length > 0 && email.trim().length > 0 && password.trim().length > 0;

  const onSignupPress = async () => {
    const validationError = validateSignupForm({name, email, password, pic});
    if (validationError) {
      setFormError(validationError);
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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Create account</Text>
        <Text style={styles.subtitle}>Sign up to start booking your next trip.</Text>

        <AppTextInput
        value={name}
        onChangeText={setName}
        placeholder="Name"
      />

        <AppTextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
      />

        <AppTextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />

        <AppTextInput
        value={phone}
        onChangeText={setPhone}
        placeholder="Phone (optional)"
      />

        <AppTextInput
        value={pic}
        onChangeText={setPic}
        placeholder="Profile picture URL (optional)"
        autoCapitalize="none"
      />

        {formError ? <Text style={styles.errorText}>{formError}</Text> : null}
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <AppButton
          title="Sign Up"
          isLoading={isLoading}
          disabled={!canSubmit}
        onPress={onSignupPress}
        />

        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.linkText}>Already have an account? Log in</Text>
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

export default SignupScreen;
