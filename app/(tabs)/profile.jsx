import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from './../../constants/Colors';
import { auth } from './../../configs/FirebaseConfig';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';

export default function Profile() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const router = useRouter();
  const db = getFirestore();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userDoc = doc(db, 'users', user.uid); // Assumes user data is stored in a Firestore 'users' collection
          const userSnapshot = await getDoc(userDoc);
          if (userSnapshot.exists()) {
            const userData = userSnapshot.data();
            setName(userData.fullName || '');
            setEmail(user.email);
          }
        } else {
          ToastAndroid.show('User not logged in', ToastAndroid.LONG);
          router.replace('/auth/sign-in');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleSave = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const userDoc = doc(db, 'users', user.uid);
        await updateDoc(userDoc, { name });
        ToastAndroid.show('Profile updated successfully', ToastAndroid.LONG);
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      ToastAndroid.show('Failed to update profile', ToastAndroid.LONG);
    }
  };

  return (
    <View style={{ padding: 25, paddingTop: 40, backgroundColor: Colors.WHITE, height: '100%' }}>
      <Text style={{ fontFamily: 'outfit-bold', fontSize: 30 }}>Profile</Text>

      <View style={{ marginTop: 30 }}>
        <Text style={{ fontFamily: 'outfit' }}>Name</Text>
        <TextInput
          editable={isEditing}
          value={name}
          onChangeText={setName}
          style={[styles.input, isEditing ? styles.editableInput : null]}
          placeholder="Your name"
        />
      </View>

      <View style={{ marginTop: 20 }}>
        <Text style={{ fontFamily: 'outfit' }}>Email</Text>
        <TextInput
          editable={false}
          value={email}
          style={styles.input}
          placeholder="Your email"
        />
      </View>

      {isEditing ? (
        <TouchableOpacity
          style={{ padding: 20, backgroundColor: Colors.PRIMARY, borderRadius: 15, marginTop: 50 }}
          onPress={handleSave}
        >
          <Text style={{ color: Colors.WHITE, textAlign: 'center' }}>Save Changes</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={{ padding: 20, backgroundColor: Colors.PRIMARY, borderRadius: 15, marginTop: 50 }}
          onPress={() => setIsEditing(true)}
        >
          <Text style={{ color: Colors.WHITE, textAlign: 'center' }}>Edit Profile</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={{
          padding: 20,
          backgroundColor: Colors.WHITE,
          borderRadius: 15,
          marginTop: 20,
          borderWidth: 1,
          borderColor: Colors.GRAY,
        }}
        onPress={() => {
          auth.signOut();
          router.replace('/auth/sign-in');
        }}
      >
        <Text style={{ color: Colors.PRIMARY, textAlign: 'center' }}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.GRAY,
    fontFamily: 'outfit',
  },
  editableInput: {
    backgroundColor: '#f9f9f9',
  },
});
