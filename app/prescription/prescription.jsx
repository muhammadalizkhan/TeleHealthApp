import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { images } from "../../constants";
import CompleteSchedule from '../../components/completed-schedule';
import CancelledSchedule from '../../components/cancelled-schedule';
import UpcomingSchedule from '../../components/upcoming-schedule';
import DoctorPrescription from './component/doctors-prescription';
import PdfResult from './component/pdf-result';
import PrescribedCenter from './component/prescribed-center';
const Prescription = () => {
  return (
    <View>
      <SafeAreaView style={styles.container}>
        <View style={styles.appBar}>
          <View style={styles.appBarpatr1}>
            <Text style={styles.h1}>Prescription</Text>
          </View>
          <View style={styles.circularBox}>
            <Image
              source={images.Download}
              resizeMode="contain"
              style={{ height: 25, width: 25 }}
            />
          </View>
        </View>
        <View style={styles.spacer} />


        <Text style={{fontSize:17, color:"#1877F2", fontWeight:"bold"}}>Medicines</Text>
        <Text style={{color:"grey", marginTop:5}}>Aastrovanstrin(Lipitor) 20 mg</Text>
        <Text style={{color:"grey", marginTop:5}}>Metoprolol(Lopressor) 50 mg</Text>
        <Text style={{color:"grey", marginTop:5}}>Aaspirin(Bayer) 81 mg</Text>

        <View style={styles.spacer} />
        
        <Text style={{fontSize:17, color:"#1877F2", fontWeight:"bold"}}>Injections</Text>
        <Text style={{color:"grey", marginTop:5}}>Nitroglycerin(Nitrostat) 40 mg</Text>
        
        <Text style={{color:"grey", marginTop:5}}>Enoxaparin(Lovenox) 0 mg</Text>
  
        <View style={styles.spacer} />
        
        <Text style={{fontSize:17, color:"#1877F2", fontWeight:"bold"}}>Tests</Text>
        <Text style={{color:"grey", marginTop:5}}>Electrodiagram(ECG OR EKG)</Text>
        
        <View style={styles.spacer} />
        
        <Text style={{fontSize:17, color:"#1877F2", fontWeight:"bold"}}>Note</Text>
        <Text style={{color:"grey", marginTop:5}}>Take your medications as prescribed daily</Text>
        <Text style={{color:"grey", marginTop:5}}>Monitor for unsusal symtoms and side effects</Text>
        <Text style={{color:"grey", marginTop:5}}>Attend your scheduled test appointmnet properly</Text>
          
        <View style={styles.spacer} />
        
        <Text style={{fontSize:17, color:"#1877F2", fontWeight:"bold"}}>Recomended Lab</Text>


        <View style={{flexDirection:"row", justifyContent:"space-around"}}>
        <PrescribedCenter/>
        <PrescribedCenter/>


        </View>

    



      </SafeAreaView>
    </View>
  )
}

export default Prescription

const styles = StyleSheet.create({
  h1:{

    fontWeight:"bold",
    


  },

  h2:{

    fontWeight:"bold"


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
    height: 20,
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

    justifyContent:"center",

    borderRadius: 50,
  },
  container: {
    marginTop: 14,
    padding: 20,
    justifyContent: "flex-start",
  },
});
