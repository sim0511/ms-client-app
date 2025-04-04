import { Button, Card, Text, Title } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';

import React from 'react';

export default function ProfileScreen({ user, setUser }) {
  if (!user) return null;

  return (
    <View style={styles.container}>
      <Title style={styles.header}>👤 Profile</Title>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.value}>{user.username || 'N/A'}</Text>

          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{user.email || 'N/A'}</Text>

          <Text style={styles.label}>Role</Text>
          <Text style={styles.value}>{user.role}</Text>

          <Text style={styles.label}>User ID</Text>
          <Text style={styles.value}>{user._id}</Text>
        </Card.Content>
      </Card>

      <Button
        mode="contained"
        style={styles.logoutButton}
        onPress={() => setUser(null)}
      >
        🚪 Logout
      </Button>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
  },
  header: {
    fontSize: 26,
    marginBottom: 20,
    textAlign: 'center',
    color: '#6200ee',
  },
  card: {
    marginBottom: 30,
    elevation: 4,
    borderRadius: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#666',
  },
  value: {
    fontSize: 16,
    color: '#222',
  },
  logoutButton: {
    paddingVertical: 8,
    borderRadius: 6,
  },
});
