import { StyleSheet, Text, View, Dimensions, SafeAreaView ,Image} from 'react-native';
import React from 'react';
import { images } from '../../constants';
import { TouchableOpacity } from 'react-native-gesture-handler';

const CustomDrawer = ({navigation}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        <View style={{height:70}}></View>

        <View style={styles.profileContainer}>
          <View style={styles.profile}>
            <Image
              source={images.Patient}
              resizeMode="contain"
              style={styles.profileImage}
            />
          </View>
          <Text style={styles.profileName}>John Wick</Text>
        </View>

        <View style={{height:20}}></View>

        <View style={styles.r1}>
        <Image
              source={images.Account}
              resizeMode="contain"
              style={{height:30, width:30}}
            />
          <Text style={styles.menuItem}>  My Profile</Text>
        </View>

        <View style={styles.r1}>

        <Image
              source={images.Notification}
              resizeMode="contain"
              style={{height:25, width:25}}
            />
          <Text style={styles.menuItem}>  Notification</Text>
        </View>

        <TouchableOpacity onPress={()=>navigation.navigate("schedule-index")}>
          <View style={styles.r1}>
          <Image
              source={images.Notification}
              resizeMode="contain"
              style={{height:25, width:25}}
            />
            <Text style={styles.menuItem}> My Schedule</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>navigation.navigate("medical-record")}>
          <View style={styles.r1}>
          <Image
              source={images.Treatment}
              resizeMode="contain"
              style={{height:25, width:25}}
            />
            <Text style={styles.menuItem}> Medical Record</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.r1}>
        <Image
              source={images.Result}
              resizeMode="contain"
              style={{height:25, width:25}}
            />
          <Text style={styles.menuItem}> Diagnostic Center</Text>
        </View>

        <View style={styles.r1}>
        <Image
              source={images.open}
              resizeMode="contain"
              style={{height:25, width:25}}
            />
          <Text style={styles.menuItem}> Logout</Text>
        </View>

        <View  style={{height:20}}></View>

        <Image
              source={images.Heart}
              resizeMode="contain"
              style={{height:120, width:120}}
            />
       
      </View>
    </SafeAreaView>
  );
};

export default CustomDrawer;

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
    alignItems:"center",
    width: 220,
    margin: 13,
  },
  menuItem: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
