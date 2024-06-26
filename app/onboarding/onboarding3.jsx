import { StatusBar } from "expo-status-bar";
import { View, Text, Image, ScrollView,StyleSheet,TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";

const Onboarding3 = ({ navigation }) => {
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
                source={images.onBoarding3}
                resizeMode="contain"
                style={styles.images}
              />
    
    
          <View style={styles.innerContainer}>
            <Text style={styles.headerText}>Manage appointment</Text>
            <View style={styles.contentContainer}>
              <Text>"Your pathway to wellness starts here. Connect with</Text>
              <Text>compassionate health care professionals effortlessly,</Text>
              <Text>"guiding you towards optimal health and vitality."</Text>
              <View style={styles.spacer} />
              <View style={styles.footerContainer}>
              <View  style={styles.r5}>
            <View style={styles.cq1}></View>
            <View style={styles.cq1}></View>

            <View style={styles.cq}></View>



           </View>
                <TouchableOpacity  onPress={()=>navigation.navigate("role-login")}>
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
}

export default Onboarding3

const styles = StyleSheet.create({

  r5:{

    flexDirection:"row",
  
    width:200,
    height:20


  },

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



    images:{
  
      display:"flex",
      alignItems:"center",
      justifyContent:"center",
      marginBottom:"5%",
      marginTop:"10%",
    //   backgroundColor:"black",
      width:350,
      flex:1
      
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
    footerText: {
      fontWeight: 'bold',
      fontSize: 15,
    },
  });
  