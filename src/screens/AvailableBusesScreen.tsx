import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

function AvailableBusesScreen(): JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Available Buses</Text>
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
});

export default AvailableBusesScreen;
