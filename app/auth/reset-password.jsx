import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions,TextInput, Alert, Image,StyleSheet,TouchableOpacity } from "react-native";
// import { Ionicons } from '@expo/vector-icons';
import { images } from "../../constants";

// import { AntDesign } from '@expo/vector-icons';

const Resetpassword = () => {
    return (
        <SafeAreaView>
          <ScrollView>
            <View style={styles.container}>
    
              
              <View style={styles.spacerul}></View>
    
              <Text style={styles.text1}>Reset Password</Text>
              <Text style={styles.text2}>Create a new password to strengthen your account </Text>
              <Text style={styles.text2}>security.Enter your desired password below,ensuring </Text>
              <Text style={styles.text2}>it meet the specified criteria </Text>
    
    
              <View  style={styles.spacer}></View>
              <View  style={styles.spacer}></View>
              <View  style={styles.spacer}></View>
    
    
    
              <View  style={styles.innerContainer}>
              <Text style={styles.text3}>Enter New Password</Text>
    
              </View>
    
              {/* "Your Email" text */}
            
    
              {/* Input container */}
              <View style={styles.container1}>
               
                <TextInput
                  // placeholder="Your email"
                  style={styles.input}
                  keyboardType="email-address"
                
                />
    
    {/* <AntDesign name="eye" size={24} color="grey" /> */}
              </View>
    
    
              <View  style={styles.spacerper}></View>
    
              <TouchableOpacity  onPress={()=>router.push('auth/password-changed-success')}>
              <View  style={styles.buttonwrapper}>
              <View  style={styles.loginrealContainer}>
    
    
                <Text style={styles.text4}>Continue</Text>
    
    
    </View>
    
    
    
    
              </View>
              </TouchableOpacity>
    
            
    
    
            
              <View style={styles.spacerul}></View>
    
            </View>
          </ScrollView>
        </SafeAreaView>
      );
    };




    
    export default Resetpassword;
    
    const styles = StyleSheet.create({
    
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


        height:"45%"


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