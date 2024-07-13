import React, { useState } from 'react';
// import { StatusBar } from 'expo-status-bar';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dimensions } from 'react-native';
import { images } from '../../constants';


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

                            <View style={{ marginTop: 20 }}></View>

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

        height:40,
        width:40


    },

  smallCircle:{

    height:10,
    width:10,
    color:"blue",
    borderRadius: 30, 


  },

    center: {
       marginLeft:20,
       alignSelf:'center',
       color:'#858585',
       fontSize:16
    },

    mainContainer: {
        height: 55,
        width: 175,
        borderWidth: 1, // Border width
        borderColor: 'grey', // Border color
        borderRadius: 30, // Border radius
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignContent: 'center',
        padding: 5,
        paddingLeft:14
    },

    selectedRole: {
        backgroundColor: '#ACCEFA', // Change the background color when selected
        flexDirection:"row"
    },

    innerrow: {
        marginLeft: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginRight: 12,
    },

    images: {
        width: '100%',
        position:'absolute',
        top:30
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
        marginTop: 50,
        fontWeight: 'bold',
        fontSize: 30,
        justifyContent: 'flex-start',
        marginBottom: 10,
        marginLeft: 20,
        color:'black'
    },
    contentContainer: {
        marginLeft: 10,
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
        fontSize: 18,
        marginRight:20,
        color:'black'
      },
});
