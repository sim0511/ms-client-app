import { ActivityIndicator, Card, Divider, Text, Title } from 'react-native-paper';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import axios from 'axios';

const IP = 'https://api.simrandev.com';
export default function ManagerAssignmentsScreen() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAssignments = async () => {
    try {
      const res = await axios.get(`${IP}/api/v1/allAssignments`);
      setAssignments(res.data);
    } catch (err) {
      console.error('Error fetching assignments:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Title style={styles.title}>All Assigned Tasks</Title>

      {assignments.length === 0 ? (
        <Text style={styles.noData}>No assignments found.</Text>
      ) : (
        assignments.map((assignment) => (
          <Card key={assignment._id} style={styles.card}>
            <Card.Content>
              <Title style={styles.taskName}>{assignment.taskId?.taskName || 'Unnamed Task'}</Title>
              <Divider style={{ marginVertical: 8 }} />
              <Text>👤 Assigned to: {assignment.userId?.username || 'Unknown User'}</Text>
              <Text>📅 Due Date: {new Date(assignment.dueDate).toDateString()}</Text>
              <Text>Status: {assignment.completed ? '✅ Completed' : '⏳ Pending'}</Text>
            </Card.Content>
          </Card>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    padding: 16,
  },
  title: {
    marginBottom: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  card: {
    marginBottom: 12,
    backgroundColor: '#f5f5f5',
  },
  taskName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  noData: {
    textAlign: 'center',
    marginTop: 30,
    fontStyle: 'italic',
    color: '#aaa',
  },
});
