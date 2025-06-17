/* import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from 'react-native';

export default function UserRecipesDetailsScreen({ route, navigation }) {
  const { userId } = route.params;
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRecipes = async () => {
      try {
        // const response = await fetch(`http://10.125.217.144:3000/recipes/user/${userId}`);
        const response = await fetch(`https://recets-production.up.railway.app/recipes/user/${userId}`);

        if (!response.ok) throw new Error('Error en la respuesta del servidor');
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error('Error al obtener recetas del usuario:', error);
        Alert.alert('Error', 'No se pudieron cargar tus recetas');
      } finally {
        setLoading(false);
      }
    };

    fetchUserRecipes();
  }, [userId]);

  const handleDelete = async (id) => {
    try {
      // const response = await fetch(`http://10.125.217.144:3000/recipes/${id}`, {
      const response = await fetch(`https://recets-production.up.railway.app/recipes/${id}`, {

        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Error al eliminar');

      Alert.alert('Éxito', 'Receta eliminada');
      setRecipes((prev) => prev.filter((r) => r.id !== id));
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo eliminar la receta');
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff7f0' }}>
      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#ff6b6b" />
        </View>
      ) : recipes.length === 0 ? (
        <View style={styles.center}>
          <Text style={styles.emptyText}>No tienes recetas guardadas.</Text>
        </View>
      ) : (
        <FlatList
          data={recipes}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={styles.recipeCard}>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() =>
                  Alert.alert(
                    'Eliminar receta',
                    '¿Estás seguro de que quieres eliminar esta receta?',
                    [
                      { text: 'Cancelar', style: 'cancel' },
                      {
                        text: 'Eliminar',
                        style: 'destructive',
                        onPress: () => handleDelete(item.id),
                      },
                    ]
                  )
                }
              >
                <Text style={styles.deleteText}>×</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate('MyRecipesDetails', { recipeId: item.id })}
              >
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.desc} numberOfLines={2}>{item.description}</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 20,
  },
  recipeCard: {
    backgroundColor: '#fff',
    padding: 18,
    paddingTop: 24,
    marginBottom: 12,
    borderRadius: 12,
    elevation: 3,
    position: 'relative',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#a03800',
    marginBottom: 6,
  },
  desc: {
    color: '#5c5c5c',
    fontSize: 15,
  },
  deleteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#ff6b6b',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    zIndex: 1,
  },
  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
  },
});
 */


import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from 'react-native';

export default function UserRecipesDetailsScreen({ route, navigation }) {
  const { userId } = route.params;
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRecipes = async () => {
      try {
        const response = await fetch(`https://recets-production.up.railway.app/recipes/user/${userId}`);

        if (!response.ok) throw new Error('Error en la respuesta del servidor');
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error('Error al obtener recetas del usuario:', error);
        Alert.alert('Error', 'No se pudieron cargar tus recetas');
      } finally {
        setLoading(false);
      }
    };

    fetchUserRecipes();
  }, [userId]);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://recets-production.up.railway.app/recipes/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Error al eliminar');

      Alert.alert('Éxito', 'Receta eliminada');
      setRecipes((prev) => prev.filter((r) => r.id !== id));
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo eliminar la receta');
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff7f0' }}>
      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#ff6b6b" />
        </View>
      ) : recipes.length === 0 ? (
        <View style={styles.center}>
          <Text style={styles.emptyText}>No tienes recetas guardadas.</Text>
        </View>
      ) : (
        <FlatList
          data={recipes}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={styles.recipeCard}>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() =>
                  Alert.alert(
                    'Eliminar receta',
                    '¿Estás seguro de que quieres eliminar esta receta?',
                    [
                      { text: 'Cancelar', style: 'cancel' },
                      {
                        text: 'Eliminar',
                        style: 'destructive',
                        onPress: () => handleDelete(item.id),
                      },
                    ]
                  )
                }
              >
                <Text style={styles.deleteText}>×</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate('MyRecipesDetails', { recipeId: item.id })}
              >
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.desc} numberOfLines={2}>{item.description}</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      {/* Botón para añadir receta */}
     {/* Botón para añadir receta */}
<TouchableOpacity
  style={styles.addButton}
  onPress={() => navigation.navigate('AddRecipeScreen', { userId })}
>
  <Text style={styles.addButtonText}>➕</Text>
</TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 20,
  },
  recipeCard: {
    backgroundColor: '#fff',
    padding: 18,
    paddingTop: 24,
    marginBottom: 12,
    borderRadius: 12,
    elevation: 3,
    position: 'relative',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#a03800',
    marginBottom: 6,
  },
  desc: {
    color: '#5c5c5c',
    fontSize: 15,
  },
  deleteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#ff6b6b',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    zIndex: 1,
  },
  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
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
});
