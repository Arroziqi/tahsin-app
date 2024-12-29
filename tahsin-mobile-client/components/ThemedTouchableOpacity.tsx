import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

type ThemedTouchableOpacityProps = TouchableOpacityProps & {
  backgroundColor: string;
};

const ThemedTouchableOpacity = ({
  style,
  backgroundColor,
  ...rest
}: ThemedTouchableOpacityProps) => {
  return (
    <TouchableOpacity
      style={[styles.button, style, { backgroundColor }]}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    width: "80%",
  },
});

export default ThemedTouchableOpacity;
