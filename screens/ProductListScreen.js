import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity, StyleSheet, Image } from 'react-native';

const ProductListScreen = ({ route, navigation }) => {
  const { category } = route.params;
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
      const data = await response.json();
      setProducts(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching products: ', error);
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{category}</Text>
      </View>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          products.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.productItem}
              onPress={() => navigation.navigate('ProductDetailScreen', { product: item })}
            >
              <View style={styles.productContent}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <View style={styles.productDetails}>
                  <Text style={styles.productTitle}>{item.title}</Text>
                  <Text style={styles.productPrice}>Price: ${item.price}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('CategoryScreen')}
      >
        <Text style={styles.buttonText}>Back to Categories</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#cccccc',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  scrollView: {
    flex: 1,
    flexGrow: 1,
  },
  contentContainer: {
    paddingTop: 20,
    paddingBottom: 80,
  },
  productItem: {
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  productContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
  productDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  productTitle: {
    fontSize: 18,
  },
  productPrice: {
    fontSize: 16,
  },
  button: {
    position: 'fixed',
    bottom: 10,
    left: 0,
    right: 0,
    marginHorizontal: 'auto', 
    backgroundColor: '#cccccc',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
},
  buttonText: {
    fontSize: 18,
    color: '#000000',
    textAlign: 'center',
  },
});

export default ProductListScreen;