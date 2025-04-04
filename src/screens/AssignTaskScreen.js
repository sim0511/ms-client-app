import {
  ActivityIndicator,
  Button,
  Snackbar,
  Text,
  TextInput,
  Title
} from 'react-native-paper';
import {
  Platform,
  ScrollView,
  TouchableOpacity,
  View
} from 'react-native';
import React, { useEffect, useState } from 'react';

import DateTimePicker from '@react-native-community/datetimepicker';
import ModalDropdown from '../components/ModalDropdown';
import axios from 'axios';

export default function AssignTaskScreen() {
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedTask, setSelectedTask] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [dueDate, setDueDate] = useState(new Date());

  const [loading, setLoading] = useState(true);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const [showTaskDropdown, setShowTaskDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const IP = 'https://api.simrandev.com'; 

  // console.log(DropDown);
  const fetchData = async () => {
    try {
      const taskRes = await axios.get(`${IP}/api/v1/tasks`);
      const userRes = await axios.get(`${IP}/api/v1/users?role=employee`);
      setTasks(taskRes.data);
      setEmployees(userRes.data);
      console.log('Tasks:', taskRes.data);
      console.log('Employees:', userRes.data);
    } catch (err) {
      console.log('Error loading data:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


 
  const handleAssign = async () => {
    if (!selectedTask || !selectedUser || !dueDate) return;

    try {
      await axios.post(`${IP}/api/v1/assignments`, {
        taskId: selectedTask,
        userId: selectedUser,
        dueDate: formatDate(dueDate)
      });

      setSnackbarVisible(true);
      setSelectedTask('');
      setSelectedUser('');
      setDueDate(new Date());
    } catch (err) {
      alert('Error assigning task: ' + err.message);
    }
  };
  const taskDropdownOptions = tasks.map((task) => ({
    label: task.taskName,
    value: task._id
  }));

  const employeeDropdownOptions = employees.map((user) => ({
    label: `${user.username} (${user.email})`,
    value: user._id
  }));

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDueDate(selectedDate);
    }
  };

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

 
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator animating />
      </View>
    );
  }
  if (!tasks.length || !employees.length) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  }
  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Title>Assign Task to Employee</Title>

            <ModalDropdown
        label="Select Task"
        value={selectedTask}
        onSelect={setSelectedTask}
        options={taskDropdownOptions}
      />

      <ModalDropdown
        label="Select Employee"
        value={selectedUser}
        onSelect={setSelectedUser}
        options={employeeDropdownOptions}
      />


<TouchableOpacity onPress={() => setShowDatePicker(true)}>
  <TextInput
    label="Due Date"
    value={formatDate(dueDate)}
    editable={false}
    mode="outlined"
    style={{ marginTop: 16 }}
    pointerEvents="none"
  />
</TouchableOpacity>

{showDatePicker && (
  <DateTimePicker
    value={dueDate}
    mode="date"
    display={Platform.OS === 'ios' ? 'inline' : 'calendar'} 
    onChange={(event, selectedDate) => {
      setShowDatePicker(false);
      if (selectedDate) {
        setDueDate(selectedDate);
      }
    }}
  />
)}


      <Button
        mode="contained"
        onPress={handleAssign}
        style={{ marginTop: 20 }}
        disabled={!selectedTask || !selectedUser || !dueDate}
      >
        Assign Task
      </Button>

      <Snackbar visible={snackbarVisible} onDismiss={() => setSnackbarVisible(false)}>
        Task Assigned Successfully!
      </Snackbar>
    </ScrollView>
  );
}
