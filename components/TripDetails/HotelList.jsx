import { View, Text, FlatList, Image } from 'react-native'
import React from 'react'

export default function HotelList({hotelList}) {
  return (
    <View style={{marginTop:20}}>
      
      <Text style={{fontFamily:'outfit-bold', fontSize:20, width:180}}>🏨 Hotel Recommendation</Text>

      <FlatList 
        data={hotelList}
        style={{marginTop:8}}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        renderItem={ ( {item, index} ) => (
            <View style={{marginRight:20}}>
                <Image  source={ require('./../../assets/images/icon.png')} style={{ height:120, width:180, borderRadius:15, borderWidth:1}}/>
            
                <View style={{padding:5}}>
                    <Text style={{fontFamily:'outfit-medium', fontSize:17}}>{item.hotelName}</Text>

                    <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                        <Text style={{fontFamily:'outfit'}}>⭐ {item.rating}</Text>

                        <Text style={{fontFamily:'outfit'}}>💰 {item.price}</Text>
                    </View>
                </View>
            </View>  

        )}  

      />  
    
    </View>
  )
}