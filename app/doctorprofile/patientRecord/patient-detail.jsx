import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { images } from '../../../constants';
import PatientRecordComponent from './component/patient-record-component';
import PdfResult from '../../prescription/component/pdf-result';

const PatientDetail = () => {
  return (
    <View>
      <SafeAreaView style={styles.container}>
        <View style={styles.appBar}>
          <View style={styles.appBarpatr1}>
            <Text style={styles.h1}>John Wick</Text>
          </View>
       
        </View>
        <View style={styles.spacer} />
        <Text style={{color:"#1877F2", fontWeight:"bold", fontSize:18,marginBottom:10}}>Basic Info</Text>

        <View  style={styles.r1}
        
        >

          <Text style={{fontWeight:"bold"}}>Disease :</Text>
          <Text style={{fontWeight:"bold"}}>Hypertention</Text>
        </View>
        <View  style={styles.r1}
        
        >

          <Text style={{fontWeight:"bold"}}>Sub Category :</Text>
          <Text style={{fontWeight:"bold"}}>Blood Presure </Text>
        </View>
        <View  style={styles.r1}
        
        >

          <Text style={{fontWeight:"bold"}}>Blood Group :</Text>
          <Text style={{fontWeight:"bold"}}>AB+</Text>
        </View>
        <View  style={styles.r1}
        
        >

          <Text style={{fontWeight:"bold"}}>Dietry :</Text>
          <Text style={{fontWeight:"bold"}}>Non Veg</Text>
        </View>

        <View  style={styles.r1}
        
        >

          <Text style={{fontWeight:"bold"}}>Height :</Text>
          <Text style={{fontWeight:"bold"}}>5'7</Text>
        </View>

        <View  style={styles.r1}
        
        >

          <Text style={{fontWeight:"bold"}}>Age :</Text>
          <Text style={{fontWeight:"bold"}}>30</Text>
        </View>


        <Text style={{color:"#1877F2", fontWeight:"bold", fontSize:18,marginBottom:10, marginTop:10}}>Lab Results</Text>

        <PdfResult/>
        <PdfResult/>

        <Text style={{color:"#1877F2", fontWeight:"bold", fontSize:18,marginBottom:10, marginTop:10}}>Previous Appointment</Text>

        
        <View style={styles.topBar}>

          <View style={{flexDirection:"row", alignItems:"center"}}>

        <Image
                                                                 source={images.Calenderg}
                                                                 resizeMode="cover" 
                                                                
                                                                 style={{
                                                 
                                                                     height:25,
                                                                     width:25
                                                                     
                                                 
                                                                  
                                                                 }}
                                                 
                                                 
                                                               />

<Text  style={styles.y1}> Fri,12 Apr</Text>
</View>

<View  style={{flexDirection:'row', justifyContent:"center",alignItems:"centerv"}}>

<Image
                                                                 source={images.Clock}
                                                                 resizeMode="cover" 
                                                                
                                                                 style={{
                                                 
                                                                     height:25,
                                                                     width:25
                                                                     
                                                 
                                                                  
                                                                 }}
                                                 
                                                 
                                                               />

<Text  style={styles.y1}> 11:00 am</Text>

</View>


</View>

        <Text style={{color:"#1877F2", fontWeight:"bold", fontSize:18,marginBottom:10, marginTop:10}}>Send Prescription</Text>

        <View style={styles.c1}>

        <Image
                                                                 source={images.docp}
                                                                 resizeMode="cover" 
                                                                
                                                                 style={{
                                                 
                                                                     height:80,
                                                                     width:80
                                                                     
                                                 
                                                                  
                                                                 }}
                                                 
                                                 
                                                               />


          <View style={{justifyContent:"center"}}>


          <Text   style={{color:"grey"}} >Enter the Prescription</Text>
          
          </View>


 <View  style={{justifyContent:"center"}}>

          <Image
                                                                 source={images.ArrowR}
                                                                 resizeMode="cover" 
                                                                
                                                                 style={{
                                                 
                                                                     height:40,
                                                                     width:40
                                                                     
                                                 
                                                                  
                                                                 }}
                                                 
                                                 
                                                               />

</View>





        </View>


        
     
      </SafeAreaView>
    </View>
  )
}

export default PatientDetail

const styles = StyleSheet.create({

  y1:{

color:"white",
fontWeight:"bold"
  },


  c1:{

    height:90,
    borderWidth:1,
    borderColor:"grey",
    borderRadius:15,
    width: Dimensions.get("window").width - 40,
    // width:200

    // justifyContent:"center",
    justifyContent:"space-around",
    alignContent:"center",
    flexDirection:"row"


  },

  topBar: {
    backgroundColor: "grey", // Adding transparency
    height: 45,
    borderRadius: 15,
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    justifyContent: "space-between",


    marginRight: 7,
    marginLeft: 7
},

  r1:{

    flexDirection:"row",
    justifyContent:"space-between"


  },

  tabbar: {
    flexDirection: "row",
    backgroundColor: "#fff",
    elevation: 2, // for shadow on Android
    shadowColor: "#000", // for shadow on iOS
    shadowOpacity: 0.2, // for shadow on iOS
    shadowRadius: 1, // for shadow on iOS
    shadowOffset: { width: 0, height: 1 }, // for shadow on iOS
    borderRadius: 20, // for rounded corners
    overflow: "hidden", // to ensure rounded corners are applied
  },
  tab: {
    flex: 1,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: "#1877F2", // blue color when selected
  },
  tabText: {
    color: "black", // lightblue by default
    fontSize: 16,
  },
  activeTabText: {
    color: "#fff", // white color when selected
  },
  spacer: {
    height: 10,
  },
  h1: {
    fontWeight: "bold",
    fontSize: 22,
  },
  appBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  appBarpatr1: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  circularBox: {
    width: 50,
    height: 50,
    backgroundColor: 'blue',
    borderRadius: 50,
  },
  container: {
    marginTop: 14,
    padding: 20,
    justifyContent: "flex-start",
  },
});
