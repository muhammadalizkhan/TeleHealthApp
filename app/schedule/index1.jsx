import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, Dimensions, FlatList, Alert } from 'react-native';
import { images } from "../../constants";
import CompleteSchedule from '../../components/completed-schedule';
import CancelledSchedule from '../../components/cancelled-schedule';
import UpcomingSchedule from '../../components/upcoming-schedule';
import { AuthContext } from '../../context/Authcontext';
import { showMessage } from 'react-native-flash-message';
import Icons from 'react-native-vector-icons/dist/Ionicons';
import {fontRef, heightRef, widthRef} from "../../constants/screenSize";

const Index = ({navigation}) => {
  {/* Edited by Yaseen */}
  const [activeTab, setActiveTab] = useState('Pending');
  const [loading, setLoading] = useState(false)
  const [userRecords, setUserRecords] = useState([])
  const { logout, loggedIn, userData } = useContext(AuthContext);
  const [complete, setComplete] = useState([]);
  const [pending, setPending] = useState([]);


  useEffect(() => {
    getUserRecords();
  }, []);

  useEffect(() => {

    if (Array.isArray(userRecords)) {
      const completeAppointments = [];
      const pendingAppointments = [];

      userRecords.forEach(appointment => {
        if (appointment.chatToken.isSessionValid) {
          pendingAppointments.push(appointment);
        } else {
          completeAppointments.push(appointment);
        }
      });

      setComplete(completeAppointments);
      setPending(pendingAppointments);
    }
  }, [userRecords]);

  console.log('pending app = ', pending);
  console.log('completed app = ', complete)

  const url = `https://api-dev.mhc.doginfo.click/doctor/appointment?userId=${userData.user._id}`;
  // const url = `https://api-dev.mhc.doginfo.click/doctor/appointment?userId=666360d5d7079cd2796a343b`;


  const handleTabPress = (tabName) => {
    setActiveTab(tabName);
  };



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
      console.log('appoinments = ', JSON.stringify(result, null, 3))
      setLoading(false);
      showMessage({
        message: "Get Records Successfully",
        type: 'success',
      });
      // navigation.goBack();
      setUserRecords(result);
      // fetchDoctorData(result[0].visits[0]?.doctor?._id)

    } catch (error) {
      setLoading(false);
      showMessage({
        message: error.message,
        type: 'danger',
      });
      console.error('Error fetching user records:', error);
    }
  };

  const renderCompleteAppointment = ({ item }) => (
      <View style={styles.maininner}>
        <View style={styles.r1}>
          <View style={styles.c1}>
            <Text style={{ fontSize: 20 * fontRef, fontWeight: "bold", color:'black' }}>
              Dr. {item.doctor.firstName} {item.doctor.lastName}
            </Text>
            <Text style={{fontSize:14 * fontRef, color:'gray'}}>{item.specialization.name}</Text>
          </View>
          <View style={styles.circle}>
            <Image
                source={images.Check}
                resizeMode="cover"
                style={{
                  height: 50 * heightRef,
                  width: 50 * heightRef,
                }}
            />
          </View>
        </View>
        <Text style={{ color: "grey" }}>It was a successfully completed appointment</Text>
        <View style={styles.topBar}>
          <Text style={styles.y1}>
            {new Date(item.appointmentDetails.date * 1000).toLocaleDateString()}
          </Text>
          <Text style={styles.y1}>
            {new Date(item.appointmentDetails.startTime * 1000).toLocaleTimeString()}
          </Text>
        </View>
      </View>
  );

  const renderPendingAppointment = ({ item }) => (
      <View style={styles.mainin}>
        <View style={styles.topBar}>
          <Text style={styles.y1}>
            {item.appointmentDetails.date}
          </Text>
          <Text style={styles.y1}>
            {item.appointmentDetails.startTime}
          </Text>
        </View>
        <View style={styles.row}>
          <View style={styles.circular}>
            <Image
                source={images.doctorPic} // Adjust the image source as necessary
                resizeMode="cover"
                style={{
                  height: 100,
                  width: 100,
                  borderRadius: 50,
                  overflow: 'hidden',
                }}
            />
          </View>
          <View style={styles.c1}>
            <Text style={{ color: "white", fontWeight: 'bold', fontSize: 18 }}>
              Dr. {item.doctor.firstName} {item.doctor.lastName}
            </Text>
            <Text style={{ color: "white" }}>{item.specialization.name}</Text>
            <Text style={{ color: "white" }}>Duration: {Math.round((item.appointmentDetails.endTime - item.appointmentDetails.startTime) / 60)} min</Text>
          </View>
        </View>
      </View>
  );



  return (
      <SafeAreaView style={styles.container}>
        <View style={styles.appBar}>
          <View style={styles.appBarpatr1}>
            <TouchableOpacity onPress={() => navigation.goBack()} >
              <Icons name={'chevron-back'} size={30} color="black" />

            </TouchableOpacity>
            <Text style={styles.h1}>My Schedule</Text>
          </View>
          {/*<View style={styles.circularBox}>*/}
          {/*  <Image*/}
          {/*    source={images.profilePic}*/}
          {/*    resizeMode="contain"*/}
          {/*    style={{ height: 50, width: 50 }}*/}
          {/*  />*/}
          {/*</View>*/}
        </View>

        <View style={{ flex: 1,padding:20, width:'100%', height:'100%'}}>

          <View style={styles.spacer} />
          <View style={styles.tabbar}>
            {/* Edited by Yaseen */}
            <TouchableOpacity
                style={[styles.tab, activeTab === 'Pending' && styles.activeTab]}
                onPress={() => handleTabPress('Pending')}
            >
              {/* Edited by Yaseen */}
              <Text style={[styles.tabText, activeTab === 'Pending' && styles.activeTabText]}>Pending</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.tab, activeTab === 'Completed' && styles.activeTab]}
                onPress={() => handleTabPress('Completed')}
            >
              <Text style={[styles.tabText, activeTab === 'Completed' && styles.activeTabText]}>Completed</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
            style={[styles.tab, activeTab === 'Cancelled' && styles.activeTab]}
            onPress={() => handleTabPress('Cancelled')}
          >
            <Text style={[styles.tabText, activeTab === 'Cancelled' && styles.activeTabText]}>Cancelled</Text>
          </TouchableOpacity> */}
          </View>

          {complete.length === 0 && pending.length === 0 ? (
              <Text style={styles.noRecordText}>No record found</Text>
          ) : (
              <>
                {activeTab === 'Completed' && (
                    <FlatList
                        nestedScrollEnabled={true}
                        data={complete}
                        renderItem={renderCompleteAppointment}
                        keyExtractor={(item, index) => item._id + index}
                        
                    />
                )}
                {/* Edited by Yaseen */}
                {activeTab === 'Pending' && (
                    <FlatList
                        nestedScrollEnabled={true}
                        data={pending}
                        renderItem={renderPendingAppointment}
                        keyExtractor={(item, index) => item._id + index}

                    />
                )}
              </>
          )}
          {/* {activeTab === 'Cancelled' && <CancelledSchedule />} */}
        </View>

      </SafeAreaView>
  );
};


