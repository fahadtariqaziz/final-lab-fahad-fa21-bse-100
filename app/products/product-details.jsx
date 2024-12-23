// import { useLocalSearchParams } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default function ProductDetails() {
  // const { productId } = useLocalSearchParams(); // Extract productId from the route

  // Fetch product details using productId if needed (e.g., from Firestore)
  // For now, we'll display the productId directly.

  return (
    <View style={styles.container}>
      <Text>Product Details</Text>
      {/* <Text style={styles.title}>Product Details</Text>
      <Text>Product ID: {productId}</Text> */}
      {/* Add other product details here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
});
