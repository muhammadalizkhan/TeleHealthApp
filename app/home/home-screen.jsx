import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, FlatList, TouchableOpacity, ActivityIndicator, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';

import { NavigationContainer } from '@react-navigation/native';
import { images } from '../../constants';
import DrawerNavigator from '../drawer/DrawerNavigator';

// Define DrawerContent component
const DrawerContent = ({ navigation }) => {
    const closeDrawer = () => {
      navigation.closeDrawer();
    };
  
    return (
      <View style={styles.drawerContent}>
        <TouchableOpacity onPress={closeDrawer}>
          <Text>Close Drawer</Text>
        </TouchableOpacity>
        {/* Add additional content here */}
      </View>
    );
  };


const HomeScreen = ({ navigation }) => {
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

              
                <View style={styles.searchContainer}>
                <View style={styles.circularBox}>
                        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
                            <View style={{ height: 5, width: 16, backgroundColor: "white", borderRadius: 10 }} />
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "flex-start", marginTop: 10 }}>
                            <View style={{ height: 5, width: 16, backgroundColor: "white", borderRadius: 10 }} />
                        </View>
                    </View>
                    <TextInput
                        style={styles.input}
                        onChangeText={handleInputChange}
                        value={inputText}
                        placeholder="Search Specialist"
                    />
                 
                </View>

                <View style={styles.heading}>
                    <Text style={styles.text2}>Get Appointments</Text>
                </View>

                <View style={styles.des}>
    <FlatList
        horizontal
        data={doctors}
        renderItem={({ item }) => (
            <View style={styles.appointmentItem}>
                {/* Render image with absolute positioning */}
                <Image
    source={images.doctorCard}
    style={[styles.image, styles.absoluteImage, { resizeMode: 'cover', marginTop: 5 }]}
/>


                {/* Other content */}
                <Text style={styles.t1}>{item.firstName}{item.lastName}</Text>
                <Text style={styles.t2}>Radiologist</Text>
                <Text style={styles.t3}>500+ points</Text>
                <View style={styles.contain1}>
                    <FontAwesome name="plus" size={12} color="white" />
                    <Text style={styles.t5}> Appointment</Text>
                </View>
            </View>
        )}
        keyExtractor={(item, index) => index.toString()}
    />
</View>


                <View style={styles.heading1}>
                    <Text style={styles.text2}>Top Specialist</Text>
                </View>

                <View style={styles.des1}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <View style={styles.subSpecializationContainer}>
                            {appointments.map(item => 
                                item.subspecialization.map(subSpecializationItem => (
                                    <TouchableOpacity
                                        key={subSpecializationItem._id}
                                        onPress={() => setSelectedItem(subSpecializationItem.name)}
                                        style={[
                                            styles.contain,
                                            selectedItem === subSpecializationItem.name && { borderColor: 'blue' },
                                        ]}
                                    >
                                        <Text style={{ color: selectedItem === subSpecializationItem.name ? 'blue' : 'grey' }}>
                                            {subSpecializationItem.name}
                                        </Text>
                                    </TouchableOpacity>
                                ))
                            )}
                        </View>
                    </ScrollView>
                </View>

                <FlatList
                    data={doctors}
                    renderItem={({ item }) => (
                        <View style={styles.appointmentItem1}>
                            <View style={styles.image1}>
                                <Image source={{ uri: item.profileImg }} style={{ width: 110, height: 110, borderRadius: 10 }} />
                            </View>
                            <View style={styles.contain2}>
                                <Text style={styles.h1}>{item.firstName} {item.lastName}</Text>
                                <Text style={styles.h2}>Dermatologist</Text>
                                <Text style={styles.h2}>Mon-Fri | 9:00 Am to 5:00 Pm</Text>
                                <TouchableOpacity 
                                    style={styles.buttonContainer}  
                                    onPress={() => {
                                        navigation.navigate('doctor-profile', {
                                            name: item.firstName + ' ' + item.lastName,
                                            description: item.about,
                                            doctor: item,
                                            doctorImage: item.profileImg
                                        });
                                    }}
                                >
                                    <Text style={styles.buttonText}>Consult</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;

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
