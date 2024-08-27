import io from 'socket.io-client';
import Peer from 'simple-peer';
import {ToastAndroid} from 'react-native';
import {
  ScreenCapturePickerView,
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView,
  MediaStream,
  MediaStreamTrack,
  mediaDevices,
  registerGlobals,
} from 'react-native-webrtc';

let socket;

const wrtc = {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView,
  MediaStream,
  MediaStreamTrack,
  mediaDevices,
  registerGlobals,
};

const iceServers = [
  {urls: 'stun:stun.l.google.com:19302'},
  {urls: 'stun:stun1.l.google.com:19302'},
];

export const socketConnection = async (session, dispatch, chatToken) => {
  console.log('socketConnection');

  console.log('Creating socket connection');

  console.log('session', session, 'chatToken:', chatToken);

  const userId = session?.user?._id;
  const role = session?.user?.role;

  socket = io('https://dev-ec2server.doginfo.click', {
    auth: {
      chatToken: chatToken ? chatToken : null,
    },
    query: {
      userId: userId ? userId : null,
      role: role ? role : null,
    },
    reconnection: true,
    reconnectionDelay: 500,
    reconnectionAttempts: Infinity,
  });

  socket.on('connected', () => {
    console.log('Socket Connection Successful');
  });

  socket.on('connect_error', (error) => {
    console.error('Socket.IO connection error:', error);

    if (!error.message.includes('xhr')) {
      ToastAndroid.show(error.message + 'in socket', 3000);
    }
  });

  socket.on('auth_error', (error) => {
    console.log('auth_error', error);

    ToastAndroid.show(error.message, 3000);

    if (error.message.toLowerCase().includes('session has expired')) {
      console.log('apt has ended');
    }
  });

  dispatch({type: 'SET_SOCKET', payload: socket});

  if (role == 'doctor' && socket) {
    window.addEventListener('beforeunload', () => handleBeforeUnload(userId));
  }

  // Listen to socket events

  doctorStatusChange();
  testBookedListen(dispatch);
  followupListen(dispatch);
  recommendedTestListen(dispatch);
  reportUploadListen(dispatch);
  drExpressBookingListen(dispatch);
};

const handleBeforeUnload = (userId) => {
  socket.emit('going_offline', {userId});
};

export const clearSocketConnection = () => {
  if (socket) {
    window.removeEventListener('beforeunload', handleBeforeUnload);
    socket.off('doctor_status_change');
    socket.disconnect();
  }
};

const testBookedListen = (dispatch) => {
  socket.on('test_booked', () => {
    dispatch({type: 'SET_TEST_BOOKED', payload: true});
  });
};

export const bookTestEvent = async () => {
  socket.emit('book_test');
};

export const followupEmit = async () => {
  socket.emit('followup_added');
};

export const recommendedTestEmit = async () => {
  socket.emit('recommended_test_added');
};

const followupListen = async (dispatch) => {
  socket.on('followup_added', () => {
    dispatch({type: 'SET_FOLLOWUP_ADDED', payload: true});
  });
};

const recommendedTestListen = async (dispatch) => {
  socket.on('recommended_test_added', () => {
    dispatch({type: 'SET_RECOMMENDED_TEST_ADDED', payload: true});
  });
};

const drExpressBookingListen = async (dispatch) => {
  socket.on('dr_express_booking', () => {
    dispatch({type: 'SET_DR_EXPRESS_BOOKING', payload: true});
  });
};

export const drExpressBookingEmit = async () => {
  socket.emit('dr_express_booking');
};

export const reportUpdateEmit = async () => {
  socket.emit('test_report_uploaded');
};

const reportUploadListen = async (dispatch) => {
  socket.on('test_report_uploaded', () => {
    dispatch({type: 'SET_REPORT_ADDED', payload: true});
  });
};

const doctorStatusChange = () => {
  socket.on('doctor_status_change', (doctorStatus) => {
    localStorage.setItem('online_doctor', JSON.stringify(doctorStatus));
  });
  socket.on('read_doctor_status', (doctorStatus) => {
    localStorage.setItem('online_doctor', JSON.stringify(doctorStatus));
  });
};

