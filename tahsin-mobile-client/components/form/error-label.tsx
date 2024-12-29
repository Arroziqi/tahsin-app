import React from "react";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Image, StyleSheet } from "react-native";
import icons from "@/constants/icons";

type ErrorLabelProps = {
  error: string;
};

const ErrorLabel = ({ error }: ErrorLabelProps) => {
  return (
    <ThemedView style={styles.container}>
      <Image
        source={icons.thumbsDown}
        style={styles.thumbsDown}
        resizeMode={"contain"}
      />
      <ThemedText style={styles.text}>{error}</ThemedText>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 7,
    alignItems: "center",
    paddingVertical: 14,
  },
  thumbsDown: {
    width: 18,
    height: 18,
  },
  text: {
    color: "#E33C3C",
    fontWeight: "medium",
  },
});

export default ErrorLabel;
