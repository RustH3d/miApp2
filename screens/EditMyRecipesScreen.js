import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';

export default function EditRecipeScreen({ route, navigation }) {
  const { recipe } = route.params;

  const [title, setTitle] = useState(recipe.title);
  const [description, setDescription] = useState(recipe.description);
  const [ingredients, setIngredients] = useState(recipe.ingredients.join(', '));
  const [steps, setSteps] = useState(recipe.steps.join(', '));

  const handleSave = async () => {
    if (!title || !description || !ingredients || !steps) {
      Alert.alert('Error', 'Por favor completa todos los campos.');
      return;
    }

    try {
     // const response = await fetch(`http://10.125.217.144:3000/recipes/${recipe.id}`, {
     const response = await fetch(`https://recets-production.up.railway.app/recipes/${recipe.id}`, {

        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description,
          ingredients,
          steps,
        }),
      });

      if (response.ok) {
        Alert.alert('Éxito', 'Receta actualizada correctamente', [
          { text: 'OK', onPress: () => navigation.goBack() }
        ]);
      } else {
        const err = await response.json();
        throw new Error(err.message || 'Error actualizando');
      }
    } catch (error) {
      console.error('Error en handleSave:', error);
      Alert.alert('Error', error.message || 'No se pudo actualizar la receta');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container} style={styles.fullBackground}>
      <Text style={styles.title}>Editar Receta</Text>

      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Título"
        pplaceholderTextColor="#888"   
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
        placeholderTextColor="#888"   
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

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Guardar cambios</Text>
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
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#174b5c',
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    marginBottom: 15,
    borderColor: '#f5a649',
    borderWidth: 1,
    fontSize: 16,
    color: '#174b5c',
  },
  button: {
    backgroundColor: '#f5a649',
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
