import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from 'react-native';
import splashImage from 'C:/Users/Aidan/Documents/Mobile app dev/Assignment2-Milestone1/smart_shop.png'; // Import the image

const SplashScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for 3 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
      navigation.navigate('CategoryScreen');
    }, 3000);

    return () => clearTimeout(timer); // Clear the timeout on component unmount
  }, []);

  return (
    <View style={styles.container}>
      <Image source={splashImage} style={styles.splashImage} />
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : null}
    </View>
  );
};
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  splashImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: -1,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#00cc00',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    color: '#ffffff',
  },
});

export default SplashScreen;
