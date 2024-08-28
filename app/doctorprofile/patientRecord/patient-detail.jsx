import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { images } from '../../../constants';
import PdfResult from '../../prescription/component/pdf-result';
import Icons from 'react-native-vector-icons/dist/Ionicons';
import { fontRef, heightRef, widthRef } from "../../../constants/screenSize";

const PatientDetail = () => {
  const route = useRoute();
  const { user } = route.params;
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.appBar}>
        <View style={styles.appBarpatr1}>
          <TouchableOpacity onPress={() => navigation.goBack()} >
            <Icons name={'chevron-back'} size={30} color="black" />

          </TouchableOpacity>
          <Text style={styles.h1}>{`${user?.firstName || ''} ${user?.lastName || ''}`}</Text>
        </View>
        <View style={styles.circularBox}>
          <Image
            source={{ uri: user?.profileImg }}
            resizeMode="contain"
            style={{ height: 50 * heightRef, width: 50 * heightRef, }}
          />
        </View>
      </View>

      <View style={{ padding: 20 * heightRef }}>


        <View style={styles.spacer} />
        <Text style={{ color: "black", fontWeight: "bold", fontSize: 20 * fontRef, marginBottom: 10 * heightRef }}>Basic Info</Text>

        <View style={styles.r1}>
          <Text style={{ fontWeight: "bold", fontSize: 15, color: 'dimgrey' }}>Disease :</Text>
          <Text style={{ fontWeight: "bold", fontSize: 15, color: 'dimgrey' }}>{user?.condition}</Text>
        </View>
        {/*<View style={styles.r1}>*/}
        {/*  <Text style={{ fontWeight: "bold" , fontSize: 15, color:'dimgrey'}}>Blood Group :</Text>*/}
        {/*  <Text style={{ fontWeight: "bold", fontSize: 15, color:'dimgrey' }}>AB+</Text>*/}
        {/*</View>*/}
        {/*<View style={styles.r1}>*/}
        {/*  <Text style={{ fontWeight: "bold", fontSize: 15, color:'dimgrey' }}>Dietry :</Text>*/}
        {/*  <Text style={{ fontWeight: "bold", fontSize: 15, color:'dimgrey' }}>Non Veg</Text>*/}
        {/*</View>*/}
        {/*<View style={styles.r1}>*/}
        {/*  <Text style={{ fontWeight: "bold" , fontSize: 15, color:'dimgrey'}}>Height :</Text>*/}
        {/*  <Text style={{ fontWeight: "bold" , fontSize: 15, color:'dimgrey'}}>5'7</Text>*/}
        {/*</View>*/}
        {/*<View style={styles.r1}>*/}
        {/*  <Text style={{ fontWeight: "bold", fontSize: 15, color:'dimgrey' }}>Age :</Text>*/}
        {/*  <Text style={{ fontWeight: "bold", fontSize: 15, color:'dimgrey' }}>30</Text>*/}
        {/*</View>*/}

        <Text style={{ color: "black", fontWeight: "bold", fontSize: 20 * fontRef, marginBottom: 10 * heightRef, marginTop: 10 * heightRef }}>Lab Results</Text>
        {/*<PdfResult />*/}
        {/*<PdfResult />*/}

        {/*<Text style={{color:"#1877F2", fontWeight:"bold", fontSize:18,marginBottom:10, marginTop:10}}>Previous Appointment</Text>*/}
        {/*<View style={styles.topBar}>*/}
        {/*  <View style={{flexDirection:"row", alignItems:"center"}}>*/}
        {/*    <Image*/}
        {/*      source={images.Calenderg}*/}
        {/*      resizeMode="cover"*/}
        {/*      style={{ height:25, width:25 }}*/}
        {/*    />*/}
        {/*    <Text style={styles.y1}> Fri,12 Apr</Text>*/}
        {/*  </View>*/}
        {/*  <View style={{flexDirection:'row', justifyContent:"center", alignItems:"center"}}>*/}
        {/*    <Image*/}
        {/*      source={images.Clock}*/}
        {/*      resizeMode="cover"*/}
        {/*      style={{ height:25, width:25 }}*/}
        {/*    />*/}
        {/*    <Text style={styles.y1}> 11:00 am</Text>*/}
        {/*  </View>*/}
        {/*</View> */}


        <Text style={{ color: "black", fontWeight: "bold", fontSize: 20 * fontRef, marginBottom: 10 * heightRef, marginTop: 10 * heightRef }}>Send Prescription</Text>
        <TouchableOpacity style={styles.c1} onPress={() => navigation.navigate('PrescriptionScreen', { user: user })}>
          <Image
            source={images.docp}
            resizeMode="cover"
            style={{ height: 80, width: 80 }}
          />
          <View style={{ justifyContent: "center" }}>
            <Text style={{ color: "black", fontSize: 20 * fontRef, fontWeight: '500' }}>Enter the Prescription</Text>
          </View>
          <View style={{ justifyContent: "center" }}>
            <Image
              source={images.ArrowR}
              resizeMode="cover"
              style={{ height: 30, width: 30, tintColor: 'black' }}
            />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default PatientDetail

const styles = StyleSheet.create({
  y1: {
    color: "white",
    fontWeight: "bold"
  },
  c1: {
    height: 90 * heightRef,
    borderWidth: 1,
    borderColor: '#DAD9D9',
    borderRadius: 15,
    width: Dimensions.get("window").width - 40,
    justifyContent: "space-around",
    alignContent: "center",
    flexDirection: "row"
  },
  topBar: {
    backgroundColor: "grey",
    height: 45 * heightRef,
    borderRadius: 15,
    flexDirection: "row",
    padding: 10 * heightRef,
    alignItems: "center",
    justifyContent: "space-between",
    marginRight: 7,
    marginLeft: 7
  },
  r1: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  spacer: {
    height: 10 * heightRef,
  },
  h1: {
    fontWeight: "bold",
    fontSize: 22 * fontRef,
    color: 'black',
    marginLeft: 10 * widthRef
  },
  appBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10 * heightRef
  },
  appBarpatr1: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  container: {
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: 'white'
  },
  circularBox: {
    width: 50 * heightRef,
    height: 50 * heightRef,
    overflow: 'hidden',
    backgroundColor: 'blue',
    borderRadius: 50,
  },
});