export const joinChatRoom = async (setAptStarted, setAptEnded) => {
  console.log('Join chat room');

  socket.on('appointment_started', (data) => {
    console.log('appointment_started', data);

    if (data?.isAptStarted) {
      setAptStarted(true);
    } else {
      setAptStarted(false);
    }
  });

  socket.on('appointment_ended', () => {
    console.log('appointment_ended');
    setAptStarted(false);
    setAptEnded(true);
  });
};

export const checkAptStatus = async () => {
  socket.emit('is_appointment_started');
};

export const getAptTime = async (setAptTime) => {
  console.log('====== getAptTime');
  socket.on('appointment_time', (data) => {
    console.log('appointment_time', data);
    setAptTime(data);
  });
};

export const getConversationId = async (
  senderId,
  receiverId,
  senderRole,
  setConversationId
) => {
  console.log('getConversationId', senderId, receiverId);

  if (senderId && receiverId) {
    socket.emit('get_conversation_id', {
      senderId,
      receiverId,
      senderRole,
    });
  }

  socket.on('conversation_id', ({conversationId}) => {
    console.log('conversationId', conversationId);
    setConversationId(conversationId);
  });
};

export const getRoomId = async (setRoomId) => {
  console.log('getRoomId');

  socket.emit('get_room_id');

  socket.on('room_id', (data) => {
    console.log('roomId', data.roomId);

    setRoomId(data.roomId);
  });
};

export const handleUserDisconnected = async (setIsUserDC) => {
  console.log('handleUserDisconnected');

  socket.on('user_diconnected', (data) => {
    console.log('user_diconnected');

    setIsUserDC(true);
  });
};

export const startAppointment = () => {
  console.log('Starting appointment');

  socket.emit('start_appointment');
};

export const endAppointment = async () => {
  console.log('Ending appointment');

  socket.emit('appointment_ended');
};

export const requestCall = async (
  patientId,
  roomId,
  name,
  userProfileImg,
  stream,
  setUserStream,
  setCallAccepted,
  connectionRef,
  setCallerImg,
  setCallerName,
  setIsUserVideoStreaming,
  setCallRequested,
  isMyAudioOn
) => {
  console.log('joinAppointment');

  const peer = new Peer({
    initiator: true,
    wrtc: wrtc,
    iceTransportPolicy: 'relay',
    trickle: false,
    config: {iceServers: iceServers},
    stream: stream,
  });

  peer.on('signal', (data) => {
    socket.emit('request_call', {
      signalData: data,
      name: name,
      userProfileImg,
      patientId,
      roomId,
    });
  });

  peer.on('stream', (mediaStream) => {
    setUserStream(mediaStream);
  });

  socket.off('request_accepted').on('request_accepted', (data) => {
    setIsUserVideoStreaming(data.isUserVideoStreaming);
    setCallerImg(data.userProfileImg);
    setCallerName(data.name);
    setCallAccepted(true);
    setCallRequested(false);

    peer.signal(data.signal);

    socket.emit('toggle_audio', {isAudioOn: isMyAudioOn});
  });

  connectionRef.current = peer;
};

export const getUserRquests = async (
  setPendingRequests,
  roomId,
  setReceivingCall
) => {
  console.log('GetUserRquest');

  socket.emit('user_requests', {roomId});

  socket.on('user_requests', (data = {}) => {
    console.log('user_request received', data);

    if (Object.keys(data).length > 0) {
      setPendingRequests(data);
      setReceivingCall(true);
    }
  });
};

export const reconnectSream = async (
  setUserStream,
  connectionRef,
  myStream
) => {
  console.log('reconnectSream');

  socket.on('reconnect_stream', (data) => {
    const peer = new Peer({
      initiator: true,
      wrtc: wrtc,
      iceTransportPolicy: 'relay',
      trickle: false,
      config: {iceServers: iceServers},
      stream: myStream,
    });

    peer.signal(data.signal);
    peer.on('stream', (mediaStream) => {
      setUserStream(mediaStream);
    });

    connectionRef.current = peer;
  });
};

