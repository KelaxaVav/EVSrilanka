import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import AddProductScreen from '../views/add_product_screen';
import { GluestackUIProvider } from '@gluestack-ui/themed';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <GluestackUIProvider>
        <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='AddProduct'>
            <Stack.Screen name="AddProduct" component={AddProductScreen} />
        </Stack.Navigator>
        </NavigationContainer>
    </GluestackUIProvider>
  );
}