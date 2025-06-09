import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from 'react-native';

export default function GroupDetailsScreen({ route, navigation }) {
  const { groupId } = route.params;
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchGroupRecipes = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://10.125.217.144:3000/groups/${groupId}/recipes`);
      if (!res.ok) throw new Error('Error en la respuesta');
      const data = await res.json();
      setRecipes(data);
    } catch (err) {
      Alert.alert('Error', 'No se pudieron cargar las recetas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGroupRecipes();

    // Refrescar cuando se regrese a esta pantalla
    const unsubscribe = navigation.addListener('focus', () => {
      fetchGroupRecipes();
    });

    return unsubscribe;
  }, [navigation, groupId]);

  const handleRecipePress = (recipe) => {
    navigation.navigate('RecipeDetail', { recipe });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recetas del Grupo</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#D35400" />
      ) : recipes.length === 0 ? (
        <Text style={styles.noRecipesText}>No hay recetas en este grupo.</Text>
      ) : (
        <FlatList
          data={recipes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card} onPress={() => handleRecipePress(item)}>
              <Text style={styles.name}>{item.title}</Text>
              <Text style={styles.description} numberOfLines={2} ellipsizeMode="tail">
                {item.description || 'Sin descripción'}
              </Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      )}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddRecipeToGroup', { groupId })}
      >
        <Text style={styles.addButtonText}>+ Agregar Recetas</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#FDF6E3', // beige claro de fondo
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 20, 
    color: '#D35400', // naranja oscuro para título
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#FFF5E1', // beige claro para la tarjeta
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 3,
  },
  name: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginBottom: 6, 
    color: '#E67E22', // naranja brillante para nombre
  },
  description: { 
    fontSize: 14, 
    color: '#7F4E1E', // marrón suave para descripción
  },
  noRecipesText: {
    fontSize: 16,
    color: '#A0522D', // marrón oscuro para texto sin recetas
    textAlign: 'center',
    marginTop: 40,
  },
  addButton: {
    backgroundColor: '#D35400', // naranja oscuro para botón
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
    elevation: 5,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
