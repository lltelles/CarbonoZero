import React, { useEffect, useState } from "react";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import Ionicons from "@expo/vector-icons/Ionicons";
import { View, Text, StyleSheet, Image } from "react-native";

import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

const CARBON_PRICE_API_URL = "https://api.carbonprice.com/v1/prices";

export default function TabTwoScreen() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      "Wellfleet-Regular": require("@/assets/fonts/Wellfleet-Regular.ttf"),
      "Oxygen-light": require("@/assets/fonts/Oxygen-Light.ttf"),
      ...Ionicons.font, // Carregar as fontes do Ionicons
    });
    setFontsLoaded(true);
  };

  useEffect(() => {
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

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
          {"O crédito de carbono é um mecanismo que visa reduzir as emissões de gases de efeito estufa. Cada crédito representa a remoção ou a não emissão de uma tonelada de CO2. Empresas ou países que conseguem reduzir suas emissões além do necessário podem vender esses créditos para outros que não atingiram suas metas. Isso cria um incentivo econômico para projetos que promovem sustentabilidade, como reflorestamento e uso de energias renováveis. Surgido com o Protocolo de Quioto, o sistema busca combater as mudanças climáticas ao limitar e compensar as emissões globais. "}
        </ThemedText>
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
    fontFamily: "SpaceMono-Regular",
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