export const incomingCallRequest = async (
  setCallerSignal,
  setCallerImg,
  setReceivingCall,
  setCallerName,
  setPendingRequests
) => {
  socket.on('request_call', (data) => {
    console.log('acceptCallRequest');
    setCallerImg(data.userProfileImg);
    setCallerSignal(data.signal);
    setCallerName(data.name);
    setReceivingCall(true);

    setPendingRequests({
      signal: data.signal,
      name: data.name,
      userProfileImg: data.userProfileImg,
      patientId: data.patientId,
      roomId: data.roomId,
    });
  });
};

export const acceptRequest = async (
  patientId, // Pass userId as a parameter
  roomId,
  stream,
  myName,
  userProfileImg,
  setUserStream,
  callerSignal,
  connectionRef,
  isMyVideStreaming,
  isMyAudioOn
) => {
  console.log('acceptUserRequest');

  const peer = new Peer({
    initiator: false,
    wrtc: wrtc,
    iceTransportPolicy: 'relay',
    trickle: false,
    config: {iceServers: iceServers},
    stream: stream,
  });

  peer.on('signal', (data) => {
    socket.emit('accept_request', {
      signal: data,
      myName,
      userProfileImg,
      isMyVideStreaming,
      patientId, // Pass userId with the acceptance
      roomId, // Replace with the actual room ID
    });

    socket.emit('toggle_audio', {isAudioOn: isMyAudioOn});
  });

  peer.on('stream', (mediaStream) => {
    // userVideo.current.srcObject = mediaStream;
    setUserStream(mediaStream);
  });

  peer.signal(callerSignal);
  connectionRef.current = peer;
};

export const denyRequest = async (connectionRef) => {
  console.log('denyRequest');

  socket.emit('deny_request');

  connectionRef.current = null;
};

export const requestDenied = async (
  setCallerSignal,
  setCallRequested,
  setMessage
) => {
  socket.on('request_rejected', () => {
    console.log('requestDenied');

    setMessage('Request Denied');
    setCallerSignal(null);
    setCallRequested(false);
  });
};

export const handleToggleAudio = async (isMyAudioOn) => {
  console.log('handleToggleAudio');

  socket.emit('toggle_audio', {isAudioOn: isMyAudioOn});
};

export const handleUserToggleAudio = async (setIsUserAudioOn) => {
  console.log('handleUserToggleAudio');

  socket.on('toggle_audio', (data) => {
    console.log('toggle_audio');

    setIsUserAudioOn(data.isAudioOn);
  });
};

// export const endCall = async () => {
//   socket.emit("end_call");
// };

export const callEnded = async (setAptEnded, setCallAccepted) => {
  socket.on('call_ended', async () => {
    setCallAccepted(false);
    setAptEnded(true);

    await stopStream();
  });
};

export const toggleUserVideoStream = async (isEnabled) => {
  socket.emit('toggle_user_video_stream', {isEnabled});
};

export const isUserVideoStreamingEvent = async (setIsUserVideoStreaming) => {
  socket.on('toggle_user_video_stream', (data) => {
    setIsUserVideoStreaming(data.isEnabled);
  });
};

export const sendMessage = async (messageData) => {
  socket.emit('send_message', messageData);
};

export const messageReceived = async (setChatHistory, setMsgReceived) => {
  socket.off('receive_file');

  socket.on('message_received', (data) => {
    console.log('messageReceived');

    setChatHistory((prev) => [...prev, {...data}]);
    setMsgReceived(true);
  });
};

export const sendFile = async (fileData) => {
  socket.emit('send_file', fileData);
};

export const fileReceived = async (setChatHistory, setMsgReceived) => {
  socket.off('receive_file');

  socket.on('receive_file', (data) => {
    console.log('fileReceived');
    setChatHistory((prev) => [...prev, {...data}]);
    setMsgReceived(true);
  });
};

export const handleSession = async (setIsSessioninvalid, setMessage) => {
  socket.on('session_expired', async () => {
    setMessage('Session Has Expired');
    setIsSessioninvalid(true);
  });
  socket.on('apt_pending', async () => {
    setMessage('Session Has Not Started');
    setIsSessioninvalid(true);
  });
};
