import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function HomeScreen({ navigation, route }) {
  const { user } = route.params;

  const handleLogout = () => {
    Alert.alert('Sesión cerrada', 'Has salido de la aplicación.', [
      { text: 'OK', onPress: () => navigation.replace('Login') }
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Botón Configuración arriba a la izquierda */}
      <TouchableOpacity
        style={styles.settingsButton}
        onPress={() => navigation.navigate('UserSettings', { user })}
      >
        <Text style={styles.settingsIcon}>👤</Text>
      </TouchableOpacity>

      {/* Botón Logout arriba a la derecha */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      {/* Opciones principales */}
      <View style={styles.cardsContainer}>
  <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('RecipesList')}>
    <Text style={styles.cardTitle}>📖 Libro de Recetas</Text>
    
  </TouchableOpacity>

  <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('MyRecipes', { userId: user.id })}>
    <Text style={styles.cardTitle}>⭐ Mis Recetas</Text>
  
  </TouchableOpacity>
</View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#174b5c', // Fondo principal
    padding: 20,
  },
  logoutButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    padding: 10,
    backgroundColor: '#f1696c', // Color advertencia
    borderRadius: 25,
    zIndex: 10,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cardsContainer: {
  flex: 1,
  justifyContent: 'center',
},

card: {
  backgroundColor: '#f8eee6',
  borderRadius: 12,
  padding: 24,
  marginBottom: 20,
  shadowColor: '#000',
  shadowOpacity: 0.1,
  shadowRadius: 10,
  shadowOffset: { width: 0, height: 5 },
  elevation: 3,
},


  settingsButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: '#6bcdbf', // Color de acento
    borderRadius: 25,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  settingsIcon: {
    fontSize: 18,
    color: '#fff',
  },
  card: {
    backgroundColor: '#f8eee6', // Fondo de tarjeta
    borderRadius: 12,
    padding: 24,
    marginTop: 80,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#174b5c', // Color principal
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#6bcdbf', // Subacento
  },
});
