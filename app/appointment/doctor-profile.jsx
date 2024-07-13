import React, { useState } from "react";
// import { StatusBar } from "expo-status-bar";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Icons, images } from "../../constants";
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import Iconss from 'react-native-vector-icons/dist/Ionicons';

const DoctorProfile = () => {
    const navigation = useNavigation();
    const route = useRoute();
    // const { name, description } = route.query;
    const { data } = route.params;
    console.log('data ', JSON.stringify(data, null,2 ))
    const [expanded, setExpanded] = useState(false);

    const toggleDescription = () => {
        setExpanded(!expanded);
    };

    // const description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget nunc vitaeLoreorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget nunc vitaeLore orem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget nunc vitaeLorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget nunc vitaeLorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget nunc vitae";

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.container}>




                    <View style={{ height: 300, width: 300, justifyContent: "center", alignItems: "center" }}>


                        <Image
                           source={{ uri: data.profileImg }}
                            resizeMode="cover"

                            style={{

                                height: 250,
                                width: 250,
                                marginTop:50


                            }}


                        />


                    </View>

                    <View style={styles.innerContainer}>
                        <ScrollView style={styles.sc}>
                            <View style={styles.oval}>
                                <View style={styles.rowspace}>

                                    <View style={styles.cont}>
                                        <Text style={styles.t1}>{data.firstName} {data.lastName}</Text>
                                        <Text style={styles.t2}>{data.speciality[0].specialization.name}</Text>
                                    </View>

                                    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>

                                        <Text style={{ fontSize: 25, fontWeight: 'bold' }}>4.5 </Text>

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
                                    <Text style={styles.t0}> 6 years exp</Text></View>
                                <View style={styles.rect}>

                                    <Image
                                        source={images.person}
                                        resizeMode="cover"

                                        style={{

                                            height: 20,
                                            width: 20



                                        }}


                                    />

                                    <Text style={styles.t0}>100+ patients</Text></View>
                                <View style={styles.rect}>


                                    <Image
                                        source={images.location}
                                        resizeMode="cover"

                                        style={{

                                            height: 20,
                                            width: 20,
                                            marginRight:8



                                        }}


                                    />
                                    <Text style={styles.t0}>{data.city}</Text></View>
                            </View>
                            <View style={styles.wr}>
                                <Text style={styles.tq}>Description</Text>
                            </View>
                            <View style={styles.bitDescription}>
                                <Text style={styles.greyText}>
                                    {expanded ? data.about : `${data.about.substring(0, 200)}...`}
                                    {' '}
                                    <Text style={styles.readMore} onPress={toggleDescription}>
                                        {expanded ? 'Read Less' : 'Read More'}
                                    </Text>
                                </Text>
                            </View>
                        </ScrollView>
                    </View>
                 <TouchableOpacity style={{position:'absolute', top:14, left:14,
                    width:40, height:40, backgroundColor:'white', borderRadius:10,
                    justifyContent:'center', alignItems:'center'
                 }} onPress={()=> navigation.goBack()}>
                 <Iconss name={'chevron-back-outline'} size={30} />
                 </TouchableOpacity>
                </View>
            </ScrollView>
            <TouchableOpacity style={styles.buttonWrapper} onPress={() =>
                navigation.navigate('schedule-appointment', {
                   data: data
                }
                )


            }>
                <View style={styles.loginRealContainer}>
                    <Text style={styles.text4}>Make an Appointment</Text>
                </View>
            </TouchableOpacity>
            {/* <StatusBar backgroundColor="#161622" style="light" /> */}
        </SafeAreaView>
    );
}

export default DoctorProfile;

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
        fontWeight: "bold",
        fontSize:20
    },
    loginRealContainer: {
        backgroundColor: "#1877F2",
        height: 60,
        width: Dimensions.get("window").width - 40,
        borderRadius: 40,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20
    },
    sc: {},
    bitDescription: {
        marginHorizontal: 15,
        marginTop: 5,
    },
    greyText: {
        color: 'grey',
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
        fontWeight: "bold"
    },
    rectContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        paddingHorizontal: 5,
    },
    rect: {
        width: 110,
        height: 50,
        borderColor: 'lightgrey',
        borderWidth: 1,
        borderRadius: 20,
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
        // textDecorationLine: 'underline',
    },
});
