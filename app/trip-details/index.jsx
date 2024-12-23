import { View, Text, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { Colors } from '../../constants/Colors';
import moment from 'moment';
import FlightInfo from '../../components/TripDetails/FlightInfo';
import HotelList from '../../components/TripDetails/HotelList';
import PlannedTrip from '../../components/TripDetails/PlannedTrip';

export default function TripDetails() {

    const navigation = useNavigation();

    const {trip} = useLocalSearchParams();

    const [tripDetails , setTripDetails] = useState([]);
    const [tripDetailsForDays , setTripDetailsForDays] = useState({});

    // const formatData = (data) => {      //format string into json
    //     return JSON.parse(data);
    // }

    const formatData = (data) => {
        return typeof data === 'string' ? JSON.parse(data) : data;
    };


    useEffect( ()=> {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: ''

        })

        console.log(trip);

        const parsedData = formatData(trip);
        setTripDetails(parsedData);
        setTripDetailsForDays(parsedData);

        console.log(parsedData)
    },[trip])


  return (
    <ScrollView style={{height:'100%', width:'100%'}}>
     
      <Image source={{uri:'https://maps.google.com/maps/api/place/photo?maxwidth=400&photo_reference='+tripDetails.locationInfo?.photoRef+'&key='+process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}}    style={{width:'100%', height:330}}  />

      <View style={{padding:15, backgroundColor:Colors.WHITE, height:'100%', marginTop:-30, borderTopLeftRadius:30, borderTopRightRadius:30}}>
        
        <Text style={{fontSize:25, fontFamily:'outfit-bold'}}> {tripDetails?.tripPlan?.tripDetails?.location} </Text>    
        
        <View style={{display:'flex', flexDirection:'row', gap:10, marginTop:5}}>
            <Text style={{fontFamily:'outfit', fontSize:14, color:Colors.GRAY }}>{moment(tripDetails?.tripData?.startDate).format("DD MMM YYYY")}</Text>
            <Text style={{fontFamily:'outfit', fontSize:14, color:Colors.GRAY }}>- {moment(tripDetails?.tripData?.endDate).format("DD MMM YYYY")}</Text>
        </View>

        <Text style={{fontFamily:'outfit', fontSize:14, color:Colors.GRAY }}> Traveling: {formatData(tripDetails.tripData)?.traveler.title}</Text>
      

      {/* Flight info */}
      <FlightInfo flightData={tripDetails?.tripPlan?.flights} />

      {/* Hotels list */}
      <HotelList hotelList={tripDetails?.tripPlan?.hotels} />

      {/* Trip Day Planner Info */}
      <PlannedTrip details={tripDetailsForDays?.tripPlan?.itinerary} />
       
      </View> 
    </ScrollView>
  )
}