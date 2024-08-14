import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { socketConnection } from '../services/socketService';

const SocketContext = createContext();

const socketReducer = (state, action) => {
    switch (action.type) {
        case 'SET_SOCKET':
            return { ...state, socket: action.payload };
        case 'SET_USER_STREAM':
            return { ...state, userStream: action.payload };
        case 'SET_CALL_ACCEPTED':
            return { ...state, callAccepted: action.payload };
        default:
            return state;
    }
};

export const SocketProvider = ({ children, session, chatToken }) => {
    const [state, dispatch] = useReducer(socketReducer, {
        socket: null,
        userStream: null,
        callAccepted: false,
    });

    useEffect(() => {
        socketConnection(session, dispatch, chatToken);
    }, [session, chatToken]);

    return (
        <SocketContext.Provider value={{ state, dispatch }}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => useContext(SocketContext);
