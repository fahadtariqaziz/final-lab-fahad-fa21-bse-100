import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigation, useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { SelectTravellersList } from '../../constants/Options';
import OptionCard from '../../components/CreateTrip/OptionCard';
import { CreateTripContext } from '../../context/CreateTripContext';

export default function SelectTraveler() {

    const navigation = useNavigation();

     const {tripData, setTripData} = useContext(CreateTripContext);

    const router = useRouter();

    const [selectTraveller, setSelectTraveller] = useState();

    useEffect( ()=> {
        setTripData({...tripData, traveler: selectTraveller})
        console.log(selectTraveller);
    },[selectTraveller])  


    useEffect( ()=> {
        console.log(tripData)
    },[tripData])

    useEffect( ()=> {
        navigation.setOptions({headerShown: true, headerTransparent : true, headerTitle: ''})
    },[])

  return (
    <View style={{padding:25, paddingTop:75, backgroundColor:Colors.WHITE, height:'100%'}}>
      
      <Text style={{fontSize:30, fontFamily:'outfit-bold', marginTop:20}}>Who's Travelling</Text>

      <View style={{marginTop:20}}>

        <Text style={{fontFamily:'outfit-bold', fontSize:23}}> Choose your Travellers</Text>

        <FlatList 
            data={SelectTravellersList}
            renderItem={({item,index})=>(
                <TouchableOpacity onPress={()=> setSelectTraveller(item)} style={{marginVertical:10}}> 
                    <OptionCard option={item} selectedOption={selectTraveller} />
                </TouchableOpacity>
            )}  
        />

      </View>

            
      <TouchableOpacity style={{padding:15, backgroundColor:Colors.PRIMARY, borderRadius:15,marginTop:20}} >
        <Link href={'/create-trip/select-dates'} style={{width:'100%', textAlign:'center' }}>
            <Text style={{textAlign:'center', color:Colors.WHITE, fontFamily:'outfit-medium', fontSize:20}}>Continue</Text>
        </Link>
      </TouchableOpacity>
    </View>
  )
}