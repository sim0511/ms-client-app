import { ActivityIndicator, Badge, Button, Card, Text, Title } from 'react-native-paper';
import React, { useEffect, useState } from 'react';
import { RefreshControl, ScrollView, View } from 'react-native';

import axios from 'axios';

export default function AssignmentScreen() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const userId = '67e1b5596547b8be3fb76b97'; // change it with some context or storage

  const fetchAssignments = async () => {
    try {
      const res = await axios.get(
        'http://192.168.1.101:5000/api/v1/assignments/me',
        { params: { userId } }
      );
      console.log(res.data)
      setAssignments(res.data.data);
    } catch (err) {
      console.log('Error fetching tasks:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator animating={true} size="large" />
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={{ padding: 16 }}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchAssignments} />}
    >
      {assignments.map((item) => {
        const task = item.taskId;

        return (
          <Card key={item._id} style={{ marginBottom: 16 }} mode="outlined">
            <Card.Content>
              <Title>{task.taskName}</Title>
              <Text>Area: {task.area}</Text>
              <Text>Due: {item.dueDate?.split('T')[0]}</Text>
              <View style={{ marginTop: 8, flexDirection: 'row', alignItems: 'center' }}>
                <Text>Status: </Text>
                <Badge
                  style={{ backgroundColor: item.completed ? 'green' : 'orange', color: 'white' }}
                >
                  {item.completed ? 'Completed' : 'Pending'}
                </Badge>
              </View>
            </Card.Content>

            {!item.completed && (
              <Card.Actions>
                <Button onPress={() => {}}>Mark as Completed</Button>
                <Button onPress={() => {}}>Upload Photo</Button>
              </Card.Actions>
            )}
          </Card>
        );
      })}
    </ScrollView>
  );
}
