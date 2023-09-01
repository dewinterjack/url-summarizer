import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from './ProfileScreen';
import BookmarksScreen from './BookmarksScreen';

const Stack = createStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator initialRouteName="ProfileScreen">
      <Stack.Screen name="ProfileScreen" options={{ headerShown: false }} component={ProfileScreen} />
      <Stack.Screen name="BookmarksScreen" component={BookmarksScreen} />
    </Stack.Navigator>
  );
}

