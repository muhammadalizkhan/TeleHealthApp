// DiagnosticCenterDetail.js
import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Modal,
    Pressable,
    TextInput,
    Dimensions
} from 'react-native';
import {SvgUri} from "react-native-svg";

import Icons from "react-native-vector-icons/dist/Ionicons";
import {fontRef, heightRef, widthRef} from "../../constants/screenSize";
import {useNavigation} from "@react-navigation/native";
import {showMessage} from "react-native-flash-message";
import Iconss from "react-native-vector-icons/dist/Ionicons";
import {images} from "../../constants";
import Icon from "react-native-vector-icons/dist/MaterialCommunityIcons";

const DiagnosticCenterDetail = ({ route }) => {
    const { data } = route.params;

    const  navigation = useNavigation();
    console.log('item: ======== ', JSON.stringify(data, null, 2));
    const [modalVisible, setModalVisible] = useState(false);
    const [test, setTest] = useState([]);
    const url = `https://api-dev.mhc.doginfo.click/diagnostic-center/lab-test?centerId=${data?._id}`;
    const [selectedTest, setSelectedTest] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedBranchId, setSelectedBranchId] = useState(null)

    useEffect(() => {
        // Define an async function to fetch data
        const fetchData = async () => {
            try {
                if (!data?._id) {
                    console.error('Center ID is missing');
                    return;
                }
                // Call the API
                const response = await fetch(url, {
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
                    setTest(result);
                } else {
                    console.error('Error fetching data:', response.status, response.statusText);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        // Call the fetchData function
        fetchData();
    }, [data?._id]);

    const handleBookTestPress = (item) => {
        setSelectedTest(item);
        setModalVisible(true);
    };

    // Filter branches based on search query
    const filteredBranches = selectedTest?.branches?.filter(branch =>
        branch.completeAddress.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleBranchSelect = (branchId) => {
        if (branchId === selectedBranchId) {
            setSelectedBranchId(null); // Deselect if the same branch is selected again
        } else {
            setSelectedBranchId(branchId);
        }
    };
    const renderItem = ({ item }) => (
        <View style={styles.labContainer}>
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
                            <Image source={{ uri: item.image }} style={styles.labImage} />
                        )
                    ) : (
                        <Image source={images.Account} style={styles.labImage} />
                    )
            }
            <Text style={styles.title}>{item.testName}</Text>
            <View style={styles.infoItem}>
                <Iconss name={'calendar-outline'} size={20 * fontRef} color={'#007BFF'} />
                <Text style={styles.infoText}>{item.eligibility}</Text>
            </View>
            <View style={styles.infoItem}>
                <Iconss name={'calendar-clear-outline'} size={20 * fontRef} color={'#007BFF'} />
                <Text style={styles.infoText}>{item.branches[0]?.phone}</Text>
            </View>
            <View style={styles.infoItem}>
                <Iconss name={'pricetag-outline'} size={20 * fontRef} color={'#007BFF'} />
                <Text style={[styles.infoText,{fontSize: 20 * fontRef, fontWeight:'bold', color: 'black'}]}>Price ${item.price}</Text>
            </View>

            <TouchableOpacity style={{width : '40%', alignSelf:'center'  ,
                height:'16%', backgroundColor: '#007BFF', padding: 10,
                borderRadius: 30, marginTop: 10, justifyContent:'center'  }} onPress={ ()=> handleBookTestPress(item)}>

                <Text style={{color: 'white', textAlign: 'center', fontSize: 14 * fontRef , fontWeight:'bold'}}>Book Test</Text>
            </TouchableOpacity>
        </View>
    );


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <Icons name={'chevron-back'} size={30 * fontRef} color="black" />

                </TouchableOpacity>
                <Text style={styles.title}>{data?.centerName}</Text>

            </View>
            <View style={styles.main}>

                <FlatList
                    data={test}
                    contentContainerStyle={{paddingBottom: 20}}
                    keyExtractor={(item) => item._id}
                    renderItem={renderItem}
                />


            </View>

            {/* Modal Component */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>{selectedTest ? selectedTest.testName : "Book Test"}</Text>

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
                        {/* Display branches */}
                        <View style={{ height: 200 }}>
                            {filteredBranches?.length > 0 ? (
                                <FlatList
                                    data={filteredBranches}
                                    keyExtractor={(item) => item._id}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            style={[
                                                styles.branchItem,
                                                item._id === selectedBranchId && styles.selectedBranchItem,
                                            ]}
                                            onPress={() => handleBranchSelect(item._id)}
                                        >
                                            <Text style={[styles.branchText,
                                                item._id === selectedBranchId && styles.selectedText]}>{item.completeAddress}</Text>
                                            <Text style={[styles.branchText,
                                                item._id === selectedBranchId && styles.selectedText]}>{item.phone}</Text>
                                        </TouchableOpacity>
                                    )}
                                />
                            ) : (
                                <Text>No branches available</Text>
                            )}
                        </View>

                        <Pressable
                            style={[styles.buttonClose]}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.textStyle}>Close</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    main: {
        flex: 1,
        paddingHorizontal: 20 * widthRef,
    },
    title: {
        fontSize: 20 * fontRef,
        fontWeight: 'bold',
        marginLeft:8 * widthRef,
        color:'black',
        marginBottom: 10 * heightRef,
    },
    labContainer: {
        width: '100%',
        height:380 * heightRef,
        backgroundColor: '#F9F8F8',
        justifyContent:'center',
        padding: 10 * widthRef,
        // backgroundColor:'red',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#DAD9D9',
        marginBottom: 10 * heightRef,
    },
    detail: {
        fontSize: 16 * fontRef,
        marginVertical: 5 * heightRef,
    },
    header: {
        padding: 5 * heightRef,
        height: 70 * heightRef,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8 * heightRef,
        paddingLeft: 6 * widthRef,
    },
    infoText: {
        fontSize: 14 * fontRef,
        color: '#8A8A8E',
        marginLeft: 5 * widthRef,
    },
    price:{
        fontSize: 16 * fontRef,
        color: '#007BFF',
        fontWeight : 'bold',
    },
    images:{
        width: "100%",
        height: 110 * heightRef,
        borderRadius: 10,
        backgroundColor: '#007BFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10 * heightRef,

    },
    selectedBranchItem: {
        backgroundColor: '#007BFF',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        height: 400,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20 * heightRef,
        // alignItems: 'center',

    },
    modalTitle: {
        fontSize: 24 * fontRef,
        fontWeight: 'bold',
        marginBottom: 15,
        color: 'black',
    },
    selectedText: {
        color: 'white',
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonClose: {
        backgroundColor: '#007BFF',
        width: '40%',
        borderRadius: 10,
        height: 40 * heightRef,
        alignSelf:'flex-end',
        justifyContent: 'center',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16 * fontRef,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',


    },

    input: {
        height: 50 * heightRef,
        width: '100%',
        borderColor: '#DAD9D9',
        alignItems: 'center',
        flexDirection: 'row',
        borderWidth: 1,
        marginBottom: 10 * heightRef,
        paddingHorizontal: 10 * widthRef,
        borderRadius: 10,
    },
    branchItem: {
        marginVertical: 5,
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
    },
    branchText: {
        fontSize: 16 * fontRef,
        color: '#333',
    },
});

export default DiagnosticCenterDetail;
