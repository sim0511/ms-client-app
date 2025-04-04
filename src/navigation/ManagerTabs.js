import AssignTaskScreen from '../screens/AssignTaskScreen';
import ManagerAssignmentsScreen from '../screens/ManagerAssignmentScreen';
import ManagerProfileScreen from '../screens/ManagerProfile';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export default function ManagerTabs({user,setUser}) {
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
      <Tab.Screen name="Profile" options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="calendar-today" size={size} color={color} />
          ),
        }}>
  {(props) => <ManagerProfileScreen {...props} user={user} setUser={setUser}  />}
</Tab.Screen>
    </Tab.Navigator>
  );
}
