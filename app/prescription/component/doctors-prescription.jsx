import { StyleSheet, Text, View ,Dimensions, Image} from 'react-native'
import React from 'react'
import { images } from '../../../constants'

const DoctorPrescription = () => {
  return (
    <View style={styles.containre}>
  <Image
                                                                 source={images.Pills}
                                                                 resizeMode="cover" 
                                                                
                                                                 style={{
                                                 
                                                                     height:100,
                                                                     width:100
                                                                     
                                                 
                                                                  
                                                                 }}
                                                 
                                                 
                                                               />

        <View>
        <Text style={{fontSize:17, fontWeight:"bold", color:"#1877F2", marginTop:10}}>Dr Jackson Wang</Text>
        <Text>Dentist</Text>
        </View>

        <View  style={styles.lowcontain}>
        <Text style={{color:"grey"}}>11:00 am</Text>
        </View>
    
    </View>
  )
}

export default DoctorPrescription

const styles = StyleSheet.create({


    lowcontain:{

        justifyContent:"flex-end",
        padding:10


    },

  containre:{
    height: 100,
    width: Dimensions.get('window').width - 40,
    // backgroundColor: 'green',
    marginRight: 30,
    borderRadius: 20,
    borderWidth: 1, // border width
    borderColor: 'grey', // border color
    marginTop:10,
    flexDirection:"row"
   
  }


})