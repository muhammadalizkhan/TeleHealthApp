import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, FlatList, TouchableOpacity, ActivityIndicator, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons'; 

import { images } from '../../constants';




const DemoScreen = ({ navigation }) => {
    const [inputText, setInputText] = useState('');
    const [appointments, setAppointments] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };


    const handleInputChange = (text) => {
        setInputText(text);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://api-dev.mhc.doginfo.click/get-all-specializations');
                const data = await response.json();
                const response2 = await fetch('https://api-dev.mhc.doginfo.click/get-all-doctors');
                const data2 = await response2.json();
                setAppointments(data); 
                setDoctors(data2); 
                setLoading(false); 
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        
        <SafeAreaView>
            <View style={styles.container}>

              
            <TouchableOpacity  onPress={()=>navigation.navigate("patient-record")}>
          <Text style={{fontSize:30, fontWeight:"bold", margin:20}}>Patient Record</Text>
          </TouchableOpacity>

          <TouchableOpacity  onPress={()=>navigation.navigate("patient-detail")}>
          <Text style={{fontSize:30, fontWeight:"bold", margin:20}}>Patient Detail</Text>
          </TouchableOpacity>


          <TouchableOpacity  onPress={()=>navigation.navigate("doctor-schedule")}>
          <Text style={{fontSize:30, fontWeight:"bold", margin:20}}>Doctor-schedule</Text>
          </TouchableOpacity>

          
          <TouchableOpacity  onPress={()=>navigation.navigate("video-call")}>
          <Text style={{fontSize:30, fontWeight:"bold", margin:20}}>Video Call</Text>
          </TouchableOpacity>

          </View>


        </SafeAreaView>
    );
};

export default DemoScreen;

const styles = StyleSheet.create({
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        backgroundColor: '#007bff',
        borderRadius: 7,
        marginLeft: 13,
        marginRight: 13,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 5,
        paddingBottom: 5,
        marginTop: 10,
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    h1: {
        fontSize: 21,
        fontWeight: "bold",
    },
    h2: {
        color: "grey",
        fontSize: 13,
    },
    t1: {
        color: "white",
        fontSize: 19,
        fontWeight: "bold",
    },
    t5: {
        fontSize: 12,
        color: "white",
        marginLeft: 5,
    },
    t2: {
        color: "white",
        fontSize: 15,
    },
    t3: {
        color: "white",
        fontSize: 10,
    },
    contain1: {
        marginTop: 10,
        flexDirection: "row",
        height: 26,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "white",
        borderRadius: 20,
        width: 120,
    },
    contain: {
        height: 30,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "grey",
        borderRadius: 10,
        marginTop: 7,
        margin: 2,
        paddingLeft: 12,
        paddingRight: 12,
    },
    des1: {
        marginLeft: 15,
        width: Dimensions.get('window').width,
    },
    des: {
        height: 150,
    },
    text2: {
        marginLeft: 15,
        fontSize: 17,
        fontWeight: 'bold',
        marginTop: 15,
    },
    heading: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: Dimensions.get('window').width,
        // marginBottom:30s
    },
    heading1: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: Dimensions.get('window').width,
        // marginBottom:30
    },
    container: {
        alignItems: 'center',
        height: Dimensions.get('window').height,
        // flex:1
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: Dimensions.get('window').width,
        paddingLeft: 15,
        paddingRight: 15,
    },
    input: {
        marginTop: 20,
        height: 40,
        width: '80%',
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 8,
    },
    circularBox: {
        width: 40,
        height: 40,
        backgroundColor: '#1877F2',
        borderRadius: 10,
        marginLeft: 10,
        padding: 10,
        marginTop: 10,
    },
    appointmentItem: {
        position: 'relative', // Required for absolute positioning
        padding: 12,
        backgroundColor: '#1877F2',
        margin: 10,
        marginLeft: 15,
        marginBottom: 10,
        borderRadius: 20,
        width: Dimensions.get('window').width - 60,
        height: 120,
        overflow: 'visible', // Allows content to overflow
        marginTop:20
    },
    image: {
        width: 100,
        height: 140,
        borderWidth: 1,
        // borderColor: 'grey',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5,
    },
    absoluteImage: {
        position: 'absolute',
        top: -25, // Adjust as needed to position the image partially outside
        // left: 200, // Adjust as needed to position the image partially outside
        right:10
    },
    image1: {
        width: 110,
        height: 110,
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5,
    },
    contain2: {
        flex: 2,
        marginLeft: 15,
    },
    appointmentItem1: {
        borderWidth: 1,
        borderColor: '#A9A9A9',
        margin: 7,
        marginLeft: 10,
        marginBottom: 5,
        borderRadius: 14,
        width: Dimensions.get('window').width - 22,
        height: 120,
        flexDirection: "row",
        alignItems: 'center',
    },
    subSpecializationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});
