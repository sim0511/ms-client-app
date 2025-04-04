import AssignmentScreen from '../screens/AssignmentScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ProfileScreen from '../screens/ProfileScreen';
import React from 'react';
import ScheduleScreen from '../screens/ScheduleScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export default function EmployeeTabs({user,setUser}) {
  return (
    <Tab.Navigator  screenOptions={({route})=>({
      headerStyle: {
        backgroundColor: '#6200ee',
      },
      headerTintColor: '#fff',
      headerTitleAlign: 'center',
      tabBarActiveTintColor: '#6200ee',
      tabBarIcon: ({ color, size }) => {
        let iconName;

        if (route.name === 'Assignments') iconName = 'clipboard-list-outline';
        else if (route.name === 'Profile') iconName = 'account-circle-outline';
        else if (route.name === 'Schedule') iconName = 'calendar-month-outline';

        return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
      },
    })}>
      <Tab.Screen name="Assignments">
      {(props) => <AssignmentScreen {...props} user={user} />}
      </Tab.Screen>
      <Tab.Screen name="Profile" >
      {(props) => <ProfileScreen {...props} user={user} setUser={setUser} />}
      </Tab.Screen>
      {/* <Tab.Screen name="Schedule" component={ScheduleScreen} /> */}
    </Tab.Navigator>
  );
}
