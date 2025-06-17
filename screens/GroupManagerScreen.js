import React, { useEffect, useState } from 'react'; 
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet,
  TextInput,
  Modal,
  ActivityIndicator,
} from 'react-native';

export default function GroupManagerScreen({ route, navigation }) {
  const { userId } = route.params;
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [selectedGroupId, setSelectedGroupId] = useState(null);

  const fetchGroups = async () => {
    try {
    //   const res = await fetch(`http://10.125.217.144:3000/groups/user/${userId}`);
    const res = await fetch(`https://recets-production.up.railway.app/groups/user/${userId}`);

      const data = await res.json();
      setGroups(data);
    } catch (err) {
      Alert.alert('Error', 'No se pudieron cargar los grupos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const handleSaveGroup = async () => {
  if (!groupName.trim()) return Alert.alert('Error', 'El nombre no puede estar vacío');

  try {
    const method = selectedGroupId ? 'PUT' : 'POST';
    const url = selectedGroupId
      ? `https://recets-production.up.railway.app/groups/${selectedGroupId}`
      : 'https://recets-production.up.railway.app/groups';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: groupName, user_id: userId }),
    });

    if (!res.ok) throw new Error('Error en la operación');

    setModalVisible(false);
    setGroupName('');
    setSelectedGroupId(null);
    fetchGroups();
  } catch (err) {
    Alert.alert('Error', 'No se pudo guardar el grupo');
  }
};

const handleDelete = async (id) => {
  Alert.alert('Confirmar', '¿Eliminar este grupo?', [
    { text: 'Cancelar', style: 'cancel' },
    {
      text: 'Eliminar',
      onPress: async () => {
        try {
          await fetch(`https://recets-production.up.railway.app/groups/${id}`, {
            method: 'DELETE',
          });

          fetchGroups();
        } catch (err) {
          Alert.alert('Error', 'No se pudo eliminar');
        }
      },
      style: 'destructive',
    },
  ]);
};

  const openEdit = (group) => {
    setGroupName(group.name);
    setSelectedGroupId(group.id);
    setModalVisible(true);
  };

  const openCreate = () => {
    setGroupName('');
    setSelectedGroupId(null);
    setModalVisible(true);
  };

  return (
    <View style={styles.fullBackground}>
      <View style={styles.container}>
        <Text style={styles.title}>Gestión de Grupos</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#5A67D8" />
        ) : (
          <FlatList
            data={groups}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ paddingBottom: 100 }}
            renderItem={({ item }) => (
              <View style={styles.groupCard}>

                <TouchableOpacity
                  style={styles.xButton}
                  onPress={() => handleDelete(item.id)}
                >
                  <Text style={styles.xButtonText}>×</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => navigation.navigate('GroupDetails', { groupId: item.id })}
                >
                  <Text style={styles.groupName}>{item.name}</Text>
                </TouchableOpacity>

                <View style={styles.groupActions}>
                  <TouchableOpacity style={styles.renameButton} onPress={() => openEdit(item)}>
                    <Text style={styles.buttonText}>Renombrar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        )}

        <TouchableOpacity style={styles.addButton} onPress={openCreate}>
          <Text style={styles.addButtonText}>➕</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {selectedGroupId ? 'Editar Grupo' : 'Nuevo Grupo'}
            </Text>
            <TextInput
              placeholder="Nombre del grupo"
              placeholderTextColor="#888"   
              style={styles.input}
              value={groupName}
              onChangeText={setGroupName}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.cancelButton}
              >
                <Text style={styles.cancelText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSaveGroup} style={styles.saveButton}>
                <Text style={styles.saveText}>Guardar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  fullBackground: {
    flex: 1,
    backgroundColor: '#f8eee6',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#174b5c',
    marginBottom: 20,
    textAlign: 'center',
  },
  groupCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 3,
    position: 'relative', // importante para el botón absoluto
  },
  groupName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#174b5c',
  },
  groupActions: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'flex-end',
  },
  renameButton: {
    backgroundColor: '#5A67D8',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginRight: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  addButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: '#f5a649',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 30,
    elevation: 5,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#174b5c',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#f5a649',
    padding: 14,
    borderRadius: 10,
    marginBottom: 20,
    fontSize: 16,
    color: '#174b5c',
    backgroundColor: '#fff',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  cancelButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#e0e0e0',
    marginRight: 10,
  },
  cancelText: {
    color: '#555',
    fontWeight: 'bold',
    fontSize: 16,
  },
  saveButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#5A67D8',
  },
  saveText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  xButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#E53E3E',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    zIndex: 10,
  },
  xButtonText: {
    color: 'white',
    fontSize: 16,
    lineHeight: 16,
    fontWeight: 'bold',
    marginTop: -1,
  },
});
