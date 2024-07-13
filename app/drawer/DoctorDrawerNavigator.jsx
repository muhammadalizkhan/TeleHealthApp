import {View, Text} from 'react-native';
import React, { useState } from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Main from './Main';
import CustomDrawer from './CustomDrawer';
import DoctorCustomDrawer from './DoctorCustomDrawer';
import DoctorScreen from '../doctorprofile/doctor-profile';
import HomeScreen from '../home/home-screen';
const Drawer = createDrawerNavigator();
const DoctorDrawerNavigator = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <Drawer.Navigator drawerContent={props => <DoctorCustomDrawer {...props} />}
    
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
        name="doctor-screen"
        component={DoctorScreen}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
};

export default DoctorDrawerNavigator;
