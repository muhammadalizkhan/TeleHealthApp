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
import {fontRef, heightRef, widthRef} from "../../constants/screenSize";



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
    const [topSpecialists, setTopSpecialists] = useState([]);

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
                const doctorsData = await getAllDoctors();
                setDoctors(doctorsData);
                // console.log('doctors== > ', JSON.stringify(doctorsData, null,2))
                setFilteredDoctors(doctorsData);
                setTopSpecialists(doctorsData); // Set top specialists initially
                setLoading(false);
            } catch (error) {
                console.error('Error fetching doctors:', error);
                setLoading(false);
            }
        };
        fetchData();
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

    const handleSearch = (text) => {
        setInputText(text);
        const searchLower = text.toLowerCase();

        if (text === '') {
            setFilteredDoctors(doctors);
            setTopSpecialists(doctors);
        } else {
            const filtered = doctors.filter(doctor =>
                doctor.firstName.toLowerCase().includes(searchLower) ||
                doctor.lastName.toLowerCase().includes(searchLower) ||
                doctor.speciality.some(spec => spec.specialization.name.toLowerCase().includes(searchLower))
            );
            setTopSpecialists(filtered);
            if (selectedItem._id === 'all') {
                setFilteredDoctors(filtered);
            } else {
                setFilteredDoctors(filtered.filter(doctor =>
                    doctor.speciality.some(spec => spec.specialization._id === selectedItem._id)
                ));
            }
        }
    };


    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (

        <SafeAreaView>
            <ScrollView nestedScrollEnabled={true} contentContainerStyle={{flexGrow:1}}>


            <View style={[styles.container, { justifyContent: 'space-around' }]}>



                <View style={styles.searchContainer}>
                    <View style={styles.input}>


                        <TextInput
                            style={{ marginLeft: 10 * widthRef, width: '88%', fontSize: 16 * fontRef, color: 'black' }}
                            onChangeText={handleSearch}
                            value={inputText}
                            placeholder="Search Specialist"
                            placeholderTextColor={'#DAD9D9'}
                        />


                            <Iconss name={'search'} size={25} color={'#DAD9D9'} />

                    </View>

                    <TouchableOpacity style={{marginLeft:12, backgroundColor:'#1877F2',
                                       marginBottom:10, borderRadius:8,
                        padding:0, width:48, height:48, justifyContent:'center',
                        alignItems:'center'}}
                               onPress={() => navigation.openDrawer()}>
                        <Iconss name={'menu'} size={35} color={'white'}  />

                    </TouchableOpacity>

                </View>


                <View style={styles.heading}>
                    <Text style={styles.text2}>Get Appointments</Text>
                </View>

                <View style={styles.des}>
                    <FlatList
                        horizontal
                        data={topSpecialists }
                        nestedScrollEnabled={true}

                        renderItem={({ item }) => (
                            <View style={styles.appointmentItem}>
                                <ImageBackground source={images.Card} resizeMode='cover' style={{ width: '100%', height: 125 * heightRef }}>
                                    {/* Render image with absolute positioning */}
                                    {/* <Image
                                        source={images.doctorCard}
                                        style={[styles.image, styles.absoluteImage, { resizeMode: 'cover', marginTop: 5 }]}
                                    /> */}
                                    <View style={{width:140 * heightRef, height:140 * heightRef, borderWidth:0,borderColor:'white',
                                        position:'absolute', bottom:-1.5, right:5, justifyContent:'center',
                                        alignItems:'center'
                                    }}>
                                    <Image
                                        source={{ uri: item.profileImg }}


                                    />
                                        { item?.profileImg ?
                                            <Image source={{uri: item.profileImg}}
                                                   style={[styles.image,  ]}
                                            />
                                            :
                                            <Image source={images.doctorLogo}
                                                   style={[styles.image,  ]}
                                            />
                                        }
                                    </View>


                                    {/* Other content */}
                                    <Text style={styles.t1}>{item.firstName} {item.lastName}</Text>
                                    <Text style={styles.t2}>{item.speciality[0].specialization.name}</Text>
                                    <Text style={styles.t3}>500+ points</Text>
                                    <TouchableOpacity style={styles.contain1}
                                     onPress={() => {
                                        navigation.navigate('doctor-profile', {
                                          data : item
                                        });
                                    }}>
                                        <Iconss name="add-circle" size={24 * fontRef} color="#9ccaff" />
                                        <Text style={styles.t5}> Appoint</Text>
                                    </TouchableOpacity>
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
                    nestedScrollEnabled={true}
                    renderItem={({ item }) => (
                        <View style={styles.appointmentItem1}>
                            <View style={styles.image1}>
                                { item?.profileImg ?
                                    <Image source={{uri: item.profileImg}}
                                        style={{
                                            width: 110 * heightRef,
                                            height: 110 * heightRef,
                                            borderRadius: 24 * heightRef
                                        }}/>
                                :
                                    <Image source={images.doctorLogo}
                                           style={{
                                               width: 110 * heightRef,
                                               height: 110 * heightRef,
                                               borderRadius: 24 * heightRef
                                           }}/>
                                }
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
                    contentContainerStyle={{ paddingBottom: 30 }}
                />
            </View>

            </ScrollView>
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
        width: 100 * widthRef,
        height: 35 * heightRef,
        backgroundColor: '#007bff',
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 0,
        marginRight: 13 * widthRef,
        paddingLeft: 20 * widthRef,
        paddingRight: 20 * widthRef,
        paddingTop: 0,
        paddingBottom: 0,
        marginTop: 10 * heightRef,
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 13 * fontRef,
    },
    h1: {
        fontSize: 21 * fontRef,
        fontWeight: "bold",
        color: 'black'
    },
    h2: {
        color: 'gray',
        fontSize: 13 * fontRef,
    },
    t1: {
        color: "white",
        fontSize: 18 * fontRef,
        fontWeight: "bold",
        marginTop: 0
    },
    t5: {
        fontSize: 12 * fontRef,
        color: "white",
        marginLeft: 5 * widthRef,
    },
    t2: {
        color: "white",
        fontSize: 14 * fontRef,
    },
    t3: {
        color: "white",
        fontSize: 12 * fontRef,
    },
    contain1: {
        marginTop: 10 * heightRef,
        flexDirection: "row",
        height: 35 * heightRef,
        // justifyContent: "center",
        paddingLeft: 6 * widthRef,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "white",
        borderRadius: 20 * heightRef,
        width: 100 * widthRef,
    },
    contain: {
        height: 40 * heightRef,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#DAD9D9",
        borderRadius: 20 * heightRef,
        marginTop: 7 * heightRef,
        margin: 5 * heightRef,
        paddingLeft: 12 * widthRef,
        paddingRight: 12 * widthRef,
    },
    des1: {

        marginLeft: 15 * widthRef,
        width:'100%',
    },
    des: {
        height: 160 * heightRef,
    },
    text2: {
        marginLeft: 15 * widthRef,
        fontSize: 22 * fontRef,
        fontWeight: 'bold',
        marginTop: 15 * heightRef,
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
        marginBottom: 10 * heightRef,
    },
    container: {
        alignItems: 'center',
        height: Dimensions.get('window').height,
        backgroundColor: 'white'
        // flex:1
    },
    searchContainer: {
        marginTop: 20 * heightRef,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '85%'    ,
        alignSelf:'flex-start',
        paddingLeft: 15 * widthRef,
        paddingRight: 15 * widthRef,
    },
    input: {
        height: 50 * heightRef,
        width: '100%',
        borderColor: '#DAD9D9',
        alignItems: 'center',
        flexDirection: 'row',
        borderWidth: 1,
        marginBottom: 10 * heightRef,
        paddingHorizontal: 10 * widthRef,
        borderRadius: 10,
    },
    circularBox: {
        width: 40 * widthRef,
        height: 40 * heightRef,
        backgroundColor: '#1877F2',
        borderRadius: 10,
        marginLeft: 10 * widthRef,
        padding: 10 * heightRef,
        marginTop: 10 * heightRef,
    },
    appointmentItem: {
        position: 'relative', // Required for absolute positioning
        padding: 14 * heightRef,
        paddingLeft: 20 * widthRef,
        paddingRight: 0,
        backgroundColor: '#1877F2',
        margin: 10 * heightRef,
        marginLeft: 15 * widthRef,
        marginBottom: 10 * heightRef,
        borderRadius: 24,
        width: Dimensions.get('window').width - 60,
        height: 140 * heightRef,
        overflow: 'visible', // Allows content to overflow
        marginTop: 20 * heightRef,
    },
    image: {
        width: 120 * heightRef,
        height: 120 * heightRef,
        // borderWidth: 0.4,
        // borderColor: 'black',
        backgroundColor: 'white',
        borderRadius: 24 * heightRef,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5 * widthRef,
    },
    absoluteImage: {
        position: 'absolute',
        top: -10, // Adjust as needed to position the image partially outside
        // left: 200, // Adjust as needed to position the image partially outside
        right: 10
    },
    image1: {
        width: 110 * heightRef,
        height: 110 * heightRef,
        borderWidth: 1,
        borderColor:  "#DAD9D9",
        borderRadius: 24 * heightRef,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5 * widthRef,
    },
    contain2: {
        flex: 2,
        marginLeft: 15 * widthRef,
    },
    appointmentItem1: {
        borderWidth: 1,
        borderColor: "#DAD9D9",
        margin: 10 * heightRef,
        marginLeft: 10 * widthRef,
        marginBottom: 5     * heightRef,
        borderRadius: 24 * heightRef,
        width: Dimensions.get('window').width - 22,
        height: 130 * heightRef,
        flexDirection: "row",
        alignItems: 'center',
    },
    subSpecializationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    top: {
        width: '100%',
        height: 70 * heightRef,
        backgroundColor: 'white',
        paddingVertical: 15 * heightRef,
        paddingHorizontal: 15 * widthRef,
        flexDirection: 'row'
    },

});
{/*<View style={styles.top}>*/}
{/*    <Pressable >*/}
{/*        <Image*/}
{/*            source={images.Menu}*/}
{/*            style={{ height: 35, width: 35 }}*/}
{/*        />*/}
{/*    </Pressable>*/}

{/*    <View style={{*/}
{/*        flexDirection: 'row', width: 190, backgroundColor: '#F3F3F3',*/}
{/*        marginLeft: 20, borderRadius: 20,*/}
{/*        height: 46, alignItems: 'center',*/}
{/*        paddingHorizontal: 10*/}
{/*    }}>*/}
{/*        <Icons name={'location-pin'} size={25} color={'black'} />*/}
{/*        <Text style={{ fontSize: 14, color: 'black', fontWeight: '600', marginLeft: 10, marginRight: 40 }}>Sargodha</Text>*/}
{/*        <Icons name={'chevron-down'} size={25} color={'black'} />*/}
{/*    </View>*/}
{/*    <View style={{ flexDirection: 'row', width: '34%', justifyContent: 'flex-end', marginTop: 5 }}>*/}
{/*        <Image*/}
{/*            source={images.Bell}*/}
{/*            style={{ height: 32, width: 32 }}*/}
{/*        />*/}
{/*        <Image*/}
{/*            source={images.Cart}*/}
{/*            resizeMode='contain'*/}
{/*            style={{ height: 30, width: 30, marginLeft: 10 }}*/}
{/*        />*/}
{/*    </View>*/}
{/*</View>*/}
