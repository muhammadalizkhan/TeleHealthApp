import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    StatusBar, TextInput,
} from 'react-native';
import { CreditCardInput } from "react-native-credit-card-input";
import { Secret_key, STRIPE_PUBLISHABLE_KEY } from './keys';

// create a component
const CURRENCY = 'USD';
var CARD_TOKEN = `pi_3PhzSBC3YljrYOzA0SIaiiDO_secret_VlJvZoBLVOSyluBwowajhAOQU`;


function getCreditCardToken(creditCardData){
    // alert()
    const card = {
        'card[number]': creditCardData.values.number.replace(/ /g, ''),
        'card[exp_month]': creditCardData.values.expiry.split('/')[0],
        'card[exp_year]': creditCardData.values.expiry.split('/')[1],
        'card[cvc]': creditCardData.values.cvc
    };
    return fetch('https://api.stripe.com/v1/tokens', {
        headers: {
            // Use the correct MIME type for your server
            Accept: 'application/json',
            // Use the correct Content Type to send data to Stripe
            'Content-Type': 'application/x-www-form-urlencoded',
            // Use the Stripe publishable key as Bearer
            Authorization: `Bearer pk_test_51OKQpWC3YljrYOzACQifh9GVauSFCM64sS0X9MTgIS4dC1qpNF4VksmXxCrIM8JRDs06QlXBoHS2k9EJDtB3RvJX00qEDSjl5T`
        },
        // Use a proper HTTP method
        method: 'POST',
        // Format the credit card data to a string of key-value pairs
        // divided by &
        body: Object.keys(card)
            .map(key => key + '=' + card[key])
            .join('&')
    }).
    then(response => response.json())
        .catch((error)=>console.log(error))
};
/**
 * The method imitates a request to our server.
 *
 * @param creditCardToken
 * @return {Promise<Response>}
 */
function subscribeUser(creditCardToken){
    return new Promise((resolve) => {
        console.log('Credit card token\n', creditCardToken);
        CARD_TOKEN = creditCardToken.id;
        setTimeout(() => {
            resolve({ status: true });
        }, 1000);
    });
};

const StripeGateway = () => {


    const [CardInput, setCardInput] = React.useState({})
    const [ammount, setAmmount] = React.useState(50)
    const onSubmit = async () => {

        if (CardInput.valid == false || typeof CardInput.valid == "undefined") {
            alert('Invalid Credit Card');
            return false;
        }

        let creditCardToken;
        try {
            // Create a credit card token
            creditCardToken = await getCreditCardToken(CardInput);
            // console.log("creditCardToken", creditCardToken)
            if (creditCardToken.error) {
                alert("creditCardToken error");
                return;
            }
        } catch (e) {
            console.log("e",e);
            return;
        }
        // Send a request to your server with the received credit card token
        const { error } = await subscribeUser(creditCardToken);
        // Handle any errors from your server
        if (error) {
            alert(error)
        } else {

            let pament_data = await charges();
            console.log('pament_data', JSON.stringify(pament_data,null,2));
            if(pament_data.status == 'succeeded')
            {
                alert("Payment Successfully");
            }
            else{
                alert('Payment failed');
            }
        }
    };



    const charges = async () => {

        const card = {
            'amount': ammount,
            'currency': CURRENCY,
            'source': CARD_TOKEN,
            'description': "Developers Sin Subscription"
        };

        return fetch('https://api.stripe.com/v1/charges', {
            headers: {
                // Use the correct MIME type for your server
                Accept: 'application/json',
                // Use the correct Content Type to send data to Stripe
                'Content-Type': 'application/x-www-form-urlencoded',
                // Use the Stripe publishable key as Bearer
                Authorization: `Bearer sk_test_51OKQpWC3YljrYOzAamUyH0uO2Lpi32CQdbwp4ICrdgYypeBzfhjUGZijIbcJO2y6FT5OjguONA423xxpHqbEYPPW00mIDITH25`
            },
            // Use a proper HTTP method
            method: 'POST',
            // Format the credit card data to a string of key-value pairs
            // divided by &
            body: Object.keys(card)
                .map(key => key + '=' + card[key])
                .join('&')
        }).then(response => response.json());
    };



    const _onChange =(data) => {
        setCardInput(data)
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#2471A3" />
            <Image
                source={{uri:'https://st5.depositphotos.com/74027128/66387/v/380/depositphotos_663874768-stock-illustration-credit-debit-blue-card-mockup.jpg'}}
                style={styles.ImgStyle}
            />
            <CreditCardInput
                inputContainerStyle={styles.inputContainerStyle}
                inputStyle={styles.inputStyle}
                labelStyle={styles.labelStyle}
                validColor="#fff"
                placeholderColor="#ccc"
                onChange={_onChange} />

            <TextInput style={{backgroundColor:'#222242',paddingLeft:15,borderRadius:5,
                color:'#fff',marginTop:20 , width:'90%',alignSelf:'center'}}
                          placeholder="Enter Ammount"
                            placeholderTextColor="#fff"
                            keyboardType="numeric"
                            value={ammount}
                            onChangeText={(text)=>setAmmount(text)}
            />
            <TouchableOpacity
                onPress={onSubmit}
                style={styles.button}>
                <Text
                    style={styles.buttonText}>
                    Pay Now
                </Text>
            </TouchableOpacity>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

    },
    ImgStyle: {
        width: '100%',
        height: 200,
        resizeMode: 'contain',
        borderRadius: 8,
    },
    button : {
        backgroundColor:'#2471A3',
        width:150,
        height:45,
        alignSelf:'center',
        justifyContent:'center',
        alignItems:'center',
        marginTop:20,
        borderRadius:5
    },
    buttonText : {
        fontSize: 15,
        color: '#f4f4f4',
        fontWeight:'bold',
        textTransform:'uppercase'
    },
    inputContainerStyle : {
        backgroundColor:'#fff',
        borderRadius:5
    },
    inputStyle : {
        backgroundColor:'#222242',
        paddingLeft:15,
        borderRadius:5,
        color:'#fff'
    },
    labelStyle : {
        marginBottom:5,
        fontSize:12
    }

});

//make this component available to the app
export default StripeGateway;
