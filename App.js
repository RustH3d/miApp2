import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import RecipesList from './screens/RecipesList';
import MyRecipes from './screens/MyRecipes';
import RecipeDetail from './screens/RecipeDetail';  // Para recetas generales
import RecipeDetailsScreen from './screens/MyRecipesDetails'; // Para mis recetas
import EditRecipeScreen from './screens/EditMyRecipesScreen';
import AddRecipeScreen from './screens/AddRecipeScreen';
import GroupManagerScreen from './screens/GroupManagerScreen';
import UserRecipesDetailsScreen from './screens/UserRecipesDetailsScreen';
import GroupDetailsScreen from './screens/GroupDetailsScreen';
import AddRecipeToGroupScreen from './screens/AddRecipeToGroupScreen'; 
import UserSettingsScreen from './screens/UserSettingsScreen';






const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="RecipesList" component={RecipesList} />
        <Stack.Screen name="MyRecipes" component={MyRecipes} />
        <Stack.Screen name="RecipeDetail" component={RecipeDetail} />
        <Stack.Screen name="MyRecipesDetails" component={RecipeDetailsScreen} />
        <Stack.Screen name="EditRecipe" component={EditRecipeScreen} />
        <Stack.Screen name="AddRecipe" component={AddRecipeScreen} />
        <Stack.Screen name="GroupManager" component={GroupManagerScreen} />
        <Stack.Screen name="UserRecipesDetails" component={UserRecipesDetailsScreen} />
        <Stack.Screen name="GroupDetails" component={GroupDetailsScreen} />
        <Stack.Screen  name="AddRecipeToGroup" component={AddRecipeToGroupScreen} />
        <Stack.Screen name="UserSettings" component={UserSettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
