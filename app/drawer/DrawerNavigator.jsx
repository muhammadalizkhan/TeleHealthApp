import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from './CustomDrawer';
import HomeScreen from '../home/home-screen';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <Drawer.Navigator
    
      drawerContent={props => (
        <CustomDrawer 
          {...props} 
          isDrawerOpen={isDrawerOpen} 
          setIsDrawerOpen={setIsDrawerOpen} 
        />
      )}
      screenOptions={{
        headerShown: false,
        drawerPosition: 'right',
        drawerStyle: {
          width: 250, // Adjust the width based on the drawer status
        },
      }}
      // onDrawerOpen={() => setIsDrawerOpen(true)}
      // onDrawerClose={() => setIsDrawerOpen(false)}
    >
      <Drawer.Screen
        name="home-screen1"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
