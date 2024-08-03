import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text,StyleSheet ,ScrollView, Dimensions,TextInput, Alert, Image,TouchableOpacity } from "react-native";
import { Switch } from 'react-native';
// import { AntDesign } from '@expo/vector-icons';
import { images } from "../../constants";

const SignUp = () => {

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleInputChange = (inputName, value) => {
    setForm({ ...form, [inputName]: value });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

 
 
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
        
          <View style={styles.spacerul}></View>

          <Text style={styles.text1}>Create an account</Text>
          <Text style={styles.text2}>Create an account by filling the info below</Text>
          <View  style={styles.spacer}></View>
          <View  style={styles.spacer}></View>
          <View  style={styles.spacer}></View>

          <View  style={styles.innerContainer}>
          <Text style={styles.text3}>Name</Text>

          </View>

          {/* "Your Email" text */}
        

          {/* Input container */}
          <View style={styles.container1}>
           
          <TextInput
              style={styles.input}
              keyboardType="default"
              onChangeText={(text) => handleInputChange('name', text)}
              value={form.name}
            />


          </View>

          <View  style={styles.spacer}></View>


          <View  style={styles.innerContainer}>
          <Text style={styles.text3}>Your Email</Text>

          </View>

          {/* "Your Email" text */}
         

          {/* Input container */}
          <View style={styles.container1}>
           
          <TextInput
              style={styles.input}
              keyboardType="email-address"
              onChangeText={(text) => handleInputChange('email', text)}
              value={form.email}
            />
{/* <AntDesign name="mail" size={24} color="grey" /> */}
          </View>


          <View  style={styles.spacer}></View>

          <View  style={styles.innerContainer}>
          <Text style={styles.text3}>Confirm Password</Text>

          </View>

          {/* "Your Email" text */}
        

          {/* Input container */}
          <View style={styles.container1}>
          <TextInput
              style={styles.input}
              keyboardType="default"
              secureTextEntry={!showPassword}
              onChangeText={(text) => handleInputChange('password', text)}
              value={form.password}
            />
            <TouchableOpacity onPress={toggleShowPassword}>
              <AntDesign name={showPassword ? "eye" : "eyeo"} size={24} color="grey" />
            </TouchableOpacity>
          </View>


          <View  style={styles.spacer}></View>

          <View  style={styles.innerContainer}>
          <Text style={styles.text3}>Password</Text>

          </View>

          {/* "Your Email" text */}
        

          {/* Input container */}
          <View style={styles.container1}>
           
          <TextInput
              style={styles.input}
              keyboardType="default"
              secureTextEntry={!showConfirmPassword}
              onChangeText={(text) => handleInputChange('confirmPassword', text)}
              value={form.confirmPassword}
            />
            <TouchableOpacity onPress={toggleShowConfirmPassword}>
              <AntDesign name={showConfirmPassword ? "eye" : "eyeo"} size={24} color="grey" />
            </TouchableOpacity>
          </View>

      

          {/* Other UI components go here */}


        

          <View  style={styles.spacer4}>


          </View>


          <View style={styles.termsContainer}>
          <Switch
              value={agreedToTerms}
              onValueChange={(newValue) => setAgreedToTerms(newValue)}
            />

  <Text style={styles.sfpart}>
    I agree 
    <Text style={styles.linkText} onPress={() => {/* navigation or action for Term of use */}}>
      Term of use
    </Text>
    {" and "}
    <Text style={styles.linkText} onPress={() => {/* navigation or action for Privacy Policy */}}>
      Privacy Policy
    </Text>
  </Text>
 
</View>


          <View  style={styles.buttonwrapper}>
          <View  style={styles.loginrealContainer}>


            <Text style={styles.text4}>Sign Up</Text>


</View>




          </View>

          <View  style={styles.lastText}>

            <Text  style={styles.firstPart}>Already have an account?</Text>
            <TouchableOpacity  onPress={()=>router.push('auth/sign-in')}>
            <Text style={styles.secoundPart}>Login</Text>
            </TouchableOpacity>


          </View>


        
          <View style={styles.spacerul}></View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({

  termsContainer: {
    flexDirection: 'row',  // Aligns the text and switch horizontally
    alignItems: 'center',  // Centers the items vertically
    flexWrap: 'wrap',      // Ensures the content wraps if space is not sufficient
    justifyContent: 'space-between'  // Spreads the text and switch across the container width
  },
  sfpart: {
    color: 'grey',  // Default text color
    flex: 1,        // Allows the text to fill the space not used by the switch
  },
  linkText: {
    color: '#1877F2',  // Blue color for the links
  },

  firstPart:{

     color:"grey"

  },

  sfpart:{
 
     marginTop:25,
     marginBottom:25,
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
    marginTop:50
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

  spacer:{

    height:"10%"

  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: Dimensions.get("window").height,
    paddingTop: "80%", // Added padding at the top
    paddingBottom: "80%",
  },
  text1: {
    fontSize: 35,
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