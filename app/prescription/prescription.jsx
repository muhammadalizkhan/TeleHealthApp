import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { images } from "../../constants";
import CompleteSchedule from '../../components/completed-schedule';
import CancelledSchedule from '../../components/cancelled-schedule';
import UpcomingSchedule from '../../components/upcoming-schedule';
import DoctorPrescription from './component/doctors-prescription';
import PdfResult from './component/pdf-result';
import PrescribedCenter from './component/prescribed-center';
import { useRoute } from '@react-navigation/native';
import Icons from 'react-native-vector-icons/dist/Ionicons';
import {fontRef, heightRef, widthRef} from "../../constants/screenSize";
import {SvgUri} from "react-native-svg";

const Prescription = ({ navigation, }) => {

  const route = useRoute(); // Access route
  const { data } = route.params || {};
  console.log('data', JSON.stringify(data, null, 2))
  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.appBar}>
        <View style={styles.appBarpatr1}>
          <TouchableOpacity onPress={() => navigation.goBack()} >
            <Icons name={'chevron-back'} size={30} color="black" />
          </TouchableOpacity>
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
      <View style={{ padding: 20 }}>

        <Text style={{ fontSize: 17, color: "black", fontWeight: "bold" }}>Medicines</Text>
        {data.medications && data.medications.map((med, index) => (
          <Text key={index} style={{ color: "grey", marginTop: 5 }}>{med.medication} ({med.dosage})</Text>
        ))}

        <View style={styles.spacer} />

        {/* <Text style={{fontSize:17, color:"#1877F2", fontWeight:"bold"}}>Injections</Text>
        <Text style={{color:"grey", marginTop:5}}>Nitroglycerin(Nitrostat) 40 mg</Text>

        <Text style={{color:"grey", marginTop:5}}>Enoxaparin(Lovenox) 0 mg</Text>

        <View style={styles.spacer} /> */}

        <Text style={{ fontSize: 17, color: "black", fontWeight: "bold" }}>Tests</Text>
        {data.visits[0]?.recommendedTests?.labTest.map((test, index) => (
          <Text key={index} style={{ color: "grey", marginTop: 5 }}>{test.testName}</Text>
        ))}

        <View style={styles.spacer} />

        <Text style={{ fontSize: 17, color: "black", fontWeight: "bold" }}>Note</Text>
        <Text style={{ color: "grey", marginTop: 5 }}>{data?.visits[0]?.notes}</Text>


        <View style={styles.spacer} />

        <Text style={{ fontSize: 17, color: "black", fontWeight: "bold" }}>Recomended Lab</Text>


        <View style={{ flexDirection: "row",  }}>

          {/* <PrescribedCenter/> */}
          {/* <PrescribedCenter/> */}

          <View style={styles.containerr}>

            <View style={styles.smallConatiner}>

              {/*<Image*/}
              {/*  source={{uri: data?.visits[0]?.recommendedTests?.diagnosticCenter?.image}}*/}
              {/*  resizeMode="cover"*/}

              {/*  style={{*/}
              {/*    height: 100 * heightRef,*/}
              {/*    width: 145 * heightRef,*/}



              {/*  }}*/}


              {/*/>*/}
              <View style={{height:80, width:'100%',justifyContent:'center', alignItems:'center' }}>
                <SvgUri
                    width='85%'
                    height='50%'
                    uri={data?.visits[0]?.recommendedTests?.diagnosticCenter?.image}
                />
              </View>


              <View style={styles.r1}>

                <Text style={{ fontSize: 15 * fontRef, fontWeight: "bold", color:'black' }}>{data?.visits[0]?.recommendedTests?.diagnosticCenter?.centerName}</Text>

                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                  <Text style={{color:'grey'}}>4.5 </Text>

                  <Image
                    source={images.star}
                    resizeMode="contain"

                    style={{
                      height: 10,
                      width: 10,



                    }}


                  />



                </View>
              </View>


              <View style={styles.r1}>
                <View>

                  <Text style={{ color: "grey", fontSize: 10 }}>Mon-Fri</Text>

                  <Text style={{ color: "grey", fontSize: 10 }}>9:00 am to 5:00pm</Text>


                </View>

{/*
                <Image
                  source={images.Arrow}
                  resizeMode="contain"

                  style={{
                    height: 15,
                    width: 15,



                  }}


                /> */}



              </View>


            </View>

          </View>

        </View>



      </View>

    </SafeAreaView>

  )
}

export default Prescription

const styles = StyleSheet.create({


  h2: {

    fontWeight: "bold"


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
    color: 'black',
    marginLeft: 10
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

    justifyContent: "center",

    borderRadius: 50,
  },
  container: {
    flex:1,
    // marginTop: 14,
    // padding: 20,
    backgroundColor:'white',
    justifyContent: "flex-start",
  },
  r1: {

    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
   paddingHorizontal:5

  },


  containerr: {
marginTop:10,
    borderWidth: 1,
   borderColor:"#DAD9D9",
    height: 160 * heightRef,
    width: 160 * heightRef,
    borderRadius: 20,
    alignItems: "center",

  },

  smallConatiner: {
    marginTop: 5,
    // backgroundColor:'white',
    height: 110 * heightRef,
    width: 145 * widthRef,
    borderRadius: 20


  }
});
