import React, { useState } from 'react';
import { Button, View, StyleSheet, Text } from 'react-native'; // Import StyleSheet
import StackNavigator from './naigation/stack-navigation';
import { StripeProvider } from '@stripe/stripe-react-native';
import { Provider } from 'react-redux';
import { store } from '../store';


const STRIPE_KEY =
  'pk_test_51PEdIPJ56CLcyplbB06hsbfX2n7qzmVyGVsqFk1rKiie9N1EljeGtHQTpVbf0C2LgLIVzw1vmaWJuuR7oYq4vWbd00R2mLFXYu';



const App = () => {
 
  return (

    <Provider store={store}>
    <StripeProvider publishableKey={STRIPE_KEY}>
    <StackNavigator/>
    </StripeProvider>
    </Provider>
  )

};

const styles = StyleSheet.create({
 
});

export default App;
