import { useState } from "react";
// import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, TextInput, Alert, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { images } from "../../constants";
import { useRoute } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

const SignIn = ({ navigation }) => {
  // const { setUser, setIsLogged } = useGlobalContext();
  const route = useRoute();
  const { role } = route.params; 
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
      return; // Add return to prevent further execution if fields are empty
    }

    setSubmitting(true);

    try {
      await signIn(form.email, form.password);
      const result = await getCurrentUser();
      setUser(result);
      setIsLogged(true);

      Alert.alert("Success", "User signed in successfully");
      // router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleLoginPress = () => {
    if (role === 'doctor') {
      navigation.navigate('DParent-screen'); // Navigate to the doctor screen
    } else {
      navigation.navigate('parent-screen'); // Navigate to the home screen
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.spacerul}></View>
          <Text style={styles.text1}>Welcome!</Text>
          <Text style={styles.text2}>Login your account or register</Text>
          <Text style={styles.text2}>to create an account</Text>

          <View style={styles.spacer}></View>
          <View style={styles.spacer}></View>
          <View style={styles.spacer}></View>

          <View style={styles.innerContainer}>
            <Text style={styles.text3}>Your Email</Text>
          </View>

          {/* Input container */}
          <View style={styles.container1}>
            <TextInput
              style={styles.input}
              keyboardType="email-address"
              onChangeText={(text) => setForm({...form, email: text})}
              value={form.email}
            />
            <AntDesign name="mail" size={24} color="grey" />
          </View>

          <View style={styles.spacer}></View>

          <View style={styles.innerContainer}>
            <Text style={styles.text3}>Password</Text>
          </View>

          {/* Input container for password */}
          <View style={styles.container1}>
            <TextInput
              style={styles.input}
              keyboardType="default"
              secureTextEntry={!showPassword} // Toggle based on showPassword state
              onChangeText={(text) => setForm({...form, password: text})}
              value={form.password}
            />
            <TouchableOpacity onPress={toggleShowPassword}>
              <AntDesign name={showPassword ? "eye" : "eyeo"} size={24} color="grey" />
            </TouchableOpacity>
          </View>

          <View style={styles.forgetconteiner}>
            <TouchableOpacity onPress={() => {}}>
              <Text style={styles.forgetpassword}>Forget Password?</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.container5}>
            <View style={styles.line} />
            <View style={styles.textWrapper}>
              <Text style={styles.text}>Or</Text>
            </View>
            <View style={styles.line} />
          </View>

          <View style={styles.spacer4}></View>

          <View style={styles.rowcontainer}>
            <View style={styles.loginContainer}>
              <Image
                source={images.google}
                resizeMode="cover"
                style={styles.images}
              />
              <Text style={{color:"grey"}}>Google</Text>
            </View>

            <View style={styles.loginContainer}>
              <Image
                source={images.facebook}
                resizeMode="cover"
                style={styles.images1}
              />
              <Text style={{color:"grey"}}>Facebook</Text>
            </View>
          </View>

          <View style={styles.spacer4}></View>

          <View style={styles.buttonwrapper}>
            <TouchableOpacity onPress={handleLoginPress}>
              <View style={styles.loginrealContainer}>
                <Text style={styles.text4}>Login</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.lastText}>
            <Text style={styles.firstPart}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => {}}>
              <Text style={styles.secoundPart}>Register</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.spacerul}></View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  firstPart: {
    color: "grey"
  },
  secoundPart: {
    color: "#1877F2",
    fontWeight: "bold"
  },
  lastText: {
    width: Dimensions.get("window").width,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  text4: {
    color: "white",
    fontWeight: "bold"
  },
  spacer4: {
    height: "3%"
  },
  buttonwrapper: {
    width: Dimensions.get("window").width,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  loginrealContainer: {
    backgroundColor: "#1877F2",
    height: 50,
    width: Dimensions.get("window").width - 40,
    borderRadius: 24,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20
  },
  images: {
    height: 40,
    width: 40
  },
  images1: {
    height: 25,
    width: 25,
    marginRight: 3
  },
  loginContainer: {
    backgroundColor: "lightgrey",
    height: 50,
    width: 130,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  rowcontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 25,
    marginRight: 25,
    paddingLeft: 14,
    paddingRight: 14,
    width: Dimensions.get("window").width
  },
  container5: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 14,
    marginTop: 40
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'grey',
  },
  textWrapper: {
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 16,
    color: 'grey',
  },
  forgetpassword: {
    textAlign: "right",
    marginRight: 14,
    color: "#1877F2",
    fontSize: 17,
    fontWeight: "bold"
  },
  forgetconteiner: {
    marginTop: 16,
    flexDirection: "row",
    marginRight: 14,
    justifyContent: "flex-end",
    width: Dimensions.get("window").width
  },
  innerContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: Dimensions.get("window").width
  },
  spacerul: {
    height: 200,
    backgroundColor: "black"
  },
  spacer: {
    height: 13
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
    textAlign: "left"
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
