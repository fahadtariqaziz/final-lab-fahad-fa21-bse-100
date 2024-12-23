import { View, Text, ToastAndroid } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router';
import { CreateTripContext } from '../../context/CreateTripContext';
import { Colors } from './../../constants/Colors';
import CalendarPicker from "react-native-calendar-picker";
import moment from 'moment';
import { TouchableOpacity } from 'react-native';

export default function SelectDates() {

    const navigation = useNavigation();
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const {tripData, setTripData} = useContext(CreateTripContext);

   const router = useRouter();

   useEffect( ()=> {
       navigation.setOptions({headerShown: true, headerTransparent : true, headerTitle: 'choose dates'})
   },[])


   const onDateChange = (date,type) => {
      console.log(date,type);
      if(type == 'START_DATE')
      {
        setStartDate(moment(date))
      }
      else
      {
        setEndDate(moment(date))
      }
   }

   const OnDateSelectionContinue = () => {
    if(!startDate && !endDate)
    {
      ToastAndroid.show('Please select start date and end date', ToastAndroid.LONG);
      return;
    }
      const totalNoOfDays = endDate.diff(startDate,'days');
      console.log(totalNoOfDays+1);
      setTripData({
        ...tripData, 
        startDate: startDate,
        endDate: endDate,
        totalNoOfDays: totalNoOfDays+1
      })

      router.push('/create-trip/select-budget')
   }

  return (
    <View style={{padding:25, paddingTop:75, backgroundColor:Colors.WHITE}}>

      <Text style={{fontFamily:'outfit-bold', fontSize:35, marginTop:20}}>Travel Dates</Text>

    <View style={{marginTop:30}}>
          <CalendarPicker onDateChange={onDateChange} allowRangeSelection={true} minDate={new Date()} maxRangeDuration={5} selectedRangeStyle={{backgroundColor:Colors.PRIMARY}} selectedDayTextStyle={{color:Colors.WHITE}} />

    </View>

    <TouchableOpacity style={{padding:15, backgroundColor:Colors.PRIMARY, borderRadius:15,marginTop:35}} onPress={OnDateSelectionContinue} >
        {/* <Link href={''} style={{width:'100%', textAlign:'center' }}> */}
            <Text style={{textAlign:'center', color:Colors.WHITE, fontFamily:'outfit-medium', fontSize:20}}>Continue</Text>
        {/* </Link> */}
      </TouchableOpacity>
    </View>
  )
}