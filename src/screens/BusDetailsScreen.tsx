import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../navigation/types';

type Props = NativeStackScreenProps<AuthStackParamList, 'BusDetails'>;

function BusDetailsScreen({route}: Props): JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bus Details</Text>
      <Text style={styles.subtitle}>Selected bus: {route.params.busId}</Text>
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
  },
  subtitle: {
    marginTop: 8,
    fontSize: 14,
    color: '#334155',
  },
});

export default BusDetailsScreen;
