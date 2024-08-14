import React, { useEffect, useState } from "react";
// import { StatusBar } from "expo-status-bar";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDoctorbyId } from "../../constants/APi";
import {fontRef, heightRef, widthRef} from "../../constants/screenSize";
import Iconss from "react-native-vector-icons/dist/Ionicons";

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
                    <View style={{ height: 310 * heightRef, width: 280 * widthRef, justifyContent: "center", alignItems: "center" }}>
                        <Image
                            source={{ uri: doctor?.profileImg }}
                            resizeMode="cover"
                            style={{
                                height: 280 * heightRef ,
                                width: 280 * heightRef
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
                                        <Text style={{ fontSize: 25 * fontRef, fontWeight: 'bold', color: 'gray' }}>4.5 </Text>
                                        <Image
                                            source={images.star}
                                            resizeMode="cover"
                                            style={{
                                                height: 15 * heightRef,
                                                width: 15 * heightRef
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
                                            height: 20 * heightRef,
                                            width: 20 * heightRef
                                        }}
                                    />
                                    <Text style={styles.t0}> 6 years exp</Text>
                                </View>
                                <View style={styles.rect}>
                                    <Image
                                        source={images.person}
                                        resizeMode="cover"
                                        style={{
                                            height: 20 * heightRef,
                                            width: 20 * heightRef
                                        }}
                                    />
                                    <Text style={styles.t0}>100+ patients</Text>
                                </View>
                                <View style={styles.rect}>
                                    <Image
                                        source={images.location}
                                        resizeMode="cover"
                                        style={{
                                            height: 20 * heightRef,
                                            width: 20 * heightRef
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
                <TouchableOpacity style={{marginLeft:15, backgroundColor:'white',
                    marginBottom:15, borderRadius:8, position:'absolute', top:20, left:10,
                    padding:0, width:40, height:40, justifyContent:'center',
                    alignItems:'center'}}
                                  onPress={() => navigation.openDrawer()}>
                    <Iconss name={'menu'} size={35} color={'#1877F2'}  />

                </TouchableOpacity>
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
        marginTop: 10 * heightRef,
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
        height: 50 * heightRef,
        width: Dimensions.get("window").width - 40,
        borderRadius: 24 * heightRef,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20 * heightRef
    },
    sc: {},
    bitDoctorScreen: {
        marginHorizontal: 15 * widthRef,
        marginTop: 5 * heightRef,
    },
    greyText: {
        color: 'grey',
        fontSize:16 * fontRef
    },
    tq: {
        marginLeft: 15 * widthRef,
        fontWeight: "bold",
        fontSize: 24 * fontRef,
        color: "black",
        margin: 14 * heightRef
    },
    wr: {
        justifyContent: "center",
        alignItems: "flex-start",
        width: (Dimensions.get('window').width),
    },
    t0: {
        fontWeight: "bold",
        color: 'gray',
        fontSize: 12 * fontRef,
    },
    rectContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20 * heightRef,
        paddingHorizontal: 15 * widthRef,
    },
    rect: {
        width: 105 * widthRef,
        height: 30  * heightRef,
        borderColor: 'lightgrey',
        borderWidth: 1,
        borderRadius: 10,
        marginRight: 5  * widthRef,
        marginLeft: 5 * widthRef,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    },
    t1: {
        fontSize: 22 * fontRef,
        color: "black",
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
        height: 90  * heightRef,
        width: Dimensions.get('window').width - 30,
        backgroundColor: "whitesmoke",
        marginTop: 15   * heightRef,
        borderRadius: 20,
        padding: 20 * heightRef,
        marginLeft: 15 * widthRef,
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
        marginTop: 60 * heightRef,
        fontWeight: 'bold',
        fontSize: 30 * fontRef,
        justifyContent: 'flex-start',
        marginBottom: 30 * heightRef,
        marginLeft: 20 * widthRef,
    },
    contentContainer: {
        marginLeft: 20 * widthRef,
    },
    footerContainer: {
        marginRight: 20 * widthRef,
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
        fontSize: 15 * fontRef,
    },
    readMore: {
        color: 'blue',
    },
});
