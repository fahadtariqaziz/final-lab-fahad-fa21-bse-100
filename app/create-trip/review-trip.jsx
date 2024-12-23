import { View, Text } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { CreateTripContext } from '../../context/CreateTripContext';
import moment from 'moment';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { TouchableOpacity } from 'react-native';

export default function ReviewTrip() {

    const navigation = useNavigation();
    const {tripData, setTripData} = useContext(CreateTripContext);
    const [selectedOption, setSelectedOption] = useState();

   const router = useRouter();

   useEffect( ()=> {
       navigation.setOptions({headerShown: true, headerTransparent : true, headerTitle: 'Review'})
   },[])


  return (
    <View style={{padding:25, paddingTop:75, backgroundColor:Colors.WHITE ,height:'100%'}}>
      
      <Text style={{fontFamily:'outfit-bold', fontSize:35 , marginTop:20 }}>Review your Trip</Text>

        <View style={{marginTop:20}}>
            <Text style={{fontFamily:'outfit-bold', fontSize:20}}>
                Before generating your trip , please review your selection
            </Text>

            {/* Destination Info */}
            <View style={{marginTop:40, display:'flex', flexDirection:'row', gap:20}}>
                <Ionicons name="location-sharp" size={34} color="black" />
                <View>
                    <Text style={{fontFamily:'outfit', fontSize:20, color:Colors.GRAY}}>Destination</Text>
                    <Text style={{fontFamily:'outfit-medium', fontSize:20}}>{tripData?.locationInfo?.name}</Text>
                </View>
            </View>

            {/* Date selected info */}
            <View style={{marginTop:25, display:'flex', flexDirection:'row', gap:20}}>
                <Ionicons name="calendar-sharp" size={34} color="black" />
                <View>
                    <Text style={{fontFamily:'outfit', fontSize:20, color:Colors.GRAY}}>Travel Date</Text>
                    <Text style={{fontFamily:'outfit-medium', fontSize:20}}>{moment(tripData?.startDate).format('DD MMM')+" To "+moment(tripData?.endDate).format('DD MMM')+ "   "} ({tripData?.totalNoOfDays} days) </Text>
                </View>
            </View>

            {/* Travelers Info */}
            <View style={{marginTop:25, display:'flex', flexDirection:'row', gap:20}}>
                <Ionicons name="people-sharp" size={34} color="black" />
                <View>
                    <Text style={{fontFamily:'outfit', fontSize:20, color:Colors.GRAY}}>Who is Travelling</Text>
                    <Text style={{fontFamily:'outfit-medium', fontSize:20}}>{tripData?.traveler?.title} </Text>
                </View>
            </View>

            {/* Budget Info */}
            <View style={{marginTop:25, display:'flex', flexDirection:'row', gap:20}}>
            <FontAwesome5 name="money-check-alt" size={24} color="black" />
                <View>
                    <Text style={{fontFamily:'outfit', fontSize:20, color:Colors.GRAY}}>Budget</Text>
                    <Text style={{fontFamily:'outfit-medium', fontSize:20}}>{tripData?.budget}</Text>
                </View>
            </View>




        </View>
    
            <TouchableOpacity style={{padding:15, backgroundColor:Colors.PRIMARY, borderRadius:15,marginTop:40}} onPress={ () => router.replace('/create-trip/generate-trip')} >
       
            <Text style={{textAlign:'center', color:Colors.WHITE, fontFamily:'outfit-medium', fontSize:20}}>Build My Trip</Text>
      
            </TouchableOpacity>


    </View>
  )
}