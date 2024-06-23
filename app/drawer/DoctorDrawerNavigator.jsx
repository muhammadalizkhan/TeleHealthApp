import {View, Text} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Main from './Main';
import CustomDrawer from './CustomDrawer';
import DoctorCustomDrawer from './DoctorCustomDrawer';
import DoctorScreen from '../doctorprofile/doctor-profile';
import HomeScreen from '../home/home-screen';
const Drawer = createDrawerNavigator();
const DoctorDrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={props => <DoctorCustomDrawer {...props} />}>
      <Drawer.Screen
        name="doctor-screen"
        component={DoctorScreen}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
};

export default DoctorDrawerNavigator;
