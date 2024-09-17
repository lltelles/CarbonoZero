import { registerRootComponent } from "expo";
import { useNavigation } from "@react-navigation/native";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  ImageBackground,
  Text,
  TouchableOpacity,
} from "react-native";
import { useAuthListener } from "../useStore";
import { useUserStore } from "@/useStore";
import HomeScreen from "../app/(tabs)/index";
import "../firebaseConfig";

const backgroundLandingPage = require("../assets/images/bg-login-image2.jpg");

const AppEntryPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();
  const navigation = useNavigation();
  useAuthListener();
  const { user } = useUserStore();

  const signUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User created:", user);
        Alert.alert("Success", "User created successfully!");
      })
      .catch((error) => {
        console.error("Error signing up:", error.message);
        Alert.alert("Error", error.message);
      });
  };

  const signIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User signed in:", user);
        Alert.alert("Success", "Signed in successfully!");
        navigation.replace("(tabs)");
      })
      .catch((error) => {
        console.error("Error signing in:", error.message);
        Alert.alert("Error", error.message);
      });
  };

   // Navigate to (tabs) when the user is already authenticated
   useEffect(() => {
    if (user) {
      navigation.replace("(tabs)"); // This navigates to your tab navigator
    }
  }, [user]);

  return (
    <>
      <ImageBackground
        source={backgroundLandingPage}
        style={styles.background}
        blurRadius={3}
      >
        {!user ? (
          <View style={styles.container}>
            <View>
              <Text style={styles.carbonoTitle}>CarbonoZero</Text>
            </View>
            <View>
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
              <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.button} onPress={signIn}>
                  <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={signUp}>
                  <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : null}
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    //     borderWidth:1,
    // borderColor:"red"
  },
  container: {
    padding: 20,
    // borderWidth:1,
    // borderColor:"red",
    height: "80%",
    justifyContent: "flex-start",
    gap: 150,
  },
  carbonoTitle: {
    color: "#fff",
    textAlign: "center",
    fontSize:44,
    fontFamily: 'Oxygen-Regular'
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    color: "#fff",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 16,
  },
  button: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default AppEntryPage;

registerRootComponent(AppEntryPage);
