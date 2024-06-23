import { StyleSheet, Text, View, Dimensions, SafeAreaView ,Image} from 'react-native';
import React from 'react';
import { images } from '../../constants';
import { TouchableOpacity } from 'react-native-gesture-handler';

const DoctorCustomDrawer = ({navigation}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        <View style={{height:70}}></View>

        <View style={styles.profileContainer}>
          <View style={styles.profile}>
            <Image
              source={images.doctorPic}
              resizeMode="fill"
              style={styles.profileImage}
            />
          </View>
          <Text style={styles.profileName}>Dr John Wick</Text>
        </View>

        <View style={{height:50}}></View>

        <TouchableOpacity  onPress={()=>navigation.navigate("patient-record")}>

        <View style={styles.r1}>
        <Image
              source={images.Plus}
              resizeMode="contain"
              style={{height:25, width:25}}
            />
          <Text style={styles.menuItem}>Patient Record</Text>
        </View>

        </TouchableOpacity>


        <TouchableOpacity  onPress={()=>navigation.navigate("patient-detail")}>
       
        <View style={styles.r1}>
        <Image
              source={images.Detail}
              resizeMode="contain"
              style={{height:25, width:25}}
            />

          <Text style={styles.menuItem}> Patient Detail</Text>
        </View>
        </TouchableOpacity>


        <TouchableOpacity onPress={()=>navigation.navigate("doctor-schedule")}>
          <View style={styles.r1}>
          <Image
              source={images.DSchedule}
              resizeMode="contain"
              style={{height:25, width:25}}
            />
            <Text style={styles.menuItem}> Doctor Schedule</Text>
          </View>
        </TouchableOpacity>


        <View style={{height:50}}></View>

        <Image
              source={images.Heart}
              resizeMode="contain"
              style={{height:120, width:120}}
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
    height: 100,
    width: 100,
    backgroundColor: 'white',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    height: 100,
    width: 100,
    borderRadius: 50,
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
    width: 220,
    margin: 15,
  },
  menuItem: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
