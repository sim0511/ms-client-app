import { ActivityIndicator, Button, Text, Title } from 'react-native-paper';
import { Alert, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';

import axios from 'axios';

const IP = 'http://192.168.1.101:5000'; // Update with your backend IP

export default function CompleteAssignmentScreen({ route, navigation }) {
  const { assignmentId, taskName, dueDate } = route.params;
  const [loading, setLoading] = useState(false);

  const handleMarkAsCompleted = async () => {
    setLoading(true);
    try {
      await axios.post(`${IP}/api/v1/assignments/complete`, {
        assignmentId,
        completed: true,
      });

      Alert.alert('Success', 'Task marked as completed!');
      navigation.goBack();
    } catch (err) {
      Alert.alert('Error', err?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Title>Complete Task</Title>
      <Text style={styles.info}>🧹 {taskName}</Text>
      <Text style={styles.info}>📅 Due: {new Date(dueDate).toDateString()}</Text>

      <Button
        mode="contained"
        onPress={handleMarkAsCompleted}
        loading={loading}
        disabled={loading}
        style={{ marginTop: 20 }}
      >
        Mark as Completed
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start', // 👈 this moves content to the top
  },
  info: {
    fontSize: 16,
    marginBottom: 10,
  },
});
