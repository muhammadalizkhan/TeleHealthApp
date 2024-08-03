import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, Dimensions, FlatList, ActivityIndicator } from 'react-native';
import { images } from "../../constants";
import CompleteSchedule from '../../components/completed-schedule';
import CancelledSchedule from '../../components/cancelled-schedule';
import UpcomingSchedule from '../../components/upcoming-schedule';
import DoctorPrescription from './component/doctors-prescription';
import PdfResult from './component/pdf-result';
import Icons from 'react-native-vector-icons/dist/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/Authcontext';
import { showMessage } from 'react-native-flash-message';
import { getDoctorbyId } from '../../constants/APi';
import moment from 'moment';
import {fontRef, heightRef} from "../../constants/screenSize";

const MedicalRecord = ({ navigation }) => {

  const { logout, loggedIn, userData } = useContext(AuthContext);
  console.log('user data ==> ', userData)

  const url = `https://api-dev.mhc.doginfo.click/ehr-system?userId=${userData.user._id}`;


  const [loading, setLoading] = useState()
  const [userRecords, setUserRecords] = useState([]);
  const [doctor, setDoctor] = useState()
  const [doctorId, setDoctorId] = useState()

  useEffect(() => {
    getUserRecords();
  }, []);


  const getUserRecords = async () => {
    setLoading(true);

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userData?.tokens?.access_token}`,
        },
      });

      if (!response.ok) {
        setLoading(false);
        const errorData = await response.json();
        showMessage({
          message: `Error: ${errorData || 'Unknown error'}`,
          type: 'danger',
        });
        console.error('Error fetching user records:', errorData);
        return;
      }

      const result = await response.json();
      console.log('User records fetched successfully:', JSON.stringify(result, null, 2));
      setLoading(false);
      showMessage({
        message: "Get Records Successfully",
        type: 'success',
      });
      // navigation.goBack();
      // setUserRecords(result);
      if (Array.isArray(result)) {
        setUserRecords(result);
      } else {
        setUserRecords([]); // Set an empty array if the result is not an array
      }
      fetchDoctorData(result[0].visits[0]?.doctor?._id)

    } catch (error) {
      setLoading(false);
      showMessage({
        message: "No data found",
        type: 'success',
      });
      console.error('Error fetching user records:', error);
    }
  };

  const fetchDoctorData = async (doctorId) => {
    try {
        const doctorsData = await getDoctorbyId(doctorId);
        console.log('doctor data', JSON.stringify(doctorsData, null,2));
        setDoctor(doctorsData);
    } catch (error) {
        console.error('Error fetching doctors:', error);
    }
};

const formatDate = (timestamp) => {
  if (!timestamp) return "";
  return moment.unix(timestamp).format('DD-MM-YYYY hh:mm A');
};







  console.log('User records fetched successfully:', JSON.stringify(userRecords, null, 2));

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate("prescription", {data: item})}>

    <View style={styles.containre}>
      <Image
        source={images.Pills}
        resizeMode="cover"
        style={{
          height: 100* heightRef,
          width: 100 * heightRef
        }} />

      <View style={{width:'45%'}}>
        <Text style={{ fontSize: 17 * fontRef, fontWeight: "bold", color: "#1877F2", marginTop: 10 * heightRef }}>
          {`${item?.visits?.[0]?.doctor?.firstName || ''} ${item?.visits?.[0]?.doctor?.lastName || ''}`}
        </Text>


        <Text style={{color:'black', fontSize: 13 * fontRef }}>{doctor?.speciality[0]?.specialization?.name}</Text>
      </View>

      <View style={styles.lowcontain}>
        <Text style={{ color: "grey",fontSize: 13 * fontRef  }}>{formatDate(item?.followUp?.date)}</Text>
      </View>

    </View>

  </TouchableOpacity>
);

  return (
    <SafeAreaView>
      <View style={styles.appBar}>
        <View style={styles.appBarpatr1}>
          <TouchableOpacity onPress={() => navigation.goBack()} >
            <Icons name={'chevron-back'} size={30} color="black" />

          </TouchableOpacity>
          <Text style={styles.h1}>Medical Record</Text>
        </View>
        <View style={styles.circularBox}>
          <Image
            source={{ uri: userData?.user?.profileImg }}
            resizeMode="contain"
            style={{ height: 50, width: 50 }}
          />
        </View>
      </View>
      <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <>
                  {
                    userRecords && userRecords.length > 0 ? (
                        <FlatList
                            data={userRecords}
                            renderItem={renderItem}
                            keyExtractor={item => item?._id?.toString()}
                        />
                    ) : (
                        <Text style={{fontSize:20, color:'dimgrey', textAlign:'center'}}>No data found</Text>
                    )
                  }

                </>

            )}
        </View>
      {/* <View style={styles.container}>

        <View style={styles.spacer} />

        <Text style={styles.h2}>Doctor's Prescription</Text>

        <TouchableOpacity onPress={() => navigation.navigate("prescription")}>

          <View style={styles.containre}>
            <Image
              source={images.Pills}
              resizeMode="cover"
              style={{
                height: 100,
                width: 100
              }} />

            <View>
              <Text style={{ fontSize: 17, fontWeight: "bold", color: "#1877F2", marginTop: 10 }}>Dr Jackson Wang</Text>
              <Text>Dentist</Text>
            </View>

            <View style={styles.lowcontain}>
              <Text style={{ color: "grey" }}>11:00 am</Text>
            </View>

          </View>

        </TouchableOpacity>




      </View> */}
    </SafeAreaView>

  );
};


export default MedicalRecord;

const styles = StyleSheet.create({
  h1: {

    fontWeight: "bold",
    color: 'black',
    fontSize: 22,
    marginLeft: 10

  },

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
    height: 10,
  },

  appBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10
  },
  appBarpatr1: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  circularBox: {
    width: 50,
    height: 50,
    overflow:'hidden',
    backgroundColor: 'blue',
    borderRadius: 50,
  },
  container: {
    marginTop: 14,
    padding: 20,
    justifyContent: "flex-start",
  },
  lowcontain: {
    alignSelf:'flex-end',
    padding: 10,
    position:'absolute',
    bottom:0,
    right:10


  },

  containre: {
    height: 100 * heightRef,
    width: Dimensions.get('window').width - 40,
    // backgroundColor: 'green',
    marginRight: 30,
    borderRadius: 20,
    borderWidth: 1, // border width
    borderColor: 'grey', // border color
    marginTop: 10,
    flexDirection: "row"

  }

});
