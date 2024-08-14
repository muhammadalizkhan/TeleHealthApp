import React, {useContext, useEffect, useState} from 'react';
import {
	View,
	Text,
	ScrollView,
	Dimensions,
	TextInput,
	Alert,
	Image,
	StyleSheet,
	TouchableOpacity,
	ActivityIndicator
} from "react-native";
import {Button, withTheme} from 'react-native-paper';
import {StackActions} from '@react-navigation/native';
import { AuthContext } from '../../context/Authcontext';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import { images } from "../../constants";
import { doctorLogin } from '../../constants/APi';
import { showMessage } from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';


const SignIn = ({navigation,route}) => {
	// const {colors} = theme;
  const { role } = route.params;
  console.log(role,'=======')
	const {loggedIn} = useContext(AuthContext);
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [showPassword, setShowPassword] = useState(true);
    const [ press, setPress] = useState(false);

	const toggleHelper = () => {
		setShowPassword(!showPassword)
	}

	// Your existing handleLoginPress function
const handleLoginPress = async () => {
	// Trimmed email and password
	console.log('pressed')

	if (!email || !password) {
	  showMessage({
		message: 'Please Enter Email and Password.',
		type: "danger",
	  });
	  return;
	}

	// Email validation
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(email)) {
	  showMessage({
		message: 'Please enter a valid email address.',
		type: "danger",
	  });
	  return;
	}

	const data = {
	  email: email,
	  password: password,
	};

	console.log('data: ', data);

	try {
	  const response = await doctorLogin('/doctor/login', data);
	  console.log('response == ', JSON.stringify(response, null, 2));

	  // Save the response in AsyncStorage
	  await AsyncStorage.setItem('DoctorData', JSON.stringify(response));

	  showMessage({
		message: 'Login Successed.',
		type: "success",
	  });

	  // Navigate to the desired screen
	  navigation.navigate('DParent-screen');
	} catch (error) {
	  showMessage({
		message: 'Login Failed',
		description: error.message,
		type: 'danger',
	  });
	}
  };



	  useEffect(() => {
		if (loggedIn) {
			setPress(false);
		  navigation.dispatch(StackActions.replace('parentscreen'));
		}
	  }, [loggedIn]);


	const {login} = useContext(AuthContext);

	const setCheckItem = async () => {
		try {
			await AsyncStorage.setItem('check', JSON.stringify(true));
			console.log('Item set in AsyncStorage');
		} catch (error) {
			console.error('Error setting item in AsyncStorage:', error);
		}
	};


	const handlePress = async () => {
		await login();
		await setCheckItem();
		setPress(true);
	};


	return (
		<SafeAreaView>
		<ScrollView>
		{  role === 'doctor' ?
		( <View style={styles.container}>
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
  			<View style={styles.container1}>
			  <TextInput
				style={styles.input}
				keyboardType="email-address"
				onChangeText={(text) => setEmail(text)}
				value={email}
			  />
			  <Icon name="mail" size={24} color="grey" />
			</View>

			<View style={styles.spacer}></View>

			<View style={styles.innerContainer}>
			  <Text style={styles.text3}>Password</Text>
			</View>

			<View style={styles.container1}>
			  <TextInput
				style={styles.input}
				keyboardType="default"
				secureTextEntry={!showPassword}
				onChangeText={(text) => setPassword(text)}
				value={password}
			  />
			  <TouchableOpacity onPress={() =>toggleHelper()}>
				<Icon name={showPassword ? "eye" : "eyeo"} size={24} color={showPassword ? "#1877F2" : "grey"} />
			  </TouchableOpacity>
			</View>

			<View style={styles.forgetconteiner}>
			  <TouchableOpacity onPress={() => {}}>
				<Text style={styles.forgetpassword}>Forget Password?</Text>
			  </TouchableOpacity>
			</View>


			<View style={styles.spacer4}></View>



			<View style={styles.spacer4}></View>

			<View style={styles.buttonwrapper}>
			  <TouchableOpacity onPress={() => handleLoginPress()}>
				<View style={styles.loginrealContainer}>
				  <Text style={styles.text4}>Login</Text>
				</View>
			  </TouchableOpacity>
			</View>



			<View style={styles.spacerul}></View>
		  </View> )
		  :
		  (
			<View style={[ styles.container, ]}>

			<Text style={styles.text1}>Welcome!</Text>
				{ !press  && <Text style={styles.text2}>Login your account or register</Text>}
				{!press && <Text style={styles.text2}> to create an account with Auth0</Text>}

				{press && <Text style={styles.text2}> Please wait ...</Text>}

				<View style={styles.spacer}></View>
				<View style={styles.spacer}></View>

				{press && <ActivityIndicator size="large" color="#1877F2" />}


				<View style={styles.spacer}></View>
			  <View style={styles.spacer}></View>
						 <View style={styles.spacer}></View>
				{!press && <TouchableOpacity onPress={() => handlePress()} style={styles.button}>

					<Text style={styles.text4}>Login</Text>

				</TouchableOpacity>}


			</View>
		  ) }


		</ScrollView>
	  </SafeAreaView>

	);
};

export default SignIn;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor:'white'
	},
	spacer: {
		height: 13
	  },
	  text1: {
		fontSize: 40,
		fontWeight: "bold",
		color: "#1877F2"
	  },
	  spacerul: {
		height: 200,
		backgroundColor: "black"
	  },
	  text2: {
		color: "grey"
	  },
	   buttonwrapper: {
		width: '100%',
		paddingLeft: 20,
		paddingRight: 20,
		justifyContent: "center",
		alignItems: "center",
		marginTop:60,
	  },
	  loginrealContainer: {
		backgroundColor: "#1877F2",
		height: 55,
		width: '100%',
		borderRadius: 24,
		alignContent: "center",
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 20,
	  },
	  button:{
		backgroundColor: "#1877F2",
		height: 55,
		width: '80%',
		borderRadius: 40,
		alignContent: "center",
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 20
	  },
	  text4: {
		color: "white",
		fontWeight: "bold",
		fontSize:18,
	  },
	  firstPart: {
		color: "grey"
	  },
	  secoundPart: {
		color: "#1877F2",
		fontWeight: "bold",
		marginLeft:10
	  },
	  lastText: {
		width: Dimensions.get("window").width,
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
	  },
	  text4: {
		color: "white",
		fontWeight: "bold",
		fontSize:18,
	  },
	  spacer4: {
		height: "10%"
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
		height: 55,
		width: Dimensions.get("window").width - 40,
		borderRadius: 24,
		alignContent: "center",
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 20
	  },
	  images: {
		height: 50,
		width: 50
	  },
	  images1: {
		height: 35,
		width: 35,
		marginRight: 3,
		marginLeft:10
	  },
	  loginContainer: {
		backgroundColor: "#F3F3F3",
		height: 60,
		width: 160,
		borderRadius: 40,
		alignItems: "center",
		flexDirection: "row",
		paddingLeft:10
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
		backgroundColor:'white'
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
