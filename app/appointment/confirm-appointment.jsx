import React, {useContext, useEffect, useState} from 'react';
// import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
  Image,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useStripe} from '@stripe/stripe-react-native';
import {useCreatePaymentIntentMutation} from '../../store/apislice';
import {images} from '../../constants';
import {useRoute} from '@react-navigation/native';
// import { Redirect, router } from "expo-router";
import Icons from 'react-native-vector-icons/dist/Ionicons';
<<<<<<< Updated upstream
import moment from 'moment';
import {AuthContext} from '../../context/Authcontext';
import {showMessage} from 'react-native-flash-message';
import {fontRef, heightRef, widthRef} from '../../constants/screenSize';
=======
import moment from "moment";
import { AuthContext } from "../../context/Authcontext";
import { showMessage } from "react-native-flash-message";
import { fontRef, heightRef, widthRef } from "../../constants/screenSize";
>>>>>>> Stashed changes
import Iconss from 'react-native-vector-icons/dist/AntDesign';

const ConfirmAppointment = ({navigation}) => {
  const route = useRoute();

<<<<<<< Updated upstream
  const {logout, loggedIn, userData} = useContext(AuthContext);
  // console.log('user data ==> ',JSON.stringify(userData, null, 2))
  const [expanded, setExpanded] = useState(false);
  const [createPaymentIntent] = useCreatePaymentIntentMutation();
  const {appointmentDetails} = route.params;
  console.log(
    'appoint details = ',
    JSON.stringify(appointmentDetails, null, 2)
  );
  const [loading, setLoading] = useState(false);
=======
    const { logout, loggedIn, userData } = useContext(AuthContext);
    // console.log('user data ==> ',JSON.stringify(userData, null, 2))
    const [expanded, setExpanded] = useState(false);
    const [createPaymentIntent] = useCreatePaymentIntentMutation();
    const { appointmentDetails } = route.params;
    console.log('appoint details = ', JSON.stringify(appointmentDetails, null, 2))
    const [loading, setLoading] = useState(false)
>>>>>>> Stashed changes

  //console.log('data ', JSON.stringify(appointmentDetails, null, 2))

  const [description, setDescription] = useState(
    appointmentDetails?.doctor?.about
  );
  const {initPaymentSheet, presentPaymentSheet} = useStripe();

  const url = 'https://api-dev.mhc.doginfo.click/doctor/appointment';
  const urlPayment = 'https://api-dev.mhc.doginfo.click/initiate-payment';

  /// doctor -> steven
  const appointmentData = {
    doctor: appointmentDetails?.doctor,
    user: userData?.user,
    specialization:
      appointmentDetails?.doctor?.speciality[0]?.specialization?._id,
    subSpecialization: appointmentDetails?.category?._id,

<<<<<<< Updated upstream
    appointmentDetails: {
      appointmentType:
        appointmentDetails?.type === 'In Person' ? 'physical' : 'virtual',
      date: appointmentDetails?.startDate, // moment JS unix timestamp
      startTime: appointmentDetails?.fromTime, // moment JS unix timestamp
      endTime: appointmentDetails?.toTime, // moment JS unix timestamp
      ...(appointmentDetails?.type === 'In Person' && {
        clinic: appointmentDetails?.doctor?.clinic, // Only when appointmentType is physical
        clinicLocation: appointmentDetails?.doctor?.clinicLocation, // Only when appointmentType is physical
      }),
    },
  };
=======
    /// doctor -> steven
    const appointmentData = {
        doctor: appointmentDetails?.doctor,
        user: userData?.user,
        specialization: appointmentDetails?.doctor?.speciality[0]?.specialization?._id,
        subSpecialization: appointmentDetails?.category?._id,
>>>>>>> Stashed changes

  const paymentData = {
    subSpecialityId: appointmentDetails?.category?._id,
    duration: appointmentDetails?.category?.billingPlans[0]?.duration,
    product: 'Appointment',
    userId: userData?.user?._id,
    appointmentDetails: {
      appointmentType:
        appointmentDetails?.type === 'In Person' ? 'physical' : 'virtual',
      doctor: `${appointmentDetails?.doctor?.firstName} ${appointmentDetails?.doctor?.lastName}`,
      date: appointmentDetails?.startDate,
      from: appointmentDetails?.fromTime,
      to: appointmentDetails?.toTime,
      ...(appointmentDetails?.type === 'In Person' && {
        clinic: appointmentDetails?.doctor?.clinic, // Only when appointmentType is physical
        clinicLocation: appointmentDetails?.doctor?.clinicLocation, // Only when appointmentType is physical
      }),
      // userAddress: "",
      // testLocation: "",
    },
  };

  console.log('payment data = ', JSON.stringify(paymentData, null, 2));
  //     appointmentType,
  //         doctor: ${selectedDoctor.firstName} ${selectedDoctor.lastName},
  //     date: duration.date,
  //         startTime: duration.startTime,
  //         endTime: duration.endTime,
  // ...(appointmentType === "physical" && {
  //         clinic: selectedDoctor.clinic,
  //         clinicLocation: selectedDoctor.clinicLocation,
  //     }),
  {
    /* Edited by Yaseen */
  }
  const makePayments = async () => {
    // console.log('clicked')
    setLoading(true);
    // console.log('payment data ' , JSON.stringify(paymentData, null, 2))
    console.log(
      'userData?.tokens?.access_token',
      userData?.tokens?.access_token
    );
    try {
      const response = await fetch(urlPayment, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userData?.tokens?.access_token}`,
        },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setLoading(false);
        showMessage({
          message: `Error: ${errorData || 'Unknown error'}`,
          type: 'danger',
        });
        console.error(
          'Error Payment APIs:',
          JSON.stringify(errorData, null, 2)
        );
        return;
      }

      const result = await response.json();
      console.log('payment result = ', JSON.stringify(result, null, 2));

      const checkoutSucceeded = await onCheckout(
        result.paymentDetails.stripeClientSecret
      );

      if (checkoutSucceeded)
        await bookAppointment(result.paymentDetails.stripeClientSecret);

      setLoading(false);
      return result;
    } catch (error) {
      setLoading(false);
      showMessage({
        message: `Booking Error: ${error.message || 'Unknown error'}`,
        type: 'danger',
      });
      console.error('initiating payment Error:', error);
    }
  };

<<<<<<< Updated upstream
  // console.log('appoinment details = ', JSON.stringify(appointmentData, null,2));
  {
    /* Edited by Yaseen */
  }
  const bookAppointment = async (clientSecret) => {
    // console.log('clicked')
    console.log('FINALDATA::', appointmentData)
    setLoading(true);
    appointmentData.stripeClientSecret = clientSecret;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userData?.tokens?.access_token}`,
        },
        body: JSON.stringify(appointmentData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setLoading(false);
        showMessage({
          message: `Error: ${errorData || 'Unknown error'}`,
          type: 'danger',
        });
        console.error(
          'Error booking appointment:',
          JSON.stringify(errorData, null, 2)
        );
        return;
      }

      const result = await response.json();
      navigation.pop(3);
      Alert.alert('Appointment is Booked', 'Your Appointment was successful!', [
        {
          text: 'OK',
          // onPress: () => {
          //   navigation.goBack();
          // },

          // router.push('schedule/index1')
        },
      ]);

      setLoading(false);
      return result;
    } catch (error) {
      setLoading(false);
      showMessage({
        message: `Booking Error: ${error.message || 'Unknown error'}`,
        type: 'danger',
      });
      console.error('Booking Error:', error);
=======
    const paymentData = {
        subSpecialityId: appointmentDetails?.category?._id,
        duration: appointmentDetails?.category?.billingPlans[0]?.duration,
        product: 'Appointment',
        userId: userData?.user?._id,
        appointmentDetails: {
            appointmentType: appointmentDetails?.type === 'In Person' ? 'physical' : 'virtual',
            doctor: `${appointmentDetails?.doctor?.firstName} ${appointmentDetails?.doctor?.lastName}`,
            date: appointmentDetails?.startDate,
            from: appointmentDetails?.startDate,
            to: appointmentDetails?.startDate,
            ...(appointmentDetails?.type === 'In Person' && {
                clinic: appointmentDetails?.doctor?.clinic, // Only when appointmentType is physical
                clinicLocation: appointmentDetails?.doctor?.clinicLocation, // Only when appointmentType is physical
            }),
            // userAddress: "",
            // testLocation: "",
        }
>>>>>>> Stashed changes
    }
  };

<<<<<<< Updated upstream
  {
    /* Edited by Yaseen */
  }
  const onCheckout = async (clientSecret) => {
    console.log('client secret = ', clientSecret);
    let Succeeded = false;
    try {
      // 2. Initialize the Payment Sheet
      const initResponse = await initPaymentSheet({
        merchantDisplayName: 'TeleHealth',
=======
    console.log('payment data = ', JSON.stringify(paymentData, null, 2))
    //     appointmentType,
    //         doctor: ${selectedDoctor.firstName} ${selectedDoctor.lastName},
    //     date: duration.date,
    //         startTime: duration.startTime,
    //         endTime: duration.endTime,
    // ...(appointmentType === "physical" && {
    //         clinic: selectedDoctor.clinic,
    //         clinicLocation: selectedDoctor.clinicLocation,
    //     }),
    {/* Edited by Yaseen */ }
    const makePayments = async () => {
        // console.log('clicked')
        setLoading(true)
        // console.log('payment data ' , JSON.stringify(paymentData, null, 2))
        console.log("userData?.tokens?.access_token", userData?.tokens?.access_token)
        try {
>>>>>>> Stashed changes

        paymentIntentClientSecret: clientSecret,
      });
      if (initResponse.error) {
        // console.log(initResponse.error);
        Alert.alert('Something went wrong2');
        return;
      }

      // 3. Present the Payment Sheet from Stripe
      const paymentResponse = await presentPaymentSheet({
        clientSecret: clientSecret,
      });

      if (paymentResponse.error) {
        Alert.alert(
          `Error code: ${paymentResponse.error.code}`,
          paymentResponse.error.message
        );
        console.log(paymentResponse.error);
        return;
      } else {
        // Alert.alert('Payment Succeeded', 'Your payment was successful!', [
        //   {
        //     text: 'OK',
        //     onPress: () => {
        //       navigation.navigate('parent-screen');
        //     },

<<<<<<< Updated upstream
        //     // router.push('schedule/index1')
        //   },
        // ]);
        Succeeded = true;
      }

      // 4. If payment ok -> create the order
      // onCreateOrder();
    } catch (error) {
      console.error(error);
      Alert.alert('Something went wrong');
    }
    return Succeeded;
  };
=======
            const checkoutSucceeded = await onCheckout(result.paymentDetails.stripeClientSecret)

            if (checkoutSucceeded)
                await bookAppointment(result.paymentDetails.stripeClientSecret);
>>>>>>> Stashed changes

  const toggleDescription = () => {
    setExpanded(!expanded);
  };

  // Example description
  // const description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed diam eget velit gravida blandit.";

<<<<<<< Updated upstream
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Main Content */}
=======
    // console.log('appoinment details = ', JSON.stringify(appointmentData, null,2));
    {/* Edited by Yaseen */ }
    const bookAppointment = async (clientSecret) => {
        // console.log('clicked')
        setLoading(true)
        appointmentData.stripeClientSecret = clientSecret;
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userData?.tokens?.access_token}`,
                },
                body: JSON.stringify(appointmentData),
            });
>>>>>>> Stashed changes

        {/* Inner Container */}
        <View style={styles.innerContainer}>
          {/* Previous Views */}
          <View style={styles.rectContainer}>
            <View style={styles.rect}>
              <Image
                source={images.firstAid}
                resizeMode="cover"
                style={{
                  height: 20 * heightRef,
                  width: 20 * heightRef,
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
                  width: 20 * heightRef,
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
                  width: 20 * heightRef,
                }}
              />
              <Text style={styles.t0}>Capetown</Text>
            </View>
          </View>

          {/* Spacer */}
          <View style={{height: 10}}></View>

          {/* Card */}
          <View style={styles.card}>
            <View style={styles.col1}>
              <View style={styles.img}>
                <Image
                  source={{uri: appointmentDetails?.doctor?.profileImg}} // or use the uri prop for network images
                  style={styles.imageStyle}
                />
              </View>
              <View style={styles.col2}>
                <Text
                  style={[
                    styles.text,
                    {
<<<<<<< Updated upstream
                      color: 'white',
                      fontSize: 20 * fontRef,
                      fontWeight: 'bold',
                    },
                  ]}
                >
                  {appointmentDetails?.doctor?.firstName}{' '}
                  {appointmentDetails?.doctor?.lastName}
                </Text>
                <Text
                  style={[
                    styles.text,
                    {color: 'white', fontSize: 15 * fontRef},
                  ]}
                >
                  {
                    appointmentDetails?.doctor?.speciality[0]?.specialization
                      ?.name
                  }
                </Text>
              </View>
            </View>

            <View style={styles.imageinnercol}>
              <View style={styles.innerRow1}>
                <Text style={{color: 'white'}}>Duration:</Text>

                <Text style={{color: 'white'}}>
                  {appointmentDetails?.category?.billingPlans[0]?.duration} min
                </Text>
              </View>

              <View style={styles.innerRow2}>
                <Text style={{color: 'white'}}>Type:</Text>

                <Text style={{color: 'white'}}>{appointmentDetails?.type}</Text>
              </View>

              <View style={styles.topBar}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '30%',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Icons name={'calendar-sharp'} size={20} color={'white'} />
                  <Text style={styles.y1}>
                    {moment
                      .unix(appointmentDetails?.startDate)
                      .format('DD-MM-YYYY')}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    //width: '40%',
                    alignItems: 'center',
                  }}
                >
                  <Iconss name={'clockcircle'} size={20} color={'white'} />
                  <Text style={styles.y1}>{appointmentDetails?.duration}</Text>
                </View>
              </View>

              {/*<View style={styles.topBar}>*/}

              {/*    <Text style={styles.y1}>{formattedDate}</Text>*/}

              {/*    <Text style={styles.y1}>{formattedTime}</Text>*/}

              {/*</View>*/}
            </View>
          </View>

          {/* Description */}
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTitle}>Description</Text>
            <Text style={styles.descriptionText}>
              {expanded ? description : `${description.substring(0, 50)}...`}
            </Text>
            {description.length > 50 && (
              <Text
                style={styles.toggleDescriptionButton}
                onPress={toggleDescription}
              >
                {expanded ? 'Read Less' : 'Read More'}
              </Text>
            )}
          </View>

          <View style={styles.spacer1}></View>

          {/* <View style={styles.rowWrap}>
=======
                        text: "OK",
                        onPress: () => navigation.navigate("parentscreen")

                        // router.push('schedule/index1')
                    }
                ]
            );

            setLoading(false);
            return result;

        } catch (error) {
            setLoading(false);
            showMessage({
                message: `Booking Error: ${error.message || 'Unknown error'}`,
                type: 'danger',
            });
            console.error('Booking Error:', error);
        }
    };


    {/* Edited by Yaseen */ }
    const onCheckout = async (clientSecret) => {
        console.log('client secret = ', clientSecret)
        let Succeeded = false;
        try {

            // 2. Initialize the Payment Sheet
            const initResponse = await initPaymentSheet({
                merchantDisplayName: 'TeleHealth',

                paymentIntentClientSecret: clientSecret,
            });
            if (initResponse.error) {
                // console.log(initResponse.error);
                Alert.alert('Something went wrong2');
                return;
            }

            // 3. Present the Payment Sheet from Stripe
            const paymentResponse = await presentPaymentSheet({
                clientSecret: clientSecret,
            });

            if (paymentResponse.error) {
                Alert.alert(
                    `Error code: ${paymentResponse.error.code}`,
                    paymentResponse.error.message
                );
                console.log(paymentResponse.error);
                return;
            } else {
                Alert.alert(
                    "Payment Succeeded",
                    "Your payment was successful!",
                    [
                        {
                            text: "OK",
                            onPress: () => { navigation.navigate("parentscreen") }

                            // router.push('schedule/index1')
                        }
                    ]
                );
                Succeeded = true;

            }

            // 4. If payment ok -> create the order
            // onCreateOrder();
        } catch (error) {
            console.error(error);
            Alert.alert('Something went wrong');
        }
        return Succeeded;
    }


    const toggleDescription = () => {
        setExpanded(!expanded);
    };

    // Example description
    // const description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed diam eget velit gravida blandit.";

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {/* Main Content */}


                {/* Inner Container */}
                <View style={styles.innerContainer}>
                    {/* Previous Views */}
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
                                    width: 20 * heightRef



                                }}


                            />
                            <Text style={styles.t0}>Capetown</Text></View>
                    </View>

                    {/* Spacer */}
                    <View style={{ height: 10 }}></View>

                    {/* Card */}
                    <View style={styles.card}>

                        <View style={styles.col1}>


                            <View style={styles.img}>
                                <Image
                                    source={{ uri: appointmentDetails?.doctor?.profileImg }} // or use the uri prop for network images
                                    style={styles.imageStyle}
                                />


                            </View>
                            <View style={styles.col2}>
                                <Text style={[styles.text, { color: "white", fontSize: 20 * fontRef, fontWeight: "bold" }]}>{appointmentDetails?.doctor?.firstName} {appointmentDetails?.doctor?.lastName}</Text>
                                <Text style={[styles.text, { color: "white", fontSize: 15 * fontRef }]}>{appointmentDetails?.doctor?.speciality[0]?.specialization?.name}</Text>
                            </View>


                        </View>


                        <View style={styles.imageinnercol} >

                            <View style={styles.innerRow1}>

                                <Text style={{ color: "white" }}>Duration:</Text>

                                <Text style={{ color: "white" }}>{appointmentDetails?.category?.billingPlans[0]?.duration} min</Text>

                            </View>

                            <View style={styles.innerRow2}>

                                <Text style={{ color: "white" }}>Type:</Text>

                                <Text style={{ color: "white" }}>{appointmentDetails?.type}</Text>

                            </View>

                            <View style={styles.topBar}>

                                <View style={{
                                    flexDirection: "row", width: "30%", justifyContent: "space-between",
                                    alignItems: "center"
                                }}>
                                    <Icons name={'calendar-sharp'} size={20} color={'white'} />
                                    <Text style={styles.y1}>{appointmentDetails?.startDate}</Text>

                                </View>

                                <View style={{
                                    flexDirection: "row", width: "40%",
                                    alignItems: "center"
                                }}>
                                    <Iconss name={'clockcircle'} size={20} color={'white'} />
                                    <Text style={styles.y1}>{appointmentDetails?.duration}</Text>

                                </View>



                            </View>


                            {/*<View style={styles.topBar}>*/}

                            {/*    <Text style={styles.y1}>{formattedDate}</Text>*/}

                            {/*    <Text style={styles.y1}>{formattedTime}</Text>*/}


                            {/*</View>*/}


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

                    {/* <View style={styles.rowWrap}>
>>>>>>> Stashed changes
                        <Text style={styles.descriptionTitle}>Working Hours</Text>

                    </View>
                    <View style={styles.row1}>

                        <Text style={{ color: "grey" }}>Mon - Fri</Text>

                        <Text style={{ color: "grey" }}>8:00 Am to 4:00 Pm</Text>



                    </View> */}

<<<<<<< Updated upstream
          <TouchableOpacity
            style={styles.buttonWrapper}
            onPress={
              // bookAppointment
              // onCheckout
              makePayments
            }
          >
            <View style={styles.loginRealContainer}>
              {!loading ? (
                <Text style={styles.text4}>Confirm Appointment</Text>
              ) : (
                <ActivityIndicator size={30} color={'white'} />
              )}
=======
                    <TouchableOpacity style={styles.buttonWrapper} onPress={
                        // bookAppointment
                        // onCheckout
                        makePayments
                    }>
                        <View style={styles.loginRealContainer}>
                            {!loading ? <Text style={styles.text4}>Confirm Appointment</Text>
                                : <ActivityIndicator size={30} color={'white'} />}
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{
                    position: 'absolute', width: '100%', height: 60,
                    top: 1, paddingHorizontal: 15, paddingVertical: 8,
                    flexDirection: 'row'
                }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icons name={'chevron-back'} size={30} color="black" />

                    </TouchableOpacity>
                    <Text style={{
                        color: 'black', fontSize: 22, fontWeight: 'bold',
                        marginLeft: 10
                    }}>Appoinment</Text>
                </View>

>>>>>>> Stashed changes
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            position: 'absolute',
            width: '100%',
            height: 60,
            top: 1,
            paddingHorizontal: 15,
            paddingVertical: 8,
            flexDirection: 'row',
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icons name={'chevron-back'} size={30} color="black" />
          </TouchableOpacity>
          <Text
            style={{
              color: 'black',
              fontSize: 22,
              fontWeight: 'bold',
              marginLeft: 10,
            }}
          >
            Appoinment
          </Text>
        </View>
      </View>

      {/* <StatusBar backgroundColor="#161622" style="light" /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  topBar: {
    backgroundColor: 'rgba(218, 217, 217, 0.5)', // Adding transparency
    height: 45 * heightRef,
    borderRadius: 15,
    flexDirection: 'row',
    padding: 10 * heightRef,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10 * heightRef,
    marginBottom: 10 * heightRef,
    marginRight: 15 * widthRef,
    marginLeft: 15 * widthRef,
  },

  t0: {
    color: 'black',
    fontSize: 12 * fontRef,
  },
  innerRow1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 20 * widthRef,
    marginRight: 20 * widthRef,
    marginBottom: 10 * heightRef,
  },

<<<<<<< Updated upstream
  innerRow2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 20 * widthRef,
    marginRight: 20 * widthRef,
  },
=======
    t0: {
        color: 'black',
        fontSize: 12 * fontRef,
    },
    innerRow1: {
>>>>>>> Stashed changes

  imageinnercol: {
    flexDirection: 'column',
  },

  col2: {
    flexDirection: 'column',
  },

  img: {
    height: 90 * heightRef,
    width: 90 * heightRef,
    backgroundColor: 'lightblue',
    borderRadius: 16,
    marginRight: 15 * widthRef,
    overflow: 'hidden',
  },

  col1: {
    flexDirection: 'row',
    padding: 20 * heightRef,
  },
  y1: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 6,
  },

  imageStyle: {
    width: '100%',
    height: '100%',
  },

  text4: {
    color: 'white',
    fontWeight: 'bold',
  },

  loginRealContainer: {
    backgroundColor: '#1877F2',
    height: 60 * heightRef,
    width: Dimensions.get('window').width - 40,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20 * heightRef,
  },

  buttonWrapper: {
    marginTop: 40 * heightRef,
    bottom: 0,
    width: '100%',
    alignItems: 'center',
  },

  // Styles here

  row1: {
    flexDirection: 'row',
    marginLeft: 10 * widthRef,
    marginRight: 10 * widthRef,
    justifyContent: 'space-between',
    width: Dimensions.get('window').width - 20,
  },

  rowWrap: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: Dimensions.get('window').width,
    marginLeft: 15,
    //  backgroundColor:"grey"
  },

<<<<<<< Updated upstream
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'white',
    position: 'relative',
  },
  innerContainer: {
    backgroundColor: 'white',
    width: '100%',
    height: '95%',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'relative',
  },
  mainContent: {
    flexDirection: 'row',
    width: Dimensions.get('window').width - 30,
    marginBottom: 20 * heightRef,
  },
  rectContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20 * heightRef,
    backgroundColor: 'white',
    padding: 10,
    width: '95%',
  },
  rect: {
    width: 100 * widthRef,
    height: 40 * heightRef,
    borderColor: 'lightgrey',
    borderWidth: 1,
    borderRadius: 10,
    marginRight: 5,
    marginLeft: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  card: {
    width: Dimensions.get('window').width - 20,
    height: 250 * heightRef,
    backgroundColor: '#1877F2',
    borderRadius: 15,
    marginBottom: 20,
  },
  spacer: {
    height: '5%',
  },
  spacer1: {
    height: '2%',
  },
  descriptionContainer: {
    width: Dimensions.get('window').width - 20,
  },
  descriptionTitle: {
    fontSize: 18 * fontRef,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
  },
  descriptionText: {
    fontSize: 16 * fontRef,
    color: 'grey',
  },
  toggleDescriptionButton: {
    color: '#1877F2',
    marginTop: 5,
  },
  rowc: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: '10',
    paddingRight: '10',
  },
=======

    },


    col2: {

        flexDirection: "column",


    },


    img: {

        height: 90 * heightRef,
        width: 90 * heightRef,
        backgroundColor: "lightblue",
        borderRadius: 16,
        marginRight: 15 * widthRef,
        overflow: 'hidden'

    },


    col1: {

        flexDirection: "row",
        padding: 20 * heightRef,


    },
    y1: {
        color: "white",
        fontWeight: "bold",
        marginLeft: 6

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
        height: 60 * heightRef,
        width: Dimensions.get("window").width - 40,
        borderRadius: 24,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20 * heightRef,
    },

    buttonWrapper: {
        marginTop: 40 * heightRef,
        bottom: 0,
        width: '100%',
        alignItems: 'center',
    },


    // Styles here


    row1: {

        flexDirection: "row",
        marginLeft: 10 * widthRef,
        marginRight: 10 * widthRef,
        justifyContent: "space-between",
        width: Dimensions.get("window").width - 20,


    },

    rowWrap: {

        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        width: Dimensions.get("window").width,
        marginLeft: 15,
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
        backgroundColor: "white",
        position: "relative",
    },
    innerContainer: {
        backgroundColor: "white",
        width: "100%",
        height: "95%",
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        justifyContent: "flex-start",
        alignItems: "center",
        position: "relative",

    },
    mainContent: {
        flexDirection: "row",
        width: Dimensions.get("window").width - 30,
        marginBottom: 20 * heightRef,
    },
    rectContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20 * heightRef,
        backgroundColor: 'white',
        padding: 10,
        width: '95%'

    },
    rect: {
        width: 100 * widthRef,
        height: 40 * heightRef,
        borderColor: 'lightgrey',
        borderWidth: 1,
        borderRadius: 10,
        marginRight: 5,
        marginLeft: 5,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    },
    card: {
        width: Dimensions.get("window").width - 20,
        height: 250 * heightRef,
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

        width: Dimensions.get("window").width - 20

    },
    descriptionTitle: {
        fontSize: 18 * fontRef,
        fontWeight: "bold",
        marginBottom: 5,
        color: 'black'
    },
    descriptionText: {
        fontSize: 16 * fontRef,
        color: "grey",
    },
    toggleDescriptionButton: {
        color: "#1877F2",
        marginTop: 5,
    },
    rowc: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingLeft: "10",
        paddingRight: "10"
    }
>>>>>>> Stashed changes
});

export default ConfirmAppointment;
