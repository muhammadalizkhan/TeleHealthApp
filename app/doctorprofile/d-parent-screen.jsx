import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import DoctorDrawerNavigator from '../drawer/DoctorDrawerNavigator';


const DParentScreen = () => {
  return (
    <View style={{flex:1}}>
    <DoctorDrawerNavigator/>
   </View>
  )
}

export default DParentScreen

const styles = StyleSheet.create({})