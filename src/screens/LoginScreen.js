import { Alert, StyleSheet, View } from 'react-native';
import { Button, Card, Text, TextInput, Title } from 'react-native-paper';
import React, { useState } from 'react';

import axios from 'axios';

export default function LoginScreen({ setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleLogin = async () => {
    if (!username || !password) {
      return Alert.alert('Both username and password are required');
    }

    try {
      const res = await axios.post('https://api.simrandev.com/api/v1/login', {
        username,
        password
      });
      if (res.status === 200) {
     
        const userRes = await axios.get(`https://api.simrandev.com/api/v1/user/${username}`);
        setUser(userRes.data); 
      }
    } catch (err) {
      console.log(err?.response?.data || err.message);
      Alert.alert('Login failed', 'Invalid username or password');
    }
  };

  return (
    <View style={styles.container}>
            <Text style={styles.brand}>Master Cleaning</Text>
            <Text style={styles.subtitle}>Keeping it spotless ✨</Text>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Login 👋</Title>

          <TextInput
            label="Username"
            value={username}
            onChangeText={setUsername}
            style={styles.input}
            mode="outlined"
            autoCapitalize="none"
          />

          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            mode="outlined"
            secureTextEntry
          />

          <Button
            mode="contained"
            onPress={handleLogin}
            loading={loading}
            disabled={loading}
            style={styles.button}
          >
            Login
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#f2f2f2' },
  card: { padding: 16, borderRadius: 12, elevation: 4 },
  title: { fontSize: 24, marginBottom: 16, textAlign: 'center' },
  input: { marginBottom: 16 },
  button: { marginTop: 8 },
  brand: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#6200ee',
    textAlign: 'center',
    marginBottom: 10,
  },
  brand: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#6200ee',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    textAlign: 'center',
    color: '#888',
    marginBottom: 20,
    fontSize: 14,
  },
});
