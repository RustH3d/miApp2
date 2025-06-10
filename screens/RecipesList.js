import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';

export default function RecipesListScreen({ navigation }) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('https://miapp2-production.up.railway.app/recipes');
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error('Error al obtener recetas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#6bcdbf" />
      </View>
    );
  }

  return (
    <FlatList
      data={recipes}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.recipeCard}
          onPress={() => navigation.navigate('RecipeDetail', { recipe: item })}
        >
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.desc}>{item.description}</Text>
          <Text style={styles.author}>
            Autor: {item.author_name || 'Desconocido'}
          </Text>
        </TouchableOpacity>
      )}
      contentContainerStyle={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 20,
    backgroundColor: '#f8eee6',
    flexGrow: 1,
  },
  recipeCard: {
    backgroundColor: '#ffffff',
    padding: 18,
    marginBottom: 14,
    borderRadius: 12,
    borderLeftWidth: 6,
    borderLeftColor: '#6bcdbf',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#174b5c',
    marginBottom: 6,
  },
  desc: {
    color: '#555',
    fontSize: 14,
    marginBottom: 4,
  },
  author: {
    color: '#f1696c',
    fontStyle: 'italic',
    fontSize: 13,
    marginTop: 6,
  },
  author: {
  color: '#174b5c',       
  fontWeight: '600',       
  fontSize: 14,            
  marginTop: 6,
},

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8eee6',
  },
});
