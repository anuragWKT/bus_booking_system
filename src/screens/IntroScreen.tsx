import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../navigation/types';
 
type Props = NativeStackScreenProps<AuthStackParamList, 'Intro'>;

function IntroScreen({navigation}: Props): JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bus Booking App</Text>
      <Text style={styles.subtitle}>Book your next trip with ease</Text>

      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.primaryButton}
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.primaryButtonText}>Log In</Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.secondaryButton}
        onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.secondaryButtonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#F8FAFC',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#0F172A',
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 8,
    marginBottom: 28,
    fontSize: 15,
    color: '#475569',
    textAlign: 'center',
  },
  primaryButton: {
    borderRadius: 10,
    paddingVertical: 14,
    backgroundColor: '#2563EB',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  secondaryButton: {
    marginTop: 12,
    borderRadius: 10,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    backgroundColor: '#FFFFFF',
  },
  secondaryButtonText: {
    color: '#0F172A',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default IntroScreen;
