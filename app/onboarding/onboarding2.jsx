// import { StatusBar } from "expo-status-bar";

import { View, Text, Image, ScrollView,StyleSheet,TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Dimensions } from 'react-native';
import { images } from "../../constants";
import {fontRef, heightRef, widthRef} from "../../constants/screenSize";



const screenWidth = Dimensions.get('window').width;
const Onboarding2 = ({ navigation }) => {
    return (
        <SafeAreaView className="bg-primary h-full">

          <ScrollView
            contentContainerStyle={{
              height: "100%",
            }}
          >

            <>

            <View style={styles.container}>



            <Image
                source={images.onBoarding2}
                resizeMode="cover"

                style={styles.images}


              />


          <View style={styles.innerContainer}>
            <Text style={styles.headerText}>Make appointment</Text>
            <View style={styles.contentContainer}>
              <Text style={{fontSize:14 * fontRef, color:'black', width:'90%'}}>"Your pathway to wellness starts here. Connect with compassionate health care professionals effortlessly, "guiding you towards optimal health and vitality."</Text>

              <View style={styles.spacer} />
              <View style={styles.footerContainer}>

           <View  style={styles.r5}>
            <View style={styles.cq1}></View>
            <View style={styles.cq}></View>

            <View style={styles.cq1}></View>



           </View>

                <TouchableOpacity  onPress={()=>navigation.navigate('onboarding3')}>
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
}

export default Onboarding2

const styles = StyleSheet.create({

  r5:{

    flexDirection:"row",

    width:200 * widthRef,
    height:20 * heightRef


  },

  cq:{

    height:10 * heightRef,
    width:35 * widthRef,
    backgroundColor:"#1877F2",
    borderRadius:12,
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

    images: {

        // marginTop: "50%", // Adjust this value as needed to move the image lower

        // flex:1,
        height:460 * heightRef,
        width: '100%',
        position:'absolute',
        top:80 * heightRef
        // marginTop:"30%"
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
    },
    headerText: {
      marginTop: 40 * heightRef,
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
    footerText: {
      fontWeight: 'bold',
      fontSize: 18 * fontRef,
      marginRight:10 * widthRef,
      color:'black'
    },
  });
