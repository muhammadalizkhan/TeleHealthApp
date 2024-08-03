import React, { useEffect, useState } from "react";
// import { StatusBar } from "expo-status-bar";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, FlatList, Image, Modal, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from '@react-navigation/native';
import DatePicker from 'react-native-modern-datepicker';
import Icons from 'react-native-vector-icons/dist/Ionicons';
import { images } from "../../constants";
import { getCategories } from "../../constants/APi";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import {fontRef, heightRef, widthRef} from "../../constants/screenSize";


const ScheduleAappointmnet = ({ navigation }) => {


    const durations = [
        { id: '1', duration: 15 },
        { id: '2', duration: 30 },
        { id: '3', duration: 45 },
        { id: '4', duration: 60 }
    ];
    const route = useRoute();
    const { data } = route.params;
    console.log('data ', JSON.stringify(data, null, 2))
    const [expanded, setExpanded] = useState(false);
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState('12/12/2023');
    const [selectedType, setSelectedType] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [cat, setCat] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenD, setIsOpenD] = useState(false);
    const [selectedCat, setSelectedCat] = useState(null);
    const [selectDur, setSelectDur] = useState(durations[0])
    // Initially no category selected
    const [startDate, setStartDate] = useState(null);
    const [startDateObj, setStartDateObj] = useState(new Date());
    const [startDatePicker, setStartDatePicker] = useState(false);
    const [endDate, setEndDate] = useState(null);

    console.log('selected cat ' , selectedCat)
    console.log('startDate', startDate)
    // Function to handle category selection
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const toggleDuration = () => {
        setIsOpenD(!isOpenD);
    };

    useEffect(() => {
        setCat(data?.speciality[0]?.subSpecializations);
        console.log('cat ', selectedCat);
        if (selectedCat?.eligibility === 'virtual') {
            setSelectedType('Online'); // Set default type to Online for virtual eligibility
        }
        else {
            setSelectedType('In Person'); // Set default type to In Person for physical eligibility
        }
        setSelectDur(selectedCat?.billingPlans[0]?.duration);
    }, [selectedCat]);

    useEffect(() => {
        if (startDate ) {
            calculateEndDate(startDate, selectDur);

        }
    }, [startDate]);


    const handleCategorySelect = (category) => {
        setSelectedCat(category);
        setIsOpen(false); // Close dropdown after selection
    };

    const handledurationSelect = (duration) => {
        setSelectDur(duration);
        setIsOpenD(false); // Close dropdown after selection
        calculateEndDate(startDate, duration.duration); // Calculate end date when duration is selected
    };

    const calculateEndDate = (start, duration) => {
        if (start && duration) {
            const startMoment = moment(start, "DD-MM-YYYY hh:mm A");
            const endMoment = startMoment.add(duration, 'minutes');
            const formattedEndDate = endMoment.format("DD-MM-YYYY hh:mm A");
            setEndDate(formattedEndDate);
        }
    };

    const handleDate = (propDate) => {
        setOpen(propDate);
    };

    const handleCalendarPress = () => {
        setStartDatePicker(!startDatePicker)
    };

    const toggleDescription = () => {
        setExpanded(!expanded);
    };

    const handleTypeSelect = (type) => {
        setSelectedType(type);
    };

    const handleTimeSelect = (time) => {
        setSelectedTime(time);
    };

    const renderTypeButton = (type) => (
        <TouchableOpacity onPress={() => handleTypeSelect(type)}>
            <View style={[styles.nameC, selectedType === type && styles.selectedButton]}>
                <Text style={selectedType === type ? styles.selectedButtonText : styles.buttonText}>{type}</Text>
            </View>
        </TouchableOpacity>
    );

    const renderTimeButton = ({ item }) => (
        <TouchableOpacity onPress={() => handleTimeSelect(item.time)}>
            <View style={[styles.timeButton, selectedTime === item.time && styles.selectedTimeButton]}>
                <Text style={selectedTime === item.time ? styles.selectedTimeButtonText : styles.buttonText}>{item.time}</Text>
            </View>
        </TouchableOpacity>
    );

      // Function to handle booking the appointment
      const handleBookAppointment = () => {
        const appointmentDetails = {
            doctor: data,
            startDate,
            endDate,
            type: selectedType,
            category: selectedCat,
            duration: selectDur.duration,
        };

        navigation.navigate('confirm-appointment', {
            appointmentDetails: appointmentDetails
        });
    };


    // Times array from 10:00 AM to 4:00 PM
    const times = Array.from({ length: 7 }, (_, index) => ({
        id: String(index),  // FlatList requires a unique key as a string
        time: `${10 + index}:00 AM` // Adjust time format
    })).map((t, i) => {
        // Convert 12:00 AM to 12:00 PM and onwards
        return i >= 2 ? { ...t, time: `${i - 2}:00 PM` } : t;
    });

    // useEffect(() => {
    //     setCat(data?.speciality[0]?.subSpecializations);
    //     console.log('cat ',selectedCat)
    //     setSelectDur(selectedCat?.billingPlans[0]?.duration)
    // }, []);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 120 }}
                showsVerticalScrollIndicator>

                <View style={styles.container}>

                    <View style={styles.innerContainer}>
                        <View style={styles.mainC}>
                            <View style={styles.avatar}>
                                <Image
                                    source={{ uri: data.profileImg }}                       // or use the uri prop for network images
                                    style={styles.imageStyle}
                                    // resizeMode='stretch'
                                />
                            </View>

                        </View>
                        <View style={styles.g1}>
                            <Text style={styles.h12}>{data.firstName} {data.lastName}</Text>
                            <Text style={styles.h2}>{data.speciality[0].specialization.name}</Text>
                        </View>
                        <View style={styles.wrapr}>
                            <Text style={styles.h1}>Disease</Text>
                        </View>
                        <View style={styles.spacer}></View>
                        <View style={styles.wraprC}>
                            <TouchableOpacity style={styles.buttons} onPress={toggleDropdown}>
                                <Text style={{color:'black'}}>{selectedCat?.name || 'Select Category'}</Text>
                                <Icons name={isOpen ? 'chevron-up' : 'chevron-down'} size={24} color="black" />
                            </TouchableOpacity>
                            {isOpen && (
                                <View style={styles.dropdown}>
                                    <FlatList
                                        nestedScrollEnabled={true}
                                        data={cat}
                                        style={{ flex: 1, maxHeight: 250 }}
                                        renderItem={({ item: category }) => (
                                            <TouchableOpacity
                                                key={category._id} // Ensure unique key
                                                style={styles.dropdownItem}
                                                onPress={() => handleCategorySelect(category)}
                                            >
                                                <Text style={{color:'black'}}>{category.name}</Text>
                                            </TouchableOpacity>
                                        )}
                                        keyExtractor={item => item._id}
                                    />
                                </View>
                            )}
                        </View>
                        <View style={styles.spacer}></View>
                        <View style={styles.wrapr}>
                            <Text style={styles.h1}>Type</Text>
                        </View>
                        <View style={styles.wrapr}>
                            {renderTypeButton('In Person')}
                            {renderTypeButton('Online')}
                        </View>

                        <View style={styles.wrapr}>
                            <Text style={styles.h1}>From</Text>
                        </View>

                        <View style={styles.spacer}></View>
                        <TouchableOpacity onPress={handleCalendarPress}>
                            <View style={styles.calender}>
                                <Text style={{ color: "white", fontWeight: "bold" }}>{startDate || 'choose date'}</Text>
                            </View>
                        </TouchableOpacity>


                        <DateTimePickerModal
                            isVisible={startDatePicker}
                            mode="datetime"
                            date={startDate ? moment(startDate, "DD-MM-YYYY hh:mm A").toDate() : new Date()}
                            onConfirm={(date) => {
                                const formattedDate = moment(date).format("DD-MM-YYYY hh:mm A");
                                console.log("start date", formattedDate);
                                setStartDate(formattedDate);
                                setStartDatePicker(false);
                            }}
                            onCancel={() => {
                                setStartDatePicker(false);
                            }}
                            is24Hour={false}
                        // backgroundColor={'#2280D8'}
                        />

                        <View style={styles.wrapr}>
                            <Text style={styles.h1}>Duration</Text>
                        </View>
                        {/* <View style={styles.wraprC}>
                            <View style={styles.buttons}>
                                <Text>15 min</Text>
                                <Icons name={'chevron-down'} size={24} color="black" />
                            </View>
                        </View> */}
                        <TouchableOpacity style={styles.buttons} onPress={toggleDuration}>
                            <Text style={{color:'black'}}>{selectDur + ' mints' || 'Select Duration'}</Text>
                            <Icons name={isOpen ? 'chevron-up' : 'chevron-down'} size={24} color="black" />
                        </TouchableOpacity>

                    <View style={styles.wrapr}>
                            <Text style={styles.h1}>To</Text>
                        </View>

                          <View style={styles.calender}>
                                <Text style={{ color: "white", fontWeight: "bold" }}>{endDate? endDate : 'Choose Date'}</Text>
                            </View>

                        {/* <View style={styles.wrapr}>
                            <Text style={styles.h1}>{endDate}</Text>
                        </View> */}

                        <TouchableOpacity onPress={
                            // onCheckout
                            () =>handleBookAppointment()
                        }>
                            <View style={styles.calender}>
                                <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>Book Appointment</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={{
                        position: 'absolute', width: '100%', height: 70 * heightRef,
                        top: 0, paddingHorizontal: 15, paddingVertical: 8,
                        flexDirection: 'row', marginTop: 0
                    }}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Icons name={'chevron-back'} size={30} color="white" />

                        </TouchableOpacity>
                        <Text style={{
                            color: 'white', fontSize: 22, fontWeight: 'bold',
                            marginLeft: 10
                        }}>Appoinment</Text>
                    </View>
                </View>
                {/* <StatusBar backgroundColor="#161622" style="light" /> */}
            </ScrollView>

        </SafeAreaView>
    );
}

