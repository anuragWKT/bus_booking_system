import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import IntroScreen from '../screens/IntroScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import AvailableBusesScreen from '../screens/AvailableBusesScreen';
import BusDetailsScreen from '../screens/BusDetailsScreen';
import UpcomingTripsScreen from '../screens/UpcomingTripsScreen';
import BookingHistoryScreen from '../screens/BookingHistoryScreen';
import {AuthStackParamList} from './types';

const Stack = createNativeStackNavigator<AuthStackParamList>();

function AuthNavigator(): JSX.Element {
  return (
    <Stack.Navigator
      initialRouteName="Intro"
      screenOptions={{
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name="Intro"
        component={IntroScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen
        name="AvailableBuses"
        component={AvailableBusesScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BusDetails"
        component={BusDetailsScreen}
        options={{title: 'Bus Details'}}
      />
      <Stack.Screen
        name="UpcomingTrips"
        component={UpcomingTripsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BookingHistory"
        component={BookingHistoryScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
