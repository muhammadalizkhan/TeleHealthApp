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
import {Calendar} from "react-native-calendars";


const ScheduleAappointmnet = ({ navigation }) => {

    const durations = [
        { id: '1', duration: 30 },
    ];

    const route = useRoute();
    const { data } = route.params;
    console.log('data ', JSON.stringify(data, null,2))
    const [expanded, setExpanded] = useState(false);
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState('12/12/2023');
    const [selectedType, setSelectedType] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [cat, setCat] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenD, setIsOpenD] = useState(false);
    const [selectedCat, setSelectedCat] = useState(null);
    const [selectDur, setSelectDur] = useState(durations[0]);
    const [startDate, setStartDate] =  useState(new Date().toISOString().split('T')[0]);
    const [availability, setAvailability] = useState('');

    console.log('start date ', startDate)
    const [startDateObj, setStartDateObj] = useState(new Date());
    const [startDatePicker, setStartDatePicker] = useState(false);
    const [endDate, setEndDate] = useState(null);
    const [isOpenC, setIsOpenC] = useState(false);
   const [selectedCatC, setSelectedCatC] = useState(null);
  const [isOpenT, setIsOpenT] = useState(false)
    const [timeSlots, setTimeSlots] = useState([]);

    const currentDateTime = new Date();
   console.log('selectedCatC ',selectedCatC)

    useEffect(() => {
        // Initial setting of categories based on selected type
        filterCategories(selectedType);
    }, [selectedType]);

    useEffect(() => {
        if (startDate) {
            calculateEndDate(startDate, selectDur.duration);
        }
    }, [startDate]);

    const filterCategories = (type) => {
        if (!data || !data.speciality[0] || !data.speciality[0].subSpecializations) return;

        const eligibility = type === 'In Person' ? 'physical' : 'virtual';
        const filteredCat = data.speciality[0].subSpecializations.filter(sub => sub.eligibility === eligibility);
        setCat(filteredCat);
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const toggleDropdownC = () => {
        setIsOpenC(!isOpenC);
    };

    const toggleDuration = () => {
        setIsOpenD(!isOpenD);
    };

    const toggleDurationT = () => {
        setIsOpenT(!isOpenT);
    };

    const handleCategorySelect = (category) => {
        setSelectedCat(category);
        setIsOpen(false);
    };

    const handleCategorySelectC = (category) => {
        setSelectedCatC(category);
        setIsOpenC(false);
    };

    const handledurationSelect = (duration) => {
        setSelectDur(duration);
        setIsOpenD(false);
        calculateEndDate(startDate, duration.duration);
    };



    const calculateEndDate = (start, duration) => {
        if (start && duration) {
            const startMoment = moment(start, "DD-MM-YYYY hh:mm A");
            const endMoment = startMoment.add(duration, 'minutes');
            const formattedEndDate = endMoment.format("DD-MM-YYYY hh:mm A");
            setEndDate(formattedEndDate);
        }
    };

    const handleCalendarPress = () => {
        setStartDatePicker(!startDatePicker);
    };

    const handleTypeSelect = (type) => {
        setSelectedType(type);
        setSelectedCat(null);
        setSelectedCatC(null)// Reset the selected category
        filterCategories(type);  // Update the cat list based on the selected type
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

    // const timeSlots = generateTimeSlots(new Date(0, 0, 0, 8, 0), new Date(0, 0, 0, 20, 0), 30); // Generates 30-minute intervals

    useEffect(() => {
        const now = new Date();
        const selectedDate = new Date(startDate);

        let startTime;

        // Check if the selected date is today or a future date
        if (selectedDate.toDateString() === now.toDateString()) {
            // Start from the current time if the selected date is today
            startTime = now;
        } else {
            // Start from the beginning of the day if the selected date is a future date
            startTime = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), 8, 0);
        }

        // Set the end time for 8 PM
        const endTime = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), 20, 0);

        // Generate time slots
        const slots = generateTimeSlots(startTime, endTime, 30);
        setTimeSlots(slots);
        setAvailability(' ')
    }, [startDate]);

    const handleAvailabilitySelect = (slot) => {
        setSelectDur({ duration: slot });
        setAvailability(slot);
        setIsOpenT(false);
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

    const handleBookAppointment = () => {
        // Ensure the duration is correctly set
        if (selectDur.duration && typeof selectDur.duration === 'string' && selectDur.duration.includes(' - ')) {
            // Split the selected duration into 'from' and 'to' times
            const [fromTime, toTime] = selectDur.duration.split(' - ');

            const appointmentDetails = {
                doctor: data,
                startDate,
                endDate,
                type: selectedType,
                category: selectedCat,
                duration: selectDur.duration,  // Full slot duration
                fromTime,  // Extracted 'from' time
                toTime,    // Extracted 'to' time
            };

            navigation.navigate('confirm-appointment', {
                appointmentDetails: appointmentDetails
            });
        } else {
            // Handle the case where selectDur.duration is not defined or not a valid string
            console.error('Duration is not defined or is not in the correct format');
        }
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
            <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 160 }}
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

                        <View style={styles.spacer}></View>
                        <View style={styles.wrapr}>
                            <Text style={styles.h1}>Type</Text>
                        </View>
                        <View style={styles.wrapr}>
                            {renderTypeButton('In Person')}
                            {renderTypeButton('Online')}
                        </View>
                        <View style={styles.wrapr}>
                            <Text style={styles.h1}>Disease</Text>
                        </View>
                        <View style={styles.spacer}></View>
                        <View style={styles.wraprC}>
                            <TouchableOpacity style={styles.buttons} onPress={toggleDropdownC}>
                                <Text style={{color:'black'}}>{selectedCatC?.specialization?.name || 'Category'}</Text>
                                <Icons name={isOpenC ? 'chevron-up' : 'chevron-down'} size={24} color="black" />
                            </TouchableOpacity>

                            {isOpenC && (
                                <View style={styles.dropdown}>
                                    {data?.speciality?.length === 0 ? (
                                        <Text style={{ color: 'black', padding: 15 }}>No categories available</Text>
                                    ) : (
                                        <FlatList
                                            nestedScrollEnabled={true}
                                            data={data.speciality}
                                            style={{ flex: 1, maxHeight: 250 }}
                                            renderItem={({ item: category }) => (
                                                <TouchableOpacity
                                                    key={category._id}
                                                    style={styles.dropdownItem}
                                                    onPress={() => handleCategorySelectC(category)}
                                                >
                                                    <Text style={{ color: 'black' }}>{category.specialization.name}</Text>
                                                </TouchableOpacity>
                                            )}
                                            keyExtractor={item => item._id}
                                        />
                                    )}
                                </View>
                            )}
                        </View>
                        <View style={styles.spacer}></View>
                        <View style={styles.wraprC}>
                            <TouchableOpacity style={styles.buttons} onPress={toggleDropdown}>
                                <Text style={{color:'black'}}>{selectedCat?.name || 'Sub Categories'}</Text>
                                <Icons name={isOpen ? 'chevron-up' : 'chevron-down'} size={24} color="black" />
                            </TouchableOpacity>
                            {isOpen && (
                                <View style={styles.dropdown}>
                                    {cat.length === 0 ? (
                                        <Text style={{ color: 'black', padding: 15 }}>No categories available</Text>
                                    ) : (
                                        <FlatList
                                            nestedScrollEnabled={true}
                                            data={cat}
                                            style={{ flex: 1, maxHeight: 250 }}
                                            renderItem={({ item: category }) => (
                                                <TouchableOpacity
                                                    key={category._id}
                                                    style={styles.dropdownItem}
                                                    onPress={() => handleCategorySelect(category)}
                                                >
                                                    <Text style={{ color: 'black' }}>{category.name}</Text>
                                                </TouchableOpacity>
                                            )}
                                            keyExtractor={item => item._id}
                                        />
                                    )}
                                </View>
                            )}
                        </View>
                        <View style={styles.wrapr}>
                            <Text style={styles.h1}>Select date</Text>
                        </View>

                        {/*<TouchableOpacity onPress={handleCalendarPress}>*/}
                        {/*    <View style={styles.calender}>*/}
                        {/*        <Text style={{ color: "white", fontWeight: "bold" }}>{startDate || 'choose date'}</Text>*/}
                        {/*    </View>*/}
                        {/*</TouchableOpacity>*/}


                        {/*<DateTimePickerModal*/}
                        {/*    isVisible={startDatePicker}*/}
                        {/*    mode="datetime"*/}
                        {/*    date={startDate ? moment(startDate, "DD-MM-YYYY hh:mm A").toDate() : new Date()}*/}
                        {/*    minimumDate={currentDateTime}*/}
                        {/*    onConfirm={(date) => {*/}
                        {/*        const formattedDate = moment(date).format("DD-MM-YYYY hh:mm A");*/}
                        {/*        console.log("start date", formattedDate);*/}
                        {/*        setStartDate(formattedDate);*/}
                        {/*        setStartDatePicker(false);*/}
                        {/*    }}*/}
                        {/*    onCancel={() => {*/}
                        {/*        setStartDatePicker(false);*/}
                        {/*    }}*/}
                        {/*    is24Hour={false}*/}
                        {/*/>*/}
                        <TouchableOpacity onPress={handleCalendarPress}>
                            <View style={styles.calender}>
                                <Text style={{ color: "white", fontWeight: "bold" }}>
                                    {startDate ? moment(startDate).format("DD-MM-YYYY") : 'choose date'}
                                </Text>
                            </View>
                        </TouchableOpacity>

                        {/*{startDatePicker && (*/}
                        {/*    <View style={{ width: '100%' }}>*/}
                        {/*        <Calendar*/}
                        {/*            current={startDate}*/}
                        {/*            minDate={moment().format('YYYY-MM-DD')}*/}
                        {/*            markedDates={{*/}
                        {/*                [startDate]: { selected: true, selectedColor: '#007BFF' },*/}
                        {/*            }}*/}
                        {/*            onDayPress={(day) => {*/}
                        {/*                setStartDate(day.dateString); // Store original date*/}
                        {/*                setStartDatePicker(false);*/}
                        {/*            }}*/}
                        {/*        />*/}
                        {/*    </View>*/}
                        {/*)}*/}
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
                            <Text style={{color:'black'}}>{selectDur.duration + ' mints' || 'Select Duration'}</Text>
                            <Icons name={isOpen ? 'chevron-up' : 'chevron-down'} size={24} color="black" />
                        </TouchableOpacity>
                        {isOpenD && (
                            <View style={styles.dropdownD}>
                                <FlatList
                                    nestedScrollEnabled={true}
                                    data={durations}
                                    style={{ flex: 1, maxHeight: 250 }}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            key={item.id}
                                            style={styles.dropdownItem}
                                            onPress={() => handledurationSelect(item)}
                                        >
                                            <Text style={{ color: 'black' }}>{item.duration} minutes</Text>
                                        </TouchableOpacity>
                                    )}
                                    keyExtractor={item => item.id}
                                />
                            </View>
                        )}

                        <View style={styles.wrapr}>
                            <Text style={styles.h1}>Select time</Text>
                        </View>

                        <TouchableOpacity style={styles.buttons} onPress={toggleDurationT}>
                            <Text style={{color:'black'}}>{availability || "Please add your availability"}</Text>
                            <Icons name={isOpen ? 'chevron-up' : 'chevron-down'} size={24} color="black" />
                        </TouchableOpacity>
                        {isOpenT && (
                            <View style={styles.dropdownD}>
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
                    {/*<View style={styles.wrapr}>*/}
                    {/*        <Text style={styles.h1}>To</Text>*/}
                    {/*    </View>*/}

                    {/*      <View style={styles.calender}>*/}
                    {/*            <Text style={{ color: "white", fontWeight: "bold" }}>{endDate? endDate : 'Choose Date'}</Text>*/}
                    {/*        </View>*/}

                        {/* <View style={styles.wrapr}>
                            <Text style={styles.h1}>{endDate}</Text>
                        </View> */}

                        <TouchableOpacity onPress={
                            // onCheckout
                            () =>handleBookAppointment()
                        }>
                            <View style={[styles.calender,{marginBottom: 30}]}>
                                <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>Book Appointment</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={{
                        position: 'absolute', width: '100%', height: 70 * heightRef,
                        top: 10, paddingHorizontal: 15, paddingVertical: 8,
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

                {/* Modal to open the Calendar */}
                <Modal
                    transparent={true}
                    visible={startDatePicker}
                    animationType='fade'
                    onRequestClose={() => setStartDatePicker(false)} // Close modal on back button press (Android)
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.calendarContainer}>
                            {/* Close Button */}
                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={() => setStartDatePicker(false)}
                            >
                                <Icons name="close" size={20} color="white" />
                            </TouchableOpacity>
                            <Calendar
                                current={startDate}
                                minDate={moment().format('YYYY-MM-DD')}
                                markedDates={{
                                    [startDate]: { selected: true, selectedColor: '#007BFF' },
                                }}
                                onDayPress={(day) => {
                                    setStartDate(day.dateString); // Store original date
                                    setStartDatePicker(false);    // Close the modal after selecting a date
                                }}
                            />
                        </View>
                    </View>
                </Modal>
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
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    },
    calendarContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '90%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    closeButton: {
        backgroundColor:'red',
        position: 'absolute',
        top: 10,
        borderRadius:20,
        right: 10,
        padding:2,
        zIndex: 10, // Ensure the close button is above the calendar
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
    dropdownItemText: {
        fontSize: 16 * fontRef,
        color: 'black',
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
        borderColor: "#2280D8",
        borderWidth:1,
        backgroundColor: "#2280D8",  // light blue color

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
