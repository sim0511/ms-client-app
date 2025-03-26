import AssignmentScreen from '../screens/AssignmentScreen';
import ProfileScreen from '../screens/ProfileScreen';
import React from 'react';
import ScheduleScreen from '../screens/ScheduleScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export default function EmployeeTabs() {
  return (
    <Tab.Navigator  screenOptions={{
      headerStyle: {
        backgroundColor: '#6200ee',
      },
      headerTintColor: '#fff',
      headerTitleAlign: 'center',
      tabBarActiveTintColor: '#6200ee',
    }}>
      <Tab.Screen name="Assignments" component={AssignmentScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Schedule" component={ScheduleScreen} />
    </Tab.Navigator>
  );
}
