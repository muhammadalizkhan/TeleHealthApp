import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    Image,
    ScrollView,
    StyleSheet,
    Dimensions,
    TextInput, FlatList, Modal, ActivityIndicator
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icons from 'react-native-vector-icons/Ionicons';
import { fontRef, heightRef, widthRef } from "../../../constants/screenSize";
import { images } from "../../../constants";
import { showMessage } from "react-native-flash-message";
import { SvgUri } from "react-native-svg";
import Iconss from "react-native-vector-icons/dist/Ionicons";
import Icon from "react-native-vector-icons/dist/MaterialCommunityIcons";
import AsyncStorage from '@react-native-async-storage/async-storage';

const PrescriptionScreen = () => {
    const route = useRoute();
    const { user } = route.params;
    console.log("userrrrrrrrrrrrrr", user)
    console.log("userrrrrrrrrrrrrr3333", user?.visits[0].doctor?._id)


    const navigation = useNavigation();
    // State variables to handle text input
    const [medicines, setMedicines] = useState('');
    const [injections, setInjections] = useState('');
    const [medicalTests, setMedicalTests] = useState('');
    const [note, setNote] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);
    const [data, setData] = useState([]);
    const [selectedLab, setSelectedLab] = useState(null);
    const [token, setToken] = useState('')
    // const [searchQuery, setSearchQuery] = useState('');
    // console.log('data = ', JSON.stringify(data, null, 2))
    const getDoctorToken = async () => {
        const token = await AsyncStorage?.getItem("DoctorData")
        if (token) {
            const parsedToken = JSON.parse(token);
            console.log('parsed token: ', parsedToken);

            setToken(parsedToken?.tokens?.access_token)
            console.log('???????', parsedToken?.tokens?.access_token);

        }
    }

    const addPrescription = async () => {
        try {
            const payload = {
                data: {
                    user: user.user_id, // User ObjectId
                    treatmentStatus: user?.treatmentStatus, // String, either complete or ongoing
                    diagnosisDate: user?.diagnosisDate, // moment JS unix timestamp
                    condition: user?.condition, // String
                    visits: {
                        visitDate: user.visits[0].visitDate,
                        doctor: user.visits[0].doctor,
                        notes: user.visits[0].notes,
                        prescriptions: user.visits[0].prescriptions,
                        recommendedTests: user.visits[0].recommendedTests,
                    },
                    followUp: {
                        specialization: user?.followUp.specialization,
                        subSpecialization: user?.followUp?.subSpecialization,
                        appointmentType: user?.followUp?.appointmentType,
                        clinic: user?.followUp?.doctor?.clinic,
                        clinicLocation: user?.followUp?.doctor?.clinicLocation,
                        date: user?.followUp?.date,
                    },
                }
            };

            console.log('payload to add', payload.data);

            const res = await fetch("https://api-dev.mhc.doginfo.click/ehr-system", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                    // Add additional headers if required
                },
                body: JSON.stringify(payload.data) // Convert payload to JSON string
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();
            console.log('Response data:', data);
        } catch (error) {
            console.error('Error adding prescription:', error);
        }
    };


    useEffect(() => {
        getDoctorToken();
        // Define an async function to fetch data
        const fetchData = async () => {
            try {
                // Call the API
                const response = await fetch('https://api-dev.mhc.doginfo.click/diagnostic-center', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        // Add additional headers if required
                    },
                });

                // Check if the response is successful
                if (response.ok) {
                    // Parse the response data as JSON
                    const result = await response.json();
                    // console.log('Data fetched successfully:', result);
                    showMessage({
                        message: "Data fetched successfully",
                        type: "success",
                    })
                    // Update the state with the fetched data
                    setData(result);
                } else {
                    console.error('Error fetching data:', response.status, response.statusText);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        // Call the fetchData function
        fetchData();
    }, []);

    const labRecommendations = [
        {
            name: "Chughtai Lab",
            timings: "Mon - Fri | 9:00 AM to 5:00 PM",
            image: "https://example.com/lab1.jpg"
        },
        {
            name: "MediQuest Lab",
            timings: "Mon - Fri | 9:00 AM to 5:00 PM",
            image: "https://example.com/lab2.jpg"
        },
    ];

    const handleLabSelect = (lab) => {
        setSelectedLab(lab);
    };

    const handleSendPress = () => {
        setModalVisible(true);
        setLoading(true);
        setSuccess(false);
        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
            showMessage({
                message: "The Prescription has been sent successfully.",
                type: "success",
            });
            setTimeout(() => {
                setModalVisible(false);
                navigation.navigate('patient-record'); // Replace 'NextScreen' with your target screen
            }, 1000);
        }, 2000);
    };


    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={[styles.labContainer, selectedLab?._id === item._id && styles.selectedLabContainer]}
            onPress={() => handleLabSelect(item)}
        >
            {
                item.image ?
                    (
                        item.image.endsWith('.svg') ? (
                            <SvgUri
                                width="100%"
                                height="40%"
                                uri={item.image}
                            />
                        ) : (
                            <Image source={{ uri: item.image }} style={styles.labImage} resizeMode={'contain'} />
                        )
                    ) : (
                        <View style={{ height: 50 * heightRef, width: '100%', backgroundColor: '#007BFF' }}>
                            <Image source={images.Account} style={styles.labImage} />

                        </View>
                    )
            }
            <View style={{ flexDirection: 'row', width: '100%', marginTop: 5, justifyContent: 'space-between' }}>
                <Text style={styles.title}>{item.centerName}</Text>
                {/*<View style={styles.labRatingContainer}>*/}
                {/*    <Text style={styles.labRating}>4.5</Text>*/}
                {/*    <Image source={images.star} style={styles.starIcon} />*/}
                {/*</View>*/}
            </View>
            <Text style={styles.labAddress}>{item.branches[0]?.completeAddress}</Text>
            <View style={styles.infoItem}>
                <Iconss name={'location-outline'} size={20} color={'#007BFF'} />
                <Text style={styles.infoText}>{`${item.branches[0]?.city}, ${item.branches[0]?.state}, ${item.branches[0]?.country}`}</Text>
            </View>
            <View style={styles.infoItem}>
                <Iconss name={'call-outline'} size={20} color={'#007BFF'} />
                <Text style={styles.infoText}>{item.branches[0]?.phone}</Text>
            </View>
            <View style={styles.infoItem}>
                <Iconss name={'mail-outline'} size={20} color={'#007BFF'} />
                <Text style={styles.infoText}>{item.branches[0]?.email}</Text>
            </View>
            <View style={styles.infoItem}>
                <Icon name={'google-chrome'} size={20} color={'#007BFF'} />
                <Text style={styles.infoText}>{item.website}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.appBar}>
                <View style={styles.appBarpatr1}>
                    <TouchableOpacity onPress={() => navigation.goBack()} >
                        <Icons name={'chevron-back'} size={30} color="black" />

                    </TouchableOpacity>
                    <Text style={styles.h1}>{`${user?.firstName || ''} ${user?.lastName || ''}`}</Text>
                </View>
                <View style={styles.circularBox}>
                    <Image
                        source={{ uri: user?.user?.profileImg }}
                        resizeMode="contain"
                        style={{ height: 50 * heightRef, width: 50 * heightRef, }}
                    />
                </View>
            </View>
            <ScrollView contentContainerStyle={styles.scrollContainer}>


                <View style={styles.content}>
                    <View style={styles.infoSection}>
                        <Text style={styles.infoText}>Disease : </Text>
                        <Text style={styles.boldText}>{user?.condition}</Text>

                    </View>

                    <Text style={styles.sectionTitle}>Prescription</Text>
                    <View style={styles.prescriptionBox}>
                        <Image source={images.D1} style={styles.prescriptionIcon} />
                        <TextInput
                            style={styles.prescriptionText}
                            placeholder="Medicines"
                            placeholderTextColor={'dimgray'}
                            value={medicines}
                            onChangeText={setMedicines}
                        />
                    </View>
                    <View style={styles.prescriptionBox}>
                        <Image source={images.D2} style={styles.prescriptionIcon} />
                        <TextInput
                            style={styles.prescriptionText}
                            placeholderTextColor={'dimgray'}
                            placeholder="Injections"
                            value={injections}
                            onChangeText={setInjections}
                        />
                    </View>
                    <View style={styles.prescriptionBox}>
                        <Image source={images.D3} style={styles.prescriptionIcon} />
                        <TextInput
                            style={styles.prescriptionText}
                            placeholderTextColor={'dimgray'}
                            placeholder="Medical Tests"
                            value={medicalTests}
                            onChangeText={setMedicalTests}
                        />
                    </View>
                    <View style={styles.prescriptionBox}>
                        <Image source={images.D4} style={styles.prescriptionIcon} />
                        <TextInput
                            style={styles.prescriptionText}
                            placeholder="Note"
                            placeholderTextColor={'dimgray'}
                            value={note}
                            onChangeText={setNote}
                        />
                    </View>
                    <Text style={styles.sectionTitle}>Lab Recommendation</Text>

                    <FlatList
                        data={data}
                        contentContainerStyle={{ paddingBottom: 20 }}
                        keyExtractor={(item) => item._id}
                        renderItem={renderItem}
                    />


                </View>

                <TouchableOpacity style={styles.sendButton} onPress={() => addPrescription()}>
                    <Text style={styles.sendButtonText}>Send</Text>
                </TouchableOpacity>

                <Modal
                    transparent={true}
                    animationType="slide"
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            {loading ? (
                                <ActivityIndicator size="large" color="#1877F2" />
                            ) : success ? (
                                <Text style={styles.successText}>Success!</Text>
                            ) : null}
                        </View>
                    </View>
                </Modal>
            </ScrollView>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({

    scrollContainer: {
        flexGrow: 1,
        padding: 20,
    },

    appBarPart1: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    profileImage: {
        height: 50,
        width: 50,
    },
    content: {
        flex: 1,
    },
    labContainer: {
        width: '100%',
        height: 360 * heightRef,
        backgroundColor: '#F9F8F8',
        padding: 10 * widthRef,
        justifyContent: 'center',
        // backgroundColor:'red',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#DAD9D9',
        marginBottom: 10 * heightRef,
    },
    labDetails: {
        flex: 1,
    },
    labName: {
        fontSize: 18 * fontRef,
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
    },
    successText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1877F2',
    },
    labAddress: {
        fontSize: 12 * fontRef,
        color: '#8A8A8E',
        marginLeft: 8 * widthRef,
        marginTop: 5 * heightRef,
    },
    labRatingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    labRating: {
        fontSize: 20 * fontRef,
        fontWeight: 'bold',
        marginRight: 5 * widthRef,
        color: '#007BFF',
    },
    starIcon: {
        width: 20 * heightRef,
        height: 20 * heightRef,
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20 * heightRef,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8 * heightRef,
        paddingLeft: 6 * widthRef,
    },
    infoIcon: {
        width: 20 * heightRef,
        height: 20 * heightRef,
        marginRight: 5 * widthRef,
    },
    labImage: {
        width: '100%',
        height: 120 * heightRef,
        borderRadius: 10,
        marginRight: 10 * widthRef,
    },
    infoSection: {
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    infoText: {
        fontSize: 16,
        marginBottom: 5,
        color: 'black',
        fontWeight: 'bold'
    },
    boldText: {
        fontWeight: 'bold',
        color: 'black',
        fontSize: 16,

    },
    sectionTitle: {
        color: "black",
        fontWeight: "bold",
        fontSize: 20,
        marginBottom: 10,
    },
    prescriptionBox: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderWidth: 1,
        borderColor: '#DAD9D9',
        borderRadius: 10,
        marginBottom: 10,
    },
    prescriptionIcon: {
        height: 70,
        width: 70,
        marginRight: 10,
    },
    prescriptionText: {
        fontSize: 16,
        color: 'black',
        height: 50,
        width: '70%'
    },
    labRecommendationHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    seeAllText: {
        color: '#1877F2',
    },
    labRecommendations: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    labBox: {
        width: '48%',
        alignItems: 'center',
    },
    selectedLabContainer: {
        backgroundColor: '#e0f7fa', // Change background color for selected lab
    },
    labTimings: {
        fontSize: 14,
        color: 'grey',
    },
    sendButton: {
        backgroundColor: '#1877F2',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    sendButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    y1: {
        color: "white",
        fontWeight: "bold"
    },
    c1: {
        height: 90 * heightRef,
        borderWidth: 1,
        borderColor: "grey",
        borderRadius: 15,
        width: Dimensions.get("window").width - 40,
        justifyContent: "space-around",
        alignContent: "center",
        flexDirection: "row"
    },
    topBar: {
        backgroundColor: "grey",
        height: 45 * heightRef,
        borderRadius: 15,
        flexDirection: "row",
        padding: 10 * heightRef,
        alignItems: "center",
        justifyContent: "space-between",
        marginRight: 7,
        marginLeft: 7
    },
    r1: {
        flexDirection: "row",
        justifyContent: "space-between"
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
    container: {
        width: '100%',
        height: '100%',
        flex: 1,
        justifyContent: "flex-start",
        backgroundColor: 'white'
    },
    circularBox: {
        width: 50 * heightRef,
        height: 50 * heightRef,
        overflow: 'hidden',
        backgroundColor: 'blue',
        borderRadius: 50,
    },
});

export default PrescriptionScreen;
