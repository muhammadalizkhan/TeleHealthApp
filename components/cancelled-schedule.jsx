import { StyleSheet, Text, View,Dimensions, Image } from 'react-native';
import { images } from '../constants';
import React from 'react'

const CompletedSchedule = () => {
  return (
    <View  style={styles.container}>

      <View  style={styles.r1}>


        
  <View  style={styles.c1}>

<Text style={{fontSize:20,fontWeight:"bold"}}>Dr. Harry Smith</Text>
<Text>Cardiologist</Text>

</View>

<View  style={styles.circle}>
  
<Image
                                                                 source={images.Close}
                                                                 resizeMode="cover" 
                                                                
                                                                 style={{
                                                 
                                                                     height:40,
                                                                     width:40
                                                                     
                                                 
                                                                  
                                                                 }}
                                                 
                                                 
                                                               />



</View>


      </View>
    


  <Text style={{color:"grey"}}>The appointment cancelled by the doctor</Text>

  <View style={styles.topBar}>

<Text  style={styles.y1}>Fri,12 Apr</Text>

<Text  style={styles.y1}>11:00 Am</Text>


</View>


    </View>
  )
}

export default CompletedSchedule

const styles = StyleSheet.create({


  y1:{

    color:"white",
    fontWeight:"bold"


  },

  topBar:{

    backgroundColor:"red",
    height:45,
    borderRadius:15,
    flexDirection:"row",
    padding:10,

    alignItems:"center",

    justifyContent: "space-between",
    marginTop:10,
    marginBottom:10
},



  circle:{

    height:70,
    width:70,
    backgroundColor:"red",
    borderRadius:100,
    marginRight:10,
    marginBottom:15,
    justifyContent:"center",
    alignItems:"center"


  },

  r1:{

    flexDirection:"row",
    justifyContent:'space-between'


  },

  c1:{

    justifyContent:'flex-start',
  

  },


  container:{


    height:190,
    width: Dimensions.get("window").width-40,

    backgroundColor:"lightblue",
    marginTop:10,
    borderRadius:20,
    justifyContent:"flex-start",
    padding:15,

    



  }
})