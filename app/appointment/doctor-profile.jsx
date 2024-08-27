import React, { useState } from "react";
// import { StatusBar } from "expo-status-bar";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Icons, images } from "../../constants";
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import Iconss from 'react-native-vector-icons/dist/Ionicons';
import {fontRef, heightRef, widthRef} from "../../constants/screenSize";

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




                    <View style={{ height: 270 * heightRef, width: 270 * widthRef,
                        justifyContent: "center", alignItems: "center" ,
                        backgroundColor:'white', borderRadius:16, marginBottom:10}}>


                        <Image
                           source={{ uri: data.profileImg }}
                            resizeMode="cover"

                            style={{

                                height: 250 * heightRef,
                                width: 250 * heightRef,


                            }}


                        />


                    </View>

                    <View style={styles.innerContainer}>
                        <ScrollView style={styles.sc}>
                            <View style={styles.oval}>
                                <View style={styles.rowspace}>

                                    <View style={styles.cont}>
                                        <Text style={styles.t1}>{data.firstName} {data.lastName}</Text>
                                        <Text style={styles.t2}>{data.speciality?.[0]?.specialization?.name}</Text>
                                    </View>

                                    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>

                                        <Text style={{ fontSize: 25 * fontRef, fontWeight: 'bold', color:'grey' }}>4.5 </Text>

                                        <Image
                                            source={images?.star}
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

                                            height: 20 * heightRef,
                                            width: 20 * heightRef



                                        }}


                                    />
                                    <Text style={styles.t0}> 6 years exp</Text></View>
                                <View style={styles.rect}>

                                    <Image
                                        source={images.person}
                                        resizeMode="cover"

                                        style={{

                                            height: 20 * heightRef,
                                            width: 20 * heightRef



                                        }}


                                    />

                                    <Text style={styles.t0}>100+ patients</Text></View>
                                <View style={styles.rect}>


                                    <Image
                                        source={images.location}
                                        resizeMode="cover"

                                        style={{

                                            height: 20 * heightRef,
                                            width: 20 * heightRef,
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
                                    {expanded ? data.about : `${data.about.substring(0, 170)}...`}
                                    {' '}
                                    <Text style={styles.readMore} onPress={toggleDescription}>
                                        {expanded ? 'Read Less' : 'Read More'}
                                    </Text>
                                </Text>
                            </View>
                        </ScrollView>
                    </View>
                 <TouchableOpacity style={{position:'absolute', top:14 * heightRef, left:14 * widthRef,
                    width:40 * widthRef, height:40 * heightRef, backgroundColor:'white', borderRadius:10,
                    justifyContent:'center', alignItems:'center'
                 }} onPress={()=> navigation.goBack()}>
                 <Iconss name={'chevron-back-outline'} size={30} color={'black'} />
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
        marginTop: 0 * heightRef,
        bottom: -10,
        width: '100%',
        alignItems: 'center',
    },
    text4: {
        color: "white",
        fontWeight: "bold",
        fontSize:18 * fontRef
    },
    loginRealContainer: {
        backgroundColor: "#1877F2",
        height: 60 * heightRef,
        width: Dimensions.get("window").width - 40,
        borderRadius: 40,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20 * heightRef,
    },
    sc: {},
    bitDescription: {
        marginHorizontal: 15 * widthRef,
        marginTop: 5 * heightRef,
    },
    greyText: {
        color: 'grey',
        fontSize: 14 * fontRef,
    },
    tq: {
        marginLeft: 15 * widthRef,
        fontWeight: "bold",
        fontSize: 24 * fontRef,
        color: "black",
        margin: 14 * heightRef,
    },
    wr: {
        justifyContent: "center",
        alignItems: "flex-start",
        width: (Dimensions.get('window').width),
    },
    t0: {
        fontWeight: "bold",
        color:"black",
        fontSize: 12 * fontRef
    },
    rectContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20 * heightRef,
        paddingHorizontal: 5 * widthRef,
    },
    rect: {
        width: 110 * widthRef,
        height: 50 * heightRef,
        borderColor: 'lightgrey',
        borderWidth: 1,
        borderRadius: 20,
        marginRight: 5 * widthRef,
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
        color: "grey",
        fontSize: 16 * fontRef
    },
    cont: {
        justifyContent: "center",
        alignItems: "flex-start"
    },
    oval: {
        height: 90 * heightRef,
        width: Dimensions.get('window').width - 30,
        backgroundColor: "whitesmoke",
        marginTop: 15 * heightRef,
        borderRadius: 20,
        padding: 20 * widthRef,
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
        height: '52%',
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
        fontSize: 14 * fontRef,
        // textDecorationLine: 'underline',
    },
});
