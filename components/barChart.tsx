import React, { useEffect, useState } from "react";
import {
  View,
  Dimensions,
  Text,
  ActivityIndicator,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
} from "victory-native";
import { ref, onValue } from "firebase/database"; // Firebase imports
import { database } from "../firebaseConfig"; // Adjust to your Firebase config
import InfoCards from "./infoCards";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export interface DataPoint {
  x: number;
  y: number;
}

interface DataChartProps {
  initialDataPoints?: DataPoint[];
  calculateResult: number;
}

const DataChart: React.FC<DataChartProps> = ({
  initialDataPoints = [],
  calculateResult,
}) => {
  const [dataPoints, setDataPoints] = useState<DataPoint[]>(initialDataPoints);
  const [sensorData, setSensorData] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [sumHistory, setSumHistory] = useState<number | string>(0); // Changed to handle both numbers and strings
  const [carbonCredits, setCarbonCredits] = useState<number>(0); // Carbon credits state
  const [carbonCreditsPrice, setCarbonCreditsPrice] = useState<number>(0); // Carbon credits state
  const [history, setHistory] = useState<number[]>([]); // History should be an array of numbers

  // Conversion factor: assume 1 carbon credit per 1000 PPM
  const PPM_TO_CARBON_CREDITS = 1000;
  const CARBON_CREDITS_TO_BRL = 50;
  const formattedPrice = `R$${carbonCreditsPrice.toFixed(2)}`;

  // Function to convert PPM to carbon credits
  const calculateCarbonCredits = (sumPPM: number): number => {
    return sumPPM / PPM_TO_CARBON_CREDITS;
  };

  // Function to convert carbon credits to BRL
  const calculateBRL = (credits: number): number => {
    return credits * CARBON_CREDITS_TO_BRL;
  };

  useEffect(() => {
    // Fetch sensor data directly from Firebase
    const sensorDataRef = ref(database, "/sensorData/mq135");

    const unsubscribe = onValue(sensorDataRef, (snapshot) => {
      const data = snapshot.val();
      setSensorData(data);
      setLoading(false); // Set loading to false once data is fetched
    });

    // return () => {
    //   unsubscribe(); // Clean up the listener when the component unmounts
    // };
  }, []);

  useEffect(() => {
    if (sensorData && sensorData > 500) {
      console.log("Registering sensor data:", sensorData); // Debugging

      setDataPoints((prevData) => {
        const newData = [
          ...prevData,
          { x: prevData.length + 1, y: sensorData },
        ];

        if (newData.length > 10) {
          newData.shift(); // Keep only the latest 10 values
        }

        // Update the history array with the new y values
        const newHistory = newData.map((point) => point.y);
        setHistory(newHistory);

        return newData.map((point, index) => ({ ...point, x: index + 1 }));
      });
    }
  }, [sensorData]); // This effect runs whenever sensorData updates

  // Automatically calculate the sum whenever `history` changes
  useEffect(() => {
    if (history.length === 0) {
      setSumHistory(0);
    } else {
      const sum = history.reduce((sum, value) => sum + value, 0);
      setSumHistory(sum);

      // Calculate carbon credits based on the sum of PPM
      const credits = calculateCarbonCredits(sum);
      setCarbonCredits(credits);

      // Calculate money in R$ based on the carbon credits
      const money = calculateBRL(credits);
      setCarbonCreditsPrice(money);
    }
  }, [history]); // Depend on the history array

  const resetAllData = () => {
    setSensorData(null);
    setDataPoints([]);
    setSumHistory(0);
    setHistory([]);
    setCarbonCredits(0);
    setCarbonCreditsPrice(0);
    setLoading(true);
  };

  return (
    <>
      <View style={styles.container}>
        {/* Display loading spinner while fetching sensor data */}
        {loading ? (
          <ActivityIndicator size="large" color="#eee" />
        ) : (
          <>
            {/* Display the VictoryBar chart if there are valid data points */}
            {dataPoints.length > 0 ? (
              <VictoryChart theme={VictoryTheme.material}>
                <VictoryBar
                  data={dataPoints}
                  style={{
                    data: {
                      fill: ({ datum }: { datum: DataPoint }) => {
                        if (datum.y <= 600) return "#74c476";
                        if (datum.y <= 700) return "#41ab5d";
                        return "#f03d32"; // Customize colors based on value
                      },
                    },
                  }}
                />
                <VictoryAxis
                  style={{
                    grid: { stroke: "transparent" }, // Remove x-axis grid lines
                  }}
                />
                <VictoryAxis
                  dependentAxis
                  style={{
                    grid: { stroke: "transparent" }, // Remove y-axis grid lines
                  }}
                />
              </VictoryChart>
            ) : (
              <View>
                <Text style={styles.noDataText}>
                  No data points registered yet.
                </Text>
              </View>
            )}
          </>
        )}
      </View>
      <View style={styles.infoCardsContainer}>
        <InfoCards
          title="Quantidade total de carbono"
          calculateResult={sumHistory}
        />
        <InfoCards
          title="Conversão ppm para Crédito de carbono"
          calculateResult={carbonCredits}
        />
        <InfoCards
          title="Conversão para real"
          calculateResult={formattedPrice}
        />
        <TouchableOpacity onPress={resetAllData} style={styles.resetButton}>
          <Text style={styles.resetButtonText}>Resetar dados</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 50,
    width: SCREEN_WIDTH - 67,
    height: 300,
    borderWidth: 1,
    borderColor: "transparent",
    borderRadius: 10,
    backgroundColor: "#1C1C1E",
    shadowColor: "#eee",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  noDataText: {
    color: "#fff",
    textAlign: "center",
  },
  infoCardsContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  resetButton: {
    width: "50%",
    backgroundColor: "#eee",
    padding: 10,
    borderRadius: 50,
    marginTop: 50,
  },
  resetButtonText: {
    color: "#444",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default DataChart;