export default ScheduleAappointmnet;

const styles = StyleSheet.create({
    backdrop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'black',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22 * heightRef,
    },
    modalView: {
        margin: 20 * heightRef,
        backgroundColor: "white",
        borderRadius: 20,
        width: "98%",
        padding: 35 * heightRef,
        alignItems: 'center',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    g1: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 10 * widthRef,
        marginTop: 90 * heightRef
    },
    mainC: {
        width: '100%',
        marginBottom: 20 * widthRef,
    },
    avatar: {
        position: 'absolute',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        top: -60 * heightRef,
        left: 120 * widthRef,
        width: 170 * heightRef,
        height: 170 * heightRef,
        borderRadius: 100,
        overflow: 'hidden',
    },
    imageStyle: {
        width: '100%',
        height: '100%',
    },
    calender: {
        width: Dimensions.get("window").width - 40,
        height: 60 * heightRef,
        backgroundColor: "#1877F2",
        borderRadius: 24,
        marginTop: 10 * heightRef,
        marginBottom: 10 * heightRef,
        justifyContent: "center",
        alignItems: "center"
    },
    listContainer: {
        flexGrow: 0,
        paddingVertical: 5 * heightRef,
        marginLeft: 10 * widthRef,
    },
    buttons: {
        height: 55 * heightRef,
        width: Dimensions.get("window").width - 30,
        backgroundColor: "#F3F3F3",
        borderRadius: 10,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: 'row',
        paddingLeft: 15 * widthRef,
        paddingRight: 15 * widthRef,
        marginBottom: 4
    },
    wraprC: {
        justifyContent: "center",
        alignItems: "center"
    },
    spacer: {
        height: 10 * heightRef,
    },
    nameC: {
        height: 50 * heightRef,
        width: 120 * widthRef,
        backgroundColor: "#F3F3F3",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 12,
        marginLeft: 10 * widthRef
    },
    timeButton: {
        height: 33 * heightRef,
        width: 80 * widthRef,
        backgroundColor: "#F3F3F3",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 12,
        marginLeft: 10 * widthRef
    },
    selectedButton: {
        backgroundColor: "#2280D8",
    },
    selectedTimeButton: {
        backgroundColor: "#2280D8",  // light blue color
    },
    buttonText: {
        color: "black",
    },
    selectedButtonText: {
        color: "white",
        fontWeight: "bold",
    },
    selectedTimeButtonText: {
        color: "white",
        fontWeight: "bold",
    },
    wrapr: {
        flexDirection: "row",
        alignItems: "flex-start",
        width: Dimensions.get("window").width,
        marginTop: 5,
        paddingLeft: 15,
        marginBottom: 5
    },
    h2: {
        color: "black",
        fontSize: 15 * fontRef,
        textAlign: 'center'
    },
    h12: {
        color: "black",
        fontSize: 22 * fontRef,
        fontWeight: "bold"
    },
    h1: {
        fontSize: 18 * fontRef,
        fontWeight: "bold",
        color: 'black'
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: "#1877F2",
        position: 'relative',
    },
    innerContainer: {
        backgroundColor: 'white',
        width: '100%',
        height: '82%',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        justifyContent: "flex-start",
        alignItems: "center",
        position: "relative"
    },
    dropdownButton: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        width: 200 * widthRef,
        marginBottom: 10 ,
    },
    dropdown: {
        position: 'absolute',
        top: 60, // Adjust this based on your UI requirements
        width: '90%',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        backgroundColor: '#fff',
        zIndex: 1000,
    },
    dropdownD: {
        // position: 'absolute',
        // bottom: 0, // Adjust this based on your UI requirements
        width: '90%',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        backgroundColor: '#fff',
        zIndex: 1000,
    },
    dropdownItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});