export default Index;

const styles = StyleSheet.create({
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
    color:'black',
    marginLeft:10
  },
  appBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding:10
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
    flex:1,
    justifyContent: "flex-start",
  },
  y1: {

    color: "white",
    fontWeight: "bold"


  },

  topBar: {

    backgroundColor: "#1877F2",
    height: 45,
    borderRadius: 15,
    flexDirection: "row",
    padding: 10,

    alignItems: "center",

    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 10
  },



  circle: {

    height: 70,
    width: 70,
    backgroundColor: "#1877F2",
    borderRadius: 100,
    marginRight: 10,
    marginBottom: 15,
    justifyContent: "center",
    alignContent: "center",
    paddingLeft: 10


  },

  r1: {

    flexDirection: "row",
    justifyContent: 'space-between'


  },



  maininner: {


    height: 190 * heightRef,
    width: Dimensions.get("window").width - 40,

    backgroundColor: "lightblue",
    marginTop: 10 * heightRef,
    borderRadius: 20 ,
    justifyContent: "flex-start",
    padding: 15 * heightRef,





  },

  c1:{

    justifyContent:"center",
    alignItems:"flex-start",
    marginLeft:15 * widthRef


  },


  row:{


    flexDirection:"row"

  },


  circular:{

    height:100,
    width:100,
    borderRadius:100,  backgroundColor:"#DAD9D9",
    marginTop:10,


  },








  mainin:{


    height:220 * heightRef,
    width: Dimensions.get("window").width-40,

    backgroundColor:"#1877F2",
    marginTop:10,
    borderRadius:20,
    justifyContent:"flex-start",
    padding:15,





  },
  noRecordText: {
    textAlign: 'center',
    marginTop: 100,
    fontSize: 18,
    color: 'grey',
  },
});
