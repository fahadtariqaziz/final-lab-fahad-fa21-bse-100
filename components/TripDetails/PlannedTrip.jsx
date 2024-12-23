import { View, Text, Image } from 'react-native';
import React, { useEffect } from 'react';

export default function PlannedTrip({ details }) {
  useEffect(() => {
    // console.log('Hellooooo');
    // console.log('Details Prop:', details);
  }, [details]);

  // Check if details is undefined or null
  if (!details) {
    return (
      <View style={{ marginTop: 20, padding: 10 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>🏕️ Plan Details</Text>
        <Text style={{ fontSize: 16 }}>No details available.</Text>
      </View>
    );
  }

  return (
    <View style={{ marginTop: 20, padding: 10 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>🏕️ Plan Details</Text>
      {Object.keys(details).map((day) => (
        <View key={day} style={{ marginBottom: 15 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 5 }}>
            {day.toUpperCase()}
          </Text>
          {Object.keys(details[day]).map((time) => (
            <View key={time} style={{ marginBottom: 5, paddingLeft: 10 }}>
                
              <Text style={{ fontSize: 16, fontWeight: '500' }}>
                {time.charAt(0).toUpperCase() + time.slice(1)}:
              </Text>
              <Text style={{ fontSize: 16, fontWeight: '300' }}>
                {details[day][time]}
              </Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}
