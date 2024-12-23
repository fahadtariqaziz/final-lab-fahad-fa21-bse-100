import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { Colors } from '../../constants/Colors';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {CreateTripContext} from './../../context/CreateTripContext';

export default function SearchPlace() {
  
    const navigation = useNavigation();

    const {tripData, setTripData} = useContext(CreateTripContext);

    const router = useRouter();

    useEffect( ()=> {
        navigation.setOptions({headerShown: true, headerTransparent : true, headerTitle: 'Search'})
    })

    useEffect( () => {
        console.log(tripData);
    },[tripData])

    const handleNext = () => {
      // Check if no location is selected and set Las Vegas as the default
      if (!tripData?.locationInfo?.name) {
          setTripData({
              locationInfo: {
                  name: 'Las Vegas, NV, USA',
                  coordinates: { lat: 36.1699, lng: -115.1398 }, 
                  photoRef: 'https://images.pexels.com/photos/3251700/pexels-photo-3251700.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
                  url: 'https://www.google.com/maps/place/Las+Vegas,+NV,+USA/@36.1699,-115.1398,10z',
              },
          });
      }
      router.push('/create-trip/select-traveler');
  };
  
    return (


  <View style={{ backgroundColor: Colors.WHITE, height: '100%' }}>
  <View style={{ padding: 25, paddingTop: 75,marginTop:32, backgroundColor: Colors.WHITE, height: '100%' }}>
    {/* Page Heading */}
    <Text style={{ fontSize: 24, fontFamily: 'outfit-medium', marginBottom: 15, textAlign:'center' }}>
      Search for Destination Place
    </Text>

    {/* Search Input and Next Button */}
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
      <GooglePlacesAutocomplete
        placeholder="Search Place"
        fetchDetails={true}
      // onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        // console.log(data.description);
        // console.log(details?.geometry.location);
        // console.log(details?.photos[0]?.photo_reference);
        // console.log(details?.url);
        // console.log(data, details);
        // setTripData({
        //     locationInfo:{
        //         name: data? data?.description : "",
        //         coordinates: data? details?.geometry.location : "",
        //         photoRef: details?.photos[0]?.photo_reference,
        //         url: details?.url
        //     }
        // })
        // router.push('/create-trip/select-traveler')
      // }}
        onPress={(data, details = null) => {
          console.log(data, details);
        }}
        query={{
          key: process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY,
          language: 'en',
        }}
        styles={{
          textInputContainer: {
            borderWidth: 1,
            borderRadius: 5,
            marginRight: 10,
          },
        }}
      />
      <TouchableOpacity onPress={handleNext}>
        <Text style={{ fontSize: 18, fontFamily: 'outfit-bold', padding: 10, backgroundColor: Colors.PRIMARY, color: Colors.WHITE, borderRadius: 5 }}>
          Next
        </Text>
      </TouchableOpacity>
    </View>

    {/* Additional Content */}
    <View style={{ marginTop: 20 }}>
      <Text style={{ fontSize: 20, fontFamily: 'outfit-regular', marginBottom: 10 }}>
        Explore Nearby Attractions
      </Text>
      <Text style={{ fontSize: 16, fontFamily: 'outfit-light', color: Colors.GRAY, marginBottom: 20 }}>
        Discover popular places, landmarks, and hidden gems near your destination. 
        Choose your next adventure and plan your journey with ease.
      </Text>

      {/* Example Cards or Content Boxes */}
      <View style={{ backgroundColor: Colors.LIGHT_GRAY, padding: 15, borderRadius: 10, marginBottom: 10 }}>
        <Text style={{ fontSize: 18, fontFamily: 'outfit-bold', marginBottom: 5 }}>Famous Cities</Text>
        <Text style={{ fontSize: 14, fontFamily: 'outfit-regular', color: Colors.DARK_GRAY }}>
          Explore famous cities with largest buildings and expensive cars.
        </Text>
      </View>
      <View style={{ backgroundColor: Colors.LIGHT_GRAY, padding: 15, borderRadius: 10, marginBottom: 10 }}>
        <Text style={{ fontSize: 18, fontFamily: 'outfit-bold', marginBottom: 5 }}>Historic Landmarks</Text>
        <Text style={{ fontSize: 14, fontFamily: 'outfit-regular', color: Colors.DARK_GRAY }}>
          Step back in time by visiting iconic historic sites and museums.
        </Text>
      </View>
      <View style={{ backgroundColor: Colors.LIGHT_GRAY, padding: 15, borderRadius: 10 }}>
        <Text style={{ fontSize: 18, fontFamily: 'outfit-bold', marginBottom: 5 }}>Top-rated Restaurants</Text>
        <Text style={{ fontSize: 14, fontFamily: 'outfit-regular', color: Colors.DARK_GRAY }}>
          Savor delicious cuisines from renowned chefs and local favorites.
        </Text>
      </View>
    </View>
  </View>
</View>

    
  )
}