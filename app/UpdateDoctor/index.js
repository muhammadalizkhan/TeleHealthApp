import React, { useContext, useEffect, useState } from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ActivityIndicator, ScrollView} from 'react-native';
import { images } from '../../constants';
import { AuthContext } from '../../context/Authcontext';
import Icons from 'react-native-vector-icons/dist/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { showMessage } from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {fontRef, heightRef, widthRef} from "../../constants/screenSize";

const UpdateDScreen = () => {

    useEffect(() => {
        const getDoctorData = async () => {
            try {
                const response = await AsyncStorage.getItem('DoctorData');
                if (response !== null) {
                    console.log(response)
                    const parsedResponse = JSON.parse(response);
                    // console.log('response == ', JSON.stringify(parsedResponse, null, 2));
                    setDoctorData(parsedResponse?.user); // Assuming your response contains the necessary doctor data
                }
            } catch (error) {
                console.log('Error retrieving login response:', error);
            } finally {
                setLoading(false);
            }
        };

        getDoctorData();
    }, []);

    const [doctorData, setDoctorData] = useState(null);
    const [fname, setFname] = useState(doctorData?.firstName || '')
    const [lname, setLname] = useState( '')
    const [phoneNumber, setPhoneNumber] = useState('');
    const [gender, setGender] = useState()
    const [height, setHeight] = useState( '');
    const [age, setAge] = useState()
    const [bloodG, setBloodG] = useState()
    const [dietary, setDietary] = useState()
    const navigation = useNavigation()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (doctorData) {
            setFname(doctorData.firstName || '');
            setLname(doctorData.lastName || '');
            setPhoneNumber(doctorData.phone || '');
            setGender(doctorData.gender || '');
            setHeight(doctorData.height || '');
            setAge(doctorData.age || '');
            setBloodG(doctorData.bloodGroup || '');
            setDietary(doctorData.dietary || '');
        }
    }, [doctorData]);
    const url = `https://api-dev.mhc.doginfo.click/doctor?doctorId=${doctorData?._id}`;
    const updatedData = {
        profileImg: doctorData?.profileImg,
        firstName: fname,
        lastName: lname,
        email: doctorData?.email,
        role: doctorData?.role,
        age: age,
        bloodGroup: bloodG,
        height: height,
    };


    // console.log("doctor ", JSON.stringify(doctorData, null,2))


    const updateUserProfile = async () => {

        setLoading(true)

        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${doctorData?.tokens?.access_token}`,
                },
                body: JSON.stringify(updatedData),
            });

            if (!response.ok) {
                setLoading(false)
                const errorData = await response.json();
                showMessage({
                    message: `Error: ${errorData || 'Unknown error'}`,
                    type: 'danger',
                });
                console.error('Error updating profile:', errorData);
                // Alert.alert('Error', `Unable to update profile: ${errorData.message || 'Unknown error'}`);
                return;
            }

            const result = await response.json();
            setLoading(false)
            showMessage({
                message: result.message,
                type: 'success',
            });
            navigation.goBack()
            console.log('Profile updated successfully:', result);
            // Alert.alert('Success', 'Profile updated successfully');
        } catch (error) {
            setLoading(false)
            showMessage({
                message: error,
                type: 'success',
            });
            console.error('Error updating profile:', error);
            // Alert.alert('Error', `Unable to update profile: ${error.message || 'Unknown error'}`);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <Icons name={'chevron-back'} size={30 } color="black" />

                </TouchableOpacity>
                <Text style={styles.title}>Profile</Text>

            </View>

            <ScrollView style={styles.main}>

                <View style={styles.profileImageContainer}>
                    <Image
                        source={{ uri: doctorData?.profileImg }} // Replace with actual image URL
                        style={styles.profileImage}
                    />
                    {/* <TouchableOpacity style={styles.edit}>
                        <Icons name={'camera'} size={30} color="white" />

                    </TouchableOpacity> */}
                </View>
                <TextInput
                    style={styles.input}
                    placeholder="First Name"
                    placeholderTextColor="#8A8A8E"
                    value={fname}
                    onChangeText={setFname}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Last Name"
                    placeholderTextColor="#8A8A8E"
                    value={lname}
                    onChangeText={setLname}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Phone Number"
                    placeholderTextColor="#8A8A8E"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Gender"
                    placeholderTextColor="#8A8A8E"
                    value={gender}
                    onChangeText={setGender}
                />
                <View style={styles.row}>
                    <TextInput
                        style={[styles.input, styles.halfInput]}
                        placeholder="Age"
                        placeholderTextColor="#8A8A8E"
                        value={age}
                        onChangeText={setAge}
                    />
                    <TextInput
                        style={[styles.input, styles.halfInput]}
                        placeholder="Height"
                        placeholderTextColor="#8A8A8E"
                        value={height}
                        onChangeText={setHeight}
                    />
                </View>
                <TextInput
                    style={styles.input}
                    placeholder="Blood Group"
                    placeholderTextColor="#8A8A8E"
                    value={bloodG}
                    onChangeText={setBloodG}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Dietary"
                    placeholderTextColor="#8A8A8E"
                    value={dietary}
                    onChangeText={setDietary}
                />
                <TouchableOpacity style={styles.button} onPress={updateUserProfile}>

                    {!loading ? <Text style={styles.buttonText}>Edit Profile</Text>
                        : <ActivityIndicator size={25} color={'white'} />}
                </TouchableOpacity>

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        // paddingHorizontal: 20,
        paddingTop: 0,
    },
    title: {
        fontSize: 24 * fontRef,
        fontWeight: 'bold',
        marginBottom: 0,
        marginLeft: 10 * widthRef,
        color:'black'
    },
    profileImageContainer: {
        alignItems: 'center',
        marginBottom: 20 * widthRef,
    },
    profileImage: {
        width: 130 * heightRef,
        height: 130 * heightRef,
        borderRadius: 100,
    },
    cameraIcon: {
        position: 'absolute',
        bottom: 0,
        right: 10 * widthRef,
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 5 * heightRef,
    },
    cameraImage: {
        width: 20 * widthRef,
        height: 20 * widthRef,
    },
    input: {
        height: 55 * heightRef,
        backgroundColor: '#E8E8E8',
        borderRadius: 10,
        paddingHorizontal: 20 * widthRef,
        marginBottom: 15 * heightRef,
        color:'black'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    halfInput: {
        width: '48%',
    },
    button: {
        backgroundColor: '#007BFF',
        paddingVertical: 10 * heightRef,
        borderRadius: 10 * heightRef,
        alignItems: 'center',
        height: 55 * heightRef,
        justifyContent: 'center',
        marginBottom: 80 * heightRef,
    },
    buttonText: {
        fontSize: 16 * fontRef,
        color: '#fff',
        fontWeight: 'bold',
    },
    header: {
        padding: 5,
        height: 70 * heightRef,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    edit: {
        position: 'absolute',
        bottom: -10,
        right: 120,
        backgroundColor: '#007BFF',
        borderRadius: 20,
        height: 38,
        width: 38,
        justifyContent: 'center',
        alignItems: 'center'
    },
    main: {
        flex: 1,
        paddingHorizontal: 20 * widthRef,
        paddingBottom: 80 * heightRef,
    }
});

export default UpdateDScreen;
