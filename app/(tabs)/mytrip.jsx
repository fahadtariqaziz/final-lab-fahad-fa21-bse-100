import { View, Text, ActivityIndicator, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../../constants/Colors'
import Ionicons from '@expo/vector-icons/Ionicons';
import StartNewTripCard from '../../components/MyTrips/StartNewTripCard';
import { collection, doc, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../../configs/FirebaseConfig';
import UserTrips from '../../components/MyTrips/UserTrips';
import { useRoute } from '@react-navigation/native';
import { useRouter } from 'expo-router';

export default function mytrip() {

    const [userTrips, setUserTrips] = useState([]);          //save all doc collection in this useState that we get by console
    const user = auth.currentUser;
    const [loading, setLoading] = useState(false);
    
    const router = useRouter();

    
    
    useEffect( () => {
      user && getMyTrips()
    },[user])

    const getMyTrips = async () => {     // get multiple doc from collection
      setLoading(true);
      setUserTrips([]);
      const q= query(collection(db, 'UserTrips'), where('userEmail', '==', user?.email));

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        setUserTrips(prev => [...prev, doc.data()])
      })
      setLoading(false)
    }

  return (
    <ScrollView style={{padding:25, paddingTop:55, backgroundColor: Colors.WHITE, height:'100%'}}>
      
      
      <View style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
        <Text style={{fontFamily:'outfit-bold', fontSize:35}}>My Trips</Text>
        <Ionicons name="add-circle" size={50} color="black" onPress={()=> router.push('/create-trip/searchPlace')} />     
      </View>
    
      {loading && <ActivityIndicator size={'large'} color={Colors.PRIMARY} />}
      
        {
            userTrips?.length == 0 ? <StartNewTripCard/> : <UserTrips userTrips={userTrips} />
        }
    </ScrollView>
  )
}