import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';

import {
  ActivityIndicator,
  Badge,
  Button,
  Card,
  Text,
  Title,
} from "react-native-paper";
import { Alert, RefreshControl, ScrollView, View } from "react-native";
import React, { useEffect, useState } from "react";

import axios from "axios";
import { useNavigation } from '@react-navigation/native';

export default function AssignmentScreen({user}) {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const navigation = useNavigation();

  const IP = `https://api.simrandev.com`;
  const fetchAssignments = async () => {
    try {
      const res = await axios.get(
        `${IP}/api/v1/assignments/me`,
        { params: { userId:user?.userId } }
      );
      console.log(res.data);
      setAssignments(res.data.data);
    } catch (err) {
      console.log("Error fetching tasks:", err);
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
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator animating={true} size="large" />
      </View>
    );
  }

  const handleUploadPhoto = async (assignmentId) => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        base64: true,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.7,
      });

      if (result.canceled) return;

      const base64Image = result.assets[0].base64;
      const fileUri = result.assets[0].uri;
      const extension = fileUri.split('.').pop();

      const imageData = `data:image/${extension};base64,${base64Image}`;

      
      const uploadRes = await axios.post(`${IP}/api/v1/assignments/upload-photo`, {
        base64Image: imageData,
        assignmentId
      });


      Alert.alert("Success", "Photo uploaded");
      fetchAssignments(); 
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "Something went wrong");
    }
  };
  
  const handleMarkAsCompleted = async (assignmentId) => {
    try {
      await axios.post(`${IP}/api/v1/assignments/complete`, {
        assignmentId,
        completed: true,
      });
  
      
      console.log("Marked as completed");
     
      fetchAssignments();
    } catch (err) {
      console.log("Error marking as completed:", err.message);
    }
  };

  
  return (
    <ScrollView
      contentContainerStyle={{ padding: 16 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={fetchAssignments} />
      }
    >
      {assignments.map((item) => {
        const task = item.taskId;

        return (
          <Card key={item._id} style={{ marginBottom: 16 }} mode="outlined">
            <Card.Content>
              <Title>{task.taskName}</Title>
              <Text>Area: {task.area}</Text>
              <Text>Due: {item.dueDate?.split("T")[0]}</Text>
              <View
                style={{
                  marginTop: 8,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text>Status: </Text>
                <Badge
                  style={{
                    backgroundColor: item.completed ? "green" : "orange",
                    color: "white",
                  }}
                >
                  {item.completed ? "Completed" : "Pending"}
                </Badge>
              </View>
            </Card.Content>
                   {item.photoUrl && (
      <Card.Cover 
        source={{ uri: item.photoUrl }} 
        style={{ marginTop: 10, borderRadius: 8 }} 
        resizeMode="cover"
      />
    )}
            {!item.completed && (
              <Card.Actions>
                <Button onPress={() => handleMarkAsCompleted(item._id)}>Mark as Completed</Button>
                <Button
                  onPress={() => handleUploadPhoto(item._id)
                  }
                >
                  Upload Photo
                </Button>
              </Card.Actions>
            )}
          </Card>
        );
      })}
    </ScrollView>
  );
}
