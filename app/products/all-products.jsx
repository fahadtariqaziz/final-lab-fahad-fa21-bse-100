import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Colors } from '../../constants/Colors';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../configs/FirebaseConfig';

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, [searchQuery, categoryFilter]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const productsRef = collection(db, 'products');
      let q = productsRef;

      if (searchQuery) {
        q = query(productsRef, where('keywords', 'array-contains', searchQuery.toLowerCase()));
      } else if (categoryFilter) {
        q = query(productsRef, where('category', '==', categoryFilter));
      }

      const querySnapshot = await getDocs(q);
      const fetchedProducts = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProducts(fetchedProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
    setLoading(false);
  };

  return (
    <ScrollView style={{ padding: 25, paddingTop: 55, backgroundColor: Colors.WHITE, height: '100%' }}>
      <Text style={{ fontFamily: 'outfit-bold', fontSize: 30 }}>Product Discovery</Text>

      {/* Search Bar */}
      <TextInput
        placeholder="Search products..."
        style={styles.searchInput}
        onChangeText={(value) => setSearchQuery(value)}
      />

      {/* Categories */}
      <View style={styles.filterContainer}>
        {['All', 'Electronics', 'Clothing', 'Books'].map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.filterButton,
              categoryFilter === category ? { backgroundColor: Colors.PRIMARY } : {},
            ]}
            onPress={() => setCategoryFilter(category === 'All' ? '' : category)}
          >
            <Text
              style={[
                styles.filterButtonText,
                categoryFilter === category ? { color: Colors.WHITE } : {},
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={Colors.PRIMARY} style={{ marginTop: 20 }} />
      ) : (
        <View>
          {products.map((product) => (
            <TouchableOpacity key={product.id} style={styles.productCard}>
              <Image source={{ uri: product.imageURL }} style={styles.productImage} />
              <View>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productCategory}>{product.category}</Text>
                <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  searchInput: {
    padding: 15,
    borderWidth: 1,
    borderColor: Colors.GRAY,
    borderRadius: 10,
    marginTop: 20,
    fontFamily: 'outfit',
  },
  filterContainer: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
  },
  filterButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.GRAY,
    borderRadius: 10,
    backgroundColor: Colors.WHITE,
  },
  filterButtonText: {
    fontFamily: 'outfit',
  },
  productCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: Colors.GRAY,
    borderRadius: 10,
  },
  productImage: {
    width: 50,
    height: 50,
    marginRight: 15,
    borderRadius: 5,
  },
  productName: {
    fontFamily: 'outfit-bold',
    fontSize: 16,
  },
  productCategory: {
    fontFamily: 'outfit',
    color: Colors.GRAY,
  },
  productPrice: {
    fontFamily: 'outfit-bold',
    color: Colors.PRIMARY,
  },
});
