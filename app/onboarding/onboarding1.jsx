
// import { Redirect, router } from "expo-router";
import {View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import { fontRef, heightRef, widthRef } from "../../constants/screenSize";
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";



const Welcome = ({navigation}) => {
  // const { loading, isLogged } = useGlobalContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAsyncStorage();
  }, []);

  const checkAsyncStorage = async () => {
    try {
      const checkValue = await AsyncStorage.getItem('check');
      console.log('Check value from AsyncStorage:', checkValue); // Debugging log

      const isChecked = checkValue ? JSON.parse(checkValue) : false;
      if (isChecked) {
        console.log('Navigating to role-login'); // Debugging log
        navigation.replace('role-login');
      } else {
        setLoading(false); // Hide loading indicator
      }
    } catch (error) {
      console.error('Error reading check value from AsyncStorage:', error);
      setLoading(false); // Hide loading indicator in case of error
    }
  };

  if (loading) {
    return (
        <SafeAreaView style={styles.container}>
          <ActivityIndicator size="large" color="#0000ff" />
        </SafeAreaView>
    );
  }
  return (
    <SafeAreaView className="bg-primary h-full">
      {/* <Loader isLoading={loading} /> */}

      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >

        <>

        <View style={styles.container}>


          <View

          style={styles.spacer1}

          ></View>



          {/* <View   style={styles.ImageContainer}> */}



          <Image
            source={images.onBoarding1}
            resizeMode="cover"
            style={styles.images}
          />






      <View style={styles.innerContainer}>
        <Text style={styles.headerText}>Find your Doctor</Text>
        <View style={styles.contentContainer}>
          <Text style={{fontSize:14 * fontRef, color:'black', width:'90%'}}>"Your pathway to wellness starts here. Connect with compassionate health care professionals effortlessly,"guiding you towards optimal health and vitality."</Text>

          <View style={styles.spacer} />
          <View style={styles.footerContainer}>

           <View  style={styles.r5}>
            <View style={styles.cq}></View>
            <View style={styles.cq1}></View>

            <View style={styles.cq1}></View>



           </View>

            <TouchableOpacity  onPress={()=>navigation.navigate("onboarding2")}>
            <Text style={styles.footerText}>Next &gt;</Text>
            </TouchableOpacity>

          </View>
        </View>
      </View>
    </View>

        </>

      </ScrollView>

      {/* <StatusBar backgroundColor="#161622" style="light" /> */}
    </SafeAreaView>
  );
};

export default Welcome;

const styles = StyleSheet.create({

  cq:{

    height:10 * heightRef,
    width:35 * widthRef,
    backgroundColor:"#1877F2",
    borderRadius:12 * heightRef,
    marginRight:3


  },

  cq1:{

    height:10 * heightRef,
    width:20 * widthRef,
    backgroundColor:"#f3f3f3",
    borderRadius:12,
    marginRight:3,
    borderWidth:0.2,
    borderColor:'gray'


  },


  r5:{

    flexDirection:"row",

    width:200 * widthRef,
    height:20 * heightRef


  },


  ImageContainer:{

    height:"100%",
    width:"100%"
  },


  images:{


    //  marginTop:"50%",


    width:'70%',
    // backgroundColor:"black",

    height:420 * heightRef

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
    height: '40%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 5, // This applies shadow for Android
    shadowColor: '#000', // Specify the color of the shadow
    shadowOffset: { width: 0, height: -2 }, // Negative value on Y-axis raises the shadow to the top
    shadowOpacity: 0.1, // Opacity of the shadow
    shadowRadius: 4, // Blur radius of the shadow
},

  headerText: {
    marginTop: 40  * heightRef,
    fontWeight: 'bold',
    fontSize: 25 * fontRef,
    justifyContent: 'flex-start',
    marginBottom: 30 * heightRef,
    marginLeft: 20 * widthRef,
    color:'black'
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
    height: '25%',
  },
  spacer1: {
    height: '16%',
  },
  footerText: {
    fontWeight: 'bold',
    fontSize: 18 * fontRef,
    marginRight:10 * widthRef,
    color:'black'
  },
});
