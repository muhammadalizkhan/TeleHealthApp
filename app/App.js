import React, { useState } from 'react';
import { Button, View, StyleSheet, Text, LogBox } from 'react-native';
import StackNavigator from './naigation/stack-navigation';
import { StripeProvider } from '@stripe/stripe-react-native';
import { Provider } from 'react-redux';
import { store } from '../store';
import { AuthContextProvider } from '../context/Authcontext';
import FlashMessage from 'react-native-flash-message';
import {SocketProvider} from "./context/SocketContext";
import 'react-native-get-random-values';

// Stripe Publishable Key
const STRIPE_KEY = 'pk_test_51OKQpWC3YljrYOzACQifh9GVauSFCM64sS0X9MTgIS4dC1qpNF4VksmXxCrIM8JRDs06QlXBoHS2k9EJDtB3RvJX00qEDSjl5T';

const App = () => {
    LogBox.ignoreAllLogs();

    // Mock session and chatToken for demonstration purposes
    const session = { user: { _id: 'user-id', role: 'user-role' } };
    const chatToken = 'your-chat-token';

    return (
        <Provider store={store}>
            <StripeProvider publishableKey={STRIPE_KEY}>
                <AuthContextProvider>
                    <SocketProvider session={session} chatToken={chatToken}>
                        <StackNavigator />
                        <FlashMessage position="top" />
                    </SocketProvider>
                </AuthContextProvider>
            </StripeProvider>
        </Provider>
    );
};

const styles = StyleSheet.create({});

export default App;
