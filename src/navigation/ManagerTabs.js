import AssignTaskScreen from '../screens/AssignTaskScreen';
import ManagerAssignmentsScreen from '../screens/ManagerAssignmentScreen';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export default function ManagerTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: '#6200ee',
        tabBarLabelStyle: { fontSize: 14 },
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: '#6200ee' },
        headerTintColor: '#fff',
      }}
    >
      <Tab.Screen
        name="Assign Task"
        component={AssignTaskScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="assignment" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Assignments"
        component={ManagerAssignmentsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="list" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
