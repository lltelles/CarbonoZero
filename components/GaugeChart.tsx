import React, { useEffect, useRef } from "react";
import { TextInput, View, Dimensions } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedProps,
  useDerivedValue,
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";
import { Path, Svg } from "react-native-svg";

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedText = Animated.createAnimatedComponent(TextInput);

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const STROKE_WIDTH = 20;
const radius = (SCREEN_WIDTH - STROKE_WIDTH) / 2.5;
const diameter = radius * 2;
const circumference = radius * Math.PI;
const duration = 3000;

const ProgressBar = () => {
  const progress = useSharedValue(0);
  const intervalRef = useRef(null);

  const percentage = useDerivedValue(() => {
    return withTiming(progress.value, { duration: duration });
  });

  const strokeColor = useDerivedValue(() => {
    return interpolateColor(
      percentage.value,
      [0, 50, 100],
      ["#74c476", "#41ab5d", "#f03d32"]
    );
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: strokeColor.value,
    };
  });

  const animatedProps = useAnimatedProps(() => {
    const strokeDashoffset = circumference * (1 - percentage.value / 100);
    return {
      strokeDashoffset,
      stroke: strokeColor.value,
    };
  });

  const animatedTextProps = useAnimatedProps(() => {
    return {
      text: `${Math.round(percentage.value)}ppm`,
    };
  });

  const fetchRandomNumber = async () => {
    try {
      const response = await fetch(
        "https://www.random.org/integers/?num=1&min=0&max=100&col=1&base=10&format=plain&rnd=new"
      );
      const data = await response.text();
      const randomNumber = parseInt(data.trim(), 10);

      progress.value = randomNumber;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchRandomNumber();
    intervalRef.current = setInterval(fetchRandomNumber, 3000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
      }}
    >
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
              top: (radius + STROKE_WIDTH / 2) / 2 - 25,
              width: 160,
              height: 160,
              textAlign: "center",
              textAlignVertical: "center",
              color: "#FFFFFF",
              fontSize: 32,
              fontWeight: "bold",
              borderWidth: 1,
              borderRadius: 75,
            },
            animatedTextStyle, // Apply the animated background color style
          ]}
          animatedProps={animatedTextProps}
        />
      </View>
    </View>
  );
};

export default ProgressBar;
