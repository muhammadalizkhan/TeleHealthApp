import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, FlatList, TouchableOpacity, ActivityIndicator, Image, ImageBackground, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// import { FontAwesome } from '@expo/vector-icons'; 

import { images } from '../../constants';
import Icons from 'react-native-vector-icons/dist/Entypo';
import Iconss from 'react-native-vector-icons/dist/Ionicons';
import { AuthContext } from '../../context/Authcontext';
import { StackActions } from '@react-navigation/native';
import { getAllDoctors, getDoctorBySpecialityIds, getSpecialist } from '../../constants/APi';



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
    const [selectedItem, setSelectedItem] = useState({ _id: "all", name: "All" });
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const { logout, loggedIn, userData } = useContext(AuthContext);
    // console.log('user data ==> ',userData)
    useEffect(() => {
        if (loggedIn === false) {
            navigation.dispatch(StackActions.replace('Home'));
        }
    }, [loggedIn]);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const getDoctorsBySid = (selectedSpecialityId) => {
        if (selectedSpecialityId === "all") {
            setFilteredDoctors(doctors);
        } else {
            const filtered = doctors.filter(doctor =>
                doctor.speciality.some(spec => spec.specialization._id === selectedSpecialityId)
            );
            setFilteredDoctors(filtered);
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
        
                // Fetch data from API
                const doctorsData = await getAllDoctors();
                // console.log('all doctors ==> ', JSON.stringify(doctorsData, null, 2))
                // Update state with fetched data
                setDoctors(doctorsData);
                setFilteredDoctors(doctorsData); 
                setLoading(false); // Set loading to false after successful fetch
            } catch (error) {
                console.error('Error fetching doctors:', error);
                setLoading(false); // Set loading to false in case of error
            }
        };

        fetchData(); // Call fetchData function when component mounts

    }, []); 
    
    useEffect(() => {
        const fetchSData = async () => {
            try {
                const response = await getSpecialist()
                const data = await response;
                // console.log('data ==> ', JSON.stringify(data, null,2))
                // console.log('data2 ==> ', data2)
                const allOption = { _id: "all", name: "All" };
                const updatedAppointments = [allOption, ...data];
                setAppointments(updatedAppointments);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching special data:', error);
                setLoading(false);
            }
        };

        fetchSData();
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
            <View style={[styles.container, { justifyContent: 'space-around' }]}>

                <View style={styles.top}>
                    <Pressable onPress={() => logout()}>
                        <Image
                            source={images.Menu}
                            style={{ height: 35, width: 35 }}
                        />
                    </Pressable>

                    <View style={{
                        flexDirection: 'row', width: 190, backgroundColor: '#F3F3F3',
                        marginLeft: 20, borderRadius: 20,
                        height: 46, alignItems: 'center',
                        paddingHorizontal: 10
                    }}>
                        <Icons name={'location-pin'} size={25} color={'black'} />
                        <Text style={{ fontSize: 14, color: 'black', fontWeight: '600', marginLeft: 10, marginRight: 40 }}>Sargodha</Text>
                        <Icons name={'chevron-down'} size={25} color={'black'} />
                    </View>
                    <View style={{ flexDirection: 'row', width: '34%', justifyContent: 'flex-end', marginTop: 5 }}>
                        <Image
                            source={images.Bell}
                            style={{ height: 32, width: 32 }}
                        />
                        <Image
                            source={images.Cart}
                            resizeMode='contain'
                            style={{ height: 30, width: 30, marginLeft: 10 }}
                        />
                    </View>
                </View>

                <View style={styles.searchContainer}>
                    <View style={styles.input}>
                        <Iconss name={'locate'} size={25} color={'#DAD9D9'} />

                        <TextInput
                            style={{ marginLeft: 10 }}
                            // onChangeText={handleInputChange}
                            value={inputText}
                            placeholder="Search Specialist"
                            placeholderTextColor={'#DAD9D9'}
                        />
                        <View style={{ flexDirection: 'row', width: '45%', justifyContent: 'flex-end', marginTop: 5 }}>

                            <Iconss name={'mic'} size={25} color={'#DAD9D9'} />
                        </View>
                    </View>
                    <TouchableOpacity style={{
                        elevation: 1, shadowColor: 'black', height: 47, width: 47, alignItems: 'center',
                        borderRadius: 12, shadowRadius: 0, marginBottom: 10
                    }}>
                        <Image
                            source={images.Filter}
                            resizeMode='contain'
                            style={{ height: 45, width: 45, }}
                        />
                    </TouchableOpacity>

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
                                <ImageBackground source={images.Card} resizeMode='cover' style={{ width: '100%', height: 125 }}>
                                    {/* Render image with absolute positioning */}
                                    {/* <Image
                                        source={images.doctorCard}
                                        style={[styles.image, styles.absoluteImage, { resizeMode: 'cover', marginTop: 5 }]}
                                    /> */}
                                    <View style={{width:140, height:140, borderWidth:0,borderColor:'white',
                                        position:'absolute', top:-28, right:10, justifyContent:'center',
                                        alignItems:'center'
                                    }}>
                                    <Image
                                        source={{ uri: item.profileImg }}
                                        style={[styles.image,  { resizeMode: 'stretch', }]}
                                    />
                                    </View>
                                   

                                    {/* Other content */}
                                    <Text style={styles.t1}>{item.firstName} {item.lastName}</Text>
                                    <Text style={styles.t2}>{item.speciality[0].specialization.name}</Text>
                                    <Text style={styles.t3}>500+ points</Text>
                                    <View style={styles.contain1}>
                                        <Iconss name="add-circle" size={24} color="#9ccaff" />
                                        <Text style={styles.t5}> Appoint</Text>
                                    </View>
                                </ImageBackground>
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
                                
                                    <TouchableOpacity
                                        key={item._id}
                                         onPress={() => {
                                        setSelectedItem(item);
                                        getDoctorsBySid(item._id);
                                    }}
                                        style={[
                                            styles.contain,
                                            selectedItem?.name === item.name && { borderColor: '#1877F2' },
                                        ]}
                                    >
                                        <Text style={{ color: selectedItem?.name === item.name ? '#1877F2' : 'lightgrey', 
                                            fontWeight:'600'
                                         }}>
                                            {item.name}
                                        </Text>
                                    </TouchableOpacity>
                                
                            )}
                        </View>
                    </ScrollView>
                </View>

                <FlatList
                    data={filteredDoctors}
                    renderItem={({ item }) => (
                        <View style={styles.appointmentItem1}>
                            <View style={styles.image1}>
                                <Image source={{ uri: item.profileImg }} resizeMode='cover'
                                 style={{ width: 110, height: 110, borderRadius: 24 }} />
                            </View>
                            <View style={styles.contain2}>
                                <Text style={styles.h1}>{item.firstName} {item.lastName}</Text>
                                <Text style={styles.h2}>{item.speciality[0].specialization.name}</Text>
                                <Text style={styles.h2}>Mon-Fri | 9:00 Am to 5:00 Pm</Text>
                                <TouchableOpacity
                                    style={styles.buttonContainer}
                                    onPress={() => {
                                        navigation.navigate('doctor-profile', {
                                          data : item
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
        width: 90,
        height: 35,
        backgroundColor: '#007bff',
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 0,
        marginRight: 13,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 0,
        paddingBottom: 0,
        marginTop: 10,
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: 'bold',
    },
    h1: {
        fontSize: 21,
        fontWeight: "bold",
        color: 'black'
    },
    h2: {
        color: 'gray',
        fontSize: 13,
    },
    t1: {
        color: "white",
        fontSize: 22,
        fontWeight: "bold",
        marginTop: 0
    },
    t5: {
        fontSize: 14,
        color: "white",
        marginLeft: 5,
    },
    t2: {
        color: "white",
        fontSize: 18,
    },
    t3: {
        color: "white",
        fontSize: 14,
    },
    contain1: {
        marginTop: 10,
        flexDirection: "row",
        height: 35,
        // justifyContent: "center",
        paddingLeft: 6,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "white",
        borderRadius: 20,
        width: 110,
    },
    contain: {
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#DAD9D9",
        borderRadius: 20,
        marginTop: 7,
        margin: 5,
        paddingLeft: 12,
        paddingRight: 12,
    },
    des1: {
        
        marginLeft: 15,
        width:'100%',
    },
    des: {
        height: 160,
    },
    text2: {
        marginLeft: 15,
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 15,
        color: 'black'
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
        marginBottom: 10
    },
    container: {
        alignItems: 'center',
        height: Dimensions.get('window').height,
        backgroundColor: 'white'
        // flex:1
    },
    searchContainer: {
        marginTop: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: Dimensions.get('window').width,
        paddingLeft: 15,
        paddingRight: 15,
    },
    input: {
        height: 50,
        width: '80%',
        borderColor: '#DAD9D9',
        alignItems: 'center',
        flexDirection: 'row',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 10,
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
        padding: 14,
        paddingLeft: 20,
        paddingRight: 0,
        backgroundColor: '#1877F2',
        margin: 10,
        marginLeft: 15,
        marginBottom: 10,
        borderRadius: 24,
        width: Dimensions.get('window').width - 60,
        height: 140,
        overflow: 'visible', // Allows content to overflow
        marginTop: 20
    },
    image: {
        width: 130,
        height: 130,
        borderWidth: 1,
        // borderColor: 'grey',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5,
    },
    absoluteImage: {
        position: 'absolute',
        top: -10, // Adjust as needed to position the image partially outside
        // left: 200, // Adjust as needed to position the image partially outside
        right: 10
    },
    image1: {
        width: 110,
        height: 110,
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 24,
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
        margin: 10,
        marginLeft: 10,
        marginBottom: 5,
        borderRadius: 24,
        width: Dimensions.get('window').width - 22,
        height: 130,
        flexDirection: "row",
        alignItems: 'center',
    },
    subSpecializationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    top: {
        width: '100%',
        height: 70,
        backgroundColor: 'white',
        paddingVertical: 15,
        paddingHorizontal: 15,
        flexDirection: 'row'
    },

});
