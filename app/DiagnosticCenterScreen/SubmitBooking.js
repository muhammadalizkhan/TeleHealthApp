import React, {useContext, useState} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    TextInput,
    FlatList,
    Modal,
    ScrollView, Alert, ActivityIndicator
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import {useNavigation, useRoute} from '@react-navigation/native';
import Icons from 'react-native-vector-icons/Ionicons';
import { fontRef, heightRef, widthRef } from '../../constants/screenSize';
import {AuthContext} from "../../context/Authcontext";
import {useCreatePaymentIntentMutation} from "../../store/apislice";
import moment from "moment/moment";
import {useStripe} from "@stripe/stripe-react-native";
import {showMessage} from "react-native-flash-message";

const SubmitBooking = ({route}) => {

    const { data } = route.params;
    // console.log('Data:', JSON.stringify(data, null, 2));
    const navigation = useNavigation();
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [selectedOption, setSelectedOption] = useState('');
    const [address, setAddress] = useState('');
    const [availability, setAvailability] = useState('');
    // console.log('available slot', availability)
    const [isOptionDropdownVisible, setIsOptionDropdownVisible] = useState(false);
    const [isAvailabilityDropdownVisible, setIsAvailabilityDropdownVisible] = useState(false);
    const todayDate = new Date().toISOString().split('T')[0];

    const options = [data?.eligibility]; // Sample options

    const { logout, loggedIn, userData } = useContext(AuthContext);
    // console.log('user data ==> ',JSON.stringify(userData, null, 2))
    const [expanded, setExpanded] = useState(false);
    const [createPaymentIntent] = useCreatePaymentIntentMutation();
    const { appointmentDetails } = route.params;
    const [loading, setLoading] = useState(false)


    const [description, setDescription] = useState(appointmentDetails?.doctor?.about)
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [clientSecret, setClientSecret] = useState()
    const url = 'https://api-dev.mhc.doginfo.click/diagnostic-center/lab-test/booking';
    const urlPayment = 'https://api-dev.mhc.doginfo.click/initiate-payment';

/// doctor -> steven



    // Ensure availability is defined and correctly formatted
    const availabilityParts = availability ? availability.split(' - ') : [];
    const fromTime = availabilityParts.length > 0 ? availabilityParts[0] : undefined;
    const toTime = availabilityParts.length > 1 ? availabilityParts[1] : undefined;

    // Function to convert time to Unix timestamp
    const convertToUnixTimestamp = (date, time) => {
        if (!time) return NaN;
        const timeParts = time.split(':');
        if (timeParts.length !== 2) {
            return NaN;
        }

        const hour = timeParts[0];
        const minutePeriod = timeParts[1];
        const minuteParts = minutePeriod.split(' ');
        if (minuteParts.length !== 2) {
            return NaN;
        }

        const minute = minuteParts[0];
        const period = minuteParts[1];

        let hour24 = parseInt(hour, 10);
        if (period === 'PM' && hour24 !== 12) {
            hour24 += 12;
        } else if (period === 'AM' && hour24 === 12) {
            hour24 = 0;
        }

        const dateTimeString = `${date}T${hour24.toString().padStart(2, '0')}:${minute}:00Z`;
        const dateObject = new Date(dateTimeString);
        return dateObject.getTime();
    };

    // Convert 'from' and 'to' times to Unix timestamps
    const fromUnixTimestamp = convertToUnixTimestamp(selectedDate, fromTime);
    const toUnixTimestamp = convertToUnixTimestamp(selectedDate, toTime);

    // Check if the conversion was successful
    console.log('From time:', fromTime, 'Unix timestamp:', fromUnixTimestamp);
    console.log('To time:', toTime, 'Unix timestamp:', toUnixTimestamp);

    let bookingDetails = {
        date: selectedDate,
        from: fromUnixTimestamp || "",
        to: toUnixTimestamp || "",
        userAddress: address,
        testLocation: selectedOption === "in-clinic" ? "in-clinic" : "at-home",
    };



    const paymentData = {

        product : 'Lab Test',
        userId : userData?.user?._id,
        testBookingDetails: {
            bookingDetails,
            dgCenter: data?.center?.centerName,
            test:data,
            branch: data?.branches[0],

        }
    }

    const appointmentData = {
        stripeClientSecret: clientSecret,
        dgCenter: data?.center._id,
        branch: data?.branches[0]._id,
        test: data._id,
        bookingDetails,
        user: userData?.user?._id,
    }

    // console.log('payment data = ', JSON.stringify(paymentData, null, 2))


    const makePayments = async () => {
        // console.log('clicked')
        setLoading(true)
        // console.log('payment data ' , JSON.stringify(paymentData, null, 2))
        console.log("userData?.tokens?.access_token",userData?.tokens?.access_token)
        try {

            const response = await fetch(urlPayment, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userData?.tokens?.access_token}`,
                },
                body: JSON.stringify(paymentData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setLoading(false);
                showMessage({
                    message: `Error: ${errorData || 'Unknown error'}`,
                    type: 'danger',
                });
                console.error('Error Payment APIs:', JSON.stringify(errorData, null, 2));
                return;
            }

            const result = await response.json();
            console.log('payment result = ', JSON.stringify(result, null, 2));
            setClientSecret(result.paymentDetails.stripeClientSecret)
            const checkoutSucceeded =  await onCheckout(result.paymentDetails.stripeClientSecret)

            if(checkoutSucceeded)
                await bookAppointment(result.paymentDetails.stripeClientSecret);

            setLoading(false);
            return result;

        } catch (error) {
            setLoading(false);
            showMessage({
                message: `Booking Error: ${error.message || 'Unknown error'}`,
                type: 'danger',
            });
            console.error('initiating payment Error:', error);
        }
    };

    // console.log('appoinment details = ', JSON.stringify(appointmentData, null,2));
    {/* Edited by Yaseen */}
    const bookAppointment = async (clientSecret) => {
        // console.log('clicked')
        setLoading(true)
        appointmentData.stripeClientSecret = clientSecret;
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userData?.tokens?.access_token}`,
                },
                body: JSON.stringify(appointmentData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setLoading(false);
                showMessage({
                    message: `Error: ${errorData || 'Unknown error'}`,
                    type: 'danger',
                });
                console.error('Error booking appointment:', JSON.stringify(errorData, null, 2));
                return;
            }

            const result = await response.json();
            Alert.alert(
                "Lab Test is Booked",
                "Your Lab Test was booked successfully!",
                [
                    {
                        text: "OK",
                        onPress: () => { navigation.goBack() }

                        // router.push('schedule/index1')
                    }
                ]
            );

            setLoading(false);
            return result;

        } catch (error) {
            setLoading(false);
            showMessage({
                message: `Booking Error: ${error.message || 'Unknown error'}`,
                type: 'danger',
            });
            console.error('Booking Error:', error);
        }
    };


    {/* Edited by Yaseen */}
    const onCheckout = async (clientSecret) => {
        console.log( 'client secret = ' , clientSecret)
        let Succeeded = false;
        try {

            // 2. Initialize the Payment Sheet
            const initResponse = await initPaymentSheet({
                merchantDisplayName: 'TeleHealth',

                paymentIntentClientSecret: clientSecret,
            });
            if (initResponse.error) {
                // console.log(initResponse.error);
                Alert.alert('Something went wrong2');
                return;
            }

            // 3. Present the Payment Sheet from Stripe
            const paymentResponse = await presentPaymentSheet({
                clientSecret: clientSecret,
            });

            if (paymentResponse.error) {
                Alert.alert(
                    `Error code: ${paymentResponse.error.code}`,
                    paymentResponse.error.message
                );
                console.log(paymentResponse.error);
                return;
            } else {
                Alert.alert(
                    "Payment Succeeded",
                    "Your payment was successful!",
                    [
                        {
                            text: "OK",
                            onPress: () => { navigation.navigate("parent-screen") }

                            // router.push('schedule/index1')
                        }
                    ]
                );
                Succeeded = true;

            }

            // 4. If payment ok -> create the order
            // onCreateOrder();
        } catch (error) {
            console.error(error);
            Alert.alert('Something went wrong');
        }
        return Succeeded;
    }


    // Generate time slots
    const generateTimeSlots = (start, end, interval) => {
        const timeSlots = [];
        let currentTime = start;

        while (currentTime < end) {
            const nextTime = new Date(currentTime.getTime() + interval * 60000);
            const slot = `${formatTime(currentTime)} - ${formatTime(nextTime)}`;
            timeSlots.push(slot);
            currentTime = nextTime;
        }

        return timeSlots;
    };

    const formatTime = (date) => {
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        const strMinutes = minutes < 10 ? '0' + minutes : minutes;
        return `${hours}:${strMinutes} ${ampm}`;
    };

    const timeSlots = generateTimeSlots(new Date(0, 0, 0, 8, 0), new Date(0, 0, 0, 20, 0), 60); // Generate time slots from 08:00 AM to 08:00 PM with 1 hour interval

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        setIsOptionDropdownVisible(false);
    };

    const handleAvailabilitySelect = (slot) => {
        setAvailability(slot);
        setIsAvailabilityDropdownVisible(false);
    };

    // @ts-ignore
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icons name={'chevron-back'} size={30 * fontRef} color="black" />
                </TouchableOpacity>
                <Text style={styles.title}>{data?.testName}</Text>
            </View>
            <ScrollView nestedScrollEnabled={true} showsVerticalScrollIndicator={false} style={styles.container}>
            <View style={styles.main}>
                <Text style={styles.label}>Select Test Date</Text>
                <Calendar
                    current={selectedDate}
                    minDate={todayDate}
                    markedDates={{
                        [selectedDate]: { selected: true, selectedColor: '#007BFF' },
                    }}
                    onDayPress={(day) => setSelectedDate(day.dateString)}
                />
                <Text style={styles.label}>Test Conducted At</Text>
                <TouchableOpacity style={styles.pickerContainer} onPress={() => setIsOptionDropdownVisible(!isOptionDropdownVisible)}>
                    <Text style={styles.pickerText}>{selectedOption || "Select Option"}</Text>
                    <Icons name={'chevron-down'} size={20 * fontRef} color="gray" />
                </TouchableOpacity>
                {isOptionDropdownVisible && (
                    <View style={styles.dropdown}>
                        {options.map((option, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.dropdownItem}
                                onPress={() => handleOptionSelect(option)}
                            >
                                <Text style={styles.dropdownItemText}>{option}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
                <Text style={[styles.label,{marginTop:10}]}>Booking Details</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Please add your address"
                    placeholderTextColor="#DAD9D9"
                    onChangeText={(text) => setAddress(text)}
                    value={address}
                />
                <TouchableOpacity style={styles.pickerContainer} onPress={() => setIsAvailabilityDropdownVisible(!isAvailabilityDropdownVisible)}>
                    <Text style={styles.pickerText}>{availability || "Please add your availability"}</Text>
                    <Icons name={'chevron-down'} size={20 * fontRef} color="gray" />
                </TouchableOpacity>
                {isAvailabilityDropdownVisible && (
                    <View style={styles.dropdown}>
                        {timeSlots.map((slot, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.dropdownItem}
                                onPress={() => handleAvailabilitySelect(slot)}
                            >
                                <Text style={styles.dropdownItemText}>{slot}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
                <TouchableOpacity style={styles.button} onPress={() => {makePayments()}}>
                    {!loading &&<Text style={styles.buttonText}>Book Now</Text>}
                    {loading && <ActivityIndicator  size={"small"} color={'white'}/> }
                </TouchableOpacity>
            </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SubmitBooking;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10 * heightRef,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 20 * fontRef,
        fontWeight: 'bold',
        color: 'black',
        marginLeft: 10 * widthRef,
    },
    main: {
        flex: 1,
        padding: 20 * heightRef,
    },
    label: {
        fontSize: 18 * fontRef,
        fontWeight: 'bold',
        marginBottom: 10 * heightRef,
        color: 'black',
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#DAD9D9',
        borderRadius: 10,
        marginBottom: 0 * heightRef,
        height: 50 * heightRef,
        // justifyContent: 'center',
        paddingHorizontal: 10 * widthRef,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    pickerText: {
        color: 'black',
        fontSize: 16 * fontRef,
    },
    dropdown: {
        borderWidth: 1,
        borderColor: '#DAD9D9',
        borderRadius: 10,
        marginBottom: 20 * heightRef,
        backgroundColor: 'white',
        elevation: 2,
        // position: 'absolute',
        width: '100%',
        // top: 150 * heightRef, // Adjust this value as needed
        // zIndex: 1000,
    },
    dropdownItem: {
        padding: 15 * heightRef,
        borderBottomWidth: 1,
        borderBottomColor: '#DAD9D9',
    },
    dropdownItemText: {
        fontSize: 16 * fontRef,
        color: 'black',
    },
    input: {
        borderWidth: 1,
        borderColor: '#DAD9D9',
        borderRadius: 10,
        marginBottom: 20 * heightRef,
        padding: 10 * heightRef,
        color: 'black',
        fontSize: 16 * fontRef,
    },
    button: {
        backgroundColor: '#007BFF',
        borderRadius: 10,
        paddingVertical: 15 * heightRef,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20 * heightRef,
    },
    buttonText: {
        color: 'white',
        fontSize: 16 * fontRef,
        fontWeight: 'bold',
    },
});
