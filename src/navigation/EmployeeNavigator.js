import CompleteAssignmentScreen from '../screens/CompleteAssignmentScreen';
import EmployeeTabs from './EmployeeTabs';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function EmployeeNavigator({user,setUser}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="EmployeeTabs"
        options={{ headerShown: false }}
      >
                {(props) => <EmployeeTabs {...props} user={user} setUser={setUser} />}
      </Stack.Screen>
      <Stack.Screen
        name="CompleteAssignment"
        component={CompleteAssignmentScreen}
        options={{
          title: 'Complete Assignment',
          headerBackTitleVisible: false,
          headerStyle: { backgroundColor: '#6200ee' },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
}
