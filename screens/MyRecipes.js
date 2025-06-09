import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

export default function MyRecipesScreen({ route, navigation }) {
  const { userId } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis Recetas</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('UserRecipesDetails', { userId })}
        >
          <Text style={styles.buttonText}>📖 Ver Mis Recetas</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('GroupManager', { userId })}
        >
          <Text style={styles.buttonText}>👥 Gestionar Grupos</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 80,
    backgroundColor: '#f8eee6', // fondo beige claro
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    color: '#f16969', // rojo suave
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  button: {
    backgroundColor: '#f5a649', // naranja vibrante
    paddingVertical: 16,
    paddingHorizontal: 28,
    borderRadius: 16,
    width: '100%',
    maxWidth: 300,
    alignItems: 'center',
    shadowColor: '#f16969',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
