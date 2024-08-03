import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, Dimensions, TextInput, FlatList, ActivityIndicator } from 'react-native';
import { images } from '../../../constants';
import PatientRecordComponent from './component/patient-record-component';
import Icons from 'react-native-vector-icons/dist/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage } from 'react-native-flash-message';
import {fontRef, heightRef, widthRef} from "../../../constants/screenSize";

const PatientRecord = ({ navigation }) => {
  const [inputText, setInputText] = useState('');
  const [doctorData, setDoctorData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userRecords, setUserRecords] = useState(null);
  const [tokens, setTokens] = useState()

  useEffect(() => {
    const getDoctorData = async () => {
      setLoading(true);
      try {
        const response = await AsyncStorage.getItem('DoctorData');
        if (response !== null) {
          const parsedResponse = JSON.parse(response);
          setDoctorData(parsedResponse?.user);
          setTokens(parsedResponse?.tokens) // Assuming your response contains the necessary doctor data
        }
      } catch (error) {
        console.log('Error retrieving doctor data:', error);
      } finally {
        setLoading(false);
      }
    };

    getDoctorData();
  }, []);

  useEffect(() => {
    if (tokens) {
      console.log('Doctor ID:', tokens?.access_token);
      getUserRecords();
    }
  }, [tokens]);

  const getUserRecords = async () => {
    setLoading(true);
    try {
      if (!doctorData?._id) {
        throw new Error('Doctor data is missing or invalid.');
      }

      const url = `https://api-dev.mhc.doginfo.click/ehr-system?doctorId=${doctorData._id}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokens?.access_token}`,
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
      console.error('Error fetching user records:', error);
      showMessage({
        message: error.message,
        type: 'danger',
      });
    } finally {
      setLoading(false);
    }
  };

  console.log('doctorData ', JSON.stringify(userRecords, null,2))

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('patient-detail', { user: item.user, condition: item.condition })}>
        <View style={styles.inner}>
          <View>
            <Text style={styles.name}>
              {`${item?.user?.firstName || ''} ${item?.user?.lastName || ''}`}
            </Text>
            <Text style={styles.disease}>Condition: {item.condition}</Text>
            <Text style={styles.gender}>Gender: {item.user.gender}</Text>
            <View style={styles.spacer}></View>
            <View style={styles.details}>
              <Text style={{color:'grey', fontSize:12 * fontRef}}>Check Details!</Text>
            </View>
          </View>
          <Image
            source={{ uri: item.user.profileImg }}
            resizeMode="cover"
            style={styles.image}
          />
        </View>
      </TouchableOpacity>
    );
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.appBar}>
        <View style={styles.appBarpatr1}>
          <TouchableOpacity onPress={() => navigation.goBack()} >
            <Icons name={'chevron-back'} size={30 * fontRef} color="black" />

          </TouchableOpacity>
          <Text style={styles.h1}>Patient Record</Text>
        </View>

      </View>

      {/*<View style={styles.searchContainer}>*/}
      {/*  <View style={styles.input}>*/}
      {/*    <Icons name={'locate'} size={25 * fontRef} color={'#DAD9D9'} />*/}

      {/*    <TextInput*/}
      {/*      style={{ marginLeft: 10 * widthRef }}*/}
      {/*      // onChangeText={handleInputChange}*/}
      {/*      value={inputText}*/}
      {/*      placeholder="Search Specialist"*/}
      {/*      placeholderTextColor={'#DAD9D9'}*/}
      {/*    />*/}
      {/*    <View style={{ flexDirection: 'row', width: '45%', justifyContent: 'flex-end', marginTop: 5 * heightRef}}>*/}

      {/*      <Icons name={'mic'} size={25 * fontRef} color={'#DAD9D9'} />*/}
      {/*    </View>*/}
      {/*  </View>*/}
      {/*  <TouchableOpacity style={{*/}
      {/*    elevation: 1, shadowColor: 'black', height: 47 * heightRef, width: 47 * widthRef, alignItems: 'center',*/}
      {/*    borderRadius: 12, shadowRadius: 0, marginBottom: 10 * heightRef*/}
      {/*  }}>*/}
      {/*    <Image*/}
      {/*      source={images.Filter}*/}
      {/*      resizeMode='contain'*/}
      {/*      style={{ height: 45 * heightRef, width: 45 * heightRef, }}*/}
      {/*    />*/}
      {/*  </TouchableOpacity>*/}

      {/*</View>*/}

      <View style={{ padding: 20 * heightRef }}>


        {/* <View style={styles.spacer} /> */}

        <Text style={{ fontWeight: "bold", color:'black', marginBottom: 10 * heightRef, marginTop: 0, fontSize: 17 * fontRef }}>Patient List</Text>



       {loading ? (
        <ActivityIndicator size={'large'} color={'blue'}/>
      ) : (
        <FlatList
          data={userRecords}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom:200}}
          // style={{paddingBottom:200}}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
        />
      )}




      </View>


    </SafeAreaView>
  )
}

export default PatientRecord

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
    height: 50 * heightRef,
    justifyContent: "center",
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: "#1877F2", // blue color when selected
  },
  tabText: {
    color: "black", // lightblue by default
    fontSize: 16 * fontRef,
  },
  activeTabText: {
    color: "#fff", // white color when selected
  },
  spacer: {
    height: 10 * heightRef,
  },
  h1: {
    fontWeight: "bold",
    fontSize: 22 * fontRef,
    color: 'black',
    marginLeft: 10 * widthRef
  },
  appBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10 * heightRef
  },
  appBarpatr1: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  circularBox: {
    width: 50 * widthRef,
    height: 50 * heightRef,
    backgroundColor: 'blue',
    borderRadius: 50,
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: 'white'
  },
  searchContainer: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: Dimensions.get('window').width,
    paddingLeft: 15 * widthRef,
    paddingRight: 15 * widthRef,
  },
  input: {
    height: 50 * heightRef,
    width: '80%',
    borderColor: '#DAD9D9',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    marginBottom: 10  * heightRef,
    paddingHorizontal: 10 * widthRef,
    borderRadius: 10,
  },
  inner: {
    height: 150 * heightRef,
    width: Dimensions.get('window').width - 40,
    backgroundColor: '#F3F3F3',
    borderRadius: 20,
    padding: 20 * heightRef,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    marginBottom: 5,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Shadow for Android
    elevation: 5,
  },
  name: {
    fontSize: 20 * fontRef,
    fontWeight: 'bold',
    color:'grey'
  },
  disease: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 15 * fontRef,
  },
  gender: {
    fontWeight: 'bold',
    color: 'grey',
    fontSize : 15 * fontRef,
  },

  details: {
    backgroundColor: 'white',
    borderRadius: 5,
    height: 20 * heightRef,
    width: 100 * widthRef,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 100 * heightRef,
    width: 100 * heightRef,
  },
});
