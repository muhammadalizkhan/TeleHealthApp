import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { images } from '../../../constants'

const PrescribedCenter = () => {
  return (
    <View style={styles.containerr}>

      <View style={styles.smallConatiner}>

        <Image
          source={images.Center}
          resizeMode="cover"

          style={{
            height: 110,
            width: 145,



          }}


        />

        <View style={styles.r1}>

          <Text style={{ fontSize: 15, fontWeight: "bold" }}>Chugtai Lab</Text>

          <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
            <Text>4.5 </Text>

            <Image
              source={images.star}
              resizeMode="contain"

              style={{
                height: 10,
                width: 10,



              }}


            />



          </View>
        </View>


        <View style={styles.r1}>
          <View>

            <Text style={{ color: "grey", fontSize: 10 }}>Mon-Fri</Text>

            <Text style={{ color: "grey", fontSize: 10 }}>9:00 am to 5:00pm</Text>


          </View>


          <Image
            source={images.Arrow}
            resizeMode="contain"

            style={{
              height: 15,
              width: 15,



            }}


          />



        </View>


      </View>

    </View>
  )
}

export default PrescribedCenter

const styles = StyleSheet.create({

  r1: {

    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5


  },


  containerr: {

    borderWidth: 1,
    borderColor: "grey",
    height: 180,
    width: 155,
    borderRadius: 20,
    justifyContent: "flex-start",
    alignItems: "center"
  },

  smallConatiner: {
    marginTop: 5,


    height: 110,
    width: 145,
    borderRadius: 20


  }
})