import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

export default function MyRecipesDetails({ route, navigation }) {
  const { recipeId } = route.params;
  const [recipe, setRecipe] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`http://10.125.217.144:3000/recipes/${recipeId}`);
        if (!response.ok) throw new Error('Error cargando receta');
        const data = await response.json();
        setRecipe(data);

        if (data.user_id) {
          const userRes = await fetch(`http://10.125.217.144:3000/users/${data.user_id}`);
          if (userRes.ok) {
            const userData = await userRes.json();
            setUser(userData);
          }
        }
      } catch (error) {
        Alert.alert('Error', 'No se pudo cargar la receta');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [recipeId]);

  if (loading) {
    return (
      <View style={[styles.center, styles.fullBackground]}>
        <ActivityIndicator size="large" color="#f5a649" />
      </View>
    );
  }

  if (!recipe) {
    return (
      <View style={[styles.center, styles.fullBackground]}>
        <Text>Receta no encontrada</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container} style={styles.fullBackground}>
      <Text style={styles.title}>{recipe.title}</Text>
      <Text style={styles.description}>{recipe.description}</Text>

      <Text style={styles.section}>Ingredientes:</Text>
      {recipe.ingredients?.map((ing, index) => (
        <Text key={index} style={styles.item}>• {ing}</Text>
      ))}

      <Text style={styles.section}>Pasos:</Text>
      {recipe.steps?.map((step, index) => (
        <Text key={index} style={styles.item}>{index + 1}. {step}</Text>
      ))}

      <Text style={styles.user}>Autor: {user?.name || 'Desconocido'}</Text>

      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate('EditRecipe', { recipe })}
      >
        <Text style={styles.buttonText}>Editar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  fullBackground: {
    flex: 1,
    backgroundColor: '#f8eee6',
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#174b5c',
  },
  description: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#f10650',
  },
  section: {
    fontSize: 20,
    marginTop: 16,
    fontWeight: 'bold',
    color: '#f5a649',
  },
  item: {
    fontSize: 16,
    marginLeft: 14,
    color: '#174b5c',
    marginBottom: 6,
  },
  user: {
    marginTop: 30,
    fontWeight: '600',
    fontSize: 16,
    color: '#f16969',
  },
  editButton: {
    backgroundColor: '#f5a649',
    padding: 15,
    borderRadius: 8,
    marginTop: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
