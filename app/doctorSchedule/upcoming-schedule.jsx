import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native';
import { images } from '../../constants';
import React from 'react';

const UpcomingSchedule = ({ navigation }) => {
  return (
    <View style={styles.upcom}>
      <View style={styles.topBar}>
        <Text style={styles.y1}>Fri, 12 Apr</Text>
        <Text style={styles.y1}>11:00 am</Text>
      </View>

      <View style={styles.row}>
        <View style={styles.circular}>
          <Image
            source={images.Patient}
            resizeMode="cover"
            style={styles.patientImage}
          />
        </View>

        <View style={styles.c1}>
          <Text style={styles.name}>John Wicket</Text>
          <Text style={styles.disease}>Disease: cardiovascular</Text>
          <Text style={styles.gender}>Gender: Male</Text>

          <View  style={{flexDirection:"row", justifyContent:"flex-end", width:150}}>

            
          <TouchableOpacity
            onPress={() => navigation.navigate('video-call')}
            style={styles.cameraButton}
          >
            <Image
              source={images.Camera}
              resizeMode="cover"
              style={styles.cameraImage}
            />
          </TouchableOpacity>


          </View>

        </View>
      </View>
    </View>
  );
};

export default UpcomingSchedule;

const styles = StyleSheet.create({
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  },
  disease: {
    color: 'rgba(218, 217, 217, 0.5)',
  },
  gender: {
    fontWeight: 'bold',
    color: 'white'
  },
  c1: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: 15
  },
  row: {
    flexDirection: 'row'
  },
  circular: {
    height: 100,
    width: 100,
    borderRadius: 100,
    backgroundColor: '#DAD9D9',
    marginTop: 10
  },
  patientImage: {
    height: 100,
    width: 100,
    borderRadius: 50,
    overflow: 'hidden'
  },
  y1: {
    fontWeight: 'bold',
    color: 'white'
  },
  topBar: {
    backgroundColor: 'rgba(218, 217, 217, 0.5)', // Adding transparency
    height: 45,
    borderRadius: 15,
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  upcom: {
    height: 180,
    width: Dimensions.get('window').width - 40,
    backgroundColor: '#1877F2',
    marginTop: 10,
    borderRadius: 20,
    justifyContent: 'flex-start',
    padding: 15
  },
  cameraButton: {
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 25,
    padding: 10,
    marginTop: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1877F2', // Same as container background color
  },
  cameraImage: {
    height: 20,
    width: 20
  }
});
