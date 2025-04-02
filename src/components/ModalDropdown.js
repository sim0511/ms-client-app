import { Button, Text, TextInput } from 'react-native-paper';
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import React, { useState } from 'react';

export default function ModalDropdown({ label, value, onSelect, options }) {
  const [modalVisible, setModalVisible] = useState(false);

  const selectedLabel = options.find((opt) => opt.value === value)?.label || '';

  return (
    <View style={{ marginTop: 16 }}>
      <Pressable onPress={() => setModalVisible(true)}>
        <TextInput
          label={label}
          value={selectedLabel}
          editable={false}
          mode="outlined"
          pointerEvents="none"
        />
      </Pressable>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Select {label}</Text>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.optionItem}
                  onPress={() => {
                    onSelect(item.value);
                    setModalVisible(false);
                  }}
                >
                  <Text>{item.label}</Text>
                </TouchableOpacity>
              )}
              ListEmptyComponent={<Text>No options found</Text>}
            />
            <Button onPress={() => setModalVisible(false)} style={{ marginTop: 10 }}>
              Cancel
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  modalBox: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold'
  },
  optionItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  }
});
