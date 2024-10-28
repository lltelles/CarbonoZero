import {
  View,
  Text,
  StyleSheet,
  Image,
} from "react-native";
import React, { useState } from "react";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import ProgressBar from "@/components/GaugeChart";
import DataChart from "@/components/barChart";

import { ThemedText } from "@/components/ThemedText";

export default function HomeScreen() {
  const [sensorData, setSensorData] = useState(null);

  return (
    <>
      <ParallaxScrollView
        headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
        headerImage={
          <Image
            source={require("@/assets/images/folha.jpg")}
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
              Registro de emissões acima de 500ppm
            </ThemedText>
            <DataChart sensorData={sensorData} style={styles.barChart} />
          </View>
        </View>
      </ParallaxScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  reactLogo: {
    height: "100%",
    width: "100%",
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  chartsContainer: {
    flexDirection: "column",
    gap: 150,
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
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: "#ccc",
    fontFamily: "Oxygen-Bold",
    textAlign: "center",
  },
  dataSensorContainer: {
    alignItems: "center",
  },
  dataSensor: {
    color: "#ccc",
    fontSize: 32,
  },
});
