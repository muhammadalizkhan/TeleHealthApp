import { StatusBar } from "expo-status-bar";
// import { Redirect, router } from "expo-router";
import { View, Text, Image, ScrollView,StyleSheet,TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../../constants";


const Welcome = ({navigation}) => {
  // const { loading, isLogged } = useGlobalContext();

 

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
          <Text>"Your pathway to wellness starts here. Connect with</Text>
          <Text>compassionate health care professionals effortlessly,</Text>
          <Text>"guiding you towards optimal health and vitality."</Text>
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

      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default Welcome;

const styles = StyleSheet.create({

  cq:{

    height:10,
    width:25,
    backgroundColor:"#1877F2",
    borderRadius:12


  },
  
  cq1:{

    height:10,
    width:17,
    backgroundColor:"grey",
    borderRadius:12


  },


  r5:{

    flexDirection:"row",
  
    width:200,
    height:20


  },

  
  ImageContainer:{

    height:"100%",
    width:"100%"
  },


  images:{


    //  marginTop:"50%",

    
    width:350,
    // backgroundColor:"black",
    
    flex:2
    
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
  spacer1: {
    height: '16%',
  },
  footerText: {
    fontWeight: 'bold',
    fontSize: 15,
  },
});
