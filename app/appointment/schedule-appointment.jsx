import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, FlatList, Image, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import DatePicker from 'react-native-modern-datepicker';

const ScheduleAappointmnet = ({ navigation }) => {
    const route = useRoute();
    const { doctorName, doctorImage } = route.params;
    const [expanded, setExpanded] = useState(false);
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState('12/12/2023');
    const [selectedType, setSelectedType] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);

    const handleDate = (propDate) => {
        setOpen(propDate);
    };

    const handleCalendarPress = () => {
        setOpen(!open);
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

    // Times array from 10:00 AM to 4:00 PM
    const times = Array.from({ length: 7 }, (_, index) => ({
        id: String(index),  // FlatList requires a unique key as a string
        time: `${10 + index}:00 AM` // Adjust time format
    })).map((t, i) => {
        // Convert 12:00 AM to 12:00 PM and onwards
        return i >= 2 ? { ...t, time: `${i - 2}:00 PM` } : t;
    });

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <View style={styles.container}>
                <View style={styles.mainC}>
                    <View style={styles.avatar}>
                        <Image
                            source={{ uri: doctorImage }} // or use the uri prop for network images
                            style={styles.imageStyle}
                        />
                    </View>
                    <View style={styles.g1}>
                        <Text style={styles.h12}>{doctorName}</Text>
                        <Text style={styles.h2}>Cardiologist</Text>
                    </View>
                </View>
                <View style={styles.innerContainer}>
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
                        <View style={styles.buttons}>
                            <Text>Categories</Text>
                            <AntDesign name={'down'} size={24} color="black" />
                        </View>
                        <View style={styles.buttons}>
                            <Text>Sub Categories</Text>
                            <AntDesign name={'down'} size={24} color="black" />
                        </View>
                    </View>
                    <View style={styles.spacer}></View>
                    <TouchableOpacity onPress={handleCalendarPress}>
                        <View style={styles.calender}>
                            <Text style={{ color: "white", fontWeight: "bold" }}>choose date</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.spacer}></View>
                    <View style={styles.wrapr}>
                        <Text style={styles.h1}>Choose Time</Text>
                    </View>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={open}
                    >
                        <View style={styles.centeredView}>
                            <View style={[styles.modalView, open && styles.smallModal]}>
                                <DatePicker
                                    mode='calendar'
                                    selected={date}
                                />
                                <TouchableOpacity onPress={handleCalendarPress}>
                                    <Text>close</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                    <FlatList
                        data={times}
                        renderItem={renderTimeButton}
                        keyExtractor={item => item.id}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        style={styles.listContainer}
                    />
                    <View style={styles.wrapr}>
                        <Text style={styles.h1}>Duration</Text>
                    </View>
                    <View style={styles.wraprC}>
                        <View style={styles.buttons}>
                            <Text>15 min</Text>
                            <AntDesign name={'down'} size={24} color="black" />
                        </View>
                    </View>
                    <TouchableOpacity onPress={
                        // onCheckout
                        () =>      navigation.navigate('confirm-appointment', {
                            doctorName1:doctorName,
                            doctorImage:doctorImage,
                         }
                     )
                    }>
                        <View style={styles.calender}>
                            <Text style={{ color: "white", fontWeight: "bold" }}>Book Appointment</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <StatusBar backgroundColor="#161622" style="light" />
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
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        width: "98%",
        padding: 35,
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
        alignItems: "flex-start",
        marginLeft: 10
    },
    mainC: {
        flexDirection: "row",
        width: Dimensions.get("window").width - 30,
        marginBottom: 20,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        overflow: 'hidden',
    },
    imageStyle: {
        width: '100%',
        height: '100%',
    },
    calender: {
        width: Dimensions.get("window").width - 40,
        height: 50,
        backgroundColor: "#1877F2",
        borderRadius: 24,
        marginTop: 10,
        marginBottom: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    listContainer: {
        flexGrow: 0,
        paddingVertical: 5,
        marginLeft: 10
    },
    buttons: {
        height: 45,
        width: Dimensions.get("window").width - 30,
        backgroundColor: "lightgrey",
        borderRadius: 10,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: 'row',
        paddingLeft: 15,
        paddingRight: 15,
        marginBottom: 4
    },
    wraprC: {
        justifyContent: "center",
        alignItems: "center"
    },
    spacer: {
        height: 10,
    },
    nameC: {
        height: 33,
        width: 120,
        backgroundColor: "lightgrey",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 12,
        marginLeft: 10
    },
    timeButton: {
        height: 33,
        width: 80,
        backgroundColor: "lightgrey",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 12,
        marginLeft: 10
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
        color: "white",
        fontSize: 15
    },
    h12: {
        color: "white",
        fontSize: 22,
        fontWeight: "bold"
    },
    h1: {
        fontSize: 15,
        fontWeight: "bold",
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: '#ACCEFA',
        position: 'relative',
    },
    innerContainer: {
        backgroundColor: 'white',
        width: '100%',
        height: '77%',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        justifyContent: "flex-start",
        alignItems: "center",
        position: "relative"
    },
});
