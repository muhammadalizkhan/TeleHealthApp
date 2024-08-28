import React, {useContext, useEffect, useState} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    ActivityIndicator,
    ScrollView,
    FlatList
} from 'react-native';
import { images } from '../../constants';
import { AuthContext } from '../../context/Authcontext';
import Icons from 'react-native-vector-icons/dist/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { showMessage } from 'react-native-flash-message';
import {fontRef, heightRef, widthRef} from "../../constants/screenSize";

const UserResults = () => {
    const { logout, loggedIn, userData } = useContext(AuthContext);
    // console.log('user data ==> ', userData)
    const [data, setData] = useState([] )
    const [lname, setLname] = useState(userData.user.lastName || '')
    const [phoneNumber, setPhoneNumber] = useState(userData.user.phoneNumber || '');
    const [gender, setGender] = useState()
    const [height, setHeight] = useState(userData.user.height || '');
    const [age, setAge] = useState()
    const [bloodG, setBloodG] = useState()
    const [dietary, setDietary] = useState()
    const navigation = useNavigation()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (userData) {
            updateUserProfile()
        }
    } , [])

    const url = `https://api-dev.mhc.doginfo.click/diagnostic-center/lab-test/booking?userId=${userData.user._id}`;


    const updateUserProfile = async () => {

        setLoading(true)

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userData?.tokens?.access_token}`,
                },
                // body: JSON.stringify(updatedData),
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
            console.log('result', JSON.stringify(result, null, 2));
            setData(result)
            setLoading(false)
            showMessage({
                message: result.message || 'Records get successfully',
                type: 'success',
            });
            // navigation.goBack()
            // console.log('Profile updated successfully:', result);
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

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Text style={{ fontSize: 22 * fontRef, fontWeight: '500', color: 'black', marginBottom: 6 * heightRef }}>
                Booking Details
            </Text>
            <View style={styles.row}>
                <Text style={styles.maintext}>Date:</Text>
                <Text style={styles.text}>{item.bookingDetails?.date}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.maintext}>Test Status:</Text>
                <Text style={styles.text}>{item.status}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.maintext}>Payment Status:</Text>
                <Text style={styles.text}>{item.paymentStatus}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.maintext}>Test Payment:</Text>
                <Text style={styles.text}>{item.test?.price}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.maintext}>Test Location:</Text>
                <Text style={styles.text}>{item.bookingDetails?.testLocation}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.maintext}>Test Name:</Text>
                <Text style={styles.text}>{item.test?.testName}</Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.maintext}>Test Category:</Text>
                <Text style={styles.text}>{item.test?.category?.name}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.maintext}>DG Center Name:</Text>
                <Text style={styles.text}>{item.dgCenter?.centerName}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.maintext}>Branch Phone:</Text>
                <Text style={styles.text}>{item.branch?.phone}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.maintext}>Branch Email:</Text>
                <Text style={styles.text}>{item.branch?.email}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.maintext}>Branch Address:</Text>
                <Text style={styles.text}>{item.branch?.completeAddress}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <Icons name={'chevron-back'} size={30} color="black" />

                </TouchableOpacity>
                <Text style={styles.title}>Lab Test Records</Text>

            </View>

            <ScrollView style={styles.main}>
               {/*<View style={styles.card}>*/}
               {/*   <Text style={{ fontSize:22 * fontRef, fontWeight:'500', color:'black', marginBottom:6 * heightRef}} >*/}
               {/*       booking Details*/}
               {/*   </Text>*/}
               {/*    <View style={styles.row}>*/}
               {/*        <Text style={styles.maintext} >*/}
               {/*            Date:*/}
               {/*        </Text>*/}
               {/*        <Text style={styles.text} >*/}
               {/*            {data[0]?.bookingDetails?.date}*/}
               {/*        </Text>*/}
               {/*    </View>*/}
               {/*    <View style={styles.row}>*/}
               {/*        <Text style={styles.maintext} >*/}
               {/*            Test Status:*/}
               {/*        </Text>*/}
               {/*        <Text style={styles.text} >*/}
               {/*            {data[0]?.status}*/}
               {/*        </Text>*/}
               {/*    </View>*/}
               {/*    <View style={styles.row}>*/}
               {/*        <Text style={styles.maintext} >*/}
               {/*            Payment Status:*/}
               {/*        </Text>*/}
               {/*        <Text style={styles.text} >*/}
               {/*            {data[0]?.paymentStatus}*/}
               {/*        </Text>*/}
               {/*    </View>*/}
               {/*    <View style={styles.row}>*/}
               {/*        <Text style={styles.maintext} >*/}
               {/*            Test Payment:*/}
               {/*        </Text>*/}
               {/*        <Text style={styles.text} >*/}
               {/*            {data[0]?.test?.price}*/}
               {/*        </Text>*/}
               {/*    </View>*/}
               {/*    /!*<View style={styles.row}>*!/*/}
               {/*    /!*    <Text style={{ fontSize:16 * fontRef, fontWeight:'500', color:'black',width:'50%'}} >User Address:*!/*/}
               {/*    /!*    </Text>*!/*/}
               {/*    /!*    <Text style={{ fontSize:16 * fontRef, fontWeight:'500', color:'black',width:'50%'}} >*!/*/}
               {/*    /!*        {data[0]?.bookingDetails?.userAddress}*!/*/}
               {/*    /!*    </Text>*!/*/}
               {/*    /!*</View>*!/*/}

               {/*    <View style={styles.row}>*/}
               {/*        <Text style={styles.maintext} >*/}
               {/*            Test Location:*/}
               {/*        </Text>*/}
               {/*        <Text style={styles.text} >*/}
               {/*            {data[0]?.bookingDetails?.testLocation}*/}
               {/*        </Text>*/}
               {/*    </View>*/}

               {/*    <View style={styles.row}>*/}
               {/*        <Text style={styles.maintext} >*/}
               {/*            Test Name:*/}
               {/*        </Text>*/}
               {/*        <Text style={styles.text} >*/}
               {/*            {data[0]?.test?.testName}*/}
               {/*        </Text>*/}
               {/*    </View>*/}
               {/*    <View style={styles.row}>*/}
               {/*        <Text style={styles.maintext} >*/}
               {/*            Test Price:*/}
               {/*        </Text>*/}
               {/*        <Text style={styles.text} >*/}
               {/*            {data[0]?.test?.price}*/}
               {/*        </Text>*/}
               {/*    </View>*/}
               {/*    <View style={styles.row}>*/}
               {/*        <Text style={styles.maintext} >*/}
               {/*            Test Category:*/}
               {/*        </Text>*/}
               {/*        <Text style={styles.text} >*/}
               {/*            {data[0]?.test?.category?.name}*/}
               {/*        </Text>*/}
               {/*    </View>*/}
               {/*    <View style={styles.row}>*/}
               {/*        <Text style={styles.maintext} >*/}
               {/*            DG Center Name:*/}
               {/*        </Text>*/}
               {/*        <Text style={styles.text} >*/}
               {/*            {data[0]?.dgCenter?.centerName}*/}
               {/*        </Text>*/}
               {/*    </View>*/}

               {/*    <View style={styles.row}>*/}
               {/*        <Text style={ styles.maintext } >*/}
               {/*            Branch Phone:*/}
               {/*        </Text>*/}
               {/*        <Text style={styles.text} >*/}
               {/*            {data[0]?.branch?.phone}*/}
               {/*        </Text>*/}
               {/*    </View>*/}
               {/*    <View style={styles.row}>*/}
               {/*        <Text style={styles.maintext} >*/}
               {/*            Branch Email:*/}
               {/*        </Text>*/}
               {/*        <Text style={styles.text} >*/}
               {/*            {data[0]?.branch?.email}*/}
               {/*        </Text>*/}
               {/*    </View>*/}
               {/*    <View style={styles.row}>*/}
               {/*        <Text style={styles.maintext} >*/}
               {/*            Branch Address:*/}
               {/*        </Text>*/}
               {/*        <Text style={styles.text} >*/}
               {/*            {data[0]?.branch?.completeAddress}*/}
               {/*        </Text>*/}
               {/*    </View>*/}
               {/*</View>*/}
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    ListEmptyComponent={
                        <View style={{ alignItems: 'center', marginTop: 20 }}>
                            <Text style={{ fontSize: 18, color: 'gray' }}>No data found</Text>
                        </View>
                    }
                />
            </ScrollView>
        </View>
    );
};
export default UserResults;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        // paddingHorizontal: 20,
        paddingTop: 0,
    },
    card:{
        backgroundColor:"#fff" ,
        width: "98%",
        borderRadius: 10,
        margin: 10,
        padding: 10,
        // justifyContent: 'center',
        // alignItems: 'center',
        alignSelf:'center',
        borderWidth: 1,
        borderColor: "#DAD9D9",
    },
    title: {
        fontSize: 24 * fontRef,
        fontWeight: 'bold',
        marginBottom: 0,
        marginLeft: 10 * widthRef,
        color:'black'
    },
    maintext: { fontSize:16 * fontRef, fontWeight:'500', color:'black',width:'50%'},
    text:{ fontSize:16 * fontRef, fontWeight:'300', color:'black',width:'50%'},
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
        justifyContent: 'flex-start',
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


