import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text, StyleSheet, Dimensions,TouchableOpacity,Alert,Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useStripe } from '@stripe/stripe-react-native';
import {useCreatePaymentIntentMutation}  from '../../store/apislice';
import { images } from "../../constants";
import { useRoute } from '@react-navigation/native';
// import { Redirect, router } from "expo-router";

const ConfirmAppointment = ({navigation}) => {
    const route = useRoute();

    const [expanded, setExpanded] = useState(false);
    const [createPaymentIntent] = useCreatePaymentIntentMutation();
    const { doctorName1, doctorImage } = route.params;

    const { initPaymentSheet, presentPaymentSheet } = useStripe();

    const onCheckout = async () => {
        try {
          // 1. Call the API to create a payment intent
          // const response = await fetch('http://localhost:3000/payments/intents', {
          //   method: 'POST',
          //   headers: {
          //     'Content-Type': 'application/json',
          //   },
          //   body: JSON.stringify({ amount: 17950 }),
          // });
          
          // if (!response.ok) {
          //   throw new Error('Failed to create payment intent');
          // }
          
          // const data = await response.json();
          
          // 2. Initialize the Payment Sheet
          const initResponse = await initPaymentSheet({
            merchantDisplayName: 'TeleHealth',
            paymentIntentClientSecret: "pi_3PN9FHJ56CLcyplb0uxrGPY0_secret_KfD5xyNKV9cLTcj1SGdEchyUW",
          });
          if (initResponse.error) {
            console.log(initResponse.error);
            Alert.alert('Something went wrong2');
            return;
          }
      
          // 3. Present the Payment Sheet from Stripe
          const paymentResponse = await presentPaymentSheet();



      
          if (paymentResponse.error) {
            Alert.alert(
              `Error code: ${paymentResponse.error.code}`,
              paymentResponse.error.message
            );
            return;
          }else{
            Alert.alert(
                "Payment Succeeded",
                "Your payment was successful!",
                [
                    {
                        text: "OK",
                        onPress:   ()=>{navigation.navigate("parent-screen")}
                            
                            // router.push('schedule/index1')
                    }
                ]
            );


          }
      
          // 4. If payment ok -> create the order
          // onCreateOrder();
        } catch (error) {
          console.error(error);
          Alert.alert('Something went wrong');
        }
      };
      

    const toggleDescription = () => {
        setExpanded(!expanded);
    };

    // Example description
    const description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed diam eget velit gravida blandit.";

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {/* Main Content */}
                <View style={styles.mainContent}>
                    {/* Add your main content here */}

                    <Text style={{ fontSize:25, fontWeight:"bold", marginRight:20, color:"white"}}>{"<"}</Text>

                    <Text  style={{ fontSize:25, fontWeight:"bold", color:"white"}}>Aappointment</Text>
                </View>

                {/* Inner Container */}
                <View style={styles.innerContainer}>
                    {/* Previous Views */}
                    <View style={styles.rectContainer}>
                    <View style={styles.rect}>      
                                <Image
                                                                 source={images.firstAid}
                                                                 resizeMode="cover" 
                                                                
                                                                 style={{
                                                 
                                                                     height:20,
                                                                     width:20
                                                                     
                                                 
                                                                  
                                                                 }}
                                                 
                                                 
                                                               />
                                <Text style={styles.t0}> 6 years exp</Text></View>
                                <View style={styles.rect}>
                                    
                                <Image
                                                                 source={images.person}
                                                                 resizeMode="cover" 
                                                                
                                                                 style={{
                                                 
                                                                     height:20,
                                                                     width:20
                                                                     
                                                 
                                                                  
                                                                 }}
                                                 
                                                 
                                                               />
                                    
                                    <Text style={styles.t0}>100+ patients</Text></View>
                                <View style={styles.rect}>
                                    
                                    
                                <Image
                                                                 source={images.location}
                                                                 resizeMode="cover" 
                                                                
                                                                 style={{
                                                 
                                                                     height:20,
                                                                     width:20
                                                                     
                                                 
                                                                  
                                                                 }}
                                                 
                                                 
                                                               />
                                    <Text style={styles.t0}>Capetown</Text></View>
                    </View>

                    {/* Spacer */}
                    <View style={styles.spacer}></View>

                    {/* Card */}
                    <View style={styles.card}>

                        <View  style={styles.col1}>


                            <View  style={styles.img}>
                            <Image
                            source={{ uri: doctorImage }} // or use the uri prop for network images
                            style={styles.imageStyle}
                        />


                            </View>
                            <View style={styles.col2}>
    <Text style={[styles.text, { color: "white", fontSize: 20, fontWeight: "bold" }]}>{doctorName1}</Text>
    <Text style={[styles.text, { color: "white", fontSize: 15 }]}>Cardiologist</Text>
</View>


                        </View>


                        <View style={styles.imageinnercol} >

                            <View  style={styles.innerRow1}>

                                <Text  style={{color:"white"}}>Duration:</Text>

                                <Text style={{color:"white"}}>40 min</Text>

                            </View>

                            <View  style={styles.innerRow2}>

                            <Text  style={{color:"white"}}>Type:</Text>

<Text style={{color:"white"}}>Online</Text>
                                
                                </View>


                                <View style={styles.topBar}>

<Text  style={styles.y1}>Fri,12 Apr</Text>

<Text  style={styles.y1}>11:00 Am</Text>


</View>


                        </View>





                    </View>

                    {/* Description */}
                    <View style={styles.descriptionContainer}>
                        <Text style={styles.descriptionTitle}>Description</Text>
                        <Text style={styles.descriptionText}>
                            {expanded ? description : `${description.substring(0, 50)}...`}
                        </Text>
                        {description.length > 50 && (
                            <Text style={styles.toggleDescriptionButton} onPress={toggleDescription}>
                                {expanded ? 'Read Less' : 'Read More'}
                            </Text>
                        )}
                    </View>

                    <View style={styles.spacer1}></View>

                    <View style={styles.rowWrap}>
                        <Text style={styles.descriptionTitle}>Working Hours</Text>                        
                       
                    </View>
                    <View style={styles.row1}>

<Text style={{color:"grey"}}>Mon - Fri</Text>

<Text  style={{color:"grey"}}>8:00 Am to 4:00 Pm</Text>



</View>

<TouchableOpacity style={styles.buttonWrapper} onPress={onCheckout}>
                <View style={styles.loginRealContainer}>

                   
                    <Text style={styles.text4}>Confirm Appointment</Text>
                </View>
            </TouchableOpacity>
                </View>
              
            </View>
            <StatusBar backgroundColor="#161622" style="light" />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    topBar: {
        backgroundColor: "rgba(218, 217, 217, 0.5)", // Adding transparency
        height: 45,
        borderRadius: 15,
        flexDirection: "row",
        padding: 10,
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 10,
        marginBottom: 10,
        marginRight: 15,
        marginLeft: 15
    },
    

    innerRow1:{

         flexDirection:"row",
         justifyContent:"space-between",
         marginLeft:20,
         marginRight:20,
         marginBottom:10

    },

    innerRow2:{


        flexDirection:"row",
        justifyContent:"space-between",
        marginLeft:20,
        marginRight:20


    },


    imageinnercol:{


        flexDirection:"column"


    },


    col2:{

        flexDirection:"column",


    },


    img:{

        height:90,
        width:90,
        backgroundColor:"lightblue",
        borderRadius:20,
        marginRight:15

    },


    col1:{

        flexDirection:"row",
        padding:20


    },
    y1:{
color:"white",
fontWeight:"bold"

    },
    
    imageStyle: {
        width: '100%',
        height: '100%',
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

    buttonWrapper: {
        marginTop: 40,
        bottom: 0,
        width: '100%',
        alignItems: 'center',
    },

    
    // Styles here


    row1:{

        flexDirection:"row",
        marginLeft:10,
        marginRight:10,
        justifyContent:"space-between",
        width: Dimensions.get("window").width-20,


    },

   rowWrap:{

     display:"flex",
     flexDirection:"row",
     justifyContent:"flex-start",
     alignItems:"center",
     width: Dimensions.get("window").width,
     marginLeft:15,
    //  backgroundColor:"grey"

   },

    safeArea: {
        flex: 1,
        backgroundColor: "white",
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-end",
        backgroundColor: "#ACCEFA",
        position: "relative",
    },
    innerContainer: {
        backgroundColor: "white",
        width: "100%",
        height: "87%",
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        justifyContent: "flex-start",
        alignItems: "center",
        position: "relative",
    },
    mainContent: {
        flexDirection: "row",
        width: Dimensions.get("window").width - 30,
        marginBottom: 20,
    },
    rectContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        paddingHorizontal: 15,
    },
    rect: {
        width:110,
        height: 30,
        borderColor: 'lightgrey',
        borderWidth: 1,
        borderRadius: 10,
        marginRight: 5,
        marginLeft: 5,
        justifyContent: "center",
        alignItems: "center",
        flexDirection:"row"
    },
    card: {
        width: Dimensions.get("window").width - 20,
        height: 250,
        backgroundColor: "#1877F2",
        borderRadius: 15,
        marginBottom: 20,
    },
    spacer: {
        height: "5%",
    },
    spacer1: {
        height: "2%",
    },
    descriptionContainer: {
       
        width: Dimensions.get("window").width -20
      
    },
    descriptionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5,
    },
    descriptionText: {
        fontSize: 16,
        color: "grey",
    },
    toggleDescriptionButton: {
        color: "#1877F2",
        marginTop: 5,
    },
    rowc:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        paddingLeft:"10",
        paddingRight:"10"
    }
});

export default ConfirmAppointment;
