import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator,
  NativeModules
} from "react-native";
import React, { useEffect, useState } from "react";
// import { signOut } from "firebase/auth";
// import { auth } from "@/firebaseConfig";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { database } from "../../firebaseConfig"; // Import the database from your Firebase config
import { ref, onValue } from "firebase/database"; // Import necessary methods
import {
  ScrollView,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import ProgressBar from "@/components/GaugeChart";

export default function HomeScreen() {
  const [sensorData, setSensorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState([]);
  const [sumHistory, setSumHistory] = useState(0);


  useEffect(() => {
    const sensorDataRef = ref(database, "/sensorData/mq135");

    // Listen for changes to the sensor data
    onValue(sensorDataRef, (snapshot) => {
      const data = snapshot.val();
      setSensorData(data);
      setLoading(false);

      // Show an alert if the data is over 50
      if (data > 30) {
        setHistory((prevHistory) => [...prevHistory, data]);
        
      }
    });

    // Optionally clean up the listener when the component unmounts
    // return () => sensorDataRef.off();
  }, []);

  // const logout = async () => {
  //   try {
  //     await signOut(auth);
  //     console.log("User signed out successfully");
  //     // Redirect to login or entry page after logout
  //     navigation.replace("AppEntry");
  //   } catch (error) {
  //     console.error("Error signing out:", error.message);
  //     Alert.alert("Logout Error", error);
  //   }
  // };

  const sumAllDataHistory = () => {
    if (!history || history.length == 0) {
      setSumHistory("no data recorded");
      return;
    }

    let sumHistory = 0;
    for (let i = 0; i < history.length; i++) {
      sumHistory += history[i];
    }
    setSumHistory(sumHistory);
  };

  const resetAllData = () => {
    setSensorData(null)
    setSumHistory(null)
    setHistory([])
    setLoading(true)
  }

  console.log(NativeModules.UIManager);
  const isRNSVGCircleRegistered = NativeModules.UIManager.getViewManagerConfig('RNSVGCircle') !== undefined;
console.log('Is RNSVGCircle registered:', isRNSVGCircleRegistered);

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
          <Text style={styles.title}>Emissões de Carbono</Text>
        {/*<ProgressBar/> */}
        <View style={styles.container}>
          {/* {loading ? (
            <ActivityIndicator size="large" color="fff" /> 
          ) : (
            <View style={styles.dataSensorContainer}>
              <Text style={styles.dataSensor}>{sensorData}</Text>
            </View>
          )} */}

          <Text style={styles.historyTitle}>
            Registro de emissões acima de 30ppm
          </Text>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <ScrollView style={styles.historyContainer}>
              {history.length > 0 ? (
                history.map((value, index) => (
                  <Text key={index} style={styles.historyItem}>
                    {value}
                  </Text>
                ))
              ) : (
                <Text style={styles.historyItem}>Sem registros</Text>
              )}
            </ScrollView>
          </GestureHandlerRootView>

          <View style={styles.sumHistoryContainer}>
            <Text style={styles.sumHistory}>
              Verificar quantidade de carbono já emitido
            </Text>
            <Button title="Verificar" onPress={sumAllDataHistory} />
          </View>
          <View>
            <Text style={styles.sumHistory}>
              Quantidade total de carbono emitido: {sumHistory} ppm
            </Text>
          </View>
          <Button title="Resetar dados" onPress={resetAllData} />
          {/* <Button title="Logout" onPress={logout} /> */}
        </View>
        
      </ParallaxScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 600,
    padding: 20,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 24,
    // marginTop:100,
    marginBottom: 20,
    color: "#ccc",
    fontFamily: "Oxygen-Bold",
    textAlign: "center",
  },
  carbonCreditsText: {
    fontSize: 18,
    marginTop: 20,
    color: "#ccc",
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  dataSensorContainer: {
    alignItems: "center",
  },
  dataSensor: {
    color: "#ccc",
    fontSize: 32,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    color: "#ccc",
  },
  historyContainer: {
    width: "100%",
    maxHeight: 200, // Set a max height for scrolling
    borderWidth: 1,
    padding: 10,
  },
  historyItem: {
    fontSize: 16,
    color: "#ccc",
    marginVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 5,
  },
  sumHistoryContainer:{
marginTop:10
  },
  sumHistory: {
    textAlign: "center",
    color: "#ccc",
  },
});
