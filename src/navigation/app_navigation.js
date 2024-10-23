import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import AddProductScreen from '../views/add_product_screen';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import AllProductScreen from '../views/all_product_screen';
import DetailsScreen from '../views/details_Screen';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <GluestackUIProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='AllProduct'>
          <Stack.Screen name="AddProduct" component={AddProductScreen} />
          <Stack.Screen name="AllProduct" component={AllProductScreen} />
          <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </GluestackUIProvider>
  );
}
