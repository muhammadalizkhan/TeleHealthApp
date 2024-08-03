import { StyleSheet, Text, View ,Dimensions, Image} from 'react-native'
import React from 'react'
import { images } from '../../../constants'

const PdfResult = () => {
  return (
    <View style={styles.containre}>
  <Image
                                                                 source={images.PdfFile}
                                                                 resizeMode="cover"

                                                                 style={{

                                                                     height:100,
                                                                     width:100



                                                                 }}


                                                />

                                            <View style={styles.c1}>
        <View style={styles.r1}>
        <Text style={{fontSize:13, fontWeight:"bold", marginTop:10, color:'dimgray'}}>PDF-2SD4443344-S3343422</Text>

        </View>

        <View  style={styles.lowcontain}>
        <Text style={{color:"grey"}}>05-11-2024</Text>
        </View>
        </View>


    </View>
  )
}

export default PdfResult

const styles = StyleSheet.create({

    r1:{

      flexDirection:"row"
    },

    c1:{

        justifyContent:"space-between"


    },

    lowcontain:{

        justifyContent:"flex-end",
        padding:7,
        flexDirection:"row"


    },

  containre:{
    height: 100,
    width: Dimensions.get('window').width - 40,
    // backgroundColor: 'green',
    marginRight: 30,
    borderRadius: 20,
    borderWidth: 1, // border width
    borderColor: 'grey', // border color
    marginTop:10,
    flexDirection:"row"

  }
})
