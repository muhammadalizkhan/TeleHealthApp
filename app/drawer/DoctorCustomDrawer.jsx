import { StyleSheet, Text, View, Dimensions, SafeAreaView ,Image} from 'react-native';
import React, { useEffect, useState } from 'react';
import { images } from '../../constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {fontRef, heightRef, widthRef} from "../../constants/screenSize";

const DoctorCustomDrawer = ({navigation}) => {
  const [doctorData, setDoctorData] = useState(null);

  useEffect(() => {
      const getDoctorData = async () => {
          try {
              const response = await AsyncStorage.getItem('DoctorData');
              if (response !== null) {
                  console.log(response)
                  const parsedResponse = JSON.parse(response);
                  console.log('response == ', JSON.stringify(parsedResponse, null, 2));
                  setDoctorData(parsedResponse?.user); // Assuming your response contains the necessary doctor data
              }
          } catch (error) {
              console.log('Error retrieving login response:', error);
          } finally {
              setLoading(false);
          }
      };

      getDoctorData();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        <View style={{height:20 * heightRef}}></View>

        <View style={styles.profileContainer}>
          <View style={styles.profile}>
            <Image
         source={{ uri: doctorData?.profileImg }}
              resizeMode="fill"
              style={styles.profileImage}
            />
          </View>
          <Text style={styles.profileName}>{doctorData?.firstName} {doctorData?.lastName}</Text>
        </View>

        <View style={{height:50 * heightRef}}></View>


        <TouchableOpacity onPress={()=>navigation.navigate("UpdateDScreen")}>
        <View style={styles.r1}>
        <Image
              source={images.Account}
              resizeMode="contain"
              style={{height:30 * heightRef , width:30 * widthRef,  marginRight:6 * widthRef, marginLeft:5* widthRef}}
            />
          <Text style={styles.menuItem}>  My Profile</Text>
        </View>
        </TouchableOpacity>

        {/*<TouchableOpacity onPress={()=>navigation.navigate("notifications")}>*/}
        {/*<View style={styles.r1}>*/}

        {/*<Image*/}
        {/*      source={images.Notification}*/}
        {/*      resizeMode="contain"*/}
        {/*      style={{height:25, width:25,  marginRight:10, marginLeft:5}}*/}
        {/*    />*/}
        {/*  <Text style={styles.menuItem}>  Notification</Text>*/}
        {/*</View>*/}
        {/*</TouchableOpacity>*/}

        <TouchableOpacity  onPress={()=>navigation.navigate("patient-record")}>

        <View style={styles.r1}>
        <Image
              source={images.Plus}
              resizeMode="contain"
              style={{height:35 * heightRef, width:35 * widthRef, marginRight:12 * widthRef, marginLeft:0}}
            />
          <Text style={styles.menuItem}>Patient Record</Text>
        </View>

        </TouchableOpacity>

{/*
        <TouchableOpacity  onPress={()=>navigation.navigate("patient-detail")}>

        <View style={styles.r1}>
        <Image
              source={images.Detail}
              resizeMode="contain"
              style={{height:25, width:25, marginRight:16}}
            />

          <Text style={styles.menuItem}> Patient Detail</Text>
        </View>
        </TouchableOpacity> */}


        <TouchableOpacity onPress={()=>navigation.navigate("doctor-schedule")}>
          <View style={styles.r1}>
          <Image
              source={images.DSchedule}
              resizeMode="contain"
              style={{height:28, width:28, marginRight:18, marginLeft:5}}
            />
            <Text style={styles.menuItem}>Doctor Schedule</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>navigation.navigate("role-login")}>
        <View style={styles.r1}>
        <Image
              source={images.open}
              resizeMode="contain"
              style={{height:40 * heightRef, width:40 * widthRef, marginRight:6 * widthRef}}
            />
          <Text style={styles.menuItem}> Logout</Text>
        </View>
        </TouchableOpacity>


        <View style={{height:50}}></View>

        <Image
              source={images.Heart}
              resizeMode="contain"
              style={{height:150 * heightRef, width:190 * heightRef,position:'absolute', bottom:30, right:0}}
            />


      </View>
    </SafeAreaView>
  );
};

export default DoctorCustomDrawer;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1877F2',
  },
  container: {
    flex: 1,
    backgroundColor: '#1877F2',
    padding: 20,
    alignItems: 'center',
  },
  profileContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  profile: {
    height: 170 * heightRef,
    width: 170 * heightRef,
    backgroundColor: 'white',
    borderRadius: 100 * heightRef,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    height: 150 * heightRef,
    width: 150 * heightRef,
    borderRadius: 100 * heightRef,
    marginRight:6 * widthRef , marginLeft:5 * widthRef
  },
  profileName: {
    color: 'white',
    fontSize: 25 * fontRef,
    fontWeight: 'bold',
    marginTop: 20 * heightRef,
  },
  r1: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems:"center",
    width: 180 * widthRef,
    margin: 13 * heightRef,
  },
  menuItem: {
    color: 'white',
    fontSize: 16 * fontRef,
    fontWeight: 'bold',
  },
});
