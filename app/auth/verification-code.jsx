import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions,TextInput, Alert, Image,StyleSheet,TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { images } from "../../constants";

const VerificationCode = () => {
    return (
        <SafeAreaView>
          <ScrollView>
            <View style={styles.container}>
    
              
              <View style={styles.spacerul}></View>
    
              <Text style={styles.text1}>Verification Code</Text>
              <Text style={styles.text2}>Verify your identity and again access to you account by </Text>
              <Text style={styles.text2}>entering unique verification code send to your email </Text>
        
    
    
              <View  style={styles.spacer}></View>
              <View  style={styles.spacer}></View>
              <View  style={styles.spacer}></View>
    
    
    
              <View  style={styles.innerContainer}>
           
    
              </View>
    
              {/* "Your Email" text */}
            
    
              {/* Input container */}
              <View style={styles.otpContainer}>
  <Text style={styles.otpText}>Enter the Code</Text>
  <View style={styles.otpInputsContainer}>
    {Array.from({ length: 6 }).map((_, index) => (
      <TextInput
        key={index}
        style={styles.otpInput}
        keyboardType='numeric'
        maxLength={1}
        // Additional props like onChangeText to handle input
      />
    ))}
  </View>
</View>
    
              <View  style={styles.spacerper}></View>
    
              <TouchableOpacity  onPress={()=>router.push('auth/reset-password')}>
              <View  style={styles.buttonwrapper}>
              <View  style={styles.loginrealContainer}>
    
    
                <Text style={styles.text4}>Verify</Text>
    
    
    </View>
    
    
    
    
              </View>
              </TouchableOpacity>
    
              <View  style={styles.lastText}>
    
             
              </View>
    
    
            
              <View style={styles.spacerul}></View>
    
            </View>
          </ScrollView>
        </SafeAreaView>
      );
    };




    
    export default VerificationCode;
    
    const styles = StyleSheet.create({

        otpContainer: {
            alignItems: 'center',
            margin: 20,
          },
          otpText: {
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 15,
            color:"grey"
          },
          otpInputsContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 30,
          },
          otpInput: {
            width: 43,
            height: 53,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: '#1877F2',
            textAlign: 'center',
            fontSize: 22,
            color: '#1877F2',
            fontWeight: 'bold',
            marginHorizontal: 5,
            backgroundColor: '#F3F3F3', // To match the uploaded image's background
          },
    
      firstPart:{
    
         color:"grey"
    
      },
    
    
      secoundPart:{
    
    
        color:"#1877F2",
        fontWeight:"bold"
    
    
      },
    
      lastText:{
    
        width:Dimensions.get("window").width,
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"row",
       
    
    
      },
    
      text4:{
    
       color:"white",
       fontWeight:"bold"
    
      },
    
    
      spacer4:{
    
          height:"3%"
    
    
      },
    
    
      buttonwrapper:{
    
        width:Dimensions.get("window").width,
    
        paddingLeft:"20",
        paddingRight:"20",
        justifyContent:"center",
        alignItems:"center"
      
      },
    
    
      loginrealContainer:{
    
        backgroundColor: "#1877F2",
        height: 50,
        width:Dimensions.get("window").width-40,
        borderRadius: 24, 
        alignContent:"center",
        justifyContent:"center",
        alignItems:"center",
        marginBottom:20
    
      
      },
    
    
      loginContainer: {
        backgroundColor: "lightgrey",
        height: 60,
        width: 130,
        borderRadius: 40, // half of the height to make it oval
      },
      
    
    
      rowcontainer:{
        flexDirection:"row",
        justifyContent:"space-between",
        marginLeft:25,
        marginRight:25,
        // backgroundColor:"green",
        paddingLeft:14,
        paddingRight:14,
        width:Dimensions.get("window").width
      },
    
      container5: {
        flexDirection: 'row', // Align children in a row
        alignItems: 'center', // Center children vertically
        margin: 14,
        marginTop:40
      },
      line: {
        flex: 1, // Take up equal space
        height: 1, // Set the thickness of the line
        backgroundColor: 'grey', // Set the color of the line
      },
      textWrapper: {
        paddingHorizontal: 10, // Spacing around the text
        // backgroundColor: 'white', // Match the background color of your screen
      },
      text: {
        fontSize: 16, // Set the font size for the text
        color: 'grey', // Set the text color
      },
    
    
      forgetpassword:{
    
        textAlign:"right",
        marginRight:14,
        color: "#1877F2",
        fontSize:17,
        fontWeight:"bold"
    
      },
    
    
      forgetconteiner:{
        
        marginTop:16,
        flexDirection:"row",
        marginRight:14,
        justifyContent:"flex-end",
        width:Dimensions.get("window").width
    
      },
    
      innerContainer:{
    
        flexDirection:"row",
        justifyContent:"flex-start",
        // backgroundColor:"green",
        width:Dimensions.get("window").width
    
      },
    
      spacerul:{
    
              height:200,
              backgroundColor:"black"
    
      },

      spacerper:{


        height:"40%"


      },
    
      spacer:{
    
        height:13
    
      },
    
      container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: Dimensions.get("window").height,
      },
      text1: {
        fontSize: 40,
        fontWeight: "bold",
        color: "#1877F2"
      },
      text3: {
        color: "grey",
        marginLeft: 14,
        textAlign:"left"
      },
      text2: {
        color: "grey"
      },
      container1: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        marginLeft: 14,
        marginRight: 14,
        borderRadius: 5,
        borderBottomWidth: 1,
        borderBottomColor: 'grey'
      },
      input: {
        flex: 1,
        paddingVertical: 5,
        fontSize: 16,
        color: 'black'
      },
    });