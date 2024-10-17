import React, { useEffect, useRef, useState } from "react";
import { TextInput, View, Dimensions, ActivityIndicator } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedProps,
  useDerivedValue,
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";
import { Path, Svg } from "react-native-svg";
import { ref, onValue } from "firebase/database"; // Assuming you're using Firebase Database
import { database } from "../firebaseConfig"; // Adjust the import to match your Firebase config

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedText = Animated.createAnimatedComponent(TextInput);

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const STROKE_WIDTH = 10;
const radius = (SCREEN_WIDTH - STROKE_WIDTH) / 2.5;
const diameter = radius * 2;
const circumference = radius * Math.PI;
const duration = 3000;

const ProgressBar: React.FC = () => {
  const progress = useSharedValue(0);
  const [sensorData, setSensorData] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const percentage = useDerivedValue(() => {
    return withTiming(progress.value, { duration: duration });
  });

  const strokeColor = useDerivedValue(() => {
    return interpolateColor(
      percentage.value,
      [0, 250, 500],
      ["#74c476", "#41ab5d", "#f03d32"]
    );
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: strokeColor.value,
    };
  });

  const animatedProps = useAnimatedProps(() => {
    const strokeDashoffset = circumference * (1 - percentage.value / 1000);
    return {
      strokeDashoffset,
      stroke: strokeColor.value,
    };
  });

  const animatedTextProps = useAnimatedProps(() => {
    return {
      text: `${Math.round(percentage.value)} ppm`,
    };
  });

  useEffect(() => {
    // Fetch sensor data directly from Firebase
    const sensorDataRef = ref(database, "/sensorData/mq135");

    const unsubscribe = onValue(sensorDataRef, (snapshot) => {
      const data = snapshot.val();
      setSensorData(data);
      setLoading(false);
      progress.value = data; // Update progress value with sensor data
    });

    return () => {
      unsubscribe(); // Clean up the listener
    };
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {loading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <View style={{ position: "relative" }}>
          <Svg
            width={diameter + STROKE_WIDTH}
            height={radius + STROKE_WIDTH / 2}
            viewBox={`0 0 ${diameter + STROKE_WIDTH} ${
              radius + STROKE_WIDTH / 2
            }`}
          >
            <Path
              d={`M ${STROKE_WIDTH / 2} ${
                radius + STROKE_WIDTH / 2
              } A ${radius} ${radius} 0 0 1 ${diameter + STROKE_WIDTH / 2} ${
                radius + STROKE_WIDTH / 2
              }`}
              fill="none"
              stroke="#FFFFFF"
              strokeWidth={STROKE_WIDTH}
              strokeLinecap="round"
            />
            <AnimatedPath
              d={`M ${STROKE_WIDTH / 2} ${
                radius + STROKE_WIDTH / 2
              } A ${radius} ${radius} 0 0 1 ${diameter + STROKE_WIDTH / 2} ${
                radius + STROKE_WIDTH / 2
              }`}
              fill="none"
              stroke="#37306B"
              strokeWidth={STROKE_WIDTH}
              strokeLinecap="round"
              strokeDasharray={`${circumference}, ${circumference}`}
              animatedProps={animatedProps}
            />
          </Svg>
          <AnimatedText
            style={[
              {
                position: "absolute",
                left: (diameter + STROKE_WIDTH) / 2 - 80,
                top: (radius + STROKE_WIDTH / 2) / 2,
                width: 155,
                height: 155,
                textAlign: "center",
                textAlignVertical: "center",
                color: "#FFFFFF",
                fontSize: 28,
                borderWidth: 1,
                borderRadius: 75,
              },
              animatedTextStyle,
            ]}
            animatedProps={animatedTextProps}
          />
        </View>
      )}
    </View>
  );
};

export default ProgressBar;
