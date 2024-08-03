import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Dimensions, FlatList} from 'react-native';
import Icons from 'react-native-vector-icons/dist/Ionicons';
import { images } from '../../constants';
import { useNavigation } from '@react-navigation/native';
import Iconss from "react-native-vector-icons/dist/Ionicons";
import {fontRef, heightRef, widthRef} from "../../constants/screenSize";
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {showMessage} from "react-native-flash-message";
import {SvgUri} from "react-native-svg";

const DiagnosticCenterScreen = () => {
    const navigation= useNavigation()
  const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Define an async function to fetch data
    const fetchData = async () => {
      try {
        // Call the API
        const response = await fetch('https://api-dev.mhc.doginfo.click/diagnostic-center', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // Add additional headers if required
          },
        });

        // Check if the response is successful
        if (response.ok) {
          // Parse the response data as JSON
          const result = await response.json();
          console.log('Data fetched successfully:', JSON.stringify(result, null, 2));
          showMessage({
            message: "Data fetched successfully",
            type: "success",
          })
          // Update the state with the fetched data
          setData(result);
        } else {
          console.error('Error fetching data:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    // Call the fetchData function
    fetchData();
  }, []);

  // Filter the data based on search query
  const filteredData = data.filter(item =>
      item.centerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }) => (
      <TouchableOpacity style={styles.labContainer}
                        onPress={() => navigation.navigate('CenterDetail', { data: item })}>
        {
          item.image ?
              (
                  item.image.endsWith('.svg') ? (
                      <SvgUri
                          width="100%"
                          height="40%"
                          uri={item.image}
                      />
                  ) : (
                      <Image source={{ uri: item.image }} style={styles.labImage} resizeMode={'contain'} />
                  )
              ) : (
                  <Image source={images.Account} style={styles.labImage} />
              )
        }
        <View style={{ flexDirection: 'row', width: '100%', marginTop: 5, justifyContent: 'space-between' }}>
          <Text style={styles.title}>{item.centerName}</Text>
          <View style={styles.labRatingContainer}>
            <Text style={styles.labRating}>4.5</Text>
            <Image source={images.star} style={styles.starIcon} />
          </View>
        </View>
        <Text style={styles.labAddress}>{item.branches[0]?.completeAddress}</Text>
        <View style={styles.infoItem}>
          <Iconss name={'location-outline'} size={20} color={'#007BFF'} />
          <Text style={styles.infoText}>{`${item.branches[0]?.city}, ${item.branches[0]?.state}, ${item.branches[0]?.country}`}</Text>
        </View>
        <View style={styles.infoItem}>
          <Iconss name={'call-outline'} size={20} color={'#007BFF'} />
          <Text style={styles.infoText}>{item.branches[0]?.phone}</Text>
        </View>
        <View style={styles.infoItem}>
          <Iconss name={'mail-outline'} size={20} color={'#007BFF'} />
          <Text style={styles.infoText}>{item.branches[0]?.email}</Text>
        </View>
        <View style={styles.infoItem}>
          <Icon name={'google-chrome'} size={20} color={'#007BFF'} />
          <Text style={styles.infoText}>{item.website}</Text>
        </View>
      </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
     <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <Icons name={'chevron-back'} size={30} color="black" />

                </TouchableOpacity>
                <Text style={styles.title}>Diagnostic Center</Text>

            </View>

            <View style={styles.main}>


              <View style={styles.searchContainer}>
                <View style={styles.input}>
                  <Iconss name={'locate'} size={25} color={'#DAD9D9'} />

                  <TextInput
                      style={{ marginLeft: 10 * widthRef, width: '80%', fontSize: 16 * fontRef, color: 'black' }}
                      onChangeText={setSearchQuery}
                      value={searchQuery}
                      placeholder="Search Specialist"
                      placeholderTextColor={'#DAD9D9'}
                  />


                  <Iconss name={'search'} size={25} color={'#DAD9D9'} />

                </View>

              </View>

              <FlatList
                  data={filteredData}
                  contentContainerStyle={{paddingBottom: 20}}
                  keyExtractor={(item) => item._id}
                  renderItem={renderItem}
              />

            </View>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',

  },
  title: {
    fontSize: 20 * fontRef,
    fontWeight: 'bold',
    marginLeft:8,
    color:'black'
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: Dimensions.get('window').width,

  },
  searchInput: {
    flex: 1,
    height: 50 * heightRef,
    backgroundColor: '#E8E8E8',
    borderRadius: 10,
    paddingHorizontal: 10 * widthRef,
    marginRight: 10 * widthRef,
  },
  filterButton: {
    padding: 10 * widthRef,
    backgroundColor: '#E8E8E8',
    borderRadius: 10,
  },
  filterIcon: {
    width: 20 * heightRef,
    height: 20 * heightRef,
  },
  labContainer: {
    width: '100%',
    height:360 * heightRef,
    backgroundColor: '#F9F8F8',
    padding: 10 * widthRef,
    justifyContent:'center',
    // backgroundColor:'red',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DAD9D9',
    marginBottom: 10 * heightRef,
  },
  labImage: {
    width: '100%',
    height: 120 * heightRef,
    borderRadius: 10,
    marginRight: 10 * widthRef,
  },
  labDetails: {
    flex: 1,
  },
  labName: {
    fontSize: 18 * fontRef,
    fontWeight: 'bold',
  },
  labAddress: {
    fontSize: 12 * fontRef,
    color: '#8A8A8E',
    marginLeft: 8 * widthRef,
    marginTop: 5 * heightRef,
  },
  labRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labRating: {
    fontSize: 20 * fontRef,
    fontWeight: 'bold',
    marginRight: 5 * widthRef,
    color: '#007BFF',
  },
  starIcon: {
    width: 20 * heightRef,
    height: 20 * heightRef,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20 * heightRef,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8 * heightRef,
    paddingLeft: 6 * widthRef,
  },
  infoIcon: {
    width: 20 * heightRef,
    height: 20 * heightRef,
    marginRight: 5 * widthRef,
  },
  infoText: {
    fontSize: 14 * fontRef,
    color: '#8A8A8E',
    marginLeft: 5 * widthRef,
  },
  input: {
    height: 50 * heightRef,
    width: '90%',
    borderColor: '#DAD9D9',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    marginBottom: 10 * heightRef,
    paddingHorizontal: 10 * widthRef,
    borderRadius: 10,
  },
  helpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#7CB2F8',
    padding: 10 * heightRef,
    borderRadius: 10,
    marginBottom: 20 * heightRef,
  },
  helpButtonText: {
    fontSize: 14 * fontRef,
    color: 'white',
  },
  callButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 10 * heightRef,
    borderRadius: 20 * heightRef,


    height:35 * heightRef,

  },
  callIcon: {
    width: 20 * heightRef,
    height: 20 * heightRef,
    marginRight: 5 * widthRef,
  },
  callButtonText: {
    fontSize: 14 * fontRef,
    color: 'black',
    marginLeft:5 * widthRef,
  },
  bookButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10 * heightRef,
    borderRadius: 10 * heightRef,
    height:50   * heightRef,
    alignItems: 'center',
    justifyContent:'center'
  },
  bookButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize:16 * fontRef,
  },
  header: {
    padding: 5 * heightRef,
    height: 70 * heightRef,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center'
},
main: {
    flex: 1,
    paddingHorizontal: 20 * widthRef,
}
});

export default DiagnosticCenterScreen;
