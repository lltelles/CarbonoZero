import Ionicons from "@expo/vector-icons/Ionicons";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import { WebView } from "react-native-webview";

import React, { useEffect, useState, useRef, memo } from "react";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import TradingViewWidget from "@/components/TradingViewWidget";

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Ionicons size={310} name="code-slash" style={styles.headerImage} />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Dashboard page</ThemedText>
      </ThemedView>
      <ThemedText>
        Aqui você pode acompanhar em tempo real os preços de Créditos de Carbono
        ao redor do mundo.
      </ThemedText>
      <View style={styles.container}>
        <TradingViewWidget />
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
    width: "100%",
    height: 400,
  },
  webView: {
    flex: 1,
    width: "100%",
    height: 400,
  },
  copyrightContainer: {
    padding: 10,
    alignItems: "center",
  },
  linkText: {
    color: "white",
  },
});
