import React from "react";
import { Animated, StyleSheet, useWindowDimensions, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { ContentItem } from "@/components/ui/onboarding/onboarding-item";
import Value = Animated.Value;

type OnboardingIndicatorProps = {
  data: ContentItem[];
  scrollX: Value;
};

const OnboardingIndicator = ({ data, scrollX }: OnboardingIndicatorProps) => {
  const { width } = useWindowDimensions();
  return (
    <View style={styles.container}>
      {data.map((_: any, i: number) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 20, 10],
          extrapolate: "clamp",
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.75],
          extrapolate: "clamp",
        });
        return (
          <Animated.View
            style={[styles.dot, { width: dotWidth, opacity }]}
            key={i.toString()}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.primary.pMutedTeal,
    marginHorizontal: 8,
  },
});

export default OnboardingIndicator;
