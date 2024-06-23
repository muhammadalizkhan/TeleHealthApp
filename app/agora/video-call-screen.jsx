import React, { useState } from 'react';
import { Button, View, StyleSheet, Text } from 'react-native';
import AgoraUIKit from 'agora-rn-uikit';
import { StreamPublishState } from 'react-native-agora';

const VideoCall = () => {
  

  const connectionData = {
    appId: 'dbffe3feb4b24c49b49c288883629dea',
    channel: 'test',
    token: null, // enter your channel token as a string 
  };

  return (
    <AgoraUIKit connectionData={connectionData} />
  );
};


export default VideoCall;
