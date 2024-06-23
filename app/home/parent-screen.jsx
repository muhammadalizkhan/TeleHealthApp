import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import DrawerNavigator from '../drawer/DrawerNavigator';

const ParentScreen = () => {
  return (
    <View style={{flex:1}}>
     <DrawerNavigator/>
    </View>
  )
}

export default ParentScreen

const styles = StyleSheet.create({})