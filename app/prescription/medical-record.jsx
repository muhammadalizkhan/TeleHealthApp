import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { images } from "../../constants";
import CompleteSchedule from '../../components/completed-schedule';
import CancelledSchedule from '../../components/cancelled-schedule';
import UpcomingSchedule from '../../components/upcoming-schedule';
import DoctorPrescription from './component/doctors-prescription';
import PdfResult from './component/pdf-result';
const MedicalRecord = ({navigation}) => {
  

  return (
    <View>
      <SafeAreaView style={styles.container}>
        <View style={styles.appBar}>
          <View style={styles.appBarpatr1}>
            <Text style={styles.h1}>Medical Record</Text>
          </View>
          <View style={styles.circularBox}>
            <Image
              source={images.profilePic}
              resizeMode="contain"
              style={{ height: 50, width: 50 }}
            />
          </View>
        </View>
        <View style={styles.spacer} />

        <Text  style={styles.h2}>Doctor's Prescription</Text>

        <TouchableOpacity  onPress={()=>navigation.navigate("prescription")}>

        <DoctorPrescription/>
        </TouchableOpacity>

        <TouchableOpacity  onPress={()=>navigation.navigate("prescription")}>

        <DoctorPrescription/>
        </TouchableOpacity>

        <View style={{marginTop:20}}></View>

        <Text  style={styles.h1}>Lab Result</Text>

        <PdfResult/>
        <PdfResult/>
        <PdfResult/>
       
       


      </SafeAreaView>
    </View>
  );
};


export default MedicalRecord;

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
