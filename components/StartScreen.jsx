import React, { useEffect, useRef } from "react";
import { View, Text, Image, TouchableOpacity, Video, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { FaMicrophone, FaVideo } from "react-native-vector-icons/FontAwesome";
import { ImSpinner9 } from "react-native-vector-icons/Ionicons";
import { RiSecurePaymentLine } from "react-native-vector-icons/MaterialCommunityIcons";

import waitingRoom from "../../assets/consult/waiting-room1.png";
import drStartApt from "../../assets/consult/doctor-start-apt.png";
import logo from "../../assets/logos/logo.png";
import AudioStream from "./AudioStream";
import { startAppointment } from "@/app/components/services/socket/socket";

const StartScreen = ({
  callAccepted,
  role,
  aptStarted,
  aptEnded,
  callRequested,
  handleRequestCall,
  handleEndApt,
  userProfileImg,
  myStream,
  myName,
  toggleVideo,
  toggleAudio,
  videoStream,
  audioStream,
  isLoading,
  conversationId,
  isMyAudioOn,
}) => {
  const myVideoRef = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    if (myVideoRef.current) {
      myVideoRef.current.srcObject = myStream;
    }
  }, [myStream]);

  if (callAccepted || aptEnded) return null;

  return (
    <View style={styles.container}>
      {/* Navbar */}
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")} target="_blank">
          <Image source={logo} style={styles.logo} />
        </TouchableOpacity>

        <View style={styles.profileContainer}>
          <Text>{myName}</Text>

          {userProfileImg ? (
            <Image source={{ uri: userProfileImg }} style={styles.profileImg} />
          ) : (
            <View style={styles.defaultProfileImg}>
              <Text style={styles.defaultProfileText}>{myName[0]}</Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.mainContainer}>
        {/* Video section */}
        <View style={styles.videoContainer}>
          {myStream && (
            <View style={styles.videoWrapper}>
              <Video
                ref={myVideoRef}
                autoPlay
                muted
                style={styles.video}
              />

              {!myStream?.getVideoTracks()[0].enabled && (
                <View style={styles.overlay}>
                  {userProfileImg ? (
                    <Image source={{ uri: userProfileImg }} style={styles.overlayImg} />
                  ) : (
                    <View style={styles.overlayDefaultProfileImg}>
                      <Text style={styles.overlayDefaultProfileText}>{myName[0]}</Text>
                    </View>
                  )}
                </View>
              )}

              {/* Video controls */}
              <View style={styles.controls}>
                <TouchableOpacity
                  onPress={toggleAudio}
                  style={[
                    styles.controlButton,
                    !audioStream
                      ? styles.controlButtonOff
                      : styles.controlButtonOn,
                  ]}
                >
                  <FaMicrophone name="microphone" size={20} color="white" />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={toggleVideo}
                  style={[
                    styles.controlButton,
                    !videoStream
                      ? styles.controlButtonOff
                      : styles.controlButtonOn,
                  ]}
                >
                  <FaVideo name="video-camera" size={20} color="white" />
                </TouchableOpacity>
              </View>

              {/* My audio stream animation */}
              <AudioStream isAudioOn={isMyAudioOn} stream={myStream} />
            </View>
          )}
        </View>

        {/* Start appointment section */}
        <View style={styles.appointmentContainer}>
          {role === "user" && (
            <View style={styles.userAppointment}>
              <Image source={waitingRoom} style={styles.waitingRoomImage} />

              {!conversationId ? (
                <Text style={styles.statusText}>Please wait</Text>
              ) : !aptStarted ? (
                <Text style={styles.statusText}>Appointment not started by the Doctor</Text>
              ) : !callRequested ? (
                <Text style={styles.statusText}>Appointment Started. Please join, doctor is waiting</Text>
              ) : (
                <Text style={styles.statusText}>Please wait, your request will be accepted soon.</Text>
              )}

              <TouchableOpacity
                onPress={handleRequestCall}
                style={[
                  styles.joinButton,
                  (!aptStarted || isLoading || callRequested || !conversationId) &&
                  styles.disabledButton,
                ]}
                disabled={!aptStarted || isLoading || callRequested || !conversationId}
              >
                {isLoading || !conversationId ? (
                  <ImSpinner9 name="spinner" size={20} style={styles.spinner} />
                ) : aptStarted && !callRequested ? (
                  <Text>Join Appointment</Text>
                ) : (
                  <View style={styles.waitingText}>
                    <Text>Please wait</Text>
                    <ImSpinner9 name="spinner" size={20} style={styles.spinner} />
                  </View>
                )}
              </TouchableOpacity>
            </View>
          )}

          {role === "doctor" && (
            <View style={styles.doctorAppointment}>
              <Image source={drStartApt} style={styles.doctorImage} />

              <View style={styles.doctorStatusContainer}>
                {!conversationId ? (
                  <Text style={styles.statusText}>Please wait</Text>
                ) : !aptStarted ? (
                  <Text style={styles.statusText}>Ready to Start?</Text>
                ) : (
                  <View style={styles.statusText}>
                    <Text>Appointment Started</Text>
                    <Text>Waiting for patient to join</Text>
                  </View>
                )}
                {aptStarted && (
                  <View style={styles.loadingContainer}>
                    <ImSpinner9 name="spinner" size={24} style={styles.spinner} />
                    <Text style={styles.loadingText}>Please wait</Text>
                  </View>
                )}
              </View>

              <TouchableOpacity
                onPress={aptStarted ? handleEndApt : startAppointment}
                style={[
                  styles.joinButton,
                  isLoading || !conversationId ? styles.disabledButton : null,
                ]}
                disabled={isLoading || !conversationId}
              >
                {isLoading || !conversationId ? (
                  <ImSpinner9 name="spinner" size={24} style={styles.spinner} />
                ) : aptStarted ? (
                  <Text>End Appointment</Text>
                ) : (
                  <Text>Start Appointment</Text>
                )}
              </TouchableOpacity>
            </View>
          )}

          {/* Message */}
          <View style={styles.encryptionMessage}>
            <RiSecurePaymentLine name="secure-payment" size={30} color="blue" />
            <Text style={styles.encryptionText}>This call is end-to-end encrypted</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  navbar: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#f8f8f8",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  logo: {
    width: 50,
    height: 50,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  profileImg: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  defaultProfileImg: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#4CAF50",
    alignItems: "center",
    justifyContent: "center",
  },
  defaultProfileText: {
    color: "#fff",
    fontWeight: "bold",
  },
  mainContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  videoContainer: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  videoWrapper: {
    width: "70%",
    backgroundColor: "#1c1c1e",
    borderRadius: 16,
    overflow: "hidden",
    position: "relative",
  },
  video: {
    width: "100%",
    borderRadius: 16,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#2c2c2e",
    justifyContent: "center",
    alignItems: "center",
  },
  overlayImg: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  overlayDefaultProfileImg: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#4CAF50",
    alignItems: "center",
    justifyContent: "center",
  },
  overlayDefaultProfileText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 24,
  },
  controls: {
    position: "absolute",
    bottom: 10,
    left: 10,
    flexDirection: "row",
    gap: 10,
  },
  controlButton: {
    padding: 10,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  controlButtonOn: {
    backgroundColor: "#4CAF50",
  },
  controlButtonOff: {
    backgroundColor: "#f44336",
  },
  appointmentContainer: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  userAppointment: {
    alignItems: "center",
    gap: 10,
  },
  doctorAppointment: {
    alignItems: "center",
    gap: 10,
  },
  waitingRoomImage: {
    width: 150,
    height: 150,
  },
  doctorImage: {
    width: 150,
    height: 150,
  },
  doctorStatusContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  statusText: {
    textAlign: "center",
    marginBottom: 10,
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  loadingText: {
    fontSize: 16,
  },
  spinner: {
    animation: "spin 1s linear infinite",
  },
  joinButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#9e9e9e",
  },
  waitingText: {
    flexDirection: "row",
    gap: 10,
  },
  encryptionMessage: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 20,
  },
  encryptionText: {
    color: "#4CAF50",
    fontSize: 16,
  },
});

export default StartScreen;
