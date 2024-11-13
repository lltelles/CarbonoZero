import React, { useEffect, useState } from "react";
import * as Font from "expo-font";
// import AppLoading from "expo-app-loading";
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

  // if (!fontsLoaded) {
  //   return <AppLoading />;
  // }

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
          {
            "O crédito de carbono é um mecanismo que visa reduzir as emissões de gases de efeito estufa. Cada crédito representa a remoção ou a não emissão de uma tonelada de CO2. Empresas ou países que conseguem reduzir suas emissões além do necessário podem vender esses créditos para outros que não atingiram suas metas. Isso cria um incentivo econômico para projetos que promovem sustentabilidade, como reflorestamento e uso de energias renováveis. Surgido com o Protocolo de Quioto, o sistema busca combater as mudanças climáticas ao limitar e compensar as emissões globais. "
          }
        </ThemedText>
      </Collapsible>

      <Collapsible title="COMO FUNCIONA ?">
        <ThemedText style={styles.contentText}>
          O crédito de carbono é um mecanismo que visa reduzir as emissões de
          gases de efeito estufa (GEE) por meio da atribuição de um valor
          econômico à emissão de CO₂. Empresas ou países que emitem menos gases
          do que o permitido podem gerar créditos, que equivalem a uma tonelada
          de CO₂ que foi evitada ou reduzida na atmosfera. Esses créditos podem
          ser vendidos ou negociados no mercado, incentivando financeiramente
          ações para reduzir emissões. Já aqueles que ultrapassam seus limites
          podem comprar créditos para compensar suas emissões, promovendo um
          equilíbrio. Projetos sustentáveis, como reflorestamento, eficiência
          energética e energia renovável, muitas vezes são usados para gerar
          créditos de carbono. Essa dinâmica contribui para o cumprimento de
          metas ambientais, como as definidas pelo Acordo de Paris.
        </ThemedText>
      </Collapsible>

      <Collapsible title="PRINCIPAIS PROJETOS">
        <ThemedText style={styles.contentText}>
          Reflorestamento e conservação de florestas: projetos que plantam novas
          árvores ou protegem áreas florestais existentes, aumentando a absorção
          de CO₂ pela vegetação. Energia renovável: projetos que promovem o uso
          de energia solar, eólica, hidrelétrica e biomassa, substituindo
          combustíveis fósseis. Eficiência energética: iniciativas que otimizam
          o consumo de energia em indústrias, edifícios e transporte, reduzindo
          emissões. Gestão de resíduos e biogás: tratamento de resíduos sólidos
          e resíduos agrícolas para reduzir emissões de metano, incluindo a
          captura de gases para produção de energia.
        </ThemedText>
      </Collapsible>

      <Collapsible title="INICIE SUA COLETA DE CARBONO">
        <ThemedText style={styles.contentText}>
          Para iniciar a coleta de carbono, primeiro identifique as fontes de
          emissões de CO₂ que serão controladas (indústrias, transporte,
          agricultura etc.). Escolha a tecnologia adequada, como plantio de
          árvores, biogás, filtros industriais ou métodos de captura e
          armazenamento de carbono. Planeje o projeto detalhadamente, com
          objetivos, prazos e recursos necessários. Certifique-se de cumprir as
          regulamentações ambientais e obtenha autorizações e certificações para
          gerar créditos de carbono, se aplicável. Instale a infraestrutura
          necessária e implemente sistemas de monitoramento para medir
          continuamente a quantidade de CO₂ coletada. Relate os resultados para
          validação por organismos reguladores e, assim, possibilitar a
          negociação de créditos. Por fim, mantenha e otimize os sistemas para
          garantir eficiência contínua.
        </ThemedText>
      </Collapsible>

      <Collapsible title="ASPECTOS LEGAIS E REGULAMENTAÇÃO">
        <ThemedText style={styles.contentText}>
          Os aspectos legais para projetos de coleta de carbono incluem cumprir
          normas ambientais nacionais e internacionais que regulam emissões e
          captura de carbono. É necessário obter autorizações ambientais junto
          aos órgãos reguladores competentes, como licenças de operação e
          certificações para garantir que o projeto seja reconhecido no mercado
          de créditos de carbono. Projetos devem seguir os critérios
          estabelecidos por padrões internacionais, como o Protocolo de Quioto e
          o Acordo de Paris, ou certificações voluntárias (ex.: Verified Carbon
          Standard). Além disso, é importante atender a legislações específicas
          do país ou região, incluindo normas de uso do solo, leis de proteção
          florestal, segurança em operações industriais e requisitos de
          auditoria e relatórios periódicos para validar as reduções de emissões
          realizadas.
        </ThemedText>
      </Collapsible>

      <Collapsible title="TECNOLOGIAS E FERRAMENTAS UTILIZADAS">
        <ThemedText style={styles.contentText}>
          As tecnologias e ferramentas para coleta de carbono incluem métodos de
          captura e armazenamento de carbono (CCS), que envolvem a captura de
          CO₂ em fontes industriais e seu armazenamento em locais subterrâneos.
          Florestamento e reflorestamento utilizam árvores para absorver CO₂
          naturalmente. Filtros de carbono e sistemas de captura em chaminés
          removem emissões antes de serem liberadas na atmosfera. Sistemas de
          energia renovável, como energia solar e eólica, ajudam a substituir
          fontes de energia que emitem carbono. Biogás e biodigestores convertem
          resíduos em energia, evitando emissões de metano. Soluções digitais,
          como sensores de medição de emissões e plataformas de análise de
          dados, permitem monitoramento em tempo real e otimização das
          iniciativas. Tecnologias de crédito de carbono incluem sistemas para
          rastreamento, validação e negociação de créditos no mercado.
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
    fontSize: 16,
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
