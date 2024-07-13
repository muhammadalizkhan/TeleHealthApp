import { StyleSheet, Text, View, Dimensions, SafeAreaView ,Image} from 'react-native';
import React, { useEffect, useState } from 'react';
import { images } from '../../constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

        <View style={{height:20}}></View>

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

        <View style={{height:50}}></View>

        <TouchableOpacity  onPress={()=>navigation.navigate("patient-record")}>

        <View style={styles.r1}>
        <Image
              source={images.Plus}
              resizeMode="contain"
              style={{height:25, width:25, marginRight:16}}
            />
          <Text style={styles.menuItem}>Patient Record</Text>
        </View>

        </TouchableOpacity>


        <TouchableOpacity  onPress={()=>navigation.navigate("patient-detail")}>
       
        <View style={styles.r1}>
        <Image
              source={images.Detail}
              resizeMode="contain"
              style={{height:25, width:25, marginRight:16}}
            />

          <Text style={styles.menuItem}> Patient Detail</Text>
        </View>
        </TouchableOpacity>


        <TouchableOpacity onPress={()=>navigation.navigate("doctor-schedule")}>
          <View style={styles.r1}>
          <Image
              source={images.DSchedule}
              resizeMode="contain"
              style={{height:25, width:25, marginRight:16}}
            />
            <Text style={styles.menuItem}> Doctor Schedule</Text>
          </View>
        </TouchableOpacity>


        <View style={{height:50}}></View>

        <Image
              source={images.Heart}
              resizeMode="contain"
              style={{height:150, width:190,position:'absolute', bottom:30, right:0}}
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
    height: 170,
    width: 170,
    backgroundColor: 'white',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    height: 150,
    width: 150,
    borderRadius: 100,
  },
  profileName: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 20,
  },
  r1: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems:"center",
    width: 180,
    margin: 13,
  },
  menuItem: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
