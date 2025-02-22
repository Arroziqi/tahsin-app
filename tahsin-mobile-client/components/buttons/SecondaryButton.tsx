import { Colors } from "@/constants/Colors";
import React from "react";
import {
  DimensionValue,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";

type SecondaryButtonProps = TouchableOpacityProps & {
  text: string;
  color?: string;
  backgroundColor?: string;
  width?: DimensionValue;
  style?: StyleProp<ViewStyle>;
};

const SecondaryButton = ({
  text,
  backgroundColor = Colors.primary.two,
  color = "white",
  width,
  style,
  ...rest
}: SecondaryButtonProps) => {
  return (
    <TouchableOpacity
      style={[style, styles.button, { backgroundColor, width: width }]}
      {...rest}
    >
      <Text style={[styles.text, { color }]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
  },
  text: {
    fontWeight: "semibold",
    fontSize: 14,
    textAlign: "center",
  },
});

export default SecondaryButton;
