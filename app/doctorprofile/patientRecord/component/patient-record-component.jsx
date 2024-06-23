import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { images } from '../../../../constants';

const PatientRecordComponent = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.name}>John Wicket</Text>
        <Text style={styles.disease}>Disease: cardiovascular</Text>
        <Text style={styles.gender}>Gender: Male</Text>
        <View style={styles.spacer}></View>
        <View style={styles.details}>
         
            <Text>Check Details !</Text>
       
        </View>
      </View>
      <Image
        source={images.Patient}
        resizeMode="cover"
        style={styles.image}
      />
    </View>
  );
};

export default PatientRecordComponent;

const styles = StyleSheet.create({
  
  container: {
    height: 150,
    width: Dimensions.get('window').width - 40,
    backgroundColor: 'lightgrey',
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    marginBottom: 5,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Shadow for Android
    elevation: 5,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  disease: {
    color: 'blue',
  },
  gender: {
    fontWeight: 'bold',
  },
  spacer: {
    height: 20,
  },
  details: {
    backgroundColor: 'white',
    borderRadius: 5,
    height: 20,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 100,
    width: 100,
  },
});
