import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';

export default function AddRecipeScreen({ route, navigation }) {
  const { userId } = route.params;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState('');

  const handleAdd = async () => {
    if (!title || !description || !ingredients || !steps) {
      Alert.alert('Error', 'Por favor completa todos los campos.');
      return;
    }

    const ingredientsArray = ingredients.split(',').map((i) => i.trim());
    const stepsArray = steps.split(',').map((s) => s.trim());

    try {
    //   const response = await fetch('http://10.125.217.144:3000/recipes', {
    const response = await fetch('https://recets-production.up.railway.app/recipes', {

        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId,
          title,
          description,
          ingredients: ingredientsArray,
          steps: stepsArray,
        }),
      });

      if (response.ok) {
        Alert.alert('Éxito', 'Receta agregada correctamente', [
          { text: 'OK', onPress: () => navigation.goBack() },
        ]);
      } else {
        const err = await response.json();
        throw new Error(err.message || 'Error al agregar receta');
      }
    } catch (error) {
      console.error('Error en handleAdd:', error);
      Alert.alert('Error', error.message || 'No se pudo guardar la receta');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Título"
        placeholderTextColor="#888"   
      />
      <TextInput
        style={[styles.input, { height: 100 }]}
        value={description}
        onChangeText={setDescription}
        placeholder="Descripción"
        placeholderTextColor="#888"   
        multiline
      />
      <TextInput
        style={[styles.input, { height: 80 }]}
        value={ingredients}
        onChangeText={setIngredients}
        placeholder="Ingredientes (separados por coma)"
        multiline
      />
      <TextInput
        style={[styles.input, { height: 100 }]}
        value={steps}
        onChangeText={setSteps}
        placeholder="Pasos (separados por coma)"
        placeholderTextColor="#888"   
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={handleAdd}>
        <Text style={styles.buttonText}>Agregar Receta</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f7f9fc',
  },
  input: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    marginBottom: 15,
    borderColor: '#ddd',
    borderWidth: 1,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#38A169',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
