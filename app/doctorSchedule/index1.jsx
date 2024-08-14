import React, {useEffect, useRef, useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, Dimensions, FlatList } from 'react-native';
import { images } from "../../constants";
import Icons from 'react-native-vector-icons/dist/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage } from 'react-native-flash-message';
import {fontRef, heightRef, widthRef} from "../../constants/screenSize";
import {useSocket} from "../context/SocketContext";
import {requestCall} from "../services/socketService";
import {mediaDevices, RTCView} from "react-native-webrtc";

const Index1 = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('Upcoming');
  const [complete, setComplete] = useState([]);
  const [pending, setPending] = useState([]);
  const [userRecords, setUserRecords] = useState([]);
  const [doctorData, setDoctorData] = useState(null);
  const [tokens, setTokens] = useState(null);
  const [loading, setLoading] = useState(false);
  // console.log('doctor data ', doctorData)
  const { state, dispatch } = useSocket();
  const connectionRef = useRef();
  const [stream, setStream] = useState(null);


  console.log('Checking WebRTC support');
  console.log('mediaDevices:', mediaDevices);

  if (mediaDevices.getUserMedia) {
    console.log('WebRTC getUserMedia is supported');
    try {
      const stream =  mediaDevices.getUserMedia({ video: true, audio: true });
      console.log('Stream:', stream);
    } catch (error) {
      console.error('Error getting user media:', error);
    }
  } else {
    console.error('WebRTC getUserMedia is not supported');
  }
  const startVideoCall = async () => {
    try {
      const videoConstraints = {
        mandatory: {
          minWidth: 640,
          minHeight: 480,
          minFrameRate: 30,
        },
        facingMode: 'user', // Use 'environment' for the rear camera
      };

      const mediaStream = await mediaDevices.getUserMedia({
        video: videoConstraints,
        audio: true,
      });

      // Check and log the video and audio tracks
      const videoTracks = mediaStream.getVideoTracks();
      const audioTracks = mediaStream.getAudioTracks();

      console.log('Video Tracks:', videoTracks);
      console.log('Audio Tracks:', audioTracks);

      if (videoTracks.length > 0) {
        console.log('Video Track ID:', videoTracks[0].id);
      } else {
        console.error('No video track available.');
      }

      if (audioTracks.length > 0) {
        console.log('Audio Track ID:', audioTracks[0].id);
      }

      setStream(mediaStream);
      dispatch({ type: 'SET_USER_STREAM', payload: mediaStream });

      const doctorName = `${doctorData.firstName} ${doctorData.lastName}`;
      const doctorProfileImg = doctorData.profileImg;

      requestCall(
          doctorName,
          doctorProfileImg,
          mediaStream,
          setStream,
          (accepted) => dispatch({ type: 'SET_CALL_ACCEPTED', payload: accepted }),
          connectionRef,
          setCallerImg,
          setCallerName,
          setIsUserVideoStreaming
      );
    } catch (error) {
      console.error('Error starting video call:', error);
    }
  };

  useEffect(() => {
    const getDoctorData = async () => {
      try {
        const response = await AsyncStorage.getItem('DoctorData');
        if (response !== null) {
          const parsedResponse = JSON.parse(response);
          setDoctorData(parsedResponse?.user);
          setTokens(parsedResponse?.tokens);
        }
      } catch (error) {
        console.log('Error retrieving login response:', error);
      }
    };

    getDoctorData();
  }, []);

  useEffect(() => {
    if (tokens) {
      getUserRecords();
    }
  }, [tokens]);

  useEffect(() => {
    if (Array.isArray(userRecords)) {
      const completeAppointments = userRecords.filter(appointment => !appointment.chatToken.isSessionValid);
      const pendingAppointments = userRecords.filter(appointment => appointment.chatToken.isSessionValid);
      setComplete(completeAppointments);
      setPending(pendingAppointments);
    }
  }, [userRecords]);

  const url = `https://api-dev.mhc.doginfo.click/doctor/appointment?doctorId=${doctorData?._id}`;

  const getUserRecords = async () => {
    if (!tokens?.access_token || !doctorData?._id) {
      console.error('Missing tokens or doctor ID');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokens.access_token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        showMessage({
          message: `Error: ${errorData.message || 'Unknown error'}`,
          type: 'danger',
        });
        console.error('Error fetching user records:', errorData);
        return;
      }

      const result = await response.json();
      setUserRecords(result);
      showMessage({
        message: "Records fetched successfully",
        type: 'success',
      });
    } catch (error) {
      showMessage({
        message: error.message,
        type: 'danger',
      });
      console.error('Error fetching user records:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTabPress = (tabName) => {
    setActiveTab(tabName);
  };
  const renderUpcomingItem = ({ item }) => (
    <View style={styles.upcom}>
      <View style={styles.topBar}>
      <Text style={styles.y1}>  {item.appointmentDetails.date }</Text>
      <Text style={styles.y1}> {item.appointmentDetails.startTime}</Text>
      </View>
      <View style={styles.row}>
        <View style={styles.circular}>
          <Image
            source={{uri: item?.user?.profileImg}}
            resizeMode="cover"
            style={styles.patientImage}
          />
        </View>
        <View style={styles.c1}>
          <Text style={styles.name}>{item?.user?.firstName} {item?.user?.lastName}</Text>
          <Text style={styles.disease}>Disease: {item?.user?.medicalHistory[0]?.condition}</Text>
          <Text style={styles.gender}>Gender: {item?.user?.gender}</Text>
          <View style={{ flexDirection: "row", justifyContent: "flex-end", width: 150 }}>
            <TouchableOpacity
                onPress={startVideoCall}
                style={styles.cameraButton}
            >
              <Image
                  source={images.Camera}
                  resizeMode="cover"
                  style={styles.cameraImage}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  const renderCompletedItem = ({ item }) => (
    <View style={styles.maininner}>
      <View style={styles.r1}>
        <View style={styles.c1}>
          <Text style={{ fontSize: 20 * fontRef, fontWeight: "bold", color:'black' }}>{item?.user?.firstName} {item?.user?.lastName}</Text>
          <Text style={{fontSize: 16 * fontRef,color:'black', fontWeight:'500'}}>Cardiologist</Text>
        </View>
        <View style={styles.circle}>
          <Image
            source={images.Check}
            resizeMode="cover"
            style={{ height: 50 * heightRef, width: 50 * heightRef }}
          />
        </View>
      </View>
      <Text style={{ fontSize: 16 * fontRef,color:'black', fontWeight:'500', marginVertical:10, marginLeft:10}}>It was a successful completed appointment.</Text>
      <View style={styles.topBar}>
        <Text style={styles.y1}>  {new Date(item.appointmentDetails.date * 1000).toLocaleDateString()}</Text>
        <Text style={styles.y1}> {new Date(item.appointmentDetails.startTime * 1000).toLocaleTimeString()}</Text>
      </View>
    </View>
  );

  // console.log('pending ', JSON.stringify(pending,null,3))
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.appBar}>
        <View style={styles.appBarPart1}>
          <TouchableOpacity onPress={() => navigation.goBack()} >
            <Icons name={'chevron-back'} size={30} color="black" />
          </TouchableOpacity>
          <Text style={styles.h1}> My Schedule</Text>
        </View>
        {/*<View style={styles.circularBox}>*/}
        {/*  <Image*/}
        {/*    source={images.profilePic}*/}
        {/*    resizeMode="contain"*/}
        {/*    style={{ height: 50, width: 50 }}*/}
        {/*  />*/}
        {/*</View>*/}
      </View>

      <View style={{ padding: 20 }}>
        <View style={styles.tabbar}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'Upcoming' && styles.activeTab]}
            onPress={() => handleTabPress('Upcoming')}
          >
            <Text style={[styles.tabText, activeTab === 'Upcoming' && styles.activeTabText]}>Upcoming</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'Completed' && styles.activeTab]}
            onPress={() => handleTabPress('Completed')}
          >
            <Text style={[styles.tabText, activeTab === 'Completed' && styles.activeTabText]}>Completed</Text>
          </TouchableOpacity>
        </View>

        {activeTab === 'Upcoming' && (
          <FlatList
            data={pending}
            contentContainerStyle={{paddingBottom:180}}
            renderItem={renderUpcomingItem}
            keyExtractor={(item) => item._id.toString()}
            ListEmptyComponent={<Text>No upcoming appointments.</Text>}
          />
        )}

        {activeTab === 'Completed' && (
          <FlatList
            data={complete}
            contentContainerStyle={{paddingBottom:180}}
            renderItem={renderCompletedItem}
            keyExtractor={(item) => item._id.toString()}
            ListEmptyComponent={<Text>No completed appointments.</Text>}
          />
        )}

        {/* Render the video stream if available */}
        {stream && (
            <View style={styles.videoContainer}>
              <RTCView
                  streamURL={stream.toURL()}
                  style={styles.rtcView}
              />
            </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Index1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabbar: {
    flexDirection: "row",
    backgroundColor: "#fff",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 1,
    shadowOffset: { width: 0, height: 1 },
    borderRadius: 20,
    overflow: "hidden",
  },
  tab: {
    flex: 1,
    height: 50 * heightRef,
    justifyContent: "center",
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: "#1877F2",
  },
  tabText: {
    color: "black",
    fontSize: 16 * fontRef
  },
  activeTabText: {
    color: "#fff",
  },
  h1: {
    fontWeight: "bold",
    fontSize: 22 * fontRef,
    color: 'black',
    marginLeft: 10  * widthRef,
  },
  appBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10 * heightRef,
  },
  appBarPart1: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  circularBox: {
    width: 50 * heightRef,
    height: 50 * heightRef,
    backgroundColor: 'blue',
    borderRadius: 50,
  },
  upcom: {
    height: 180 * heightRef,
    width: Dimensions.get('window').width - 40,
    backgroundColor: '#1877F2',
    marginTop: 10 * heightRef,
    borderRadius: 20,
    justifyContent: 'flex-start',
    padding: 15 * heightRef,
  },
  topBar: {
    backgroundColor: "#1877F2",
    height: 45 * heightRef,
    borderRadius: 15,
    flexDirection: "row",
    padding: 10  * heightRef,
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 0,
    marginBottom: 0,
  },
  row: {
    flexDirection: 'row',
  },
  circular: {
    height: 100 * heightRef,
    width: 100 * heightRef,
    borderRadius: 50,
    overflow: 'hidden',
  },
  patientImage: {
    height: '100%',
    width: '100%',
  },
  c1: {
    marginLeft: 10 * widthRef,
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 22 * fontRef,
    fontWeight: 'bold',
    color: 'white',

  },
  disease: {
    color: 'white',
    fontWeight:'bold'
  },
  gender: {
    fontWeight: 'bold',
    color: 'white'
  },
  cameraButton: {
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 25,
    padding: 10 * heightRef,
    marginTop: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1877F2',

  },
  cameraImage: {

    height: 20 * heightRef,
    width: 20 * heightRef
  },
  y1: {
    fontWeight: 'bold',
    color: 'white'
  },
  circle: {
    height: 70 * heightRef,
    width: 70 * heightRef,
    backgroundColor: "#1877F2",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  maininner: {
    height: 190 * heightRef,
    width: Dimensions.get("window").width - 40,
    backgroundColor: "lightblue",
    marginTop: 10 * heightRef,
    borderRadius: 20,
    padding: 15 * heightRef,
  },
  r1: {
    flexDirection: "row",
    justifyContent: 'space-between'
  },
  videoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    marginTop: 20 * heightRef,
    height: 200 * heightRef,
  },
  rtcView: {
    width: '100%',
    height: '100%',
  },
});
