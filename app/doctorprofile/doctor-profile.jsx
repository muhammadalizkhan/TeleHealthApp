import React, { useEffect, useState } from "react";
// import { StatusBar } from "expo-status-bar";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDoctorbyId } from "../../constants/APi";

const DoctorScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [doctorData, setDoctorData] = useState(null);
    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getDoctorData = async () => {
            try {
                const response = await AsyncStorage.getItem('DoctorData');
                if (response !== null) {
                    const parsedResponse = JSON.parse(response);
                    setDoctorData(parsedResponse?.user);
                }
            } catch (error) {
                console.log('Error retrieving login response:', error);
            }
        };

        getDoctorData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            if (doctorData) {
                try {
                    // Fetch data from API
                    const doctorsData = await getDoctorbyId(doctorData?._id);
                    setDoctor(doctorsData);
                } catch (error) {
                    console.error('Error fetching doctors:', error);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        fetchData();
    }, [doctorData]);

    console.log('doctor ====> ', doctor)
    // const name = "Dr James";
    // const doctorDescription = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget nunc vitaeLorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget nunc vitaeLorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget nunc vitaeLorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget nunc vitaeLorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget nunc vitae";

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.container}>
                    <View style={{ height: 300, width: 300, justifyContent: "center", alignItems: "center" }}>
                        <Image
                            source={{ uri: doctor?.profileImg }}
                            resizeMode="cover"
                            style={{
                                height: 300,
                                width: 300
                            }}
                        />
                    </View>

                    <View style={styles.innerContainer}>
                        <ScrollView style={styles.sc}>
                            <View style={styles.oval}>
                                <View style={styles.rowspace}>
                                    <View style={styles.cont}>
                                        <Text style={styles.t1}>{doctor?.firstName} {doctor?.lastName}</Text>
                                        <Text style={styles.t2}>{doctor?.speciality[0]?.specialization?.name}</Text>
                                    </View>

                                    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                                        <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'gray' }}>4.5 </Text>
                                        <Image
                                            source={images.star}
                                            resizeMode="cover"
                                            style={{
                                                height: 15,
                                                width: 15
                                            }}
                                        />
                                    </View>
                                </View>
                            </View>
                            <View style={styles.rectContainer}>
                                <View style={styles.rect}>
                                    <Image
                                        source={images.firstAid}
                                        resizeMode="cover"
                                        style={{
                                            height: 20,
                                            width: 20
                                        }}
                                    />
                                    <Text style={styles.t0}> 6 years exp</Text>
                                </View>
                                <View style={styles.rect}>
                                    <Image
                                        source={images.person}
                                        resizeMode="cover"
                                        style={{
                                            height: 20,
                                            width: 20
                                        }}
                                    />
                                    <Text style={styles.t0}>100+ patients</Text>
                                </View>
                                <View style={styles.rect}>
                                    <Image
                                        source={images.location}
                                        resizeMode="cover"
                                        style={{
                                            height: 20,
                                            width: 20
                                        }}
                                    />
                                    <Text style={styles.t0}>{doctorData?.city}</Text>
                                </View>
                            </View>
                            <View style={styles.wr}>
                                <Text style={styles.tq}>Doctor Description</Text>
                            </View>
                            <View style={styles.bitDoctorScreen}>
                                <Text style={styles.greyText}>{doctor?.speciality[0]?.specialization?.description}</Text>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </ScrollView>

            {/* <StatusBar backgroundColor="#161622" style="light" /> */}
        </SafeAreaView>
    );
}

export default DoctorScreen;

const styles = StyleSheet.create({
    rowspace: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    buttonWrapper: {
        marginTop: 10,
        bottom: 0,
        width: '100%',
        alignItems: 'center',
    },
    text4: {
        color: "white",
        fontWeight: "bold"
    },
    loginRealContainer: {
        backgroundColor: "#1877F2",
        height: 50,
        width: Dimensions.get("window").width - 40,
        borderRadius: 24,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20
    },
    sc: {},
    bitDoctorScreen: {
        marginHorizontal: 15,
        marginTop: 5,
    },
    greyText: {
        color: 'grey',
        fontSize:14
    },
    tq: {
        marginLeft: 15,
        fontWeight: "bold",
        fontSize: 24,
        color: "#1877F2",
        margin: 14
    },
    wr: {
        justifyContent: "center",
        alignItems: "flex-start",
        width: (Dimensions.get('window').width),
    },
    t0: {
        fontWeight: "bold",
        color: 'gray'
    },
    rectContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        paddingHorizontal: 15,
    },
    rect: {
        width: 105,
        height: 30,
        borderColor: 'lightgrey',
        borderWidth: 1,
        borderRadius: 10,
        marginRight: 5,
        marginLeft: 5,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    },
    t1: {
        fontSize: 22,
        color: "#1877F2",
        fontWeight: "bold"
    },
    t2: {
        color: "grey"
    },
    cont: {
        justifyContent: "center",
        alignItems: "flex-start"
    },
    oval: {
        height: 90,
        width: Dimensions.get('window').width - 30,
        backgroundColor: "whitesmoke",
        marginTop: 15,
        borderRadius: 20,
        padding: 20,
        marginLeft: 15
    },
    images: {
        display: "flex",
        justifyContent: "flex-end",
        flex: 1,
        width: Dimensions.get("window").width,
        marginTop: "30%"
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: '#ACCEFA',
    },
    innerContainer: {
        backgroundColor: 'white',
        width: '100%',
        height: '55%',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        justifyContent: "flex-start",
        alignItems: "center"
    },
    headerText: {
        marginTop: 60,
        fontWeight: 'bold',
        fontSize: 30,
        justifyContent: 'flex-start',
        marginBottom: 30,
        marginLeft: 20,
    },
    contentContainer: {
        marginLeft: 20,
    },
    footerContainer: {
        marginRight: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    spacer: {
        height: '33%',
    },
    footerText: {
        fontWeight: 'bold',
        fontSize: 15,
    },
    readMore: {
        color: 'blue',
    },
});
