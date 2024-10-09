import Ionicons from "@expo/vector-icons/Ionicons";
import { View, Text, StyleSheet } from "react-native";

import React, { useEffect, useState } from "react";

import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

const CARBON_PRICE_API_URL = "https://api.carbonprice.com/v1/prices";
export default function TabTwoScreen() {
  const [carbonPrice, setCarbonPrice] = useState(null);

  // useEffect(() => {
  //   fetchCarbonPrice();
  // }, []);

  // const fetchCarbonPrice = async () => {
  //   try {
  //     const response = await fetch(CARBON_PRICE_API_URL);
  //     const result = await response.json();
  //     setCarbonPrice(result.price);
  //   } catch (error) {
  //     console.error("Erro ao buscar preços de carbono", error);
  //   }
  // };
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
      <Collapsible title="File-based routing">
        <ThemedText>
          This app has two screens:{" "}
          <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText>{" "}
          and{" "}
          <ThemedText type="defaultSemiBold">app/(tabs)/explore.tsx</ThemedText>
        </ThemedText>
        <ThemedText>
          The layout file in{" "}
          <ThemedText type="defaultSemiBold">app/(tabs)/_layout.tsx</ThemedText>{" "}
          sets up the tab navigator.
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/router/introduction">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      {carbonPrice ? (
        <Text style={styles.priceText}>
          Preço Atual dos Créditos de Carbono: ${carbonPrice}
        </Text>
      ) : (
        <Text>Buscando preço atual dos créditos de carbono...</Text>
      )}
      {/* Gráficos e Introdução podem ser adicionados aqui */}
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
  priceText: {
    fontSize: 18,
    color: "green",
  },
});
