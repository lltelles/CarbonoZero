import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  NativeModules,
} from "react-native";
import React, { useState } from "react";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import ProgressBar from "@/components/GaugeChart";
import DataChart from "@/components/barChart";

import * as Font from "expo-font"
import { ThemedText } from "@/components/ThemedText";

export default function HomeScreen() {
  const [sensorData, setSensorData] = useState(null);
  // const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState([]);
  const [sumHistory, setSumHistory] = useState(0);


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
    setSensorData(null);
    setSumHistory(null);
    setHistory([]);
    setLoading(true);
  };

  console.log(NativeModules.UIManager);
  const isRNSVGCircleRegistered =
    NativeModules.UIManager.getViewManagerConfig("RNSVGCircle") !== undefined;
  console.log("Is RNSVGCircle registered:", isRNSVGCircleRegistered);

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
        <View style={styles.chartsContainer}>
          <View style={styles.gaugeChart}>
            <ProgressBar sensorData={sensorData} />
          </View>
          <View style={styles.barChart}>
            <ThemedText style={styles.barChartTitle}>
              Registro de emissões acima de 30ppm
            </ThemedText>
            <DataChart sensorData={sensorData} style={styles.barChart} />
          </View>
        </View>
        <View style={styles.container}>
          <View style={styles.infosContainer}>
              <View style={styles.sumHistoryContainer}>
                <View>
                  <Text style={styles.sumHistoryTitle}>
                    Quantidade total de carbono
                  </Text>
                  {/* <Button title="Verificar" onPress={sumAllDataHistory} /> */}
                </View>
                <View style={styles.sumHistory}>
                  <Text style={styles.sumHistoryText}>{sumHistory} ppm</Text>
                </View>
              </View>
            <View style={styles.sumHistoryContainer}>
              <View>
                <Text style={styles.sumHistoryTitle}>
                  Conversão ppm para Crédito de carbono
                </Text>
                {/* <Button title="Verificar" onPress={sumAllDataHistory} /> */}
              </View>
              <View style={styles.sumHistory}>
                <Text style={styles.sumHistoryText}>{sumHistory} </Text>
              </View>
            </View>
            <View style={styles.sumHistoryContainer}>
              <View>
                <Text style={styles.sumHistoryTitle}>Conversão para real</Text>
                {/* <Button title="Verificar" onPress={sumAllDataHistory} /> */}
              </View>
              <View style={styles.sumHistory}>
                <Text style={styles.sumHistoryText}>R$ {sumHistory}</Text>
              </View>
            </View>
          </View>
          <Button title="Resetar dados" onPress={resetAllData} />
        </View>
      </ParallaxScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  chartsContainer: {
    flexDirection: "column",
    gap: 150,
    // borderWidth:1,
    // borderColor:"red"
  },
  gaugeChart: {
    // borderWidth: 1,
    // borderColor: "red",
  },
  barChartTitle: {
    fontSize: 16,
    fontWeight: "light",
    marginTop: 20,
    marginBottom: 10,
    color: "#ccc",
    textAlign: "center",
    fontFamily: "Wellfleet-Regular",
  },
  barChart: {
    // borderWidth: 1,
    // borderColor: "red",
  },
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
  infosContainer:{
    flexDirection:"column",
    alignItems:"center"
  },

  sumHistoryContainer: {
    width:"110%",
    marginTop: 50,
    borderWidth: .5,
    borderColor:"rgba(255, 255, 255, 0.1)",
    padding: 10,
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
    shadowColor: "#eee",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: .34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  sumHistoryTitle: {
    color: "#fff",
    textAlign: "center",
  },
  sumHistory: {
    borderWidth: 1,
    borderColor: "#eee",
    textAlign: "center",
    color: "#ccc",
    borderRadius: 25,
    padding: 5,
    backgroundColor: "#fff",
    width: "80%",
  },
  sumHistoryText: {
    textAlign: "center",
    color: "#333",
  },
});
