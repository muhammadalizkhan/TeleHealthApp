import { StyleSheet, Text, View, Dimensions,Image } from 'react-native'
import { images } from '../constants'
import React from 'react'

const UpcomingSchedule = () => {
  return (
    <View  style={styles.container}>
   
     <View style={styles.topBar}>

        <Text  style={styles.y1}>Fri,12 Apr</Text>

        <Text  style={styles.y1}>11:00 am</Text>


     </View>

     <View style={styles.row}>
     <View  style={styles.circular}>

     <Image
  source={images.doctorPic}
  resizeMode="cover"
  style={{
    height: 100,
    width: 100,
    borderRadius: 50, // Half of width or height to make it circular
    overflow: 'hidden', // Ensure the image is clipped properly
  }}
/>

     </View>

     <View  style={styles.c1}>

        <Text style={{color:"white", fontWeight:'bold', fontSize:18}}>Dr Jackson Wang</Text>
        <Text style={{color:"white", }}>Cardiologist</Text>

        <Text style={{color:"white", }}>Duration: 40 min</Text>


     </View>

     


     </View>

     
    </View>
  )
}

export default UpcomingSchedule

const styles = StyleSheet.create({

    c1:{

        justifyContent:"center",
        alignItems:"flex-start",
        marginLeft:15


    },


    row:{


        flexDirection:"row"

    },


    circular:{

        height:100,
        width:100,
        borderRadius:100,  backgroundColor:"#DAD9D9",
        marginTop:10,
        marginTop:10


    },


    y1:{


    
        fontWeight:'bold',
        color:"white"


    },


    topBar:{
        backgroundColor: "rgba(218, 217, 217, 0.5)", // Adding transparency
        height:45,
        borderRadius:15,
        flexDirection:"row",
        padding:10,

        alignItems:"center",

        justifyContent: "space-between"
    },



  container:{


    height:180,
    width: Dimensions.get("window").width-40,

    backgroundColor:"#1877F2",
    marginTop:10,
    borderRadius:20,
    justifyContent:"flex-start",
    padding:15,

    



  }



})