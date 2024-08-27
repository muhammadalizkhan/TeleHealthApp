import React, {useEffect, useRef, useState} from 'react';
import {
  Button,
  SafeAreaView,
  View,
  ToastAndroid,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {mediaDevices, RTCView} from 'react-native-webrtc';
import {useSocket} from '../context/SocketContext';
// Custom component and files
import {
  joinChatRoom,
  endAppointment,
  requestCall,
  acceptRequest,
  incomingCallRequest,
  requestDenied,
  denyRequest,
  toggleUserVideoStream,
  isUserVideoStreamingEvent,
  checkAptStatus,
  handleSession,
  reconnectSream,
  socketConnection,
  getRoomId,
  getUserRquests,
  handleUserDisconnected,
  handleToggleAudio,
  handleUserToggleAudio,
  startAppointment,
} from '../services/socketService';
import CallEnd from '../../asset/CallEnd';
import VideoOff from '../../asset/VideoOff';
import VideoOn from '../../asset/VideoOn';
import MicOff from '../../asset/MicOff';
import MicOn from '../../asset/MicOn';
import InCallManager from 'react-native-incall-manager';

export default function Meeting({navigation, route}) {
  const {appointment, userRole: role} = route?.params;
  const {doctor, user} = appointment;
  // React states
  const [pendingRequests, setPendingRequests] = useState(null); // object
  const [isSessioninvalid, setIsSessioninvalid] = useState(false);
  const [msgReceived, setMsgReceived] = useState(false);
  const [aptStarted, setAptStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [aptEnded, setAptEnded] = useState(false);
  const [showEHR, setShowEHR] = useState(false);
  const [message, setMessage] = useState('');
  const [roomId, setRoomId] = useState(null);

  // Stream states
  const [isUserVideoStreaming, setIsUserVideoStreaming] = useState(true);
  const [callRequested, setCallRequested] = useState(false);
  const [receivingCall, setReceivingCall] = useState(false);
  const [callAccepted, setCallAccepted] = useState(false);
  const [callerSignal, setCallerSignal] = useState(null);
  const [audioStream, setAudioStream] = useState(true);
  const [videoStream, setVideoStream] = useState(true);
  const [userStream, setUserStream] = useState();
  const [myStream, setMyStream] = useState();
  const [isUserAudioOn, setIsUserAudioOn] = useState(false);
  const [isMyAudioOn, setIsMyAudioOn] = useState(true);

  // User states
  const [userProfileImg, setUserProfileImg] = useState();
  const [callerName, setCallerName] = useState(null);
  const [aptUserId, setAptUserId] = useState(null);
  const [isUserDC, setIsUserDC] = useState(false); // Is other user disonnected
  const [callerImg, setCallerImg] = useState(null);
  const [userId, setUserId] = useState(
    role == 'user' ? user?._id : doctor?._id
  );
  const [myName, setMyName] = useState('');
  //const [role, setRole] = useState();

  // Chat
  const [conversationId, setConversationId] = useState(true);

  const connectionRef = useRef();

  const {state, dispatch} = useSocket();

  const urlParts = appointment?.chatUrl?.split('/');
  const chatToken = urlParts?.[urlParts.length - 1];
  //const userId = role == 'user' ? user?._id : doctor?._id;

  // To enable loudspeaker
  const enableLoudSpeaker = () => {
    InCallManager.setForceSpeakerphoneOn(true); // Use true to turn on the loudspeaker
    InCallManager.setSpeakerphoneOn(true); // Also set the speakerphone on
  };

  useEffect(() => {
    enableLoudSpeaker()
  },[])

  useEffect(() => {
    if (message) ToastAndroid.show(message, 3000);
  }, [message]);

  useEffect(() => {
    dispatch({type: 'SET_IS_LOADING', payload: true});

    let drId = doctor?._id;
    let _role = 'doctor';

    if (!drId || !_role) {
      setTimeout(() => {
        if (role === 'doctor') navigation.goBack();
        if (role === 'user') navigation.goBack();
      }, 2000);
    }
  }, []);

  useEffect(() => {
    if (isSessioninvalid) {
      dispatch({type: 'SET_IS_LOADING', payload: true});

      setTimeout(() => {
        if (role === 'doctor') navigation.goBack();
        if (role === 'user') navigation.goBack();
      }, 2000);
    }
  }, [isSessioninvalid]);

  /**
   * UseEffect for setting user name and role
   */
  useEffect(() => {
    let session = state?.session;

    dispatch({type: 'SET_CHAT_TOKEN', payload: chatToken});

    setMyName(
      `${role == 'doctor' ? 'Dr.' : ''} ${user?.firstName} ${user?.lastName}`
    );
    setUserProfileImg(session?.user?.profileImg);
    setUserId(session?.user?._id);
    //setRole(session?.user?.role);
    setAptUserId(userId);
  }, [state.session]);

  useEffect(() => {
    if (chatToken && userId && role) {
      socketConnection(
        {
          user: {_id: userId, role: role},
        },
        dispatch,
        chatToken
      );

      joinChatRoom(setAptStarted, setAptEnded);
    }
  }, [state.socket, chatToken]);

  /**
   * UseEffect for setting stream
   */
  useEffect(() => {
    mediaDevices
      ?.getUserMedia({
        video: videoStream,
        audio: audioStream,
      })
      .then((mediaStream) => {
        setMyStream(mediaStream);
      })
      .catch((error) => {
        console.error('Error accessing media devices.', error);
        setMyStream(null);
      });
  }, []);

  /**
   * UseEffect for handling call session events
   */
  useEffect(() => {
    setIsLoading(true);

    const handleChatRoom = async () => {
      await incomingCallRequest(
        setCallerSignal,
        setCallerImg,
        setReceivingCall,
        setCallerName,
        setPendingRequests
      );
      await joinChatRoom(setAptStarted, setAptEnded);
      await requestDenied(setCallerSignal, setCallRequested, setMessage);
      await isUserVideoStreamingEvent(setIsUserVideoStreaming);
      await handleSession(setIsSessioninvalid, setMessage);
      await reconnectSream(setUserStream, connectionRef, myStream);
      await handleUserToggleAudio(setIsUserAudioOn);

      setTimeout(async () => {
        if (!roomId) {
          await getRoomId(setRoomId);
        }
        await handleUserDisconnected(setIsUserDC, setMessage);
        await checkAptStatus();
        setIsLoading(false);
      }, 3000);
    };

    if (state.socket) {
      handleChatRoom();
    }

    // Cleanup function to remove all listeners when the component unmounts
    return () => {
      if (state.socket) {
        // Remove all event listeners related to the socket
        state.socket.off('toggle_user_video_stream');
        state.socket.off('appointment_started');
        state.socket.off('appointment_ended');
        state.socket.off('appointment_time');
        state.socket.off('request_rejected');
        state.socket.off('message_received');
        state.socket.off('user_diconnected');
        state.socket.off('reconnect_stream');
        state.socket.off('session_expired');
        state.socket.off('conversation_id');
        state.socket.off('request_call');
        state.socket.off('toggle_audio');
        state.socket.off('receive_file');
        state.socket.off('apt_pending');
        state.socket.off('call_ended');
        state.socket.off('room_id');

        // Disconnect socket
        state.socket.disconnect();
      }
    };
  }, [state.socket]);

  /**
   * Handle appointment end screen
   */
  useEffect(() => {
    if (aptEnded) {
      dispatch({type: 'SET_IS_LOADING', payload: true});

      navigation.goBack();
      //router.push('/consultation-panel/end-screen');
      stopStream();
    }
  }, [aptEnded]);

  useEffect(() => {
    console.log('=====================');
    if (aptStarted && roomId) {
      console.log('......................................');
      getUserRquests(setPendingRequests, roomId, setReceivingCall);
    }
  }, [aptStarted, roomId]);

  useEffect(() => {
    if (isUserDC) {
      // setCallAccepted(false);
      // setUserStream(null);
      // setPendingRequests(null);
      // setCallerSignal(null);
      // setCallerName(null);
      // setCallerImg(null);
      // setCallRequested(false);

      console.log('USE WAS DISCONNECTED!!!!!!!');

      setMessage(
        `${
          role == 'doctor' ? 'Patient' : 'Doctor'
        } was disconnected! Please wait`
      );

      const reload = () => {
        dispatch({type: 'SET_IS_LOADING', payload: true});
        // window.location.reload();
      };

      if (role == 'user' && (callRequested || callAccepted)) {
        reload();
      }

      if (role == 'doctor' && aptStarted && callAccepted) {
        reload();
      }

      setPendingRequests(null);
    }
  }, [isUserDC]);

  /**
   * Function to toggle audio
   */
  const toggleAudio = () => {
    console.log('toggleAudio');
    if (myStream) {
      const audioTracks = myStream.getAudioTracks();
      if (audioTracks.length > 0) {
        audioTracks[0].enabled = !audioTracks[0].enabled;
        setAudioStream(audioTracks[0].enabled);
        setIsMyAudioOn(audioTracks[0].enabled);
        handleToggleAudio(audioTracks[0].enabled);
      }
    }
  };

  /**
   * Function to toggle video
   */
  const toggleVideo = async () => {
    console.log('toggleVideo');
    if (myStream) {
      const videoTracks = myStream.getVideoTracks();
      if (videoTracks.length > 0) {
        videoTracks[0].enabled = !videoTracks[0].enabled;
        setVideoStream(videoTracks[0].enabled);

        await toggleUserVideoStream(videoTracks[0].enabled);
      }
    }
  };

  /**
   * Function to handle request call by user
   */
  const handleRequestCall = async () => {
    setCallRequested(true);

    await requestCall(
      userId,
      roomId,
      myName,
      userProfileImg,
      myStream,
      setUserStream,
      setCallAccepted,
      connectionRef,
      setCallerImg,
      setCallerName,
      setIsUserVideoStreaming,
      setCallRequested,
      isMyAudioOn
    );
  };

  /**
   * Function to accept user call request by doctor
   */
  const handleAcceptRequest = async (callerSignal) => {
    await acceptRequest(
      aptUserId,
      roomId,
      myStream,
      myName,
      userProfileImg,
      setUserStream,
      callerSignal,
      connectionRef,
      myStream?.getVideoTracks()[0].enabled,
      isMyAudioOn
    );
    setPendingRequests(null);
    setReceivingCall(false);
    setCallAccepted(true);
  };

  /**
   * Function to deny call request by doctor
   */
  const handleDenyRequest = async () => {
    await denyRequest(connectionRef);
    setReceivingCall(false);
    setCallerSignal(null);
  };

  /**
   * Function to end appointment
   */
  const handleEndApt = async () => {
    console.log('handleEndCall');

    setCallAccepted(false);
    setAptStarted(false);
    setAptEnded(true);

    await endAppointment();
    await stopStream();
  };

  /**
   * Function to stop stream when ending appointment
   */
  const stopStream = async () => {
    if (connectionRef.current) {
      connectionRef.current.destroy();
    }

    setVideoStream(false);
    setAudioStream(false);

    connectionRef.current = null;

    stopTracks(myStream);
    stopTracks(userStream);

    connectionRef.current = null;
    setMyStream(null);
    setUserStream(null);
  };

  /**
   * Stop all tracks for myStream and userStream
   */
  const stopTracks = (stream) => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
  };

  const Popup = () => {
    return (
      <View style={[styles.callContainer, receivingCall && styles.showCall]}>
        <View style={styles.callContent}>
          <View style={styles.callHeader}>
            {pendingRequests.userProfileImg ? (
              <Image
                source={{uri: pendingRequests.userProfileImg}}
                style={styles.callerImage}
              />
            ) : (
              <View style={styles.callerFallback}>
                <Text style={styles.callerFallbackText}>
                  {pendingRequests.name[1]}
                </Text>
              </View>
            )}
            <Text style={styles.callText}>
              {pendingRequests.name} wants to join
            </Text>
          </View>
          <View style={styles.callButtons}>
            <TouchableOpacity
              onPress={() => handleAcceptRequest(pendingRequests.signal)}
              style={styles.acceptButton}
            >
              <Text style={styles.buttonText}>Allow</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleDenyRequest}
              style={styles.denyButton}
            >
              <Text style={styles.buttonText}>Reject</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const StartSession = () => {
    if (callAccepted || aptEnded)
      return (
        <View
          style={{
            padding: 20,
            position: 'absolute',
            bottom: 0,
            backgroundColor: '#00000050',
            width: '100%',
            height: 100,
            flexDirection: 'row-reverse',
            justifyContent: 'space-around',
          }}
        >
          <TouchableOpacity
            onPress={() => {
              handleEndApt();
            }}
            style={{
              backgroundColor: 'red',
              height: 50,
              width: 50,
              borderRadius: 25,
              justifyContent: 'center',
              alignItems: 'center',
              elevation: 20,
            }}
          >
            <CallEnd />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={toggleVideo}
            style={{
              alignItems: 'center',
              backgroundColor: '#ffffff',
              justifyContent: 'center',
              height: 50,
              width: 50,
              borderRadius: 40,
              elevation: 20,
            }}
          >
            {!videoStream ? (
              <VideoOff height={35} width={35} />
            ) : (
              <VideoOn height={35} width={35} />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={toggleAudio}
            style={{
              alignItems: 'center',
              backgroundColor: '#ffffff',
              justifyContent: 'center',
              height: 50,
              width: 50,
              borderRadius: 40,
              elevation: 20,
            }}
          >
            {!audioStream ? (
              <MicOff height={35} width={35} />
            ) : (
              <MicOn height={35} width={35} />
            )}
          </TouchableOpacity>
        </View>
      );

    return role == 'user' ? (
      <View
        style={{
          padding: 20,
          position: 'absolute',
          bottom: 0,
          backgroundColor: '#00000050',
          width: '100%',
          height: 100,
        }}
      >
        <View>
          {!conversationId ? (
            <View style={styles.messageContainer}>
              <Text style={styles.messageText}>Please wait</Text>
            </View>
          ) : !aptStarted ? (
            <View style={styles.messageContainer}>
              <Text style={styles.messageText}>
                Appointment not started by the Doctor
              </Text>
              {/* <Text style={styles.messageText}>Please Wait</Text> */}
            </View>
          ) : !callRequested ? (
            <View style={styles.messageContainer}>
              <Text style={styles.messageText}>Appointment Started</Text>
              <Text style={styles.messageText}>
                Please join, doctor is waiting
              </Text>
            </View>
          ) : (
            <View style={styles.messageContainer}>
              <Text style={styles.messageText}>
                Please wait, your request will be accepted soon.
              </Text>
            </View>
          )}
        </View>
        <View>
          <TouchableOpacity
            onPress={handleRequestCall}
            style={[
              styles.button,
              (!aptStarted || isLoading || callRequested || !conversationId) &&
                styles.buttonDisabled,
            ]}
            disabled={
              !aptStarted || isLoading || callRequested || !conversationId
            }
          >
            {isLoading || !conversationId ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : aptStarted && !callRequested ? (
              <Text style={styles.buttonText}>Join Appointment</Text>
            ) : (
              <View style={styles.spinnerContainer}>
                <Text style={styles.buttonText}>Please wait</Text>
                <ActivityIndicator size="small" color="#fff" />
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>
    ) : (
      <View
        style={{
          padding: 20,
          position: 'absolute',
          bottom: 0,
          backgroundColor: '#00000050',
          width: '100%',
          height: 100,
        }}
      >
        {!conversationId ? (
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>Please wait</Text>
          </View>
        ) : !aptStarted ? (
          <Text style={styles.readyText}>Ready to Start?</Text>
        ) : (
          <View style={styles.statusContainer}>
            <Text style={styles.statusText}>Appointment Started</Text>
            <Text style={styles.statusText}>Waiting for patient to join</Text>
          </View>
        )}
        {aptStarted && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007bff" />
            <Text style={styles.loadingText}>Please wait</Text>
          </View>
        )}
        <TouchableOpacity
          onPress={aptStarted ? handleEndApt : startAppointment}
          style={[
            styles.button1,
            (isLoading || !conversationId) && styles.buttonDisabled1,
          ]}
          disabled={isLoading || !conversationId}
        >
          {isLoading || !conversationId ? (
            <ActivityIndicator size="large" color="#fff" />
          ) : aptStarted ? (
            <Text style={styles.buttonText1}>End Appointment</Text>
          ) : (
            <Text style={styles.buttonText1}>Start Appointment</Text>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#f5f5f5'}}>
      <View
        style={{
          padding: 20,
          paddingHorizontal: 10,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Image
          source={{uri: user?.profileImg}}
          style={{width: 60, height: 60, borderRadius: 30, marginRight: 15}}
        />
        <View>
          <Text
            style={{fontSize: 18, fontWeight: 'bold'}}
          >{`${user?.firstName} ${user?.lastName}`}</Text>
          <Text style={{color: 'gray'}}>{user?.email}</Text>
        </View>

        {/* <TouchableOpacity
          onPress={() => {
            //endVideoCall();
            navigation.goBack();
          }}
          style={{
            position: 'absolute',
            top: 20,
            right: 10,
            backgroundColor: 'red',
            height: 50,
            width: 50,
            borderRadius: 25,
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 20,
          }}
        >
          <CallEnd />
        </TouchableOpacity> */}
        {/* <TouchableOpacity
          //onPress={startVideoCall}
          style={{
            position: 'absolute',
            alignItems: 'center',
            backgroundColor: '#48ca3f',
            justifyContent: 'center',
            height: 50,
            width: 50,
            borderRadius: 40,
            elevation: 20,
            top: 20,
            right: 70,
          }}
        >
          <Text style={{color: '#fff', fontWeight: 'bold'}}>Start</Text>
        </TouchableOpacity> */}
      </View>

      {myStream && (
        <View
          style={{
            flex: 1,
            backgroundColor: 'black',
          }}
        >
          <RTCView
            objectFit={'cover'}
            streamURL={myStream?.toURL()}
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: 'black',
            }}
          />
        </View>
      )}

      {userStream && (
        <View
          style={{
            flex: 1,
            backgroundColor: 'black',
          }}
        >
          <RTCView
            objectFit={'cover'}
            streamURL={userStream?.toURL()}
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: 'black',
              //borderRadius: 10,
            }}
          />
        </View>
      )}

      <StartSession />

      {receivingCall && pendingRequests && role === 'doctor' && <Popup />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8, // This isn't a valid property; use margin/padding instead
  },
  messageText: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  button: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    minWidth: 100,
    fontWeight: '600',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    backgroundColor: '#007bff', // Replace with your primary color
    borderRadius: 30,
    elevation: 3,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  spinnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10, // Use margin/padding to create spacing
  },
  button1: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    minWidth: 100,
    fontWeight: '600',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007bff', // Replace with your primary color
    borderRadius: 30,
    elevation: 3, // for shadow
  },
  buttonDisabled1: {
    opacity: 0.5,
  },
  buttonText1: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16, // Adjust as needed
  },

  messageContainer: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 20,
    //right: -300, // Off-screen initially
    zIndex: 50,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    elevation: 2, // Shadow for Android
  },
  showMessage: {
    right: 15, // Adjust to the desired position when shown
  },
  messageBox: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  messageText: {
    fontSize: 14,
    color: '#6b7280',
  },
  callerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  callerImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  callerFallback: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#10b981',
    justifyContent: 'center',
    alignItems: 'center',
  },
  callerFallbackText: {
    color: 'white',
    fontWeight: 'bold',
  },
  callerName: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '600',
    marginLeft: 10,
  },
  callContainer: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 20,
    //right: -300, // Off-screen initially
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    elevation: 2, // Shadow for Android
    width: 300,
  },
  showCall: {
    right: 15, // Adjust to the desired position when shown
  },
  callContent: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  callHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#4b5563',
    paddingBottom: 10,
  },
  callText: {
    fontSize: 14,
    color: '#374151',
    marginLeft: 10,
  },
  callButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  acceptButton: {
    backgroundColor: '#10b981',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  denyButton: {
    backgroundColor: '#ef4444',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
