import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import IntroScreen from '../screens/IntroScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
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
    </Stack.Navigator>
  );
}

export default AuthNavigator;
