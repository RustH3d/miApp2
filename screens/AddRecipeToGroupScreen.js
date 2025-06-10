import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';

export default function AddRecipeToGroupScreen({ route, navigation }) {
  const { groupId } = route.params;
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipeIds, setSelectedRecipeIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchRecipes = async () => {
    setLoading(true);
    try {
      const response = await fetch('"https://miapp2-production.up.railway.app/recipes"');
      if (!response.ok) throw new Error('Error en la respuesta del servidor');
      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      Alert.alert('Error', 'No se pudieron cargar las recetas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const toggleSelection = (recipeId) => {
    setSelectedRecipeIds((prev) =>
      prev.includes(recipeId)
        ? prev.filter((id) => id !== recipeId)
        : [...prev, recipeId]
    );
  };

  const handleSave = async () => {
    if (selectedRecipeIds.length === 0) {
      Alert.alert('Atención', 'Selecciona al menos una receta para agregar.');
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(`https://miapp2-production.up.railway.app/groups/${groupId}/recipes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recipeIds: selectedRecipeIds }),
      });

      if (!res.ok) throw new Error('Error al guardar recetas en el grupo');

      Alert.alert('Éxito', 'Recetas agregadas al grupo');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'No se pudieron guardar las recetas');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#D35400" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          const isSelected = selectedRecipeIds.includes(item.id);
          return (
            <TouchableOpacity
              style={[styles.recipeCard, isSelected && styles.selectedCard]}
              onPress={() => toggleSelection(item.id)}
            >
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.desc} numberOfLines={3} ellipsizeMode="tail">
                {item.description}
              </Text>
              <Text style={styles.author}>
                Autor: {item.author_name || 'Desconocido'}
              </Text>
              {isSelected && <Text style={styles.selectedText}>✓ Seleccionada</Text>}
            </TouchableOpacity>
          );
        }}
      />

      <TouchableOpacity
        style={[styles.saveButton, saving && styles.disabledButton]}
        onPress={handleSave}
        disabled={saving}
      >
        {saving ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.saveButtonText}>Guardar en el Grupo</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF6E3', // beige claro (fondo suave)
  },
  list: {
    padding: 20,
    paddingBottom: 100, // espacio para botón fijo
  },
  recipeCard: {
    backgroundColor: '#FFF5E1', // beige más claro para las cartas
    padding: 18,
    marginBottom: 12,
    borderRadius: 10,
    elevation: 3,
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: '#D35400', // naranja oscuro para borde seleccionado
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#E67E22', // naranja brillante para títulos
  },
  desc: {
    color: '#7F4E1E', // marrón suave para descripción
  },
  author: {
    color: '#A0522D', // marrón oscuro para autor
    fontStyle: 'italic',
    marginTop: 6,
  },
  selectedText: {
    marginTop: 8,
    color: '#D35400', // naranja oscuro para texto de seleccion
    fontWeight: 'bold',
  },
  saveButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#D35400', // naranja oscuro para botón
    padding: 16,
    borderRadius: 30,
    alignItems: 'center',
    elevation: 5,
  },
  disabledButton: {
    backgroundColor: '#F5B895', // naranja claro para botón deshabilitado
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
