import { View, Text, TextInput, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import {useNavigation, useRouter} from 'expo-router';
import {Colors} from './../../../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from './../../../configs/FirebaseConfig';

export default function SignIn() {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const navigation = useNavigation();
    const router = useRouter();

    useEffect( ()=> {
        navigation.setOptions({headerShown:false})        
    },[])

    const OnSignIn = () => {

        if(!email && !password)
        {
            ToastAndroid.show("Please Enter Email and Password", ToastAndroid.LONG)   
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user);
                
                router.replace('/mytrip');
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // console.log( errorCode)
                if(errorCode == 'auth/invalid-credential')
                {
                    ToastAndroid.show("Invalid credential",ToastAndroid.BOTTOM);
                }
            });
    }

  return (
    <View style={{padding:25 ,paddingTop:40, backgroundColor:Colors.WHITE, height:'100%', paddingTop:80}}>

        <TouchableOpacity onPress={()=> router.back()}>
            <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        <Text style={{fontFamily:'outfit-bold', fontSize:30, marginTop:30}}>Let's Sign You In</Text>
        
        <Text style={{fontFamily:'outfit', fontSize:30, color:Colors.GRAY , marginTop:20}}>Welcome Back</Text>
        
        <Text style={{fontFamily:'outfit', fontSize:30, color:Colors.GRAY , marginTop:10}}>You've been missed</Text>
    
        <View style={{marginTop:50,}}>
            <Text style={{fontFamily:'outfit'}}>Email</Text>
            <TextInput placeholder='Enter you email' onChangeText={ (value)=> {setEmail(value)}} style={styles.input}/>
        </View>

        <View style={{marginTop:20}}>
            <Text style={{fontFamily:'outfit'}}>Password</Text>
            <TextInput secureTextEntry={true}  placeholder='Enter password' onChangeText={ (value)=> {setPassword(value)}} style={styles.input}/>
        </View>

        <TouchableOpacity style={{padding:20, backgroundColor:Colors.PRIMARY, borderRadius:15, marginTop:50}}
                            onPress={OnSignIn}
        >
            <Text style={{color:Colors.WHITE , textAlign:'center'}}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{padding:20, backgroundColor:Colors.WHITE, borderRadius:15, marginTop:20, borderWidth:1}} 
                            onPress={()=> router.replace('auth/sign-up')}            
            >
            <Text style={{color:Colors.PRIMARY , textAlign:'center'}}>Create Account</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    input:{
        padding:15,
        borderWidth:1,
        borderRadius:15,
        borderColor:Colors.GRAY,
        fontFamily:'outfit',
    }
})