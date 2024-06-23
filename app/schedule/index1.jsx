import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { images } from "../../constants";
import CompleteSchedule from '../../components/completed-schedule';
import CancelledSchedule from '../../components/cancelled-schedule';
import UpcomingSchedule from '../../components/upcoming-schedule';
const Index = () => {
  const [activeTab, setActiveTab] = useState('Upcoming');

  const handleTabPress = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <View>
      <SafeAreaView style={styles.container}>
        <View style={styles.appBar}>
          <View style={styles.appBarpatr1}>
            <Text style={styles.h1}>My Schedule</Text>
          </View>
          <View style={styles.circularBox}>
            <Image
              source={images.profilePic}
              resizeMode="contain"
              style={{ height: 50, width: 50 }}
            />
          </View>
        </View>
        <View style={styles.spacer} />
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
          <TouchableOpacity
            style={[styles.tab, activeTab === 'Cancelled' && styles.activeTab]}
            onPress={() => handleTabPress('Cancelled')}
          >
            <Text style={[styles.tabText, activeTab === 'Cancelled' && styles.activeTabText]}>Cancelled</Text>
          </TouchableOpacity>
        </View>
        {/* Conditionally render schedule components */}
        {activeTab === 'Upcoming' && <UpcomingSchedule />}
        {activeTab === 'Completed' && <CompleteSchedule />}
        {activeTab === 'Cancelled' && <CancelledSchedule />}
      </SafeAreaView>
    </View>
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
    backgroundColor: 'blue',
    borderRadius: 50,
  },
  container: {
    marginTop: 14,
    padding: 20,
    justifyContent: "flex-start",
  },
});
