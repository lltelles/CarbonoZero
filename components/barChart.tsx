import React, { useEffect, useState } from "react";
import { View, Dimensions, Text, ActivityIndicator, StyleSheet } from "react-native";
import { VictoryBar, VictoryChart, VictoryTheme, VictoryAxis } from "victory-native";
import { ref, onValue } from "firebase/database"; // Firebase imports
import { database } from "../firebaseConfig"; // Adjust to your Firebase config

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export interface DataPoint {
  x: number;
  y: number;
}

interface DataChartProps {
  initialDataPoints?: DataPoint[];
}

const DataChart: React.FC<DataChartProps> = ({ initialDataPoints = [] }) => {
  const [dataPoints, setDataPoints] = useState<DataPoint[]>(initialDataPoints);
  const [sensorData, setSensorData] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch sensor data directly from Firebase
    const sensorDataRef = ref(database, "/sensorData/mq135");

    const unsubscribe = onValue(sensorDataRef, (snapshot) => {
      const data = snapshot.val();
      setSensorData(data);
      setLoading(false); // Set loading to false once data is fetched
    });

    return () => {
      unsubscribe(); // Clean up the listener when the component unmounts
    };
  }, []);

  useEffect(() => {
    if (sensorData && sensorData > 50) {
      console.log("Registering sensor data:", sensorData); // Debugging

      setDataPoints((prevData) => {
        const newData = [...prevData, { x: prevData.length + 1, y: sensorData }];

        if (newData.length > 10) {
          newData.shift(); // Keep only the latest 10 values
        }

        return newData.map((point, index) => ({ ...point, x: index + 1 }));
      });
    }
  }, [sensorData]); // This effect runs whenever sensorData updates

  return (
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
              {/* Fallback if no data is greater than 500 */}
              <Text style={styles.noDataText}>
                No data points registered yet (sensor data > 500).
              </Text>
            </View>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",  // Center vertically
    alignItems: "center",       // Center horizontally
    marginTop: 20,
    width: SCREEN_WIDTH - 67,
    height: 300,
    borderWidth: 1,
    borderColor: "transparent",
    borderRadius: 10,
    backgroundColor: "#1C1C1E",
    shadowColor: "#eee",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: .34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  noDataText: {
    color: "#fff",
    textAlign: "center",
  },
});

export default DataChart;
