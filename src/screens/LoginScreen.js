import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';

import axios from 'axios';

export default function LoginScreen({ setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!username || !password) {
      return Alert.alert('Both username and password are required');
    }

    try {
      const res = await axios.post('http://192.168.1.101:5000/api/v1/login', {
        username,
        password
      });
      if (res.status === 200) {
        // Fetch user info separately if needed
        const userRes = await axios.get(`http://192.168.1.101:5000/api/v1/${username}`);
        setUser(userRes.data); // sends to AppNavigator
      }
    } catch (err) {
      console.log(err?.response?.data || err.message);
      Alert.alert('Login failed', 'Invalid username or password');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />

      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, marginBottom: 30, textAlign: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5
  }
});
