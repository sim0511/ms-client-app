import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';

export default function ManagerProfileScreen({ user, setUser }) {
  const handleLogout = () => {
    setUser(null);
  };

  return (
    <View style={styles.container}>
      <MaterialIcons name="account-circle" size={100} color="#6200ee" style={styles.avatar} />

      <Text style={styles.name}>{user?.username || 'Manager Name'}</Text>
      <Text style={styles.role}>Role: {user?.role || 'manager'}</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{user?.email || 'not provided'}</Text>

        <Text style={styles.label}>User ID:</Text>
        <Text style={styles.value}>{user?.userId || 'N/A'}</Text>
      </View>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
        accessibilityLabel="Logout"
        accessibilityRole="button"
      >
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    padding: 20,
    alignItems: 'center',
  },
  avatar: {
    marginTop: 30,
    marginBottom: 10,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  role: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  infoContainer: {
    backgroundColor: '#fff',
    width: '100%',
    padding: 20,
    borderRadius: 10,
    elevation: 2,
    marginBottom: 40,
  },
  label: {
    fontSize: 16,
    color: '#555',
    marginBottom: 4,
    fontWeight: '600',
  },
  value: {
    fontSize: 17,
    color: '#000',
    marginBottom: 12,
  },
  logoutButton: {
    backgroundColor: '#d32f2f', // red with good contrast
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 6,
  },
  logoutText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
