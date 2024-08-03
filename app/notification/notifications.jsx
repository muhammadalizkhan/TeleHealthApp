import { StyleSheet, Text, View, SafeAreaView, Dimensions, Image, TouchableOpacity } from 'react-native'
import { images } from "../../constants";
import React from 'react'

const notifications = () => {
  return (
    <View>

      <SafeAreaView style={styles.container}>


        <View style={styles.appBar}>



          <View style={styles.appBarpatr1}>

            <Text style={styles.h1}>Notifications</Text>

          </View>

          <TouchableOpacity style={{
            elevation: 1, shadowColor: 'black', height: 47, width: 47, alignItems: 'center',
            borderRadius: 12, shadowRadius: 0, marginBottom: 10
          }}>
            <Image
              source={images.Filter}
              resizeMode='contain'
              style={{ height: 45, width: 45, }}
            />
          </TouchableOpacity>


        </View>


        <View style={styles.spacer}></View>
        <View style={styles.spacer}></View>


        <View style={styles.tabbar}>


          <View style={styles.tab1}><Text style={styles.t2}>All</Text></View>
          <View style={styles.tab2}><Text style={styles.t1text}>Recently</Text></View>
          <View style={styles.tab3}><Text style={styles.t2}>Previous</Text></View>


        </View>


        <Text style={styles.t1}>Today</Text>


        <View style={styles.notifications1}>
          <Image
            source={images.calender}
            resizeMode="cover"
            style={styles.logo}
          />
          <View style={styles.textContainer}>
            <Text style={styles.text} numberOfLines={2} ellipsizeMode="tail">
              This is my notification text This is my notification
            </Text>
          </View>
        </View>







      </SafeAreaView>


    </View>
  )
}

export default notifications

const styles = StyleSheet.create({

  t1: {

    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20


  },

  logo: {
    height: 50,
    width: 50,
    marginRight: 10,  // added some margin to space out items
  },

  notifications1: {
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 15,
    height: 85,
    width: Dimensions.get('window').width - 40,
    flexDirection: "row",
    backgroundColor: "lightblue",
    justifyContent: "flex-start", // changed to flex-start
    alignItems: "center",
    padding: 10,  // Added padding inside the notification box
  },

  textContainer: {
    flex: 1,  // take the remaining space
    marginRight: 10,  // Space before the circular box if any
  },

  text: {
    color: "grey",
    flexShrink: 1,  // allows the text to shrink if necessary
  },
  tabbar: {

    flexDirection: "row",

  },


  tab1: {


    height: 50,
    width: 100,
    backgroundColor: "#F3F8FE",
    borderBottomLeftRadius: 14,
    borderTopLeftRadius: 14,
    justifyContent: "center",
    alignItems: 'center'





  },

  tab2: {


    height: 50,
    width: 120,
    backgroundColor: "#1877F2",
    justifyContent: "center",
    alignItems: 'center'




  },
  tab3: {



    height: 50,
    width: 100,
    backgroundColor: "#F3F8FE",
    borderBottomRightRadius: 14,
    borderTopRightRadius: 14,
    justifyContent: "center",
    alignItems: 'center'




  },
  t1text:{
    color:'white'
  },
  t2:{
    color:'gray'
  },






  spacer: {


    height: 23


  },


  h1: {

    fontWeight: "bold",
    fontSize: 25,
    color:'black'


  },


  appBar: {

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"



  },


  appBarpatr1: {

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"



  },

  circularBox: {
    width: 40,
    height: 40,
    backgroundColor: 'blue',
    borderRadius: 10,
    marginLeft: 10,
  },

  container: {

    marginTop: 14,
    padding: 20,
    justifyContent: "flex-start",

  }


})