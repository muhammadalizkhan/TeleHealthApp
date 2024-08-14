import io from "socket.io-client";
import Peer from "simple-peer";

let socket;

export const socketConnection = (session, dispatch, chatToken) => {
    const userId = session?.user?._id;
    const role = session?.user?.role;

    socket = io('https://dev-ec2server.doginfo.click', {
        auth: { chatToken: chatToken || null },
        query: { userId: userId || null, role: role || null },
        reconnection: true,
        reconnectionDelay: 500,
        reconnectionAttempts: Infinity,
    });

    socket.on("connected", () => {
        console.log("Socket connected");
    });

    dispatch({ type: "SET_SOCKET", payload: socket });
};

export const requestCall = (name, userProfileImg, stream, setUserStream, setCallAccepted, connectionRef) => {
    const peer = new Peer({ initiator: true, trickle: false, stream: stream });

    peer.on("signal", (data) => {
        socket.emit("request_call", { signalData: data, name: name, userProfileImg });
    });

    peer.on("stream", (mediaStream) => {
        setUserStream(mediaStream);
    });

    socket.on("request_accepted", (data) => {
        setCallAccepted(true);
        peer.signal(data.signal);
    });

    connectionRef.current = peer;
};

export const incomingCallRequest = (setCallerSignal, setCallerImg, setReceivingCall, setCallerName) => {
    socket.on("request_call", (data) => {
        setCallerImg(data.userProfileImg);
        setCallerSignal(data.signal);
        setCallerName(data.name);
        setReceivingCall(true);
    });
};

export const acceptRequest = (stream, myName, userProfileImg, setUserStream, callerSignal, connectionRef, isMyVideStreaming) => {
    const peer = new Peer({ initiator: false, trickle: false, stream: stream });

    peer.on("signal", (data) => {
        socket.emit("accept_request", { signal: data, myName, userProfileImg, isMyVideStreaming });
    });

    peer.on("stream", (mediaStream) => {
        setUserStream(mediaStream);
    });

    peer.signal(callerSignal);
    connectionRef.current = peer;
};

export const endCall = (setCallAccepted, setAptEnded) => {
    socket.emit("end_call");
    setCallAccepted(false);
    setAptEnded(true);
};
