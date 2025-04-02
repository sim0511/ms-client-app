import React, { useState } from 'react';

import AdminDashboard from '../screens/AdminDashboard';
import CompleteAssignmentScreen from '../screens/CompleteAssignmentScreen';
import EmployeeNavigator from './EmployeeNavigator';
import EmployeeTabs from './EmployeeTabs';
import LoginScreen from '../screens/LoginScreen';
import ManagerDashboard from '../screens/AssignTaskScreen'; // 👈 rename here
import ManagerTabs from './ManagerTabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const [user, setUser] = useState(null);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} >
      {!user ? (
        <Stack.Screen name="Login">
          {(props) => <LoginScreen {...props} setUser={setUser} />}
        </Stack.Screen>
      ) : user.role === 'employee' ? (
        <Stack.Screen name="EmployeeStack" component={EmployeeNavigator} />        
      ) : user.role === 'manager' ? (
        <Stack.Screen 
          name="ManagerDashboard" 
          component={ManagerTabs}
          options={{
          headerShown: true,
          // title: 'Assign Task',
          headerStyle: {
            backgroundColor: '#6200ee',
          },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
              headerBackTitleVisible: false, // hides "Back" text on iOS
        }}/>
          
      ) : (
        <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
      )}
    </Stack.Navigator>
  );
}
