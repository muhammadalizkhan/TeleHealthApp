import React, { useState } from 'react';
// import { StatusBar } from 'expo-status-bar';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dimensions } from 'react-native';
import { images } from '../../constants';
import {fontRef, heightRef, widthRef} from "../../constants/screenSize";


const screenWidth = Dimensions.get('window').width;

const RoleLogin = ({navigation}) => {
    const [selectedRole, setSelectedRole] = useState(null);
    const handleNextPress = () => {
        if (selectedRole) {
            navigation.navigate("sign-in", { role: selectedRole });
        } else {
            Alert.alert("Role Selection", "Please select a role before proceeding.");
        }
    };

    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView
                contentContainerStyle={{
                    height: '100%',
                }}>
                <View style={styles.container}>
                    <Image source={images.roleImage} resizeMode="contain" style={styles.images} />
                    <View style={styles.innerContainer}>
                        <Text style={styles.headerText}>Login</Text>
                        <View style={styles.contentContainer}>
                            {/* <Text style={{fontSize:16, color:'black',marginLeft:10, width:'90%'}}>Choose your role: Login as doctor to heal or as a patient to be healed</Text> */}

                            <View style={{ marginTop: 20 * heightRef }}></View>

                            <View style={styles.innerrow}>
                                <TouchableOpacity
                                    style={[
                                        styles.mainContainer,
                                        selectedRole === 'doctor' && styles.selectedRole,
                                    ]}
                                    onPress={() => setSelectedRole('doctor')}>

                                        <Image source={images.doctorLogo}  style={styles.dlogo}></Image>

                                    <Text style={ selectedRole === 'doctor' ? [styles.center, {color:'white'}]: styles.center}>As Doctor</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[
                                        styles.mainContainer,
                                        selectedRole === 'patient' && styles.selectedRole,
                                    ]}
                                    onPress={() => setSelectedRole('patient')}>
                                           <Image source={images.patientLogo}  style={styles.dlogo}></Image>
                                    <Text style={ selectedRole === 'patient' ? [styles.center, {color:'white'}]: styles.center}>As Patient</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.spacer} />
                            <View style={styles.footerContainer}>

                                <View></View>
                                <TouchableOpacity onPress={handleNextPress}>
                                    <Text style={styles.footerText}>Next &gt;</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
            {/* <StatusBar backgroundColor="#161622" style="light" /> */}
        </SafeAreaView>
    );
};

export default RoleLogin;

const styles = StyleSheet.create({

    dlogo:{

        height:40 * heightRef,
        width:40 * heightRef


    },

  smallCircle:{

    height:10 * heightRef ,
    width:10 * widthRef,
    color:"blue",
    borderRadius: 30,


  },

    center: {
       marginLeft:10 * widthRef,
       alignSelf:'center',
       color:'#858585',
       fontSize:16 * fontRef
    },

    mainContainer: {
        height: 60 * heightRef,
        width: 155 * widthRef,
        borderWidth: 1, // Border width
        borderColor: 'grey', // Border color
        borderRadius: 30, // Border radius
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignContent: 'center',
        alignItems:'center',
        padding: 5,
        paddingLeft:14 * widthRef
    },

    selectedRole: {
        backgroundColor: '#ACCEFA', // Change the background color when selected
        flexDirection:"row"
    },

    innerrow: {
        marginLeft: 5 * widthRef,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginRight: 12 * widthRef,
    },

    images: {
        width: '100%',
        position:'absolute',
        top:80 * heightRef,
        height:420 * heightRef
    },

    container: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: '#ACCEFA',
    },
    innerContainer: {
        backgroundColor: 'white',
        width: '100%',
        height: '40%',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    headerText: {
        marginTop: 40 * heightRef,
        fontWeight: 'bold',
        fontSize: 30 * fontRef,
        justifyContent: 'flex-start',
        marginBottom: 10 * widthRef,
        marginLeft: 20 * widthRef,
        color:'black'
    },
    contentContainer: {
        marginLeft: 10 * widthRef,
    },
    footerContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    spacer: {
        height: '20%',
    },
    footerText: {
        fontWeight: 'bold',
        fontSize: 18 * fontRef,
        marginRight:20 * widthRef,
        color:'black'
      },
});
