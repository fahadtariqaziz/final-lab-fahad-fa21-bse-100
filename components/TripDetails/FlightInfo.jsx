import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { Colors } from '../../constants/Colors';

export default function FlightInfo({flightData}) {

    useEffect(() => {
        // console.log(flightData?.[0]);
        // console.log(flightData?.[0]?.price)
    },[flightData])
  return (
    <View style={{marginTop:20, borderWidth:1, borderColor:Colors.LIGHT_GRAY, padding:10, borderRadius:15}}>
        
        <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>

            <Text style={{fontFamily:'outfit-bold', fontSize:20 }}> ✈️ Flight Details </Text>
        
            <TouchableOpacity style={{backgroundColor:Colors.PRIMARY , padding:5 , width:100 , borderRadius:7}}>
                <Text style={{textAlign:'center', color:Colors.WHITE, fontFamily:'outfit'}}>Book Now</Text>
            </TouchableOpacity>
        </View>
            <Text style={{fontFamily:"outfit", fontSize:17 , marginTop:7}}>Airline</Text>
            <Text style={{fontFamily:"outfit", fontSize:17}}>Price : {flightData?.[0]?.price}</Text>

    </View>
  )
}