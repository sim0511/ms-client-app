import React, { useState } from 'react';

import AdminDashboard from '../screens/AdminDashboard';
import EmployeeTabs from './EmployeeTabs';
import LoginScreen from '../screens/LoginScreen';
import ManagerDashboard from '../screens/ManagerDashboard';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const [user, setUser] = useState(null);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user ? (
        <Stack.Screen name="Login">
          {(props) => <LoginScreen {...props} setUser={setUser} />}
        </Stack.Screen>
      ) : user.role === 'employee' ? (
        <Stack.Screen name="EmployeeTabs" component={EmployeeTabs} />
      ) : user.role === 'manager' ? (
        <Stack.Screen name="ManagerDashboard" component={ManagerDashboard} />
      ) : (
        <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
      )}
    </Stack.Navigator>
  );
}
