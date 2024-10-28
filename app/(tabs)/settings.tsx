import Ionicons from "@expo/vector-icons/Ionicons";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useNavigation } from "@react-navigation/native";
import { auth } from "@/firebaseConfig";
import { signOut } from "firebase/auth";

export default function TabTwoScreen() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(0);
  const navigation = useNavigation();

  // Function to toggle the switch
  const calibrarSensor = () => {
    let timer = 10; // Starting time for countdown
    setCountdown(timer);
    const interval = setInterval(() => {
      timer -= 1;
      setCountdown(timer); // Update the countdown

      // When countdown reaches zero, show the alert and clear the interval
      if (timer === 0) {
        clearInterval(interval);
        Alert.alert("Finalizado!", "O sensor foi calibrado com sucesso.");
      }
    }, 1000); // 1 second intervals
  };

  // Get current authenticated user
  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUserEmail(user.email); // Set the email of the authenticated user
    }
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      console.log("User signed out successfully");
      // Redirect to login or entry page after logout
      navigation.replace("AppEntry");
    } catch (error) {
      console.error("Error signing out:", error.message);
      Alert.alert("Logout Error", error);
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Ionicons size={310} name="cog" style={styles.headerImage} />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">
          Olá,{" "}
          {userEmail && <ThemedText type="subtitle">{userEmail}</ThemedText>}{" "}
        </ThemedText>
        {/* Display user's email */}
      </ThemedView>

      {/* Settings Option with Switch */}
      <ThemedView style={styles.optionContainer}>
        <ThemedText>Calibragem do sensor</ThemedText>
        <Button onPress={calibrarSensor} title="Calibrar"></Button>
      </ThemedView>

      {/* Display the countdown */}
      {countdown > 0 && (
        <View style={styles.countdownContainer}>
          <Text style={styles.countdownText}>Calibrando... ({countdown})</Text>
        </View>
      )}
      <View style={styles.logoutContainer}>
        <Button title="Sair" onPress={logout} color={"#eee"} />
        <Ionicons size={24} name="exit-outline" color={"#eee"} />
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  optionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc",
    paddingVertical: 10,
  },
  countdownContainer: {
    alignItems: "center",
    marginVertical: 10,
  },
  countdownText: {
    fontSize: 18,
    color: "#ccc",
  },
  logoutContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
