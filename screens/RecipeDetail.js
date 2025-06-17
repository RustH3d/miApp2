import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';

export default function RecipeDetail({ route }) {
  const { recipe } = route.params;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // const response = await fetch(`http://10.125.217.144:3000/users/${recipe.user_id}`);
        const response = await fetch(`https://recets-production.up.railway.app/users/${recipe.user_id}`);

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error al obtener usuario:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [recipe.user_id]);

  if (loading) {
    return (
      <View style={[styles.center, styles.fullBackground]}>
        <ActivityIndicator size="large" color="#f5a649" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container} style={styles.fullBackground}>
      <Text style={styles.title}>{recipe.title}</Text>
      <Text style={styles.description}>{recipe.description}</Text>

      <Text style={styles.section}>Ingredientes:</Text>
      {recipe.ingredients.map((ing, index) => (
        <Text key={index} style={styles.item}>• {ing}</Text>
      ))}

      <Text style={styles.section}>Pasos:</Text>
      {recipe.steps.map((step, index) => (
        <Text key={index} style={styles.item}>{index + 1}. {step}</Text>
      ))}

      <Text style={styles.user}>Autor: {user?.name || 'Desconocido'}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  fullBackground: {
    flex: 1,
    backgroundColor: '#f8eee6', // fondo extendido en toda la pantalla
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
    fontStyle: 'normal',
  },
});
