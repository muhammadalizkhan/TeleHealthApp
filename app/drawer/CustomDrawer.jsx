import { StyleSheet, Text, View, Dimensions, SafeAreaView ,Image} from 'react-native';
import React, { useContext } from 'react';
import { images } from '../../constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AuthContext } from '../../context/Authcontext';

const CustomDrawer = ({navigation}) => {
  const { logout, loggedIn, userData } = useContext(AuthContext);
  console.log('user data ==> ',userData)
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        <View style={{height:20}}></View>

        <View style={styles.profileContainer}>
          <View style={styles.profile}>
            <Image
           source={{ uri: userData?.picture }}
              resizeMode="cover"
              style={styles.profileImage}
            />
          </View>
          <Text style={styles.profileName}>{userData?.name}</Text>
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
              style={{height:25, width:25, marginRight:6}}
            />
          <Text style={styles.menuItem}>  Notification</Text>
        </View>

       

        <TouchableOpacity onPress={()=>navigation.navigate("medical-record")}>
          <View style={styles.r1}>
          <Image
              source={images.Treatment}
              resizeMode="contain"
              style={{height:30, width:30, marginRight:6}}
            />
            <Text style={styles.menuItem}> Medical Record</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.r1}>
        <Image
              source={images.Result}
              resizeMode="contain"
              style={{height:30, width:30, marginRight:8}}
            />
          <Text style={styles.menuItem}> Diagnostic Center</Text>
        </View>
        <TouchableOpacity onPress={()=>navigation.navigate("schedule-index")}>
          <View style={styles.r1}>
          <Image
              source={images.Calenderg}
              resizeMode="contain"
              style={{height:22, width:22, marginRight:20, marginLeft:6}}
            />
            <Text style={styles.menuItem}>Calender</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.r1}>
        <Image
              source={images.open}
              resizeMode="contain"
              style={{height:34, width:34, marginRight:16}}
            />
          <Text style={styles.menuItem}> Logout</Text>
        </View>

        <View  style={{height:20}}></View>

        <Image
              source={images.Heart}
              resizeMode="contain"
              style={{height:150, width:190,position:'absolute', bottom:30, right:0}}
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
    height: 170,
    width: 170,
    backgroundColor: 'white',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    height: 150,
    width: 150,
    borderRadius: 100,
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
    width: 180,
    margin: 13,
  },
  menuItem: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
