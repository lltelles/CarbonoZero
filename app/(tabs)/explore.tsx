import Ionicons from "@expo/vector-icons/Ionicons";
import { View, Text, StyleSheet, Image } from "react-native";
8;

import React from "react";

import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

const CARBON_PRICE_API_URL = "https://api.carbonprice.com/v1/prices";

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/carbon-credits-main.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText style={styles.titleText}>Mercado de Carbono</ThemedText>
      </ThemedView>
      <ThemedText style={styles.contentText}>
        Aqui você pode aprender sobre crédito de carbono e iniciar sua coleta!
      </ThemedText>
      <Collapsible title="CONCEITO">
        <ThemedText style={styles.contentText}>
          This app has two screens:{" "}
          <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText>{" "}
          and{" "}
          <ThemedText type="defaultSemiBold">app/(tabs)/explore.tsx</ThemedText>
        </ThemedText>
        <ThemedText style={styles.contentText}>
          The layout file in{" "}
          <ThemedText type="defaultSemiBold">app/(tabs)/_layout.tsx</ThemedText>{" "}
          sets up the tab navigator.
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/router/introduction">
          <ThemedText style={styles.linkText}>Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>

      <Collapsible title="COMO FUNCIONA ?">
        <ThemedText style={styles.contentText}>
          Aqui está uma nova seção colapsável, onde você pode adicionar mais
          informações ou funcionalidades ao seu app.
        </ThemedText>
        <ThemedText style={styles.contentText}>
          Sinta-se livre para modificar o conteúdo dessa aba conforme
          necessário.
        </ThemedText>
      </Collapsible>

      <Collapsible title="PRINCIPAIS PROJETOS">
        <ThemedText style={styles.contentText}>
          Aqui está uma nova seção colapsável, onde você pode adicionar mais
          informações ou funcionalidades ao seu app.
        </ThemedText>
        <ThemedText style={styles.contentText}>
          Sinta-se livre para modificar o conteúdo dessa aba conforme
          necessário.
        </ThemedText>
      </Collapsible>

      <Collapsible title="INICIE SUA COLETA DE CARBONO">
        <ThemedText style={styles.contentText}>
          Aqui está uma nova seção colapsável, onde você pode adicionar mais
          informações ou funcionalidades ao seu app.
        </ThemedText>
        <ThemedText style={styles.contentText}>
          Sinta-se livre para modificar o conteúdo dessa aba conforme
          necessário.
        </ThemedText>
      </Collapsible>

      <Collapsible title="ASPECTOS LEGAIS E REGULAMENTAÇÃO">
        <ThemedText style={styles.contentText}>
          Aqui está uma nova seção colapsável, onde você pode adicionar mais
          informações ou funcionalidades ao seu app.
        </ThemedText>
        <ThemedText style={styles.contentText}>
          Sinta-se livre para modificar o conteúdo dessa aba conforme
          necessário.
        </ThemedText>
      </Collapsible>

      <Collapsible title="TECNOLOGIAS E FERRAMENTAS UTILIZADAS">
        <ThemedText style={styles.contentText}>
          Aqui está uma nova seção colapsável, onde você pode adicionar mais
          informações ou funcionalidades ao seu app.
        </ThemedText>
        <ThemedText style={styles.contentText}>
          Sinta-se livre para modificar o conteúdo dessa aba conforme
          necessário.
        </ThemedText>
      </Collapsible>
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
  titleText: {
    fontFamily: "Wellfleet-Regular",
    fontSize: 24,
    marginBottom: 20,
  },
  contentText: {
    fontSize: 20,
    color: "#FFFFFF",
    marginVertical: 8,
    margin: 4,
  },
  linkText: {
    color: "blue",
    textDecorationLine: "underline",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  priceText: {
    fontSize: 18,
    color: "green",
  },
  reactLogo: {
    height: "100%",
    width: "100%",
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
