import { View, Text, Button, StyleSheet, Image } from "react-native";
import React from "react";
import { signOut } from 'firebase/auth';
import { auth } from "@/firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import ParallaxScrollView from "@/components/ParallaxScrollView";



export default function HomeScreen() {
  const navigation = useNavigation()
 
  const logout = async () => {
    try {
      await signOut(auth);
      console.log('User signed out successfully');
      // Redirect to login or entry page after logout
      navigation.replace('AppEntry'); 
    } catch (error) {
      console.error('Error signing out:', error.message);
      Alert.alert('Logout Error', error);
    }
  };

  return (
    <>
      <ParallaxScrollView
        headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
        headerImage={
          <Image
            source={require("@/assets/images/partial-react-logo.png")}
            style={styles.reactLogo}
          />
        }
      >
        <View style={styles.container}>
          <Text style={styles.title}>Emissões de Carbono</Text>
          <Text style={styles.carbonCreditsText}>
            Créditos de Carbono Estimados:
          </Text>
          <Button title="Logout" onPress={logout} />
        </View>
      </ParallaxScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: "#fff",
    fontFamily: 'Oxygen-Bold'
  },
  carbonCreditsText: {
    fontSize: 18,
    marginTop: 20,
    color: "#fff",
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
