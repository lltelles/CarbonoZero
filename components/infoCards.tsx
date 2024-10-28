import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

interface InfoCardsProps {
  title: string;
  buttonText?: string;
  calculateResult: number | string; // Function to calculate the result to display
  onPress?: () => void; // Optional button press handler
}

const InfoCards: React.FC<InfoCardsProps> = ({
  title,
  buttonText,
  calculateResult,
  onPress,
}) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{title}</Text>
        {onPress && buttonText ? (
          <Button title={buttonText} onPress={onPress} />
        ) : null}
      </View>
      <View style={styles.sumHistory}>
        <Text style={styles.sumHistoryText}>{calculateResult}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 50,
    borderWidth: 0.5,
    borderColor: "rgba(255, 255, 255, 0.1)",
    padding: 10,
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
    shadowColor: "#eee",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  title: {
    fontSize: 16,
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

export default InfoCards;
