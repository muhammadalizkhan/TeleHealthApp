import { StyleSheet, Text, View, Dimensions, SafeAreaView ,Image} from 'react-native';
import React, { useContext } from 'react';
import { images } from '../../constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AuthContext } from '../../context/Authcontext';
import {fontRef, heightRef, widthRef} from "../../constants/screenSize";

const CustomDrawer = ({navigation}) => {
  const { logout, loggedIn, userData } = useContext(AuthContext);
  console.log('user data ==> ',userData)
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        <View style={{height:20 * heightRef}}></View>

        <View style={styles.profileContainer}>
          <View style={styles.profile}>
            <Image
           source={{ uri: userData?.user?.profileImg }}
              resizeMode="cover"
              style={styles.profileImage}
            />
          </View>
          <Text style={styles.profileName}>{userData?.user?.firstName} {userData?.user?.lastName}</Text>
        </View>

        <View style={{height:20 * heightRef}}></View>


        <TouchableOpacity onPress={()=>navigation.navigate("UpdateScreen")}>
        <View style={styles.r1}>
        <Image
              source={images.Account}
              resizeMode="contain"
              style={{height:30 * heightRef, width:30 * heightRef}}
            />
          <Text style={styles.menuItem}>  My Profile</Text>
        </View>
        </TouchableOpacity>

        {/*<TouchableOpacity onPress={()=>navigation.navigate("notifications")}>*/}
        {/*<View style={styles.r1}>*/}

        {/*<Image*/}
        {/*      source={images.Notification}*/}
        {/*      resizeMode="contain"*/}
        {/*      style={{height:25, width:25, marginRight:6}}*/}
        {/*    />*/}
        {/*  <Text style={styles.menuItem}>  Notification</Text>*/}
        {/*</View>*/}
        {/*</TouchableOpacity>*/}



        <TouchableOpacity onPress={()=>navigation.navigate("medical-record")}>
          <View style={styles.r1}>
          <Image
              source={images.Treatment}
              resizeMode="contain"
              style={{height:30 * heightRef, width:30 * heightRef, marginRight:6 * widthRef}}
            />
            <Text style={styles.menuItem}> Medical Record</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>navigation.navigate("DiagnosticCenterScreen")}>


        <View style={styles.r1}>
        <Image
              source={images.Result}
              resizeMode="contain"
              style={{height:30 * heightRef, width:30 * heightRef, marginRight:8 * widthRef}}
            />
          <Text style={styles.menuItem}> Diagnostic Center</Text>
        </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>navigation.navigate("schedule-index")}>
          <View style={styles.r1}>
          <Image
              source={images.Calenderg}
              resizeMode="contain"
              style={{height:22 * heightRef, width:22 * heightRef, marginRight:15 * widthRef, marginLeft:6 * widthRef}}
            />
            <Text style={styles.menuItem}>Calender</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate("UserResults")}>
          <View style={styles.r1}>
            <Image
                source={images.Detail}
                resizeMode="contain"
                style={{height:22 * heightRef, width:22 * heightRef, marginRight:15 * widthRef, marginLeft:6 * widthRef}}
            />
            <Text style={styles.menuItem}>Test Records</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => logout()}>
        <View style={styles.r1}>
        <Image
              source={images.open}
              resizeMode="contain"
              style={{height:34 * heightRef, width:34 * heightRef, marginRight:8 * widthRef}}
            />
          <Text style={styles.menuItem}> Logout</Text>
        </View>
        </TouchableOpacity>

        <View  style={{height:20 * heightRef}}></View>

        <Image
              source={images.Heart}
              resizeMode="contain"
              style={{height:150 * heightRef, width:190 * heightRef,position:'absolute', bottom:30 * widthRef, right:0}}
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
    padding: 20 * heightRef,
    alignItems: 'center',
  },
  profileContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  profile: {
    height: 170 * heightRef,
    width: 170 * heightRef,
    backgroundColor: 'white',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    height: 150 * heightRef,
    width: 150 * heightRef,
    borderRadius: 100,
  },
  profileName: {
    color: 'white',
    fontSize: 25 * fontRef,
    fontWeight: 'bold',
    marginTop: 20,
  },
  r1: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems:"center",
    width: 180 * widthRef,
    margin: 13 * heightRef,
  },
  menuItem: {
    color: 'white',
    fontSize: 16 * fontRef,
    fontWeight: 'bold',
  },
});
